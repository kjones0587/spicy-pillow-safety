import asyncio
import os
import edge_tts

# en-US-AndrewMultilingualNeural: Exceptional clarity and natural inflection
VOICE = "en-US-AndrewMultilingualNeural"
RATE = "+1%"
PITCH = "+0Hz"

scripts = {
    "chapter1.mp3": (
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

async def generate():
    os.makedirs("audio", exist_ok=True)
    for filename, text in scripts.items():
        filepath = os.path.join("audio", filename)
        print(f"Generating {filepath} with {VOICE}...")
        communicate = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH)
        await communicate.save(filepath)
        print(f"Saved {filepath} ({os.path.getsize(filepath)} bytes)")

if __name__ == "__main__":
    asyncio.run(generate())
