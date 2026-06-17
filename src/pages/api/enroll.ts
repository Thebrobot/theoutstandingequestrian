import type { APIRoute } from "astro";
import { COURSE_NAME, GHL_WEBHOOK_URL } from "../../config";

export const prerender = false;

// TODO: When Stripe/PayPal is wired, gate the GHL webhook call behind payment confirmation.
// For now, the webhook fires after successful form validation.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface EnrollPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

function validatePayload(data: EnrollPayload): string | null {
  if (!data.firstName.trim()) return "First name is required.";
  if (!data.lastName.trim()) return "Last name is required.";
  if (!data.email.trim()) return "Email address is required.";
  if (!EMAIL_REGEX.test(data.email.trim())) return "Please enter a valid email address.";
  return null;
}

async function parseBody(request: Request): Promise<EnrollPayload> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const json = await request.json();
    return {
      firstName: String(json.firstName ?? ""),
      lastName: String(json.lastName ?? ""),
      email: String(json.email ?? ""),
      phone: String(json.phone ?? ""),
    };
  }

  const formData = await request.formData();
  return {
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await parseBody(request);
    const validationError = validatePayload(data);

    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const webhookPayload = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      course: COURSE_NAME,
      enrolledAt: new Date().toISOString(),
    };

    const ghlResponse = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
    });

    if (!ghlResponse.ok) {
      console.error("GHL webhook failed:", ghlResponse.status, await ghlResponse.text());
      return new Response(
        JSON.stringify({ error: "Enrollment could not be processed. Please try again." }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    const accept = request.headers.get("accept") ?? "";
    if (accept.includes("application/json")) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return Response.redirect(new URL("/thank-you", request.url), 302);
  } catch (error) {
    console.error("Enrollment error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
