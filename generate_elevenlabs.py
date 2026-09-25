#!/usr/bin/env python3
"""
ElevenLabs Audio Generator for Spicy Pillow Safety Briefing
Produces hyper-realistic, human-cadence audio with natural breaths.

Usage:
  python generate_elevenlabs.py --api-key YOUR_API_KEY
  or set environment variable: ELEVENLABS_API_KEY=YOUR_KEY
"""

import os
import sys
import argparse
import urllib.request
import json

# Pre-selected expressive conversational voices
VOICES = {
    "adam": "pNInz6obpgDQGcFmaJgB",      # Deep, friendly, natural American male (Recommended)
    "brian": "nPczCjzI2devNBz1zQrb",     # Conversational narrator
    "rachel": "21m00Tcm4TlvDq8ikWAM",    # Calm, natural female
    "drew": "29vD33N1CtxCmqQRPOHJ",      # Confident, friendly male
    "callum": "N2lVS1w4EtoT3dr4eOWO",    # Conversational male
}

DEFAULT_VOICE = "adam"
MODEL_ID = "eleven_turbo_v2_5" # Fast, natural, high quality

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

def generate_chapter(filename, text, voice_id, api_key, output_dir="audio"):
    os.makedirs(output_dir, exist_ok=True)
    out_path = os.path.join(output_dir, filename)
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"

    payload = {
        "text": text,
        "model_id": MODEL_ID,
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.8,
            "style": 0.35,
            "use_speaker_boost": True
        }
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "xi-api-key": api_key,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg"
        }
    )

    try:
        with urllib.request.urlopen(req) as resp:
            audio_data = resp.read()
            with open(out_path, "wb") as f:
                f.write(audio_data)
            print(f"Successfully generated {out_path} ({len(audio_data)} bytes)")
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8", errors="ignore")
        print(f"ElevenLabs API Error [{e.code}]: {err_msg}")
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Generate Spicy Pillow Safety Audio using ElevenLabs")
    parser.add_argument("--api-key", default=os.environ.get("ELEVENLABS_API_KEY"), help="ElevenLabs API Key")
    parser.add_argument("--voice", default=DEFAULT_VOICE, choices=list(VOICES.keys()), help="Voice name")
    args = parser.parse_args()

    api_key = args.api_key
    if not api_key:
        print("Error: No ElevenLabs API Key provided.")
        print("Provide via --api-key YOUR_KEY or set ELEVENLABS_API_KEY environment variable.")
        sys.exit(1)

    voice_id = VOICES.get(args.voice, VOICES[DEFAULT_VOICE])
    print(f"Using ElevenLabs voice: {args.voice} (ID: {voice_id})")

    for filename, text in scripts.items():
        print(f"\nSynthesizing {filename}...")
        generate_chapter(filename, text, voice_id, api_key)

    print("\nAll chapters successfully generated with ElevenLabs!")

if __name__ == "__main__":
    main()
