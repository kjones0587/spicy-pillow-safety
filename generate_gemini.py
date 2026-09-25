#!/usr/bin/env python3
"""
Google Gemini 2.0 Audio Generator for Spicy Pillow Safety Briefing
Generates human-like conversational audio using Gemini 2.0 Flash native audio output.

Usage:
  python generate_gemini.py --api-key YOUR_GEMINI_API_KEY
  or set environment variable: GEMINI_API_KEY=YOUR_KEY
"""

import os
import sys
import argparse
import urllib.request
import json
import base64

# Gemini 2.0 Prebuilt Voices: Puck (Friendly male), Charon (Calm male), Aoede (Warm female), Kore, Fenrir
DEFAULT_VOICE = "Puck"
MODEL = "gemini-2.0-flash"

scripts = {
    "chapter1.mp3": (
        "Hey everyone, today's quick safety briefing is about something we see all too often on the help desk: the Spicy Pillow. "
        "Take a second and look over at your work laptop sitting on your desk. "
        "Whether it's hooked up to your dock, closed, or running as a secondary screen, "
        "ever wonder what's going on inside it? "
        "We usually work 10-hour shifts, but our laptops stay plugged into the dock 24/7—"
        "keeping the battery constantly charging under relentless heat and electrical float stress. "
        "Over time, that continuous charging can degrade the battery... "
        "turning it into what hardware engineers call, a Spicy Pillow. "
        "That's a lithium-ion pouch cell that has decomposed internally, "
        "trapping volatile, pressurized gases inside a thin foil casing."
    ),
    "chapter2.mp3": (
        "Let's do a live 20-second hardware audit together right now. "
        "Undock or slide your laptop onto a clear flat desk area, and follow the screen. "
        "First: push down on opposite corners. Does it rock or wobble like an uneven table? "
        "If it does, a swollen cell is bulging against the bottom plate. "
        "Second: click down on your trackpad. Does it click cleanly, or does it feel stiff, shallow, or mushy? "
        "Swelling batteries push directly against that mechanical switch. "
        "And third: glance along your side USB ports. Are any seams popping apart? "
        "Wrap up your check now."
    ),
    "chapter3.mp3": (
        "Why is a spicy pillow such a serious safety hazard? "
        "Inside that pressurized pouch is a volatile mix of organic solvents. "
        "If that cell overheats or gets punctured, it triggers thermal runaway: "
        "a self-oxidizing chemical fire that burns hotter than 1,000 degrees, "
        "releases toxic hydrogen fluoride gas, and cannot easily be put out with water. "
        "And the number one culprit for remote workers? "
        "Working while resting your laptop on a bed, couch, or blanket... "
        "which completely suffocates the cooling vents."
    ),
    "chapter4.mp3": (
        "Now, what should you do if your laptop unfortunately enters active thermal runaway? "
        "If you hear hissing, smell sweet chemicals, or see white smoke starting to pop: "
        "First: immediately isolate it from flammable materials. If it's sitting next to curtains, bedding, or loose paper, "
        "move or slide it onto a hard, non-combustible surface like a granite countertop, tile floor, or metal baking sheet. "
        "Use oven mitts or a tool if it's hot—never grab a burning battery with bare hands. "
        "Second: do not breathe the white smoke. It contains toxic hydrogen fluoride gas. "
        "And never throw a small cup of water on it, which can cause violent steam flare-ups. "
        "Third: close the room door behind you to contain the fumes and fire, evacuate, and call 911 immediately."
    ),
    "chapter5.mp3": (
        "If your battery is only swollen but not smoking, the routine protocol is simple: "
        "disconnect the charger, power down, quarantine the machine on a tile or metal surface, "
        "and open an emergency IT replacement ticket. "
        "Hardware check complete! You know what to look for and how to isolate a fire hazard safely. "
        "Keep your cooling vents clear, and have a safe, great shift!"
    )
}

def generate_chapter(filename, text, voice_name, api_key, output_dir="audio"):
    os.makedirs(output_dir, exist_ok=True)
    out_path = os.path.join(output_dir, filename)
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={api_key}"

    prompt = (
        f"Please read the following script out loud in a natural, friendly, conversational coworker tone. "
        f"Do not add any greetings or conversational intro of your own; speak only the provided text:\n\n{text}"
    )

    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {
                    "prebuiltVoiceConfig": {
                        "voiceName": voice_name
                    }
                }
            }
        }
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )

    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            candidates = data.get("candidates", [])
            if not candidates:
                print(f"No candidates returned for {filename}")
                return

            parts = candidates[0].get("content", {}).get("parts", [])
            for part in parts:
                inline_data = part.get("inlineData", {})
                if inline_data.get("mimeType", "").startswith("audio/"):
                    audio_b64 = inline_data.get("data")
                    audio_bytes = base64.b64decode(audio_b64)
                    with open(out_path, "wb") as f:
                        f.write(audio_bytes)
                    print(f"Saved {out_path} ({len(audio_bytes)} bytes)")
                    return

            print(f"No audio inlineData found in response for {filename}")
    except urllib.error.HTTPError as e:
        err = e.read().decode("utf-8", errors="ignore")
        print(f"Gemini API Error [{e.code}]: {err}")
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Generate audio via Gemini 2.0 Audio API")
    parser.add_argument("--api-key", default=os.environ.get("GEMINI_API_KEY"), help="Google Gemini API Key")
    parser.add_argument("--voice", default=DEFAULT_VOICE, choices=["Puck", "Charon", "Aoede", "Kore", "Fenrir"])
    args = parser.parse_args()

    api_key = args.api_key
    if not api_key:
        print("Error: No Gemini API Key provided.")
        print("Provide via --api-key YOUR_KEY or set GEMINI_API_KEY environment variable.")
        sys.exit(1)

    for filename, text in scripts.items():
        print(f"Synthesizing {filename} with Gemini voice {args.voice}...")
        generate_chapter(filename, text, args.voice, api_key)

    print("\nAll chapters successfully generated with Gemini 2.0 Audio!")

if __name__ == "__main__":
    main()
