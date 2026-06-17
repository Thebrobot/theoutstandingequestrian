#!/bin/bash
set -euo pipefail

export PATH="/Users/kyleartman/Library/Python/3.9/bin:/opt/homebrew/bin:$PATH"
BASE="/Users/kyleartman/Desktop/Outstanding Equestrian"
LOG="$BASE/transcripts/transcription.log"

echo "=== Transcription started $(date) ===" | tee -a "$LOG"

done_count=0
total=0
for _ in "$BASE"/videos/week-*/*.mp4; do ((total++)) || true; done

for video in "$BASE"/videos/week-*/*.mp4; do
  name=$(basename "$video" .mp4)
  txt="$BASE/transcripts/${name}.txt"

  if [[ -f "$txt" ]]; then
    echo "[skip] $name already transcribed" | tee -a "$LOG"
    ((done_count++)) || true
    continue
  fi

  echo "[$(date +%H:%M:%S)] Transcribing ($((done_count + 1))/$total): $name" | tee -a "$LOG"
  whisper "$video" \
    --model medium \
    --language en \
    --output_dir "$BASE/transcripts" \
    --output_format all \
    --verbose False 2>&1 | tee -a "$LOG"
  ((done_count++)) || true
  echo "[done] $name" | tee -a "$LOG"
done

echo "=== Transcription finished $(date) — $done_count/$total videos ===" | tee -a "$LOG"
