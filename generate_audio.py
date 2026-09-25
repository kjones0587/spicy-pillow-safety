import asyncio
import os
import edge_tts

# en-US-GuyNeural: Charismatic, professional tech presenter voice
VOICE = "en-US-GuyNeural"
RATE = "+2%"
PITCH = "+0Hz"

scripts = {
    "chapter1.mp3": (
        "Look down at your hands right now. Ever wonder what's sitting directly underneath that keyboard? "
        "If you work long shifts, your laptop stays plugged in, running hot for days on end. "
        "Over time, that constant electrical stress can turn your flat battery into what hardware techs call a Spicy Pillow. "
        "That's a lithium pouch cell that has degraded, decomposed, and swelled up like a bag of popcorn with volatile, trapped gas."
    ),
    "chapter2.mp3": (
        "So let's do a quick physical audit right now. You've got a 20-second timer starting on screen. "
        "First: place your laptop on a flat desk and press opposite corners. Does it wobble? "
        "If it rocks like an uneven table, the battery is bulging against the bottom plate. "
        "Second: click your trackpad. Does it click crisply, or does it feel stiff and shallow? "
        "Swelling cells press directly against that mechanical switch. "
        "And third: glance at your USB ports. Are any seams popping apart? "
        "Five seconds left to finish up your check."
    ),
    "chapter3.mp3": (
        "Now, why is a spicy pillow so dangerous? This isn't just cosmetic plastic damage. "
        "That pressurized pouch contains flammable organic solvents. "
        "If it overheats or gets punctured, it triggers thermal runaway: a self-oxidizing fire that burns above 1,000 degrees, "
        "emits toxic fumes, and cannot be put out with water. "
        "And the biggest catalyst at home? Charging your laptop while working on your bed or couch, "
        "completely suffocating the underside cooling vents."
    ),
    "chapter4.mp3": (
        "If you or an end-user spot a bulging battery, remember three simple rules. "
        "Number one: never squeeze, clamp, or poke it. Even a microscopic puncture can trigger immediate ignition. "
        "Number two: unplug the charger immediately, shut it down, and quarantine the device on a hard, non-combustible surface like a tile floor or metal tray. "
        "And number three: open an IT hardware replacement ticket. "
        "These must go to specialized hazardous waste, never municipal trash."
    ),
    "chapter5.mp3": (
        "Audit complete! You know what to look for, and you know how to handle it safely. "
        "Keep your cooling vents clear, check your gear, and have a safe, productive shift!"
    )
}

async def generate():
    os.makedirs("audio", exist_ok=True)
    for filename, text in scripts.items():
        filepath = os.path.join("audio", filename)
        print(f"Generating {filepath}...")
        communicate = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH)
        await communicate.save(filepath)
        print(f"Saved {filepath} ({os.path.getsize(filepath)} bytes)")

if __name__ == "__main__":
    asyncio.run(generate())
