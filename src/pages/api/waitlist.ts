import type { APIRoute } from "astro";
import { GHL_WAITLIST_WEBHOOK_URL } from "../../config";

export const prerender = false;

// TODO: connect to email marketing list or GHL tag

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let firstName = "";
    let email = "";

    if (contentType.includes("application/json")) {
      const json = await request.json();
      firstName = String(json.firstName ?? "");
      email = String(json.email ?? "");
    } else {
      const formData = await request.formData();
      firstName = String(formData.get("firstName") ?? "");
      email = String(formData.get("email") ?? "");
    }

    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) {
      return new Response(JSON.stringify({ error: "Please enter a valid email address." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const trimmedEmail = email.trim();
    const trimmedFirstName =
      firstName.trim() || trimmedEmail.split("@")[0] || "Subscriber";

    const payload = {
      firstName: trimmedFirstName,
      email: trimmedEmail,
      tag: "waitlist",
      subscribedAt: new Date().toISOString(),
    };

    const ghlResponse = await fetch(GHL_WAITLIST_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!ghlResponse.ok) {
      console.error("Waitlist webhook failed:", ghlResponse.status, await ghlResponse.text());
      return new Response(
        JSON.stringify({ error: "Could not subscribe. Please try again." }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Waitlist error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
