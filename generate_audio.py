import asyncio
import os
import edge_tts

# Using en-US-GuyNeural: A natural, conversational, professional human voice
VOICE = "en-US-GuyNeural"
RATE = "+0%"  # Natural speed
PITCH = "+0Hz"

scripts = {
    "chapter1.mp3": (
        "Welcome team. Today's safety briefing is about something sitting directly beneath your wrists right now: "
        "the Spicy Pillow. In hardware terminology, that's a swollen lithium-ion battery. "
        "Working 24-hour shifts, our laptops stay docked, plugged in, and under heavy workload for days at a time. "
        "Over time, that constant heat and voltage can cause internal electrolyte breakdown, "
        "trapping volatile gases inside a sealed foil pouch."
    ),
    "chapter2.mp3": (
        "Let's do a live safety check right now. Grab your laptop and find a flat desk surface. "
        "You have a 20-second timer starting now. "
        "Place your laptop flat and push down on opposite corners. If it rocks or wobbles like an uneven café table, "
        "a bulging cell is pushing the rubber feet up off the desk. "
        "Next, click your trackpad. Does it click crisply, or does it feel stiff and mushy? "
        "Swelling cells press directly under the trackpad switch. "
        "Finally, glance at your side USB ports. Are any chassis seams popping open? "
        "Finish up your check now."
    ),
    "chapter3.mp3": (
        "Why is a swollen battery dangerous? Inside is a pressurized mix of volatile organic solvents. "
        "If the pouch ruptures or overheats, it triggers thermal runaway: a self-oxidizing chain reaction "
        "burning above 1,000 degrees that standard water extinguishers cannot easily put out. "
        "It also releases toxic hydrogen fluoride fumes. "
        "The number one catalyst at home? Charging your laptop on a bed, blanket, or couch, "
        "which suffocates the cooling vents and traps extreme heat."
    ),
    "chapter4.mp3": (
        "Here is our 24-hour team protocol if you or an end-user encounter a spicy pillow. "
        "First, never press down, squeeze, clamp, or puncture the casing. "
        "Even a tiny puncture introduces atmospheric oxygen and sparks an immediate fire. "
        "Second, unplug the charger immediately and shut down the machine. "
        "Quarantine it on a hard, non-combustible surface like a tile floor or metal baking sheet, away from drapes. "
        "And third, submit an emergency IT hardware swap ticket. "
        "Swollen batteries must go to certified hazardous e-waste, never into ordinary trash."
    ),
    "chapter5.mp3": (
        "Safety briefing complete! You've checked your machine, reviewed the warning signs, and know the emergency protocol. "
        "Keep your cooling vents clear, stay safe, and have a fantastic shift!"
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
