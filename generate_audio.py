import asyncio
import os
import edge_tts

# en-US-AndrewMultilingualNeural: Exceptional natural inflection, micro-breaths, and broadcast clarity
VOICE = "en-US-AndrewMultilingualNeural"
RATE = "+0%"
PITCH = "+0Hz"

# Formatted with natural spoken phrasing, pauses, and emphasis
scripts = {
    "chapter1.mp3": (
        "Take a second and look down at your hands right now. "
        "Ever wonder what's sitting directly underneath your keyboard? "
        "Working 24-hour shifts, our laptops stay docked, plugged into chargers, and running hot for days at a time. "
        "Over time, that relentless heat and electrical float charge can degrade the battery... "
        "turning it into what hardware engineers call, a Spicy Pillow. "
        "That's a lithium-ion pouch cell that has decomposed internally, "
        "trapping volatile, pressurized gases inside a thin foil casing."
    ),
    "chapter2.mp3": (
        "Let's do a live 20-second hardware audit together right now. "
        "Grab your laptop, place it on a flat desk, and follow the screen. "
        "First: push down on opposite corners. Does it rock or wobble like an uneven table? "
        "If it does, a swollen cell is bulging against the bottom plate. "
        "Second: click down on your trackpad. Does it click cleanly, or does it feel stiff, shallow, or mushy? "
        "Swelling batteries push directly against that mechanical switch. "
        "And third: glance along your side USB ports. Are any seams popping apart? "
        "Wrap up your check now."
    ),
    "chapter3.mp3": (
        "So, why is a spicy pillow such a serious safety hazard? "
        "Inside that pressurized pouch is a volatile mix of organic solvents. "
        "If that cell overheats or gets punctured, it triggers thermal runaway: "
        "a self-oxidizing chemical fire that burns hotter than 1,000 degrees, "
        "releases toxic hydrogen fluoride gas, and cannot easily be extinguished with water. "
        "And the number one culprit for remote workers? "
        "Working while resting your laptop on a bed, couch, or blanket... "
        "which completely suffocates the cooling vents."
    ),
    "chapter4.mp3": (
        "If you or an end user ever spot a bulging laptop, remember three golden rules. "
        "Rule number one: never press down, squeeze, or puncture the casing. "
        "Even a microscopic pinprick introduces oxygen and sparks an immediate fire. "
        "Rule number two: disconnect the charger immediately, power down, and quarantine the laptop on a hard, non-flammable surface, "
        "like a kitchen tile floor or metal tray. "
        "And rule number three: open an emergency IT replacement ticket. "
        "Compromised batteries must go to hazardous waste, never municipal trash."
    ),
    "chapter5.mp3": (
        "Hardware audit complete! "
        "You now know the warning signs, the real risks, and how to handle a compromised battery safely. "
        "Keep your vents clear, check your gear, and have a safe, great shift!"
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
