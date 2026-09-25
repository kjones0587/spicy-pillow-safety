/**
 * Spicy Pillow Safety Briefing v4.1 (Emergency Protocol Edition)
 * Optimized for Microsoft Teams Screen Sharing
 * Narrator: en-US-AndrewMultilingualNeural
 */

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
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.setValueAtTime(420, now + 0.12);
    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
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

// Chapter Definitions with Andrew Multilingual Neural Voice MP3s
const chapters = [
  {
    id: 1,
    name: "The Hook",
    audioSrc: "audio/chapter1.mp3",
    caption: "Take a second and look down at your hands. Docked for days on continuous float charge, internal decomposition turns flat cells into a pressurized 'Spicy Pillow'."
  },
  {
    id: 2,
    name: "Laptop Check",
    audioSrc: "audio/chapter2.mp3",
    caption: "Live 20-second hardware audit! Check 1: Push corners for wobble. Check 2: Click trackpad for stiff/shallow travel. Check 3: Inspect side USB port seams for gaps."
  },
  {
    id: 3,
    name: "The Science",
    audioSrc: "audio/chapter3.mp3",
    caption: "Why care? Punctures or heat trigger Thermal Runaway: a self-oxidizing reaction burning over 1,000°F. #1 Remote Culprit: Working on beds and blankets."
  },
  {
    id: 4,
    name: "Emergency Action",
    audioSrc: "audio/chapter4.mp3",
    caption: "EMERGENCY PROTOCOL: 1. Move away from curtains/bedding onto granite, tile, or metal sheet (use oven mitts). 2. Do not inhale white smoke (HF gas); no cups of water. 3. Close door to contain fire and call 911!"
  },
  {
    id: 5,
    name: "Summary",
    audioSrc: "audio/chapter5.mp3",
    caption: "Swelling SOP: If only swollen (not smoking), unplug, quarantine on tile/metal tray, and open IT swap ticket. Hardware safety briefing complete!"
  }
];

class BroadcastPresentation {
  constructor() {
    this.sound = new SoundFX();
    this.currentChapterIndex = 0;
    this.isPlaying = false;
    this.totalElapsedSeconds = 0;
    this.globalTimerInterval = null;
    this.countdownInterval = null;
    this.currentAudio = null;

    // DOM References
    this.startScreen = document.getElementById('start-screen');
    this.slides = [
      document.getElementById('slide-1'),
      document.getElementById('slide-2'),
      document.getElementById('slide-3'),
      document.getElementById('slide-4'),
      document.getElementById('slide-5')
    ];
    this.segTracks = document.querySelectorAll('.seg-track');
    this.liveCaptionText = document.getElementById('live-caption-text');
    this.liveIndicator = document.getElementById('live-indicator');
    this.timerDisplay = document.getElementById('timer-display');
    this.playPauseBtn = document.getElementById('play-pause-btn');
    this.playPauseLabel = document.getElementById('play-pause-label');
    this.playPauseIcon = document.getElementById('play-pause-icon');
    this.fullscreenBtn = document.getElementById('fullscreen-btn');

    // Slide 1 Elements
    this.ch1BatteryVisual = document.getElementById('ch1-battery-visual');
    this.ch1TelemetryBadge = document.getElementById('ch1-telemetry-badge');
    this.ch1BatteryTitle = document.getElementById('ch1-battery-title');
    this.ch1BatterySub = document.getElementById('ch1-battery-sub');
    this.ch1HudMsg = document.getElementById('ch1-hud-msg');

    // Slide 2 Viewfinder Elements
    this.countdownNumber = document.getElementById('countdown-number');
    this.countdownCircle = document.getElementById('countdown-circle');
    this.testStepIndicator = document.getElementById('test-step-indicator');
    this.wobbleChassisBox = document.getElementById('wobble-chassis-box');
    this.viewfinder1 = document.getElementById('viewfinder-1');
    this.viewfinder2 = document.getElementById('viewfinder-2');
    this.viewfinder3 = document.getElementById('viewfinder-3');

    // Slide 3 Elements
    this.tempBarFill = document.getElementById('temp-bar-fill');
    this.tempGaugeVal = document.getElementById('temp-gauge-val');

    this.bindEvents();
    this.initLucide();
  }

  initLucide() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  bindEvents() {
    document.getElementById('start-btn').addEventListener('click', () => this.startBroadcast());
    this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
    document.getElementById('prev-slide-btn').addEventListener('click', () => this.prevChapter());
    document.getElementById('next-slide-btn').addEventListener('click', () => this.nextChapter());
    
    if (this.fullscreenBtn) {
      this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    const replayBtn = document.getElementById('replay-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => this.restart());
    }

    // Keyboard Shortcuts for Presenter (Space = Pause/Play, F = Fullscreen)
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlayPause();
      } else if (e.code === 'KeyF') {
        this.toggleFullscreen();
      }
    });
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.warn(err));
    } else {
      document.exitFullscreen().catch(err => console.warn(err));
    }
  }

  startBroadcast() {
    this.sound.init();
    this.sound.playChime();
    this.isPlaying = true;

    this.startScreen.classList.add('hidden');
    this.startScreen.classList.remove('active');
    this.liveIndicator.classList.remove('hidden');
    this.liveIndicator.classList.add('inline-flex');

    this.startGlobalTimer();
    this.loadChapter(0);
  }

  loadChapter(index) {
    if (index < 0 || index >= chapters.length) return;
    this.currentChapterIndex = index;
    const chapter = chapters[index];

    // Stop existing audio and timers
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }

    // Slide visibility
    this.slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.remove('hidden');
        slide.classList.add('active');
      } else {
        slide.classList.add('hidden');
        slide.classList.remove('active');
      }
    });

    // Segment progress updates
    this.segTracks.forEach((bar, idx) => {
      bar.classList.remove('active', 'completed');
      const fill = bar.querySelector('.seg-fill');
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

    // Caption update
    this.liveCaptionText.innerText = chapter.caption;
    this.sound.playChime();

    // Trigger visual transitions
    this.handleSlideAnimations(index);

    // Audio Playback
    const audio = new Audio(chapter.audioSrc);
    this.currentAudio = audio;

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const percent = Math.min(100, Math.round((audio.currentTime / audio.duration) * 100));
        const activeBar = this.segTracks[index];
        if (activeBar) {
          const fill = activeBar.querySelector('.seg-fill');
          if (fill) fill.style.width = `${percent}%`;
        }
      }
    });

    audio.addEventListener('ended', () => {
      setTimeout(() => {
        if (this.isPlaying) {
          this.nextChapter();
        }
      }, 700);
    });

    if (this.isPlaying) {
      audio.play().catch(err => console.warn("Autoplay:", err));
    }

    this.initLucide();
  }

  handleSlideAnimations(index) {
    if (this.wobbleChassisBox) this.wobbleChassisBox.classList.remove('animate-rocking-chassis');

    // Chapter 1: Battery swelling at 9.5s mark
    if (index === 0) {
      setTimeout(() => {
        if (this.currentChapterIndex === 0 && this.ch1BatteryVisual) {
          this.ch1BatteryVisual.classList.add('animate-battery-inflate');
          this.ch1BatteryVisual.classList.remove('border-emerald-500/50');
          this.ch1BatteryVisual.classList.add('border-red-500/90');

          if (this.ch1TelemetryBadge) {
            this.ch1TelemetryBadge.innerText = "OVERPRESSURE: 54 PSI (CRITICAL)";
            this.ch1TelemetryBadge.className = "text-red-400 font-bold px-2.5 py-0.5 rounded bg-red-950/80 border border-red-800 animate-pulse";
          }
          if (this.ch1BatteryTitle) {
            this.ch1BatteryTitle.innerHTML = `<i data-lucide="alert-octagon" class="w-4 h-4 text-red-400"></i> Swollen "Spicy Pillow"`;
            this.ch1BatteryTitle.className = "text-sm font-black text-red-300 flex items-center gap-2 relative z-10";
          }
          if (this.ch1BatterySub) {
            this.ch1BatterySub.innerText = "Internal Decomposition Gas Trapped";
            this.ch1BatterySub.className = "text-xs font-mono text-red-400/90 mt-1 relative z-10";
          }
          if (this.ch1HudMsg) {
            this.ch1HudMsg.innerText = "⚠️ High mechanical pressure pushing against trackpad & casing seams!";
            this.ch1HudMsg.className = "text-sm font-bold text-red-300 mt-2 bg-red-950/80 border border-red-800 p-3 rounded-xl";
          }
          this.sound.playWarning();
          this.initLucide();
        }
      }, 9500);
    }

    // Chapter 2: Hardware Audit Viewfinder Timeline
    if (index === 1) {
      this.resetCountdownUI();
      setTimeout(() => {
        if (this.currentChapterIndex === 1 && this.isPlaying) {
          this.runCountdown20s();
        }
      }, 4200);
    }

    // Chapter 3: Heat Gauge Spikes at 7.5s mark
    if (index === 2) {
      setTimeout(() => {
        if (this.currentChapterIndex === 2) {
          if (this.tempBarFill) this.tempBarFill.style.width = '94%';
          if (this.tempGaugeVal) {
            this.tempGaugeVal.innerText = '1,000°F+ THERMAL RUNAWAY';
            this.tempGaugeVal.className = 'text-red-400 font-extrabold animate-pulse';
          }
          this.sound.playWarning();
        }
      }, 7500);
    }

    // Chapter 4: Emergency Alarm Tone on active thermal runaway slide
    if (index === 3) {
      this.sound.playWarning();
    }

    // Chapter 5: Completion
    if (index === 4) {
      this.sound.playSuccess();
    }
  }

  resetCountdownUI() {
    if (this.countdownNumber) {
      this.countdownNumber.innerText = '20';
      this.countdownNumber.className = 'absolute text-2xl font-black font-mono text-amber-400';
    }
    if (this.countdownCircle) {
      this.countdownCircle.style.strokeDashoffset = '0';
      this.countdownCircle.classList.remove('text-emerald-400');
      this.countdownCircle.classList.add('text-amber-400');
    }
    if (this.testStepIndicator) {
      this.testStepIndicator.innerText = 'Get Ready...';
      this.testStepIndicator.className = 'text-lg font-black text-amber-300';
    }
    this.setViewfinder(1);
  }

  runCountdown20s() {
    let timeLeft = 20;
    const totalCountdown = 20;
    const circumference = 2 * Math.PI * 28;

    if (this.testStepIndicator) this.testStepIndicator.innerText = '1. The Wobble Test';
    if (this.wobbleChassisBox) this.wobbleChassisBox.classList.add('animate-rocking-chassis');
    this.setViewfinder(1);

    this.countdownInterval = setInterval(() => {
      if (!this.isPlaying) return;

      timeLeft--;
      if (this.countdownNumber) this.countdownNumber.innerText = Math.max(0, timeLeft);

      this.sound.playTick();

      const offset = circumference - (timeLeft / totalCountdown) * circumference;
      if (this.countdownCircle) {
        this.countdownCircle.style.strokeDashoffset = offset;
      }

      if (timeLeft <= 13 && timeLeft > 6) {
        this.setViewfinder(2);
        if (this.testStepIndicator) this.testStepIndicator.innerText = '2. Trackpad Mechanical Click';
        if (this.wobbleChassisBox) this.wobbleChassisBox.classList.remove('animate-rocking-chassis');
      } else if (timeLeft <= 6 && timeLeft > 0) {
        this.setViewfinder(3);
        if (this.testStepIndicator) this.testStepIndicator.innerText = '3. Chassis Seams & USB Ports';
      } else if (timeLeft <= 0) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
        if (this.testStepIndicator) {
          this.testStepIndicator.innerText = 'Hardware Audit Finished!';
          this.testStepIndicator.className = 'text-lg font-black text-emerald-400';
        }
        if (this.countdownNumber) {
          this.countdownNumber.innerText = '✓';
          this.countdownNumber.className = 'absolute text-2xl font-black font-mono text-emerald-400';
        }
        if (this.countdownCircle) {
          this.countdownCircle.classList.remove('text-amber-400');
          this.countdownCircle.classList.add('text-emerald-400');
        }
        this.sound.playSuccess();
      }
    }, 1000);
  }

  setViewfinder(step) {
    if (this.viewfinder1) this.viewfinder1.className = step === 1 ? 'viewfinder-card active flex-col items-center space-y-4' : 'viewfinder-card inactive';
    if (this.viewfinder2) this.viewfinder2.className = step === 2 ? 'viewfinder-card active flex-col items-center space-y-4' : 'viewfinder-card inactive';
    if (this.viewfinder3) this.viewfinder3.className = step === 3 ? 'viewfinder-card active flex-col items-center space-y-4' : 'viewfinder-card inactive';
    this.initLucide();
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

document.addEventListener('DOMContentLoaded', () => {
  window.broadcastPresentation = new BroadcastPresentation();
});
