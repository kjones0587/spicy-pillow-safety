/**
 * Spicy Pillow Safety Briefing
 * Automated Hands-Free Presentation Controller
 */

// Sound Engine using Web Audio API (Zero external MP3 dependencies)
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChime() {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  }

  playTick() {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  playWarning() {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.setValueAtTime(440, now + 0.1);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playSuccess() {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + (i * 0.08));
      gain.gain.setValueAtTime(0.05, now + (i * 0.08));
      gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.08) + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + (i * 0.08));
      osc.stop(now + (i * 0.08) + 0.4);
    });
  }
}

// Chapter Definitions & Narration Scripts
const chapters = [
  {
    id: 1,
    name: "The Hook",
    duration: 32, // seconds
    caption: "Welcome team. Today's safety briefing covers the 'Spicy Pillow'—a swollen lithium-ion battery. Working 24-hour shifts, our laptops stay docked, plugged in, and under heavy load for days, causing internal electrolyte breakdown and trapped volatile gas.",
    narration: "Welcome team. Today's safety briefing is about something sitting directly beneath your wrists right now: the 'Spicy Pillow.' In hardware terminology, that's a swollen lithium-ion battery. Working 24-hour shifts, our laptops stay docked, plugged in, and under heavy load for days at a time. Over time, that constant heat and voltage can cause internal electrolyte decomposition, trapping flammable gases inside a sealed foil pouch."
  },
  {
    id: 2,
    name: "Laptop Check",
    duration: 45, // seconds (includes 20-second active test)
    caption: "Hands-on audit! You have 20 seconds. Pick up your laptop and test it on a flat desk. Check 1: Rock alternating corners for wobble. Check 2: Click the trackpad for stiff or mushy travel. Check 3: Inspect side seams near USB ports for gaps.",
    narration: "Let's do a live safety check right now. Grab your laptop and find a flat desk surface. You have a 20-second timer starting now. Place your laptop flat and push down on opposite corners. If it rocks or wobbles like an uneven café table, a bulging cell is pushing the feet up. Next, click your trackpad. Does it click crisply, or does it feel stiff and mushy? Swelling cells press directly under the trackpad switch. Finally, glance at your side USB ports—any seams popping open? Finish your check now."
  },
  {
    id: 3,
    name: "The Science",
    duration: 38, // seconds
    caption: "Why is it dangerous? Punctured or overheated cells enter Thermal Runaway—burning above 1,000°F and generating their own oxygen, so water won't smother it. Charging on beds or blankets suffocates vents and is the #1 catalyst.",
    narration: "Why is a swollen battery dangerous? Inside is a pressurized mix of volatile organic solvents. If the pouch ruptures or overheats, it triggers thermal runaway—a self-oxidizing chain reaction burning above 1,000 degrees that standard water extinguishers cannot easily extinguish. It also releases toxic hydrogen fluoride fumes. The number one catalyst at home? Charging your laptop on a bed, blanket, or couch, which suffocates the cooling vents and traps extreme heat."
  },
  {
    id: 4,
    name: "Safety Rules",
    duration: 38, // seconds
    caption: "Help Desk SOP: 1. NEVER press, clamp, or puncture the bulge. 2. Unplug charger immediately, shut down, and quarantine on a non-flammable surface (metal tray or tile floor). 3. Submit an IT hardware swap ticket for hazardous disposal.",
    narration: "Here is our 24-hour team protocol if you or an end-user encounter a spicy pillow: First, never press down, squeeze, clamp, or puncture the casing. Even a tiny puncture introduces atmospheric oxygen and sparks a fire. Second, unplug the charger immediately and shut down the machine. Quarantine it on a hard, non-combustible surface like a tile floor or metal baking sheet, away from drapes. And third, submit an IT hardware swap ticket immediately. Swollen batteries must go to hazardous e-waste, never ordinary trash."
  },
  {
    id: 5,
    name: "Summary",
    duration: 18, // seconds
    caption: "Safety Briefing Complete! You've verified your device, learned the warning signs, and reviewed the safe handling SOP. Stay safe and have a great shift!",
    narration: "Safety briefing complete! You've checked your machine, reviewed the warning signs, and know the emergency protocol. Keep your cooling vents clear, stay safe, and have a fantastic shift!"
  }
];

// App State Controller
class PresentationApp {
  constructor() {
    this.sound = new SoundFX();
    this.currentChapterIndex = 0;
    this.isPlaying = false;
    this.isMuted = false;
    this.elapsedSeconds = 0;
    this.chapterTimer = null;
    this.chapterTimeRemaining = 0;
    this.countdownInterval = null;
    this.speechUtterance = null;
    this.hasStarted = false;

    // DOM References
    this.startScreen = document.getElementById('start-screen');
    this.slides = [
      document.getElementById('slide-1'),
      document.getElementById('slide-2'),
      document.getElementById('slide-3'),
      document.getElementById('slide-4'),
      document.getElementById('slide-5')
    ];
    this.segBars = document.querySelectorAll('.chapter-seg-bar');
    this.liveCaptionText = document.getElementById('live-caption-text');
    this.liveIndicator = document.getElementById('live-indicator');
    this.timerDisplay = document.getElementById('timer-display');
    this.playPauseBtn = document.getElementById('play-pause-btn');
    this.playPauseLabel = document.getElementById('play-pause-label');
    this.playPauseIcon = document.getElementById('play-pause-icon');
    this.audioToggleBtn = document.getElementById('audio-toggle-btn');
    this.audioLabel = document.getElementById('audio-label');
    this.audioIcon = document.getElementById('audio-icon');

    // Countdown / Check 2 DOM Elements
    this.countdownNumber = document.getElementById('countdown-number');
    this.countdownCircle = document.getElementById('countdown-circle');
    this.testStepIndicator = document.getElementById('test-step-indicator');
    this.wobbleGraphic = document.getElementById('wobble-laptop-graphic');
    this.cardCheck1 = document.getElementById('card-check-1');
    this.cardCheck2 = document.getElementById('card-check-2');
    this.cardCheck3 = document.getElementById('card-check-3');

    // Chapter 1 & 3 Graphic Elements
    this.ch1BatteryCore = document.getElementById('ch1-battery-core');
    this.ch1BatteryBadge = document.getElementById('ch1-battery-badge');
    this.ch1BatteryLabel = document.getElementById('ch1-battery-label');
    this.ch1ExpansionText = document.getElementById('ch1-expansion-text');
    this.tempBarFill = document.getElementById('temp-bar-fill');
    this.tempGaugeVal = document.getElementById('temp-gauge-val');
    this.reactionStateTitle = document.getElementById('reaction-state-title');
    this.reactionStateDesc = document.getElementById('reaction-state-desc');

    this.bindEvents();
    this.initLucide();
  }

  initLucide() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  bindEvents() {
    document.getElementById('start-btn').addEventListener('click', () => this.startBriefing());
    this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
    this.audioToggleBtn.addEventListener('click', () => this.toggleAudio());
    document.getElementById('prev-slide-btn').addEventListener('click', () => this.prevChapter());
    document.getElementById('next-slide-btn').addEventListener('click', () => this.nextChapter());
    const replayBtn = document.getElementById('replay-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => this.restart());
    }

    // Keep speech synthesis active on Chromium (workaround for Chrome garbage collection bug)
    setInterval(() => {
      if (this.isPlaying && window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);
  }

  startBriefing() {
    this.sound.init();
    this.sound.playChime();
    this.hasStarted = true;
    this.isPlaying = true;

    this.startScreen.classList.add('hidden');
    this.startScreen.classList.remove('active');
    this.liveIndicator.classList.remove('hidden');
    this.liveIndicator.classList.add('inline-flex');

    this.loadChapter(0);
  }

  loadChapter(index) {
    if (index < 0 || index >= chapters.length) return;
    this.currentChapterIndex = index;
    const chapter = chapters[index];

    // Clear previous timers and voice
    this.clearTimers();
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // Update Slide Visibility
    this.slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.remove('hidden');
        slide.classList.add('active');
      } else {
        slide.classList.add('hidden');
        slide.classList.remove('active');
      }
    });

    // Update Progress Bars
    this.segBars.forEach((bar, idx) => {
      bar.classList.remove('active', 'completed');
      const fill = bar.querySelector('.chapter-seg-fill');
      if (idx < index) {
        bar.classList.add('completed');
        fill.style.width = '100%';
      } else if (idx === index) {
        bar.classList.add('active');
        fill.style.width = '0%';
      } else {
        fill.style.width = '0%';
      }
    });

    // Update Captions
    this.liveCaptionText.innerText = chapter.caption;
    this.sound.playChime();

    // Trigger Slide-Specific Animations
    this.handleSlideAnimations(index);

    // Speak Narration
    this.speak(chapter.narration);

    // Start Chapter Timer & Progress
    this.chapterTimeRemaining = chapter.duration;
    const totalDuration = chapter.duration;

    this.chapterTimer = setInterval(() => {
      if (!this.isPlaying) return;

      this.chapterTimeRemaining--;
      this.elapsedSeconds++;
      this.updateTotalTimeDisplay();

      // Progress bar fill
      const percent = Math.min(100, Math.round(((totalDuration - this.chapterTimeRemaining) / totalDuration) * 100));
      const activeBar = this.segBars[index];
      if (activeBar) {
        const fill = activeBar.querySelector('.chapter-seg-fill');
        if (fill) fill.style.width = `${percent}%`;
      }

      if (this.chapterTimeRemaining <= 0) {
        clearInterval(this.chapterTimer);
        this.nextChapter();
      }
    }, 1000);

    this.initLucide();
  }

  handleSlideAnimations(index) {
    // Reset any state
    if (this.wobbleGraphic) this.wobbleGraphic.classList.remove('animate-wobble');

    // Chapter 1: Pouch swelling transition
    if (index === 0) {
      setTimeout(() => {
        if (this.ch1BatteryCore) {
          this.ch1BatteryCore.classList.add('swollen-battery-state');
          this.ch1BatteryBadge.innerText = 'SWOLLEN';
          this.ch1BatteryBadge.className = 'font-mono text-red-400 font-bold';
          this.ch1BatteryLabel.innerText = 'Pressure: High (50+ PSI)';
          this.ch1BatteryLabel.className = 'text-xs font-mono text-red-300 font-bold';
          this.ch1ExpansionText.innerText = 'Critical Bulge';
          this.ch1ExpansionText.className = 'text-red-400 font-bold';
        }
      }, 4000);
    }

    // Chapter 2: The 20-Second Active Hands-On Audit!
    if (index === 1) {
      this.startCountdown20s();
    }

    // Chapter 3: Heat Gauge Animation
    if (index === 2) {
      setTimeout(() => {
        if (this.tempBarFill) this.tempBarFill.style.width = '85%';
        if (this.tempGaugeVal) {
          this.tempGaugeVal.innerText = '150°C+ THERMAL RUNAWAY';
          this.tempGaugeVal.className = 'text-red-400 font-bold text-sm animate-pulse';
        }
        if (this.reactionStateTitle) {
          this.reactionStateTitle.innerText = 'State: Exothermic Rupture';
          this.reactionStateTitle.className = 'text-xs font-bold text-red-400 uppercase tracking-wider mb-1';
        }
        if (this.reactionStateDesc) {
          this.reactionStateDesc.innerText = 'Suffocated airflow on soft surfaces triggered rapid separator meltdown.';
        }
        this.sound.playWarning();
      }, 5000);
    }

    // Chapter 5: Triumphant completion
    if (index === 4) {
      this.sound.playSuccess();
    }
  }

  startCountdown20s() {
    let timeLeft = 20;
    const totalCountdown = 20;
    const circumference = 2 * Math.PI * 24; // ~150.8

    if (this.countdownNumber) this.countdownNumber.innerText = timeLeft;
    if (this.countdownCircle) this.countdownCircle.style.strokeDashoffset = '0';
    if (this.wobbleGraphic) this.wobbleGraphic.classList.add('animate-wobble');

    // Highlight initial test 1 (Wobble)
    this.updateActiveSubtest(1);

    this.countdownInterval = setInterval(() => {
      if (!this.isPlaying) return;

      timeLeft--;
      if (this.countdownNumber) this.countdownNumber.innerText = Math.max(0, timeLeft);

      // Play soft tick
      this.sound.playTick();

      // Update circular SVG progress
      const offset = circumference - (timeLeft / totalCountdown) * circumference;
      if (this.countdownCircle) {
        this.countdownCircle.style.strokeDashoffset = offset;
      }

      // Rotate highlighted test cards as countdown progresses
      if (timeLeft <= 13 && timeLeft > 6) {
        // Switch to Test 2: Trackpad Click
        this.updateActiveSubtest(2);
        if (this.testStepIndicator) this.testStepIndicator.innerText = '2. Trackpad Click';
        if (this.wobbleGraphic) this.wobbleGraphic.classList.remove('animate-wobble');
      } else if (timeLeft <= 6 && timeLeft > 0) {
        // Switch to Test 3: Seam / Port Gap
        this.updateActiveSubtest(3);
        if (this.testStepIndicator) this.testStepIndicator.innerText = '3. Casing Seams';
      } else if (timeLeft <= 0) {
        clearInterval(this.countdownInterval);
        if (this.testStepIndicator) {
          this.testStepIndicator.innerText = 'Audit Finished!';
          this.testStepIndicator.className = 'text-xs font-bold text-emerald-400';
        }
        if (this.countdownNumber) {
          this.countdownNumber.innerText = '✓';
          this.countdownNumber.className = 'absolute text-xl font-bold font-mono text-emerald-400';
        }
        if (this.countdownCircle) {
          this.countdownCircle.classList.remove('text-amber-400');
          this.countdownCircle.classList.add('text-emerald-400');
        }
        this.sound.playSuccess();
      }
    }, 1000);
  }

  updateActiveSubtest(num) {
    [this.cardCheck1, this.cardCheck2, this.cardCheck3].forEach((card, idx) => {
      if (!card) return;
      if (idx + 1 === num) {
        card.classList.add('active-subtest');
      } else {
        card.classList.remove('active-subtest');
      }
    });
  }

  speak(text) {
    if (this.isMuted || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05; // natural presentation cadence
    utterance.pitch = 1.0;

    // Pick best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium')));
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    window.speechSynthesis.speak(utterance);
    this.speechUtterance = utterance;
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.playPauseLabel.innerText = 'Pause';
      this.playPauseIcon.setAttribute('data-lucide', 'pause');
      this.playPauseIcon.className = 'w-4 h-4 text-emerald-400';
      this.liveIndicator.classList.remove('hidden');
      if (window.speechSynthesis && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } else {
      this.playPauseLabel.innerText = 'Resume';
      this.playPauseIcon.setAttribute('data-lucide', 'play');
      this.playPauseIcon.className = 'w-4 h-4 text-amber-400';
      this.liveIndicator.classList.add('hidden');
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
      }
    }
    this.initLucide();
  }

  toggleAudio() {
    this.isMuted = !this.isMuted;
    this.sound.enabled = !this.isMuted;

    if (this.isMuted) {
      this.audioLabel.innerText = 'Captions Only';
      this.audioIcon.setAttribute('data-lucide', 'volume-x');
      this.audioIcon.className = 'w-4 h-4 text-slate-400';
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } else {
      this.audioLabel.innerText = 'Voice On';
      this.audioIcon.setAttribute('data-lucide', 'volume-2');
      this.audioIcon.className = 'w-4 h-4 text-amber-400';
      const chapter = chapters[this.currentChapterIndex];
      if (chapter && this.isPlaying) {
        this.speak(chapter.narration);
      }
    }
    this.initLucide();
  }

  nextChapter() {
    if (this.currentChapterIndex < chapters.length - 1) {
      this.loadChapter(this.currentChapterIndex + 1);
    } else {
      // Finished all slides
      this.isPlaying = false;
      this.liveIndicator.classList.add('hidden');
      this.playPauseLabel.innerText = 'Finished';
    }
  }

  prevChapter() {
    if (this.currentChapterIndex > 0) {
      this.loadChapter(this.currentChapterIndex - 1);
    }
  }

  restart() {
    this.elapsedSeconds = 0;
    this.loadChapter(0);
    this.isPlaying = true;
    this.playPauseLabel.innerText = 'Pause';
    this.playPauseIcon.setAttribute('data-lucide', 'pause');
    this.playPauseIcon.className = 'w-4 h-4 text-emerald-400';
    this.liveIndicator.classList.remove('hidden');
    this.initLucide();
  }

  updateTotalTimeDisplay() {
    const mins = Math.floor(this.elapsedSeconds / 60);
    const secs = this.elapsedSeconds % 60;
    this.timerDisplay.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  clearTimers() {
    if (this.chapterTimer) {
      clearInterval(this.chapterTimer);
      this.chapterTimer = null;
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.presentationApp = new PresentationApp();
});
