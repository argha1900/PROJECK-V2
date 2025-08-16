(() => {
  const $ = (sel) => document.querySelector(sel);
  const outputEl = $('#terminal-output');
  const inputEl = $('#terminal-input');
  const progressEl = $('#progress');
  const progressBarEl = $('#progress-bar');
  const progressLabelEl = $('#progress-label');
  const btnScan = $('#btn-scan');
  const btnDecrypt = $('#btn-decrypt');
  const btnClear = $('#btn-clear');

  const statCpu = $('#stat-cpu');
  const statPkts = $('#stat-pkts');
  const statEntropy = $('#stat-entropy');
  const statNodes = $('#stat-nodes');
  const statusLed = $('#status-led');

  let busy = false;

  function nowTs() {
    const d = new Date();
    return d.toLocaleTimeString('id-ID', { hour12: false });
  }

  function scrollOutputToBottom() {
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function printLine(text, cls = '') {
    const line = document.createElement('div');
    line.className = `line ${cls}`.trim();
    const ts = document.createElement('span');
    ts.className = 'ts';
    ts.textContent = `[${nowTs()}]`;
    const content = document.createElement('span');
    content.textContent = ` ${text}`;
    line.appendChild(ts);
    line.appendChild(content);
    outputEl.appendChild(line);
    const max = 600;
    while (outputEl.children.length > max) outputEl.removeChild(outputEl.firstChild);
    scrollOutputToBottom();
  }

  function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function randomHex(len) {
    const chars = '0123456789abcdef';
    let s = '';
    for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  }

  // Simple type-out effect
  function typeOut(text, speed = 6, cls = '') {
    return new Promise((resolve) => {
      const buffer = document.createElement('div');
      buffer.className = `line ${cls}`.trim();
      const ts = document.createElement('span');
      ts.className = 'ts';
      ts.textContent = `[${nowTs()}]`;
      const content = document.createElement('span');
      buffer.appendChild(ts);
      buffer.appendChild(content);
      outputEl.appendChild(buffer);
      let i = 0;
      const iv = setInterval(() => {
        content.textContent = ' ' + text.slice(0, ++i);
        scrollOutputToBottom();
        if (i >= text.length) { clearInterval(iv); resolve(); }
      }, speed);
    });
  }

  // Audio beep (unobtrusive)
  let audioCtx;
  function initAudio() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
  }
  function beep(freq = 880, dur = 0.03, vol = 0.02) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.value = freq;
    gain.gain.value = vol;
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    setTimeout(() => { osc.stop(); }, dur * 1000);
  }

  // Commands
  const commands = {
    help() {
      printLine('Available: help, scan, decrypt, clear, whoami, trace, banner');
    },
    clear() {
      outputEl.innerHTML = '';
    },
    whoami() {
      const users = ['guest', 'root', 'operator', 'ghost'];
      const host = ['node-α', 'node-β', 'matrix', 'blackice'];
      printLine(`${randomItem(users)}@${randomItem(host)} (${randomInt(1000, 9999)})`, 'ok');
    },
    trace() {
      const ip = `${randomInt(10, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 254)}`;
      const cities = ['Tokyo', 'Reykjavík', 'Berlin', 'Jakarta', 'Seoul', 'Singapore', 'Helsinki'];
      printLine(`tracing route to ${ip} via ${randomItem(cities)} ...`);
      for (let i = 1; i <= randomInt(5, 10); i++) {
        setTimeout(() => {
          printLine(`${i}  ${randomInt(1, 99)}ms  ${randomInt(1, 99)}ms  ${randomInt(1, 99)}ms  ${ip}`);
          beep(220 + i * 20, 0.02, 0.01);
        }, i * 140);
      }
    },
    async banner() {
      const art = [
        '██╗  ██╗ █████╗  ██████╗██╗  ██╗//',
        '██║  ██║██╔══██╗██╔════╝██║ ██╔╝//',
        '███████║███████║██║     █████╔╝ //',
        '██╔══██║██╔══██║██║     ██╔═██╗ //',
        '██║  ██║██║  ██║╚██████╗██║  ██╗//',
        '╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝//'
      ];
      for (const line of art) { await typeOut(line, 2, 'ok'); }
    },
    async scan() { await runScan(); },
    async decrypt() { await runDecrypt(); },
  };

  function parse(cmd) {
    const c = (cmd || '').trim().toLowerCase();
    if (!c) return;
    if (commands[c]) return commands[c]();
    printLine(`unknown command: ${cmd}`, 'err');
  }

  // Scan simulation
  async function runScan() {
    if (busy) { printLine('system busy. wait...', 'warn'); return; }
    busy = true;
    toggleProgress(true, 'SCANNING');
    printLine('Initializing network scan...', 'warn');
    await sleep(250);
    const base = `192.168.${randomInt(0, 254)}.${randomInt(0, 10)}`;
    printLine(`Target subnet: ${base}/24`);

    const ports = [22, 53, 80, 88, 110, 123, 139, 143, 389, 443, 445, 587, 6379, 8080, 9000];
    const services = {
      22: 'ssh', 53: 'dns', 80: 'http', 88: 'kerberos', 110: 'pop3', 123: 'ntp', 139: 'netbios', 143: 'imap', 389: 'ldap', 443: 'https', 445: 'smb', 587: 'smtp', 6379: 'redis', 8080: 'http-proxy', 9000: 'svc'
    };

    let progress = 0;
    const progIv = setInterval(() => {
      progress = Math.min(100, progress + randomInt(1, 4));
      setProgress(progress, `SCANNING ${progress}%`);
      if (Math.random() < 0.2) statusBlink();
      if (progress >= 100) {
        clearInterval(progIv);
        finish();
      }
    }, 80);

    const hostIv = setInterval(() => {
      const host = `192.168.${randomInt(0, 254)}.${randomInt(1, 254)}`;
      const p = randomItem(ports);
      printLine(`${host} open port ${p}/${services[p]} (ttl=${randomInt(40, 128)})`, 'ok');
      beep(280 + Math.random() * 80, 0.02, 0.012);
    }, 140);

    function finish() {
      clearInterval(hostIv);
      setTimeout(() => {
        printLine('Scan complete. Hosts up: ' + randomInt(3, 17) + ' | open ports: ' + randomInt(10, 80), 'ok');
        toggleProgress(false);
        busy = false;
      }, 350);
    }
  }

  // Decrypt simulation
  async function runDecrypt() {
    if (busy) { printLine('system busy. wait...', 'warn'); return; }
    busy = true;
    toggleProgress(true, 'DECRYPT');
    printLine('Preparing keyspace reduction (AES-256)...', 'warn');
    await sleep(250);

    let progress = 0;
    const steps = [
      'Collecting entropy...',
      'S-box analysis...',
      'Key schedule probing...',
      'Differential cryptanalysis...',
      'GPU kernels compiling...',
      'Bruteforce underway...'
    ];
    for (const step of steps) {
      await typeOut(step, 8);
      await sleep(200);
    }

    const iv = setInterval(() => {
      progress = Math.min(100, progress + randomInt(1, 3));
      setProgress(progress, `DECRYPT ${progress}%`);
      if (Math.random() < 0.25) beep(520 + Math.random() * 120, 0.01, 0.01);
      if (progress >= 100) {
        clearInterval(iv);
        setTimeout(() => {
          printLine('Decryption complete. Session unlocked.', 'ok');
          printLine('Key: 0x' + randomHex(64));
          toggleProgress(false);
          busy = false;
        }, 400);
      }
    }, 90);
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  function toggleProgress(show, label = 'WORKING') {
    progressEl.classList.toggle('hidden', !show);
    progressEl.setAttribute('aria-hidden', String(!show));
    setProgress(0, label + ' 0%');
  }
  function setProgress(pct, label) {
    progressBarEl.style.width = `${pct}%`;
    progressLabelEl.textContent = label || `${pct}%`;
  }

  // Status LED blink
  function statusBlink() {
    statusLed.style.filter = 'brightness(1.8)';
    setTimeout(() => statusLed.style.filter = '', 120);
  }

  // Widgets auto-update
  function startStats() {
    setInterval(() => {
      statCpu.textContent = `${randomInt(31, 98)}%`;
      statPkts.textContent = `${randomInt(800, 4200).toLocaleString('id-ID')}`;
      statEntropy.textContent = `${(Math.random() * 1e4 + 1e3).toExponential(1)}`;
      statNodes.textContent = `${randomInt(64, 1024)}`;
      statusBlink();
    }, 900);
  }

  // Matrix rain background
  function startMatrix() {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let width, height, columns, drops, fontSize;
    const chars = 'アイウエオカキクケコｱｲｳｴｵ01░▒▓█<>#/*\\=+-';

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fontSize = Math.max(14, Math.floor(width / 80));
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(0).map(() => randomInt(0, height));
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < columns; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.975 ? '#00e5ff' : '#00ff9c';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
  }

  // Input handling
  function onEnter(e) {
    if (e.key === 'Enter') {
      const cmd = inputEl.value;
      printLine(`$ ${cmd}`, 'warn');
      inputEl.value = '';
      parse(cmd);
      beep(640, 0.02, 0.008);
    }
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    initAudio();
    startMatrix();
    startStats();
    inputEl.focus();
    printLine('Welcome to HACK//OPS terminal. Type `help` and press Enter.', 'ok');
  }, { once: true });

  // User interaction to unlock AudioContext on some browsers
  window.addEventListener('click', initAudio, { once: true });
  window.addEventListener('keydown', (e) => { if (e.key === 'Enter') initAudio(); });

  inputEl.addEventListener('keydown', onEnter);
  btnClear.addEventListener('click', () => commands.clear());
  btnScan.addEventListener('click', () => commands.scan());
  btnDecrypt.addEventListener('click', () => commands.decrypt());
})();