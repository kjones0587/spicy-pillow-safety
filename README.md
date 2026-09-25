# 🔋 The "Spicy Pillow" Safety Briefing (Automated Edition)

An automated, self-advancing 2.5-minute web presentation on swollen lithium-ion laptop batteries and thermal runaway, tailored for a 24-hour help desk remote team.

---

## 🚀 Features

- **Hands-Free Autoplay:** Built for unattended meetings. Attendees just open the link, click "Start Briefing", and it runs smoothly across 5 chapters.
- **20-Second Active Hands-On Audit:** Gives attendees 20 seconds to grab their laptops, test for desk wobble, check trackpad stiffness, and inspect chassis seams—with continuous voiceover guiding them through each step.
- **Synced Voiceover & Live Captions:** Uses browser SpeechSynthesis with real-time text-to-speech narration, paired with high-contrast subtitles for teammates who keep audio muted.
- **Web Audio Sound Effects:** Chimes, countdown ticks, and warning tones synthesized on the fly via the Web Audio API—no missing audio files or network lag.
- **Help Desk SOP:** Covers emergency quarantine, non-combustible surfaces, and IT hardware swap protocol.
- **Pause & Resume Controls:** Allows attendees to pause if a high-priority ticket or user call comes in.

---

## 💻 1. How to Test / Preview Locally Right Now

You can test this immediately on your machine:

### Option A: Direct Open in Browser
Simply double-click `index.html` or open it in Google Chrome, Microsoft Edge, or Firefox.

### Option B: Local HTTP Server (Recommended)
Open PowerShell in this directory:
```powershell
python -m http.server 8080
```
Then visit: [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🌐 2. How to Deploy to Render via GitHub (Free Static Site)

Because you already use GitHub $\rightarrow$ Render, deployment takes under 60 seconds:

1. **Initialize Git & Push to GitHub:**
   ```powershell
   git init
   git add .
   git commit -m "feat: automated spicy pillow safety briefing"
   git branch -M main
   # Add your remote GitHub repo URL:
   git remote add origin https://github.com/<your-username>/spicy-pillow-safety.git
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Log into [dashboard.render.com](https://dashboard.render.com).
   - Click **New +** $\rightarrow$ **Static Site**.
   - Select your `spicy-pillow-safety` repository.
   - Settings:
     - **Name:** `spicy-pillow-safety` (or whatever you like)
     - **Build Command:** *(Leave empty)*
     - **Publish Directory:** `./`
   - Click **Create Static Site**.
   - Render will build and provide your live public URL (e.g., `https://spicy-pillow-safety.onrender.com`).

---

## 💬 3. Slack / Teams Drop-in Message for the PM Shift

Copy and paste this into your team chat or meeting invite for the PM shift:

> **Weekly Safety Message (AM Shift Submission):**
> 
> Hey team! Since I'm on the AM shift and won't be on the PM call, I set up an automated 2-minute safety briefing for today’s meeting:
> 
> 🔗 **[Click Here to Start the Briefing](https://your-render-app-url.onrender.com)**
> 
> Just open the link, click **"Start Briefing"**, and let it play. Keep your work laptop handy—there’s a quick 20-second physical desk test included!
