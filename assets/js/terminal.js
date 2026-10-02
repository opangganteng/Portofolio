/**
 * Interactive Developer Terminal for Naufal Fikri Portfolio
 */

(function () {
  const terminalModal = document.getElementById('terminal-modal');
  const terminalBodies = document.querySelectorAll('#terminal-output, #terminal-modal-output');
  const terminalInputs = document.querySelectorAll('[data-terminal-input], #terminal-input');
  const closeTerminalBtn = document.getElementById('close-terminal-btn');
  const openTerminalBtns = document.querySelectorAll('.open-terminal-trigger');
  
  if (!terminalInputs.length || !terminalBodies.length) return;

  const commandHistory = [];
  let historyIndex = -1;
  let activeOutput = terminalBodies[0];

  const COMMANDS = {
    help: `Available Commands:
<span class="text-indigo-400 font-bold">─── Core Profile ───</span>
  <span class="text-cyan-400">about</span>           - Naufal Fikri's profile & career summary
  <span class="text-cyan-400">skills</span>          - Languages, frameworks & databases
  <span class="text-cyan-400">projects</span>        - Overview of 4 full-stack applications
  <span class="text-cyan-400">project &lt;1-4&gt;</span>     - Open an interactive project details modal
  <span class="text-cyan-400">experience</span>      - Work experience & IT support
  <span class="text-cyan-400">education</span>       - Informatics Engineering degree from Gunadarma
  <span class="text-cyan-400">certs</span>           - Cisco & web programming certifications
  <span class="text-cyan-400">contact</span>         - Contact details (email, WhatsApp, LinkedIn, GitHub)
  <span class="text-cyan-400">social</span>          - Social media & repository links

<span class="text-emerald-400 font-bold">─── Developer Utilities ───</span>
  <span class="text-cyan-400">neofetch</span>        - Linux-style developer system information
  <span class="text-cyan-400">cat cv.txt</span>      - View the resume in the terminal
  <span class="text-cyan-400">git status</span>      - Repository status & work availability
  <span class="text-cyan-400">git log</span>         - Project commits & milestones
  <span class="text-cyan-400">tree</span>            - Portfolio architecture directory tree
  <span class="text-cyan-400">ping &lt;host&gt;</span>      - Simulate a network connection test (Cisco ping)
  <span class="text-cyan-400">calc &lt;expr&gt;</span>      - Quick calculator (e.g., calc 15 * 8)
  <span class="text-cyan-400">sound [on|off]</span>  - Turn sound effects on or off

<span class="text-amber-400 font-bold">─── Actions & Easter Eggs ───</span>
  <span class="text-cyan-400">whatsapp</span>        - Open a direct WhatsApp chat with Naufal
  <span class="text-cyan-400">download</span> / <span class="text-cyan-400">cv</span>   - Download the official resume (PDF)
  <span class="text-cyan-400">theme &lt;name&gt;</span>     - Change the theme (dark, light, matrix)
  <span class="text-cyan-400">matrix</span>          - Matrix green digital rain mode
  <span class="text-cyan-400">coffee</span> / <span class="text-cyan-400">brew</span>    - Brew a virtual developer coffee ☕
  <span class="text-cyan-400">joke</span>            - Random programmer joke
  <span class="text-cyan-400">quote</span>           - Inspirational software quote
  <span class="text-cyan-400">history</span>         - Command history for this session
  <span class="text-cyan-400">sudo hire</span>       - Get in touch about a job opportunity (🎉 Confetti)
  <span class="text-cyan-400">clear</span>           - Clear the terminal`,

    about: `<div class="space-y-1">
  <div class="text-indigo-400 font-bold">NAUFAL FIKRI — Junior Web & Full Stack Developer</div>
  <div>📍 Cibinong, Bogor, West Java, Indonesia</div>
  <div class="text-slate-300 mt-1">Informatics Engineering graduate from Gunadarma University with hands-on experience building 4 full-stack, database-driven web applications using PHP Native, Laravel, C# ASP.NET MVC, and Next.js / Express.js.</div>
  <div class="text-slate-400 mt-1">Skilled in designing MVC architecture, relational database normalization, and robust CRUD features from scratch. Backed by solid IT Support diagnostics experience.</div>
</div>`,

    skills: `<div class="space-y-1">
  <span class="text-indigo-300 font-semibold">[Languages]</span> PHP, C#, JavaScript (ES6+), SQL, HTML5, CSS3
  <br><span class="text-cyan-300 font-semibold">[Frameworks]</span> Laravel, ASP.NET MVC, Next.js, Express.js
  <br><span class="text-emerald-300 font-semibold">[Databases]</span> MySQL, PostgreSQL, SQL Server, Dapper ORM
  <br><span class="text-purple-300 font-semibold">[Architecture]</span> MVC Pattern, RESTful APIs, CRUD, Relational DB Design
  <br><span class="text-amber-300 font-semibold">[Tools & IT]</span> Git, GitHub, Network Configuration (LAN/WAN Cisco), Troubleshooting
</div>`,

    projects: `<div class="space-y-1">
  <div class="text-indigo-400 font-bold">Featured Full-Stack Projects:</div>
  <div>1. <span class="text-cyan-300 font-semibold">Cibubur Local Government Information Website</span> [Next.js, Express.js, PostgreSQL]</div>
  <div>2. <span class="text-cyan-300 font-semibold">School Management System</span> [C#, ASP.NET MVC, Dapper, SQL Server]</div>
  <div>3. <span class="text-cyan-300 font-semibold">E-Piket: School Duty Management System</span> [PHP Native, MySQL, JavaScript]</div>
  <div>4. <span class="text-cyan-300 font-semibold">JeWePe Building Materials Store</span> [PHP, Laravel, MySQL, Bootstrap]</div>
  <div class="text-slate-400 mt-1">Tip: Type <span class="text-amber-400">project 1</span> (or 2, 3, 4) to open the interactive project deep dive!</div>
</div>`,

    experience: `<div class="space-y-1">
  <div class="text-indigo-400 font-bold">Work Experience:</div>
  <div>💼 <span class="text-emerald-400">IT Support</span> — Jagat Satwa Nusantara, TMII</div>
  <div class="text-slate-400 pl-4">• Technical support for hardware, software, network & CCTV maintenance.</div>
  <div>💼 <span class="text-emerald-400">IT Support</span> — SMK Wijaya Kusuma</div>
  <div class="text-slate-400 pl-4">• OS installation, troubleshooting, and IT asset documentation.</div>
  <div>💼 <span class="text-emerald-400">QC Field</span> — PT Serena Indopangan</div>
  <div class="text-slate-400 pl-4">• On-site quality inspections and standards verification.</div>
</div>`,

    education: `<div class="space-y-1">
  <div class="text-indigo-400 font-bold">Education:</div>
  <div>🎓 <span class="text-white font-semibold">Gunadarma University</span></div>
  <div class="text-cyan-300">Bachelor's Degree in Informatics Engineering</div>
  <div class="text-slate-400">• Core focus: Web Application Development, Database Systems, Software Engineering, and IT Support.</div>
</div>`,

    certs: `<div class="space-y-1">
  <div class="text-indigo-400 font-bold">Licenses & Certifications:</div>
  <div>📜 JavaScript Programming Fundamental</div>
  <div>📜 Building Website Using HTML5</div>
  <div>📜 Basic Web App Design</div>
  <div>📜 SQL Server for Beginner</div>
  <div>📜 WAN Cisco Router — Intermediate</div>
  <div>📜 LAN Cisco Router</div>
</div>`,

    contact: `<div class="space-y-1">
  <div class="text-indigo-400 font-bold">Get In Touch:</div>
  <div>📧 Email: <a href="mailto:naufalfik777@gmail.com" class="text-cyan-300 hover:underline">naufalfik777@gmail.com</a></div>
  <div>📱 WhatsApp: <a href="https://wa.me/6287773862920" target="_blank" class="text-emerald-300 hover:underline">+62 877-7386-2920</a></div>
  <div>💼 LinkedIn: <a href="https://linkedin.com/in/naufal-fikri-0500r" target="_blank" class="text-indigo-300 hover:underline">linkedin.com/in/naufal-fikri-0500r</a></div>
  <div>🐙 GitHub: <a href="https://github.com/opangganteng" target="_blank" class="text-purple-300 hover:underline">github.com/opangganteng</a></div>
</div>`,

    social: `<div class="space-y-1">
  <div class="text-indigo-400 font-bold">Social & Portfolio Links:</div>
  <div>• LinkedIn: <a href="https://linkedin.com/in/naufal-fikri-0500r" target="_blank" class="text-cyan-300 underline">linkedin.com/in/naufal-fikri-0500r</a></div>
  <div>• GitHub: <a href="https://github.com/opangganteng" target="_blank" class="text-cyan-300 underline">github.com/opangganteng</a></div>
  <div>• WhatsApp: <a href="https://wa.me/6287773862920" target="_blank" class="text-emerald-400 underline">wa.me/6287773862920</a></div>
</div>`,

    neofetch: `<div class="font-mono text-xs leading-relaxed flex flex-col sm:flex-row gap-4 py-1">
  <div class="text-cyan-400 select-none hidden sm:block shrink-0">
   .---.
  /     \\
 | () () |   NAUFAL FIKRI
  \\  _  /    ====================
   \`---\`
  </div>
  <div class="space-y-0.5 text-slate-300">
    <div><span class="text-indigo-400 font-bold">OS:</span> NaufalOS v2.4 (x86_64 Web Edition)</div>
    <div><span class="text-indigo-400 font-bold">Host:</span> Gunadarma Informatics Alumni</div>
    <div><span class="text-indigo-400 font-bold">Role:</span> Junior Full Stack Developer</div>
    <div><span class="text-indigo-400 font-bold">Stack:</span> PHP, Laravel, C#, ASP.NET, Next.js, Express.js</div>
    <div><span class="text-indigo-400 font-bold">Databases:</span> PostgreSQL, MySQL, SQL Server, Dapper ORM</div>
    <div><span class="text-indigo-400 font-bold">Networking:</span> Cisco LAN/WAN Router Certified</div>
    <div><span class="text-indigo-400 font-bold">Status:</span> <span class="text-emerald-400 font-bold">Open for Full-time & Freelance Roles</span></div>
    <div><span class="text-indigo-400 font-bold">Uptime:</span> Ready to contribute immediately!</div>
  </div>
</div>`,

    catcv: `<div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
  <div class="text-cyan-400 font-bold border-b border-slate-700 pb-1">=== CURRICULUM VITAE: NAUFAL FIKRI ===</div>
  <div><strong>Title:</strong> Junior Web Developer | Junior Full Stack Developer</div>
  <div><strong>Contact:</strong> +62 877-7386-2920 | naufalfik777@gmail.com</div>
  <div><strong>Location:</strong> Cibinong, Bogor, West Java, Indonesia</div>
  <div class="mt-2 text-indigo-300 font-semibold">[Education]</div>
  <div>• Bachelor's Degree in Informatics Engineering — Gunadarma University</div>
  <div class="mt-2 text-indigo-300 font-semibold">[Featured Full-Stack Projects]</div>
  <div>1. Cibubur Local Government Information Website (Next.js, Express.js, PostgreSQL)</div>
  <div>2. School Management System (C#, ASP.NET MVC, Dapper, SQL Server)</div>
  <div>3. E-Piket Duty System (PHP Native, MySQL, JS)</div>
  <div>4. JeWePe Building Materials Store (PHP, Laravel, MySQL)</div>
  <div class="mt-2 text-indigo-300 font-semibold">[Professional Experience]</div>
  <div>• IT Support - TMII Jagat Satwa Nusantara (Hardware, Software, CCTV, Network)</div>
  <div>• IT Support - SMK Wijaya Kusuma (OS, IT Assets, Maintenance)</div>
  <div class="mt-2 text-emerald-400">Type <strong>download</strong> to download the official PDF resume!</div>
</div>`,

    tree: `<div class="font-mono text-xs text-slate-300 space-y-0.5">
<span class="text-cyan-400 font-bold">naufal-portfolio/</span>
├── <span class="text-indigo-400">projects/</span>
│   ├── <span class="text-emerald-400">cibubur-information-web/</span> (Next.js + Express.js + PostgreSQL)
│   ├── <span class="text-purple-400">school-management-system/</span> (C# + ASP.NET MVC + Dapper)
│   ├── <span class="text-amber-400">e-piket-duty-system/</span> (PHP Native + MySQL + JS)
│   └── <span class="text-rose-400">jewepe-materials-store/</span> (PHP + Laravel + MySQL)
├── <span class="text-indigo-400">experience/</span>
│   ├── <span class="text-slate-300">it-support-tmii-jagat-satwa/</span>
│   ├── <span class="text-slate-300">it-support-smk-wijaya-kusuma/</span>
│   └── <span class="text-slate-300">qc-field-serena-indopangan/</span>
├── <span class="text-indigo-400">education/</span>
│   └── <span class="text-cyan-300">bachelor-informatics-engineering-gunadarma</span>
└── <span class="text-indigo-400">credentials/</span>
    └── 6-verified-certifications (Cisco, SQL, HTML5, JS)
</div>`
  };

  const DEV_JOKES = [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "There are 10 types of people in the world: those who understand binary, and those who don't.",
    "A SQL query walks into a bar, walks up to two tables and asks: 'Can I JOIN you?' 🍻",
    "Why did the developer go broke? Because he used up all his cache! 💸",
    "How do you comfort a JavaScript bug? You console it. ❤️",
    "Real programmers count from 0."
  ];

  const TECH_QUOTES = [
    '"Talk is cheap. Show me the code." - Linus Torvalds',
    '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
    '"Simplicity is prerequisite for reliability." - Edsger W. Dijkstra',
    '"First, solve the problem. Then, write the code." - John Johnson'
  ];

  function appendLine(html, isCommand = false) {
    const line = document.createElement('div');
    line.className = isCommand ? 'text-indigo-300 font-semibold mt-2' : 'mt-1 text-slate-300';
    line.innerHTML = html;
    activeOutput.appendChild(line);
    activeOutput.scrollTop = activeOutput.scrollHeight;
  }

  function handleCommand(rawInput, output) {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    activeOutput = output;

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    appendLine(`<span class="text-emerald-400">naufal@dev:~$</span> ${trimmed}`, true);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    if (cmd === 'clear') {
      activeOutput.innerHTML = '';
      return;
    }

    if (cmd === 'help') {
      appendLine(COMMANDS.help);
      return;
    }

    if (cmd === 'about' || cmd === 'bio' || cmd === 'whoami') {
      appendLine(COMMANDS.about);
      return;
    }

    if (cmd === 'skills' || cmd === 'tech' || cmd === 'stack') {
      appendLine(COMMANDS.skills);
      return;
    }

    if (cmd === 'projects' || cmd === 'portofolio') {
      appendLine(COMMANDS.projects);
      return;
    }

    if (cmd === 'project') {
      const pNum = parseInt(arg, 10);
      if (pNum >= 1 && pNum <= 4) {
        appendLine(`<span class="text-cyan-400">🚀 Opening project ${pNum} interactive deep-dive modal...</span>`);
        if (window.openProjectModalByIndex) {
          window.openProjectModalByIndex(pNum - 1);
        }
      } else {
        appendLine(`<span class="text-amber-400">Please choose a project index from 1 to 4. E.g.: 'project 1'</span>`);
      }
      return;
    }

    if (cmd === 'exp' || cmd === 'experience' || cmd === 'work') {
      appendLine(COMMANDS.experience);
      return;
    }

    if (cmd === 'edu' || cmd === 'education') {
      appendLine(COMMANDS.education);
      return;
    }

    if (cmd === 'cert' || cmd === 'certs' || cmd === 'certifications') {
      appendLine(COMMANDS.certs);
      return;
    }

    if (cmd === 'contact') {
      appendLine(COMMANDS.contact);
      return;
    }

    if (cmd === 'social' || cmd === 'links') {
      appendLine(COMMANDS.social);
      return;
    }

    if (cmd === 'neofetch' || cmd === 'sysinfo') {
      appendLine(COMMANDS.neofetch);
      return;
    }

    if (cmd === 'cat') {
      if (arg.includes('cv') || arg.includes('resume')) {
        appendLine(COMMANDS.catcv);
      } else {
        appendLine(`<span class="text-amber-400">File not found. Try: <strong>cat cv.txt</strong></span>`);
      }
      return;
    }

    if (cmd === 'tree') {
      appendLine(COMMANDS.tree);
      return;
    }

    if (cmd === 'git') {
      if (arg === 'status') {
        appendLine(`<div class="space-y-1">
  <div class="text-emerald-400">On branch main</div>
  <div>Your branch is up to date with 'origin/production'.</div>
  <div class="text-cyan-300 mt-1">Changes ready for deployment:</div>
  <div class="text-emerald-300 pl-4">✔ Cibubur Local Government Portal (Next.js/Express/PostgreSQL)</div>
  <div class="text-emerald-300 pl-4">✔ School Management System (C# ASP.NET MVC/Dapper)</div>
  <div class="text-emerald-300 pl-4">✔ E-Piket School Duty System (PHP Native/MySQL)</div>
  <div class="text-emerald-300 pl-4">✔ JeWePe Building Materials Store (Laravel/MySQL)</div>
  <div class="text-slate-400 mt-1">nothing to commit, ready to join your engineering team! 🚀</div>
</div>`);
      } else if (arg === 'log') {
        appendLine(`<div class="space-y-1 text-xs font-mono">
  <div><span class="text-amber-400">commit 9f4a12</span> - feat: Built Cibubur Village Portal (Next.js, Express, PostgreSQL)</div>
  <div><span class="text-amber-400">commit 7b3d90</span> - feat: Developed School Management System in C# ASP.NET MVC</div>
  <div><span class="text-amber-400">commit 4c8e61</span> - feat: Implemented E-Piket Duty & Attendance System in Native PHP</div>
  <div><span class="text-amber-400">commit 2a1f05</span> - feat: Built JeWePe Building Materials Store in Laravel MVC</div>
  <div><span class="text-amber-400">commit 0e89aa</span> - grad: Earned a bachelor's degree in Informatics Engineering from Gunadarma University</div>
</div>`);
      } else {
        appendLine(`<span class="text-amber-400">Supported git subcommands: <strong>git status</strong> or <strong>git log</strong></span>`);
      }
      return;
    }

    if (cmd === 'ping') {
      const target = arg || 'google.com';
      appendLine(`<div class="space-y-0.5 text-xs font-mono">
  <div>PING ${target} (10.0.8.1): 56 data bytes</div>
  <div>64 bytes from 10.0.8.1: icmp_seq=1 ttl=116 time=18.4 ms</div>
  <div>64 bytes from 10.0.8.1: icmp_seq=2 ttl=116 time=16.8 ms</div>
  <div>64 bytes from 10.0.8.1: icmp_seq=3 ttl=116 time=17.2 ms</div>
  <div>64 bytes from 10.0.8.1: icmp_seq=4 ttl=116 time=16.5 ms</div>
  <div class="text-emerald-400 font-bold mt-1">--- ${target} ping statistics ---</div>
  <div>4 packets transmitted, 4 packets received, 0.0% packet loss</div>
  <div class="text-cyan-300">Cisco LAN/WAN connection status: EXCELLENT ✅</div>
</div>`);
      return;
    }

    if (cmd === 'calc') {
      if (!arg) {
        appendLine(`<span class="text-amber-400">Usage: calc &lt;math expression&gt;. Example: <strong>calc 25 * 4</strong></span>`);
        return;
      }
      try {
        const sanitized = arg.replace(/[^0-9+*\/().\s-]/g, '');
        const result = Function(`'use strict'; return (${sanitized})`)();
        appendLine(`<span class="text-cyan-300">${arg}</span> = <span class="text-emerald-400 font-bold">${result}</span>`);
      } catch (err) {
        appendLine(`<span class="text-red-400">Unable to evaluate the mathematical expression.</span>`);
      }
      return;
    }

    if (cmd === 'sound') {
      if (window.sfx) {
        if (arg === 'on') {
          if (!window.sfx.enabled) window.sfx.toggle();
          appendLine(`<span class="text-emerald-400">🔊 Sound effects: ON</span>`);
        } else if (arg === 'off') {
          if (window.sfx.enabled) window.sfx.toggle();
          appendLine(`<span class="text-slate-400">🔇 Sound effects: OFF</span>`);
        } else {
          appendLine(`Current sound status: <strong>${window.sfx.enabled ? 'ON 🔊' : 'OFF 🔇'}</strong>. Use: 'sound on' or 'sound off'`);
        }
      }
      return;
    }

    if (cmd === 'coffee' || cmd === 'brew') {
      appendLine(`<div class="text-amber-400 font-mono">
  ☕ Brewing a warm cup of Arabica coffee...
  [████████████████████] 100%
  <span class="text-emerald-400">Coffee is ready! Developer energy fully restored for clean, bug-free coding.</span>
</div>`);
      return;
    }

    if (cmd === 'joke' || cmd === 'jokes') {
      const randomJoke = DEV_JOKES[Math.floor(Math.random() * DEV_JOKES.length)];
      appendLine(`<div class="text-amber-300 italic">"${randomJoke}"</div>`);
      return;
    }

    if (cmd === 'quote') {
      const randomQuote = TECH_QUOTES[Math.floor(Math.random() * TECH_QUOTES.length)];
      appendLine(`<div class="text-cyan-300 italic">${randomQuote}</div>`);
      return;
    }

    if (cmd === 'history') {
      if (commandHistory.length === 0) {
        appendLine(`No command history yet.`);
      } else {
        const hist = commandHistory.map((h, i) => `${i + 1}. ${h}`).join('<br>');
        appendLine(`<div class="text-slate-400 font-mono text-xs">${hist}</div>`);
      }
      return;
    }

    if (cmd === 'whatsapp' || cmd === 'wa') {
      appendLine('<span class="text-emerald-400">Redirecting to WhatsApp chat...</span>');
      window.open('https://wa.me/6287773862920?text=Hello%20Naufal,%20I%27m%20interested%20in%20your%20portfolio!', '_blank');
      return;
    }

    if (cmd === 'download' || cmd === 'cv' || cmd === 'resume') {
      appendLine('<span class="text-emerald-400">📥 Initiating CV download...</span>');
      const link = document.createElement('a');
      link.href = 'assets/docs/Naufal_Fikri_CV.pdf';
      link.download = 'Naufal_Fikri_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    if (cmd === 'matrix') {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'matrix' ? 'dark' : 'matrix';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
      appendLine(`<span class="text-emerald-400">Matrix mode: ${next === 'matrix' ? 'ENABLED ⚡' : 'DISABLED'}</span>`);
      return;
    }

    if (cmd === 'theme') {
      if (['dark', 'light', 'matrix'].includes(arg)) {
        document.documentElement.setAttribute('data-theme', arg);
        localStorage.setItem('portfolio-theme', arg);
        appendLine(`<span class="text-cyan-400">Theme switched to: <strong>${arg}</strong></span>`);
      } else {
        appendLine(`<span class="text-amber-400">Available themes: dark, light, matrix. Usage: 'theme light'</span>`);
      }
      return;
    }

    if (trimmed.toLowerCase() === 'sudo hire' || cmd === 'hire') {
      appendLine(`<div class="text-emerald-400 font-bold text-base">🎉 ACCESS GRANTED: Candidate Naufal Fikri is ready for hire!</div>
<div class="text-cyan-300">Fast learner, passionate about clean MVC architecture, ready to contribute immediately to your team.</div>
<div class="text-slate-300 mt-1">Launching celebratory confetti and direct WhatsApp connection...</div>`);
      
      if (window.confetti) {
        window.confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }

      setTimeout(() => {
        window.open('https://wa.me/6287773862920?text=Hello%20Naufal,%20we%27d%20like%20to%20offer%20you%20a%20job%20opportunity!', '_blank');
      }, 1200);
      return;
    }

    if (cmd === 'date' || cmd === 'time') {
      appendLine(new Date().toString());
      return;
    }

    if (cmd === 'echo') {
      appendLine(arg);
      return;
    }

    appendLine(`<span class="text-red-400">Command not found: '${trimmed}'.</span> Type <span class="text-cyan-400">help</span> for a list of valid commands.`);
  }

  // Keyboard navigation & execution
  terminalInputs.forEach((terminalInput) => terminalInput.addEventListener('keydown', (e) => {
    if (window.playKeySound) window.playKeySound();

    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      const output = terminalInput.closest('.terminal-card')?.querySelector('.terminal-viewport') || terminalBodies[0];
      handleCommand(val, output);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = terminalInput.value.trim().toLowerCase();
      const cmds = [
        'help', 'about', 'skills', 'projects', 'project 1', 'project 2', 'project 3', 'project 4',
        'experience', 'education', 'certs', 'contact', 'social', 'neofetch', 'cat cv.txt',
        'git status', 'git log', 'tree', 'ping google.com', 'calc', 'sound on', 'sound off',
        'coffee', 'joke', 'quote', 'history', 'whatsapp', 'download', 'cv',
        'theme dark', 'theme light', 'theme matrix', 'matrix', 'sudo hire', 'clear'
      ];
      const match = cmds.find(c => c.startsWith(current));
      if (match) {
        terminalInput.value = match;
      }
    }
  }));

  // Modal Open/Close handlers
  function openTerminal() {
    if (!terminalModal) return;
    terminalModal.classList.remove('hidden');
    terminalModal.classList.add('flex');
    setTimeout(() => terminalModal.querySelector('[data-terminal-input]')?.focus(), 100);
  }

  function closeTerminal() {
    if (!terminalModal) return;
    terminalModal.classList.add('hidden');
    terminalModal.classList.remove('flex');
  }

  openTerminalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openTerminal();
    });
  });

  if (closeTerminalBtn) {
    closeTerminalBtn.addEventListener('click', closeTerminal);
  }

  // Close on outside click
  if (terminalModal) {
    terminalModal.addEventListener('click', (e) => {
      if (e.target === terminalModal) {
        closeTerminal();
      }
    });
  }

  // Keyboard shortcut: Ctrl + K or Backtick (`)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key.toLowerCase() === 'k') || e.key === '`') {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        if (document.activeElement !== terminalInput) return;
      }
      e.preventDefault();
      if (terminalModal.classList.contains('hidden')) {
        openTerminal();
      } else {
        closeTerminal();
      }
    }
    if (e.key === 'Escape' && !terminalModal.classList.contains('hidden')) {
      closeTerminal();
    }
  });

  window.openTerminalModal = openTerminal;
})();
