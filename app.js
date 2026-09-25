/**
 * Spicy Pillow Safety Briefing v5.0 (ElevenLabs Adam Studio Edition)
 * Optimized for Microsoft Teams Screen Sharing
 * Narrator: ElevenLabs Adam (Turbo v2.5)
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
    gain.gain.setValueAtTime(0.035, now);
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
    caption: "Hey everyone! Today's quick safety briefing is about something we see all too often on the help desk: the 'Spicy Pillow'. Whether docked 24/7 or closed, continuous charging causes battery expansion."
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

// Exact sentence-synchronized kinetic typography cues for all 5 chapters (ElevenLabs Studio Edition)
const kineticCues = {
  0: [
    { time: 0, text: "Hey everyone! Today's safety briefing is about the 'Spicy Pillow' hazard...", icon: "shield-alert", color: "amber" },
    { time: 8.03, text: "Look over at your work laptop sitting on your desk...", icon: "laptop", color: "emerald" },
    { time: 20.05, text: "Docked 24/7 on continuous float charge & electrical stress", icon: "zap", color: "amber" },
    { time: 31.28, text: "Continuous charging degrades cell → Turns into a 'Spicy Pillow'", icon: "flame", color: "red" },
    { time: 40.47, text: "Decomposed electrolyte traps volatile flammable gas at 58.4 PSI!", icon: "alert-triangle", color: "red" }
  ],
  1: [
    { time: 0, text: "Live 20-Second Hardware Audit: Slide laptop onto a clear flat desk area...", icon: "scan", color: "emerald" },
    { time: 9.86, text: "CHECK 1: Push opposite corners — Does the chassis rock or wobble?", icon: "help-circle", color: "amber" },
    { time: 21.29, text: "CHECK 2: Click down on trackpad — Is mechanical click travel stiff or mushy?", icon: "mouse-pointer-click", color: "amber" },
    { time: 32.55, text: "CHECK 3: Inspect side USB ports — Are casing seams popping or screws bowing?", icon: "split", color: "red" },
    { time: 38.08, text: "AUDIT COMPLETE: All 3 physical inspection checks verified!", icon: "check-circle", color: "emerald" }
  ],
  2: [
    { time: 0, text: "Inside that pouch: pressurized volatile organic solvents...", icon: "flask-conical", color: "amber" },
    { time: 8.77, text: "THERMAL RUNAWAY: Self-oxidizing fire burning hotter than 1,000°F!", icon: "flame", color: "red" },
    { time: 16.50, text: "Releases toxic HF acid gas — Standard water will NOT extinguish!", icon: "skull", color: "red" },
    { time: 24.15, text: "#1 REMOTE WORKER TRAP: Beds, couches, & blankets suffocate cooling vents 100%", icon: "bed", color: "red" }
  ],
  3: [
    { time: 0, text: "ACTIVE EMERGENCY: Hissing, sweet chemical odor, or white smoke popping...", icon: "siren", color: "red" },
    { time: 5.13, text: "PRIORITY 1: Move away from curtains & bedding → Granite, tile, or metal sheet", icon: "shield-alert", color: "amber" },
    { time: 28.20, text: "Use oven mitts or tools if hot — Never touch a burning battery bare-handed!", icon: "shield-alert", color: "amber" },
    { time: 34.19, text: "PRIORITY 2: Toxic HF smoke! Never throw small cups of water (steam flare-ups)", icon: "wind", color: "red" },
    { time: 46.51, text: "PRIORITY 3: Close room door to contain fire, evacuate people & pets, call 911!", icon: "door-closed", color: "emerald" }
  ],
  4: [
    { time: 0, text: "Routine Swelling: Unplug charger, quarantine on tile/metal, submit IT ticket", icon: "ticket", color: "amber" },
    { time: 12.71, text: "HARDWARE AUDIT COMPLETE: You know how to identify and isolate battery hazards", icon: "check-circle", color: "emerald" },
    { time: 18.18, text: "Keep cooling vents clear, and have a safe, productive shift!", icon: "check-circle-2", color: "emerald" }
  ]
};

class BroadcastPresentation {
  constructor() {
    this.sound = new SoundFX();
    this.currentChapterIndex = 0;
    this.isPlaying = false;
    this.totalElapsedSeconds = 0;
    this.globalTimerInterval = null;
    this.lastCueIndex = -1;
    this.lastAuditStep = -1;
    this.lastTickSecond = -1;

    // Single Persistent Audio Element for unbroken cross-slide playback
    this.audio = new Audio();
    this.audio.preload = 'auto';

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

    // Slide 2 Audit Elements
    this.countdownNumber = document.getElementById('countdown-number');
    this.countdownCircle = document.getElementById('countdown-circle');
    this.testStepIndicator = document.getElementById('test-step-indicator');
    this.viewStep1 = document.getElementById('view-step-1');
    this.viewStep2 = document.getElementById('view-step-2');
    this.viewStep3 = document.getElementById('view-step-3');
    this.stepBadge1 = document.getElementById('step-badge-1');
    this.stepBadge2 = document.getElementById('step-badge-2');
    this.stepBadge3 = document.getElementById('step-badge-3');

    // Slide 3 Elements
    this.tempBarFill = document.getElementById('temp-bar-fill');
    this.tempGaugeVal = document.getElementById('temp-gauge-val');

    this.setupAudioListeners();
    this.bindEvents();
    this.initLucide();
  }

  initLucide() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  setupAudioListeners() {
    // AUDIO TIMEUPDATE: Synchronizes timeline bar, kinetic typography, audit steps & heat gauges
    this.audio.addEventListener('timeupdate', () => {
      if (!this.audio.duration) return;
      const index = this.currentChapterIndex;
      const percent = Math.min(100, Math.round((this.audio.currentTime / this.audio.duration) * 100));
      const activeBar = this.segTracks[index];
      if (activeBar) {
        const fill = activeBar.querySelector('.seg-fill');
        if (fill) fill.style.width = `${percent}%`;
      }

      // Kinetic typography synced to exact sentence milestones
      this.updateKineticTypography(index, this.audio.currentTime);

      // Slide 2: Direct voice-synced audit controller
      if (index === 1) {
        this.syncSlide2Audit(this.audio.currentTime);
      }

      // Slide 3: Thermal runaway temperature spike
      if (index === 2) {
        this.syncSlide3Heat(this.audio.currentTime);
      }
    });

    this.audio.addEventListener('ended', () => {
      setTimeout(() => {
        if (this.isPlaying) {
          this.nextChapter();
        }
      }, 700);
    });

    this.audio.addEventListener('error', (e) => {
      console.warn("Audio playback error:", e);
      // Graceful fallback: If audio fails to load or decode, advance after 10s
      if (this.isPlaying) {
        setTimeout(() => {
          if (this.isPlaying) this.nextChapter();
        }, 10000);
      }
    });
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

    // PRECISION SCRUBBER: Click anywhere on ANY segment bar to scrub directly to that percentage
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

        if (this.currentChapterIndex === idx && this.audio && this.audio.duration) {
          this.audio.currentTime = this.audio.duration * ratio;
        } else {
          this.loadChapter(idx, ratio);
        }
      });
    });

    // Clicking the column label jumps to start of that chapter
    this.segTrackCols.forEach(col => {
      col.addEventListener('click', (e) => {
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

    // Keyboard Shortcuts: Space = Pause/Resume, F = Fullscreen, 1-5 = Chapter Jumps
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
    this.lastAuditStep = -1;
    this.lastTickSecond = -1;
    const chapter = chapters[index];

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

    // Segment progress bar updates
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
    if (this.liveCaptionText) {
      this.liveCaptionText.innerText = chapter.caption;
    }
    this.sound.playChime();

    // Trigger visual transitions safely with try-catch so playback never blocks
    try {
      this.handleSlideEntry(index);
    } catch (err) {
      console.warn("handleSlideEntry warning:", err);
    }

    // Audio Playback with Persistent Audio Element
    try {
      this.audio.pause();
      this.audio.src = chapter.audioSrc;
      this.audio.currentTime = 0;
      this.audio.load();

      const applySeek = () => {
        if (seekRatio > 0 && this.audio.duration) {
          this.audio.currentTime = this.audio.duration * seekRatio;
        }
      };

      if (this.audio.readyState >= 1) {
        applySeek();
      } else {
        this.audio.addEventListener('loadedmetadata', applySeek, { once: true });
      }

      if (this.isPlaying) {
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.warn("Autoplay note:", err);
          });
        }
      }
    } catch (err) {
      console.error("Audio initialization error:", err);
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
        calloutBox.classList.remove('kinetic-callout-box', 'border-glow-emerald', 'border-glow-amber', 'border-glow-red');
        void calloutBox.offsetWidth; // Force reflow
        calloutBox.classList.add('kinetic-callout-box', `border-glow-${cue.color}`);

        textElem.innerText = cue.text;

        if (iconWrap) {
          iconWrap.className = `w-9 h-9 rounded-xl bg-${cue.color}-500/20 text-${cue.color}-400 flex items-center justify-center shrink-0`;
          iconWrap.innerHTML = `<i data-lucide="${cue.icon}" class="w-5 h-5"></i>`;
          this.initLucide();
        }
      }
    }
  }

  /**
   * EXACT SLIDE 2 VOICE SYNCHRONIZATION (ElevenLabs Adam Edition)
   * Timings derived directly from ElevenLabs with-timestamps character alignment:
   * [ 0.00s -  9.35s] Let's do a live 20-second hardware audit... Undock/slide...
   * [ 9.86s - 21.29s] First: push down on opposite corners. Wobble test.
   * [21.29s - 32.55s] Second: click down on your trackpad. Stiff/mushy travel.
   * [32.55s - 38.08s] And third: glance along your side USB ports. Popping seams.
   * [38.08s - 39.57s] Wrap up your check now.
   */
  syncSlide2Audit(currentTime) {
    try {
      const totalCountdown = 20;
      const circumference = 2 * Math.PI * 24; // ~150.8

      // Tick sound every integer second during active audit
      const currentIntSec = Math.floor(currentTime);
      if (currentTime >= 9.86 && currentTime < 38.08 && currentIntSec !== this.lastTickSecond) {
        this.lastTickSecond = currentIntSec;
        if (this.isPlaying) {
          this.sound.playTick();
        }
      }

      if (currentTime < 9.86) {
        // PREPARE STAGE
        if (this.countdownNumber) {
          this.countdownNumber.innerText = '20';
          this.countdownNumber.className = 'absolute text-2xl font-black font-mono text-amber-400';
        }
        this.setCountdownCircle(0, 'text-amber-400 transition-all duration-300');
        if (this.testStepIndicator) {
          this.testStepIndicator.innerText = 'Prepare: Place Laptop Flat on Desk';
          this.testStepIndicator.className = 'text-sm sm:text-base font-extrabold text-amber-300 truncate';
        }
        this.setStepStatus(1, 'ready');
        this.setStepStatus(2, 'standby');
        this.setStepStatus(3, 'standby');
        this.lastAuditStep = 0;
      }
      else if (currentTime >= 9.86 && currentTime < 21.29) {
        // STEP 1 ACTIVE: WOBBLE TEST
        if (this.lastAuditStep !== 1) {
          this.lastAuditStep = 1;
          this.sound.playChime();
        }
        const remaining = Math.max(0, Math.ceil(20 * (1 - (currentTime - 9.86) / (38.08 - 9.86))));
        if (this.countdownNumber) {
          this.countdownNumber.innerText = remaining;
          this.countdownNumber.className = 'absolute text-2xl font-black font-mono text-amber-400';
        }
        const offset = circumference - (remaining / totalCountdown) * circumference;
        this.setCountdownCircle(offset, 'text-amber-400 transition-all duration-150');
        if (this.testStepIndicator) {
          this.testStepIndicator.innerText = 'Step 1 of 3: Opposite Corner Wobble Check';
          this.testStepIndicator.className = 'text-sm sm:text-base font-extrabold text-amber-300 truncate';
        }
        this.setStepStatus(1, 'active');
        this.setStepStatus(2, 'standby');
        this.setStepStatus(3, 'standby');
      }
      else if (currentTime >= 21.29 && currentTime < 32.55) {
        // STEP 2 ACTIVE: TRACKPAD CLICK
        if (this.lastAuditStep !== 2) {
          this.lastAuditStep = 2;
          this.sound.playChime();
        }
        const remaining = Math.max(0, Math.ceil(20 * (1 - (currentTime - 9.86) / (38.08 - 9.86))));
        if (this.countdownNumber) {
          this.countdownNumber.innerText = remaining;
          this.countdownNumber.className = 'absolute text-2xl font-black font-mono text-amber-400';
        }
        const offset = circumference - (remaining / totalCountdown) * circumference;
        this.setCountdownCircle(offset, 'text-amber-400 transition-all duration-150');
        if (this.testStepIndicator) {
          this.testStepIndicator.innerText = 'Step 2 of 3: Trackpad Mechanical Travel';
          this.testStepIndicator.className = 'text-sm sm:text-base font-extrabold text-amber-300 truncate';
        }
        this.setStepStatus(1, 'passed');
        this.setStepStatus(2, 'active');
        this.setStepStatus(3, 'standby');
      }
      else if (currentTime >= 32.55 && currentTime < 38.08) {
        // STEP 3 ACTIVE: SEAMS & PORTS
        if (this.lastAuditStep !== 3) {
          this.lastAuditStep = 3;
          this.sound.playChime();
        }
        const remaining = Math.max(0, Math.ceil(20 * (1 - (currentTime - 9.86) / (38.08 - 9.86))));
        if (this.countdownNumber) {
          this.countdownNumber.innerText = remaining;
          this.countdownNumber.className = 'absolute text-2xl font-black font-mono text-amber-400';
        }
        const offset = circumference - (remaining / totalCountdown) * circumference;
        this.setCountdownCircle(offset, 'text-amber-400 transition-all duration-150');
        if (this.testStepIndicator) {
          this.testStepIndicator.innerText = 'Step 3 of 3: Chassis Seams & USB Ports';
          this.testStepIndicator.className = 'text-sm sm:text-base font-extrabold text-amber-300 truncate';
        }
        this.setStepStatus(1, 'passed');
        this.setStepStatus(2, 'passed');
        this.setStepStatus(3, 'active');
      }
      else {
        // AUDIT COMPLETE (currentTime >= 38.08)
        if (this.lastAuditStep !== 4) {
          this.lastAuditStep = 4;
          this.sound.playSuccess();
        }
        if (this.countdownNumber) {
          this.countdownNumber.innerText = '✓';
          this.countdownNumber.className = 'absolute text-2xl font-black font-mono text-emerald-400';
        }
        this.setCountdownCircle(0, 'text-emerald-400 transition-all duration-300');
        if (this.testStepIndicator) {
          this.testStepIndicator.innerText = 'Hardware Audit Finished: All 3 Checks Verified!';
          this.testStepIndicator.className = 'text-sm sm:text-base font-extrabold text-emerald-400 truncate';
        }
        this.setStepStatus(1, 'passed');
        this.setStepStatus(2, 'passed');
        this.setStepStatus(3, 'passed');
      }
    } catch (err) {
      console.warn("syncSlide2Audit warning:", err);
    }
  }

  // Safe SVG Circle attribute manipulation (prevents SVGAnimatedString read-only TypeError)
  setCountdownCircle(dashOffset, colorClass) {
    if (!this.countdownCircle) return;
    this.countdownCircle.style.strokeDashoffset = dashOffset;
    this.countdownCircle.setAttribute('class', colorClass);
  }

  setStepStatus(stepNum, status) {
    try {
      const elem = this[`viewStep${stepNum}`] || document.getElementById(`view-step-${stepNum}`);
      const badge = this[`stepBadge${stepNum}`] || document.getElementById(`step-badge-${stepNum}`);
      if (!elem) return;

      if (status === 'active') {
        elem.className = 'p-4 rounded-2xl bg-amber-950/80 border-2 border-amber-500 shadow-xl shadow-amber-500/20 transition-all duration-200 transform scale-[1.01]';
        if (badge) {
          badge.innerText = 'TESTING NOW';
          badge.className = 'text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase bg-amber-500 text-black shadow animate-pulse';
        }
      } else if (status === 'ready') {
        elem.className = 'p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 transition-all duration-200';
        if (badge) {
          badge.innerText = 'READY';
          badge.className = 'text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase bg-amber-950 text-amber-300 border border-amber-800';
        }
      } else if (status === 'passed') {
        elem.className = 'p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/60 shadow-md shadow-emerald-500/10 transition-all duration-200';
        if (badge) {
          badge.innerText = '✓ CHECKED';
          badge.className = 'text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-700';
        }
      } else { // standby
        elem.className = 'p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 opacity-40 transition-all duration-200';
        if (badge) {
          badge.innerText = 'STANDBY';
          badge.className = 'text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase bg-slate-900 text-slate-400 border border-slate-800';
        }
      }
    } catch (err) {
      console.warn("setStepStatus warning:", err);
    }
  }

  syncSlide3Heat(currentTime) {
    try {
      if (currentTime >= 8.77) {
        if (this.tempBarFill) this.tempBarFill.style.width = '96%';
        if (this.tempGaugeVal) {
          this.tempGaugeVal.innerText = '1,000°F+ THERMAL RUNAWAY';
          this.tempGaugeVal.className = 'text-red-400 font-extrabold animate-pulse';
        }
      } else {
        if (this.tempBarFill) this.tempBarFill.style.width = '35%';
        if (this.tempGaugeVal) {
          this.tempGaugeVal.innerText = '135°F NORMAL DOCKED';
          this.tempGaugeVal.className = 'text-amber-400 font-bold';
        }
      }
    } catch (err) {
      console.warn("syncSlide3Heat warning:", err);
    }
  }

  handleSlideEntry(index) {
    if (index === 0) {
      setTimeout(() => {
        if (this.currentChapterIndex === 0) this.sound.playWarning();
      }, 10000);
    } else if (index === 1) {
      this.syncSlide2Audit(0);
    } else if (index === 2) {
      this.syncSlide3Heat(0);
    } else if (index === 3) {
      this.sound.playWarning();
    } else if (index === 4) {
      this.sound.playSuccess();
    }
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.playPauseLabel.innerText = 'Pause';
      this.playPauseIcon.setAttribute('data-lucide', 'pause');
      this.playPauseIcon.className = 'w-4 h-4 text-emerald-400';
      this.liveIndicator.classList.remove('hidden');
      if (this.audio) {
        this.audio.play().catch(err => console.warn(err));
      }
    } else {
      this.playPauseLabel.innerText = 'Resume';
      this.playPauseIcon.setAttribute('data-lucide', 'play');
      this.playPauseIcon.className = 'w-4 h-4 text-amber-400';
      this.liveIndicator.classList.add('hidden');
      if (this.audio) {
        this.audio.pause();
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
