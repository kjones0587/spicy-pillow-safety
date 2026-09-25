/**
 * Spicy Pillow Safety Briefing v4.6 (Kinetic Typography & Scrubber Edition)
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
    caption: "Look over at your work laptop. Whether docked, closed, or running as a secondary screen, laptops docked 24/7 constantly float-charge batteries under continuous heat and electrical stress."
  },
  {
    id: 2,
    name: "Laptop Check",
    audioSrc: "audio/chapter2.mp3",
    caption: "Live 20-second hardware audit! Undock or slide laptop onto a flat desk area. Check 1: Push corners for wobble. Check 2: Click trackpad for stiff travel. Check 3: Inspect side seams near ports."
  },
  {
    id: 3,
    name: "The Science",
    audioSrc: "audio/chapter3.mp3",
    caption: "Why care? Punctures or heat trigger Thermal Runaway: a self-oxidizing reaction burning over 1,000°F. #1 Remote Culprit: Working on beds and blankets suffocates bottom intake vents 100%."
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

// Kinetic Typography Cues (Time-synchronized dynamic text highlights)
const kineticCues = {
  0: [
    { time: 0, text: "Look over at your work laptop sitting on your desk...", icon: "laptop", color: "emerald" },
    { time: 3.5, text: "Docked 24/7 on continuous float charge & electrical stress", icon: "zap", color: "amber" },
    { time: 7.8, text: "Internal electrolyte breakdown into volatile trapped gas", icon: "flame", color: "red" },
    { time: 11.2, text: "THE 'SPICY PILLOW' — Expanding under 58.4 PSI pressure!", icon: "alert-triangle", color: "red" }
  ],
  1: [
    { time: 0, text: "20-Second Hardware Audit: Slide laptop onto a clear flat area...", icon: "scan", color: "emerald" },
    { time: 3.8, text: "CHECK 1: Push opposite corners — Does the base rock or wobble?", icon: "help-circle", color: "amber" },
    { time: 8.5, text: "CHECK 2: Click trackpad — Is mechanical travel blocked or stiff?", icon: "mouse-pointer-click", color: "amber" },
    { time: 12.5, text: "CHECK 3: Inspect port seams — Are casing screws or plastic popping?", icon: "split", color: "red" }
  ],
  2: [
    { time: 0, text: "Inside: pressurized pouch filled with volatile organic solvents...", icon: "flask-conical", color: "amber" },
    { time: 4.5, text: "THERMAL RUNAWAY: Burning hotter than 1,000°F (Self-oxidizing)", icon: "flame", color: "red" },
    { time: 9.0, text: "#1 REMOTE TRAP: Working on beds & blankets suffocates vents 100%", icon: "bed", color: "red" }
  ],
  3: [
    { time: 0, text: "ACTIVE EMERGENCY: Hissing, sweet chemical odor, white smoke popping...", icon: "siren", color: "red" },
    { time: 4.5, text: "STEP 1: Move away from curtains & bedding → Granite or Tile (Use oven mitts)", icon: "shield-alert", color: "amber" },
    { time: 11.0, text: "STEP 2: Never inhale toxic HF smoke — Never throw cups of water!", icon: "wind", color: "red" },
    { time: 15.5, text: "STEP 3: Close room door to seal fire → Call 911 immediately", icon: "door-closed", color: "emerald" }
  ],
  4: [
    { time: 0, text: "Routine Swelling: Unplug, quarantine on tile/metal, open IT ticket", icon: "ticket", color: "amber" },
    { time: 5.0, text: "SAFETY AUDIT COMPLETE: Keep vents clear and have a great shift!", icon: "check-circle", color: "emerald" }
  ]
};

class BroadcastPresentation {
  constructor() {
    this.sound = new SoundFX();
    this.currentChapterIndex = 0;
    this.isPlaying = false;
    this.totalElapsedSeconds = 0;
    this.globalTimerInterval = null;
    this.countdownInterval = null;
    this.currentAudio = null;
    this.lastCueIndex = -1;

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
    this.segTrackCols = document.querySelectorAll('.seg-track-col');
    this.liveCaptionText = document.getElementById('live-caption-text');
    this.liveIndicator = document.getElementById('live-indicator');
    this.timerDisplay = document.getElementById('timer-display');
    this.playPauseBtn = document.getElementById('play-pause-btn');
    this.playPauseLabel = document.getElementById('play-pause-label');
    this.playPauseIcon = document.getElementById('play-pause-icon');
    this.fullscreenBtn = document.getElementById('fullscreen-btn');

    // Slide 2 Viewfinder Elements
    this.countdownNumber = document.getElementById('countdown-number');
    this.countdownCircle = document.getElementById('countdown-circle');
    this.testStepIndicator = document.getElementById('test-step-indicator');
    this.viewStep1 = document.getElementById('view-step-1');
    this.viewStep2 = document.getElementById('view-step-2');
    this.viewStep3 = document.getElementById('view-step-3');

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

    // PRECISION SCRUBBER: Click anywhere on ANY segment bar to scrub directly to that percentage!
    this.segTracks.forEach((bar, idx) => {
      bar.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, clickX / rect.width));

        if (!this.isPlaying) {
          this.startScreen.classList.add('hidden');
          this.startScreen.classList.remove('active');
          this.liveIndicator.classList.remove('hidden');
          this.liveIndicator.classList.add('inline-flex');
          this.isPlaying = true;
          this.startGlobalTimer();
        }

        if (this.currentChapterIndex === idx && this.currentAudio && this.currentAudio.duration) {
          this.currentAudio.currentTime = this.currentAudio.duration * ratio;
        } else {
          this.loadChapter(idx, ratio);
        }
      });
    });

    // Clicking the column label jumps to start of that chapter
    this.segTrackCols.forEach(col => {
      col.addEventListener('click', (e) => {
        // Only if didn't click the track itself
        if (!e.target.closest('.seg-track')) {
          const chapterIdx = parseInt(col.getAttribute('data-chapter'), 10);
          if (!isNaN(chapterIdx)) {
            if (!this.isPlaying) {
              this.startScreen.classList.add('hidden');
              this.startScreen.classList.remove('active');
              this.liveIndicator.classList.remove('hidden');
              this.liveIndicator.classList.add('inline-flex');
              this.isPlaying = true;
              this.startGlobalTimer();
            }
            this.loadChapter(chapterIdx, 0);
          }
        }
      });
    });

    // Keyboard Shortcuts: Space = Pause, F = Fullscreen, 1-5 = Direct Chapter Jumps
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlayPause();
      } else if (e.code === 'KeyF') {
        this.toggleFullscreen();
      } else if (e.key >= '1' && e.key <= '5') {
        const chapterIdx = parseInt(e.key, 10) - 1;
        this.loadChapter(chapterIdx, 0);
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
    this.loadChapter(0, 0);
  }

  loadChapter(index, seekRatio = 0) {
    if (index < 0 || index >= chapters.length) return;
    this.currentChapterIndex = index;
    this.lastCueIndex = -1;
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
        fill.style.width = `${Math.round(seekRatio * 100)}%`;
      } else {
        fill.style.width = '0%';
      }
    });

    // Caption update
    this.liveCaptionText.innerText = chapter.caption;
    this.sound.playChime();

    // Trigger visual transitions
    this.handleSlideAnimations(index);

    // Audio Playback with Precision Seeking
    const audio = new Audio(chapter.audioSrc);
    this.currentAudio = audio;

    const applySeek = () => {
      if (seekRatio > 0 && audio.duration) {
        audio.currentTime = audio.duration * seekRatio;
      }
    };

    if (audio.readyState >= 1) {
      applySeek();
    } else {
      audio.addEventListener('loadedmetadata', applySeek, { once: true });
    }

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const percent = Math.min(100, Math.round((audio.currentTime / audio.duration) * 100));
        const activeBar = this.segTracks[index];
        if (activeBar) {
          const fill = activeBar.querySelector('.seg-fill');
          if (fill) fill.style.width = `${percent}%`;
        }
        // Update Kinetic Typography for current time
        this.updateKineticTypography(index, audio.currentTime);
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

  updateKineticTypography(chapterIdx, currentTime) {
    const cues = kineticCues[chapterIdx];
    if (!cues) return;

    let activeCueIndex = 0;
    for (let i = 0; i < cues.length; i++) {
      if (currentTime >= cues[i].time) {
        activeCueIndex = i;
      }
    }

    if (activeCueIndex !== this.lastCueIndex) {
      this.lastCueIndex = activeCueIndex;
      const cue = cues[activeCueIndex];

      const calloutBox = document.getElementById(`kinetic-callout-${chapterIdx + 1}`);
      const textElem = document.getElementById(`kinetic-text-${chapterIdx + 1}`);
      const iconWrap = document.getElementById(`kinetic-icon-wrap-${chapterIdx + 1}`);

      if (calloutBox && textElem) {
        // Trigger subtle animation
        calloutBox.classList.remove('kinetic-callout-box', 'border-glow-emerald', 'border-glow-amber', 'border-glow-red');
        void calloutBox.offsetWidth; // Force reflow
        calloutBox.classList.add('kinetic-callout-box', `border-glow-${cue.color}`);

        textElem.innerText = cue.text;

        if (iconWrap) {
          iconWrap.className = `w-8 h-8 rounded-xl bg-${cue.color}-500/20 text-${cue.color}-400 flex items-center justify-center shrink-0`;
          iconWrap.innerHTML = `<i data-lucide="${cue.icon}" class="w-4 h-4"></i>`;
          this.initLucide();
        }
      }
    }
  }

  handleSlideAnimations(index) {
    // Chapter 1: Pressure Alert Tone
    if (index === 0) {
      setTimeout(() => {
        if (this.currentChapterIndex === 0) {
          this.sound.playWarning();
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
          if (this.tempBarFill) this.tempBarFill.style.width = '95%';
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
      this.countdownNumber.className = 'absolute text-xl font-black font-mono text-amber-400';
    }
    if (this.countdownCircle) {
      this.countdownCircle.style.strokeDashoffset = '0';
      this.countdownCircle.classList.remove('text-emerald-400');
      this.countdownCircle.classList.add('text-amber-400');
    }
    if (this.testStepIndicator) {
      this.testStepIndicator.innerText = 'Get Ready...';
      this.testStepIndicator.className = 'text-base font-black text-amber-300';
    }
    this.highlightStep(1);
  }

  runCountdown20s() {
    let timeLeft = 20;
    const totalCountdown = 20;
    const circumference = 2 * Math.PI * 24;

    if (this.testStepIndicator) this.testStepIndicator.innerText = '1. The Wobble Test';
    this.highlightStep(1);

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
        this.highlightStep(2);
        if (this.testStepIndicator) this.testStepIndicator.innerText = '2. Trackpad Mechanical Click';
      } else if (timeLeft <= 6 && timeLeft > 0) {
        this.highlightStep(3);
        if (this.testStepIndicator) this.testStepIndicator.innerText = '3. Chassis Seams & USB Ports';
      } else if (timeLeft <= 0) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
        if (this.testStepIndicator) {
          this.testStepIndicator.innerText = 'Hardware Audit Finished!';
          this.testStepIndicator.className = 'text-base font-black text-emerald-400';
        }
        if (this.countdownNumber) {
          this.countdownNumber.innerText = '✓';
          this.countdownNumber.className = 'absolute text-xl font-black font-mono text-emerald-400';
        }
        if (this.countdownCircle) {
          this.countdownCircle.classList.remove('text-amber-400');
          this.countdownCircle.classList.add('text-emerald-400');
        }
        this.sound.playSuccess();
      }
    }, 1000);
  }

  highlightStep(stepNum) {
    if (this.viewStep1) {
      this.viewStep1.className = stepNum === 1 
        ? 'p-3 rounded-xl bg-amber-950/70 border-2 border-amber-500 transition-all shadow-lg shadow-amber-500/10'
        : 'p-3 rounded-xl bg-slate-950/80 border border-slate-800 transition-all opacity-40';
    }
    if (this.viewStep2) {
      this.viewStep2.className = stepNum === 2 
        ? 'p-3 rounded-xl bg-amber-950/70 border-2 border-amber-500 transition-all shadow-lg shadow-amber-500/10'
        : 'p-3 rounded-xl bg-slate-950/80 border border-slate-800 transition-all opacity-40';
    }
    if (this.viewStep3) {
      this.viewStep3.className = stepNum === 3 
        ? 'p-3 rounded-xl bg-amber-950/70 border-2 border-amber-500 transition-all shadow-lg shadow-amber-500/10'
        : 'p-3 rounded-xl bg-slate-950/80 border border-slate-800 transition-all opacity-40';
    }
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
      this.loadChapter(this.currentChapterIndex + 1, 0);
    } else {
      this.isPlaying = false;
      this.liveIndicator.classList.add('hidden');
      this.playPauseLabel.innerText = 'Finished';
      if (this.globalTimerInterval) clearInterval(this.globalTimerInterval);
    }
  }

  prevChapter() {
    if (this.currentChapterIndex > 0) {
      this.loadChapter(this.currentChapterIndex - 1, 0);
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
    this.loadChapter(0, 0);
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
