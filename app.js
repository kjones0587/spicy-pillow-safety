/**
 * Spicy Pillow Safety Briefing
 * Automated Presentation Controller with Studio-Grade Neural Human Voiceover
 */

// Sound Effects Engine (Chimes and ticks via Web Audio API)
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
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  playTick() {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(750, now);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  playWarning() {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.setValueAtTime(440, now + 0.1);
    gain.gain.setValueAtTime(0.05, now);
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
      gain.gain.setValueAtTime(0.04, now + (i * 0.08));
      gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.08) + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + (i * 0.08));
      osc.stop(now + (i * 0.08) + 0.4);
    });
  }
}

// Chapter Definitions with Pre-rendered Human Voiceover MP3s
const chapters = [
  {
    id: 1,
    name: "The Hook",
    audioSrc: "audio/chapter1.mp3",
    caption: "Welcome team. Today's safety briefing covers the 'Spicy Pillow'—a swollen lithium-ion battery. Working 24-hour shifts, our laptops stay docked and under heavy load for days, causing internal electrolyte breakdown and trapped volatile gas."
  },
  {
    id: 2,
    name: "Laptop Check",
    audioSrc: "audio/chapter2.mp3",
    caption: "Hands-on audit! 20-second timer active. Place laptop on a flat desk. Check 1: Rock alternating corners for wobble. Check 2: Click the trackpad for stiff or mushy travel. Check 3: Inspect side seams near USB ports for gaps."
  },
  {
    id: 3,
    name: "The Science",
    audioSrc: "audio/chapter3.mp3",
    caption: "Why is it dangerous? Punctured or overheated cells enter Thermal Runaway—burning above 1,000°F and generating their own oxygen. Charging on beds or blankets suffocates vents and is the #1 home office catalyst."
  },
  {
    id: 4,
    name: "Safety Rules",
    audioSrc: "audio/chapter4.mp3",
    caption: "Help Desk SOP: 1. NEVER press, clamp, or puncture the bulge. 2. Unplug charger immediately, shut down, and quarantine on a non-flammable surface (metal tray or tile floor). 3. Submit an IT hardware swap ticket for hazardous disposal."
  },
  {
    id: 5,
    name: "Summary",
    audioSrc: "audio/chapter5.mp3",
    caption: "Safety Briefing Complete! You've verified your device, learned the warning signs, and reviewed the safe handling SOP. Stay safe and have a great shift!"
  }
];

class PresentationApp {
  constructor() {
    this.sound = new SoundFX();
    this.currentChapterIndex = 0;
    this.isPlaying = false;
    this.isMuted = false;
    this.totalElapsedSeconds = 0;
    this.globalTimerInterval = null;
    this.countdownInterval = null;
    this.currentAudio = null;

    // DOM Elements
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

    // Slide 2: 20-second active test DOM
    this.countdownNumber = document.getElementById('countdown-number');
    this.countdownCircle = document.getElementById('countdown-circle');
    this.testStepIndicator = document.getElementById('test-step-indicator');
    this.wobbleGraphic = document.getElementById('wobble-laptop-graphic');
    this.cardCheck1 = document.getElementById('card-check-1');
    this.cardCheck2 = document.getElementById('card-check-2');
    this.cardCheck3 = document.getElementById('card-check-3');

    // Slide 1 & 3 Graphic Elements
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
  }

  startBriefing() {
    this.sound.init();
    this.sound.playChime();
    this.isPlaying = true;

    this.startScreen.classList.add('hidden');
    this.startScreen.classList.remove('active');
    this.liveIndicator.classList.remove('hidden');
    this.liveIndicator.classList.add('inline-flex');

    // Start global wall clock timer
    this.startGlobalTimer();

    this.loadChapter(0);
  }

  loadChapter(index) {
    if (index < 0 || index >= chapters.length) return;
    this.currentChapterIndex = index;
    const chapter = chapters[index];

    // Stop previous audio
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
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

    // Update Segment Progress Bars
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

    // Update Live Caption
    this.liveCaptionText.innerText = chapter.caption;
    this.sound.playChime();

    // Trigger visual animations
    this.handleSlideAnimations(index);

    // Load & Play Neural Human Audio
    const audio = new Audio(chapter.audioSrc);
    audio.muted = this.isMuted;
    this.currentAudio = audio;

    // Track time to update the active chapter progress bar fill
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const percent = Math.min(100, Math.round((audio.currentTime / audio.duration) * 100));
        const activeBar = this.segBars[index];
        if (activeBar) {
          const fill = activeBar.querySelector('.chapter-seg-fill');
          if (fill) fill.style.width = `${percent}%`;
        }
      }
    });

    // When audio finishes, advance to the next chapter automatically!
    audio.addEventListener('ended', () => {
      setTimeout(() => {
        if (this.isPlaying) {
          this.nextChapter();
        }
      }, 800);
    });

    if (this.isPlaying) {
      audio.play().catch(err => {
        console.warn("Audio autoplay blocked or interrupted:", err);
      });
    }

    this.initLucide();
  }

  handleSlideAnimations(index) {
    // Reset animations
    if (this.wobbleGraphic) this.wobbleGraphic.classList.remove('animate-wobble');

    // Chapter 1: Swell after 3.5 seconds into the audio
    if (index === 0) {
      setTimeout(() => {
        if (this.currentChapterIndex === 0 && this.ch1BatteryCore) {
          this.ch1BatteryCore.classList.add('swollen-battery-state');
          this.ch1BatteryBadge.innerText = 'SWOLLEN';
          this.ch1BatteryBadge.className = 'font-mono text-red-400 font-bold';
          this.ch1BatteryLabel.innerText = 'Pressure: High (50+ PSI)';
          this.ch1BatteryLabel.className = 'text-xs font-mono text-red-300 font-bold';
          this.ch1ExpansionText.innerText = 'Critical Bulge';
          this.ch1ExpansionText.className = 'text-red-400 font-bold';
        }
      }, 3500);
    }

    // Chapter 2: The 20-Second Active Countdown starts at 6s mark into narration
    if (index === 1) {
      this.resetCountdownUI();
      setTimeout(() => {
        if (this.currentChapterIndex === 1 && this.isPlaying) {
          this.runCountdown20s();
        }
      }, 5500);
    }

    // Chapter 3: Heat Gauge Animation triggers at 4s mark
    if (index === 2) {
      setTimeout(() => {
        if (this.currentChapterIndex === 2) {
          if (this.tempBarFill) this.tempBarFill.style.width = '88%';
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
        }
      }, 4500);
    }

    // Chapter 5: Success chime
    if (index === 4) {
      this.sound.playSuccess();
    }
  }

  resetCountdownUI() {
    if (this.countdownNumber) {
      this.countdownNumber.innerText = '20';
      this.countdownNumber.className = 'absolute text-xl font-bold font-mono text-amber-400';
    }
    if (this.countdownCircle) {
      this.countdownCircle.style.strokeDashoffset = '0';
      this.countdownCircle.classList.remove('text-emerald-400');
      this.countdownCircle.classList.add('text-amber-400');
    }
    if (this.testStepIndicator) {
      this.testStepIndicator.innerText = 'Get Ready...';
      this.testStepIndicator.className = 'text-xs font-bold text-amber-300';
    }
    this.updateActiveSubtest(1);
  }

  runCountdown20s() {
    let timeLeft = 20;
    const totalCountdown = 20;
    const circumference = 2 * Math.PI * 24;

    if (this.testStepIndicator) this.testStepIndicator.innerText = '1. The Wobble Test';
    if (this.wobbleGraphic) this.wobbleGraphic.classList.add('animate-wobble');

    this.countdownInterval = setInterval(() => {
      if (!this.isPlaying) return;

      timeLeft--;
      if (this.countdownNumber) this.countdownNumber.innerText = Math.max(0, timeLeft);

      this.sound.playTick();

      const offset = circumference - (timeLeft / totalCountdown) * circumference;
      if (this.countdownCircle) {
        this.countdownCircle.style.strokeDashoffset = offset;
      }

      // Step 2: Trackpad Click (around 13s remaining)
      if (timeLeft <= 13 && timeLeft > 6) {
        this.updateActiveSubtest(2);
        if (this.testStepIndicator) this.testStepIndicator.innerText = '2. Trackpad Click';
        if (this.wobbleGraphic) this.wobbleGraphic.classList.remove('animate-wobble');
      } 
      // Step 3: Seam / Port Gap (around 6s remaining)
      else if (timeLeft <= 6 && timeLeft > 0) {
        this.updateActiveSubtest(3);
        if (this.testStepIndicator) this.testStepIndicator.innerText = '3. Casing Seams';
      } 
      // Completed
      else if (timeLeft <= 0) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
        if (this.testStepIndicator) {
          this.testStepIndicator.innerText = 'Audit Complete!';
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

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.playPauseLabel.innerText = 'Pause';
      this.playPauseIcon.setAttribute('data-lucide', 'pause');
      this.playPauseIcon.className = 'w-4 h-4 text-emerald-400';
      this.liveIndicator.classList.remove('hidden');
      if (this.currentAudio) {
        this.currentAudio.play();
      }
    } else {
      this.playPauseLabel.innerText = 'Resume';
      this.playPauseIcon.setAttribute('data-lucide', 'play');
      this.playPauseIcon.className = 'w-4 h-4 text-amber-400';
      this.liveIndicator.classList.add('hidden');
      if (this.currentAudio) {
        this.currentAudio.pause();
      }
    }
    this.initLucide();
  }

  toggleAudio() {
    this.isMuted = !this.isMuted;
    this.sound.enabled = !this.isMuted;

    if (this.currentAudio) {
      this.currentAudio.muted = this.isMuted;
    }

    if (this.isMuted) {
      this.audioLabel.innerText = 'Captions Only';
      this.audioIcon.setAttribute('data-lucide', 'volume-x');
      this.audioIcon.className = 'w-4 h-4 text-slate-400';
    } else {
      this.audioLabel.innerText = 'Voice On';
      this.audioIcon.setAttribute('data-lucide', 'volume-2');
      this.audioIcon.className = 'w-4 h-4 text-amber-400';
    }
    this.initLucide();
  }

  nextChapter() {
    if (this.currentChapterIndex < chapters.length - 1) {
      this.loadChapter(this.currentChapterIndex + 1);
    } else {
      this.isPlaying = false;
      this.liveIndicator.classList.add('hidden');
      this.playPauseLabel.innerText = 'Finished';
      if (this.globalTimerInterval) clearInterval(this.globalTimerInterval);
    }
  }

  prevChapter() {
    if (this.currentChapterIndex > 0) {
      this.loadChapter(this.currentChapterIndex - 1);
    }
  }

  restart() {
    this.totalElapsedSeconds = 0;
    this.isPlaying = true;
    this.playPauseLabel.innerText = 'Pause';
    this.playPauseIcon.setAttribute('data-lucide', 'pause');
    this.playPauseIcon.className = 'w-4 h-4 text-emerald-400';
    this.liveIndicator.classList.remove('hidden');
    this.startGlobalTimer();
    this.loadChapter(0);
    this.initLucide();
  }

  startGlobalTimer() {
    if (this.globalTimerInterval) clearInterval(this.globalTimerInterval);
    this.globalTimerInterval = setInterval(() => {
      if (this.isPlaying) {
        this.totalElapsedSeconds++;
        const mins = Math.floor(this.totalElapsedSeconds / 60);
        const secs = this.totalElapsedSeconds % 60;
        this.timerDisplay.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
    }, 1000);
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.presentationApp = new PresentationApp();
});
