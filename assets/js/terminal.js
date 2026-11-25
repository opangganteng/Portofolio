/**
 * Terminal Interaktif Portofolio Naufal Fikri
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
    help: `Perintah yang tersedia:
<span class="text-indigo-400 font-bold">─── Profil Utama ───</span>
  <span class="text-cyan-400">about</span>           - Profil dan ringkasan karier Naufal Fikri
  <span class="text-cyan-400">skills</span>          - Bahasa pemrograman, framework, dan basis data
  <span class="text-cyan-400">projects</span>        - Ringkasan 4 aplikasi web menyeluruh
  <span class="text-cyan-400">project &lt;1-4&gt;</span>     - Buka detail proyek interaktif
  <span class="text-cyan-400">experience</span>      - Pengalaman kerja dan dukungan TI
  <span class="text-cyan-400">education</span>       - Gelar Teknik Informatika dari Gunadarma
  <span class="text-cyan-400">certs</span>           - Sertifikasi Cisco dan pemrograman web
  <span class="text-cyan-400">contact</span>         - Informasi kontak (email, WhatsApp, LinkedIn, GitHub)
  <span class="text-cyan-400">social</span>          - Tautan media sosial dan repositori

<span class="text-emerald-400 font-bold">─── Utilitas Pengembang ───</span>
  <span class="text-cyan-400">neofetch</span>        - Informasi sistem pengembang bergaya Linux
  <span class="text-cyan-400">cat cv.txt</span>      - Lihat ringkasan CV di terminal
  <span class="text-cyan-400">git status</span>      - Status repositori dan ketersediaan kerja
  <span class="text-cyan-400">git log</span>         - Komit dan pencapaian proyek
  <span class="text-cyan-400">tree</span>            - Struktur direktori portofolio
  <span class="text-cyan-400">ping &lt;host&gt;</span>      - Simulasi uji koneksi jaringan (Cisco ping)
  <span class="text-cyan-400">calc &lt;expr&gt;</span>      - Kalkulator cepat (contoh: calc 15 * 8)
  <span class="text-cyan-400">sound [on|off]</span>  - Aktifkan atau nonaktifkan efek suara

<span class="text-amber-400 font-bold">─── Aksi & Kejutan ───</span>
  <span class="text-cyan-400">whatsapp</span>        - Buka percakapan WhatsApp langsung dengan Naufal
  <span class="text-cyan-400">download</span> / <span class="text-cyan-400">cv</span>   - Unduh CV resmi (PDF)
  <span class="text-cyan-400">theme &lt;name&gt;</span>     - Ubah tema (dark, light, matrix)
  <span class="text-cyan-400">matrix</span>          - Aktifkan efek hujan digital hijau Matrix
  <span class="text-cyan-400">coffee</span> / <span class="text-cyan-400">brew</span>    - Seduh kopi virtual untuk pengembang ☕
  <span class="text-cyan-400">joke</span>            - Lelucon pemrograman acak
  <span class="text-cyan-400">quote</span>           - Kutipan inspiratif tentang perangkat lunak
  <span class="text-cyan-400">history</span>         - Riwayat perintah pada sesi ini
  <span class="text-cyan-400">sudo hire</span>       - Hubungi Naufal untuk peluang kerja (🎉 Konfeti)
  <span class="text-cyan-400">clear</span>           - Bersihkan terminal`,

    about: `<div class="space-y-1">
  <div class="text-cyan-400 font-bold">NAUFAL FIKRI — Lulusan Baru Teknik Informatika</div>
  <div>📍 Cibinong, Bogor, Jawa Barat, Indonesia</div>
  <div class="text-emerald-400 font-semibold mt-1">"Siap belajar, beradaptasi, dan berkontribusi melalui kemampuan teknis serta pengalaman kerja lintas bidang."</div>
  <div class="text-slate-300 mt-1">Lulusan baru Teknik Informatika Universitas Gunadarma dengan pengalaman di bidang teknologi informasi, operasional lapangan, pengendalian mutu, dan pengembangan aplikasi. Memiliki pemahaman dalam pemecahan masalah teknis, pemeliharaan perangkat, kerja tim, serta pengembangan aplikasi web.</div>
  <div class="text-cyan-300 font-mono text-xs mt-1">Status: Bersedia Relokasi | Terbuka untuk Bekerja di Kantor (WFO)</div>
</div>`,

    skills: `<div class="space-y-1">
  <div class="text-cyan-400 font-bold">Keahlian Teknis:</div>
  <div><span class="text-cyan-300 font-semibold">[Infrastruktur & Dukungan Teknis]</span> Pemecahan Masalah Perangkat Keras, Pemecahan Masalah Perangkat Lunak, Instalasi & Konfigurasi Sistem Operasi, Sistem Tiket, Pemeliharaan Jaringan, Cisco LAN/WAN, Pemeliharaan CCTV, Dokumentasi Aset TI</div>
  <div class="mt-1"><span class="text-blue-300 font-semibold">[Pemrograman & Pengembangan Web]</span> C#, PHP, JavaScript, SQL, ASP.NET MVC, Laravel, Node.js, Express.js, Next.js, React, REST API, HTML5, CSS3, Desain Responsif</div>
  <div class="mt-1"><span class="text-emerald-300 font-semibold">[Basis Data]</span> SQL Server, MySQL, PostgreSQL, Desain Basis Data Relasional</div>
  <div class="mt-1"><span class="text-purple-300 font-semibold">[Perangkat & Lainnya]</span> Git, GitHub, AnyDesk, TeamViewer, Visual Studio, Visual Studio Code, XAMPP, Pengujian Manual, Debugging, Deployment</div>
</div>`,

    projects: `<div class="space-y-1">
  <div class="text-cyan-400 font-bold">Proyek Pilihan:</div>
  <div>1. <span class="text-cyan-300 font-semibold">Sistem Pengelolaan Piket Sekolah (E-Piket)</span> [PHP, MySQL, HTML5, CSS3, JavaScript] (Juli 2026 – September 2026)</div>
  <div>2. <span class="text-cyan-300 font-semibold">Toko Bahan Bangunan JeWePe</span> [PHP, Laravel, MySQL] (Mei 2026 – Juni 2026)</div>
  <div>3. <span class="text-cyan-300 font-semibold">Situs Informasi Kelurahan Cibubur</span> [Next.js, React, Express.js, Node.js, PostgreSQL] (September 2025 – November 2025)</div>
  <div>4. <span class="text-cyan-300 font-semibold">Sistem Manajemen Sekolah</span> [C#, ASP.NET MVC, Dapper, SQL Server] (Juli 2025 – September 2025)</div>
  <div class="text-slate-400 mt-1">Catatan: Ketik <span class="text-amber-400">project 1</span> (atau 2, 3, 4) untuk membuka detail proyek interaktif!</div>
</div>`,

    experience: `<div class="space-y-1">
  <div class="text-cyan-400 font-bold">Pengalaman Kerja:</div>
  <div>💼 <span class="text-emerald-400 font-semibold">Dukungan TI</span> — Jagat Satwa Nusantara, TMII (Mei 2026 – Juli 2026)</div>
  <div class="text-slate-400 pl-4">• Memberikan dukungan teknis untuk masalah perangkat keras, perangkat lunak, dan jaringan, termasuk pemeliharaan sistem CCTV.</div>
  <div class="text-slate-400 pl-4">• Memasang, mengonfigurasi, dan memelihara komputer serta perangkat TI.</div>
  <div class="text-slate-400 pl-4">• Membantu pemeliharaan dan pemantauan sistem CCTV.</div>
  <div class="text-slate-400 pl-4">• Mendukung pelaporan masalah dan penanganan tiket dukungan TI, serta menerapkan prosedur keselamatan kerja.</div>
  <div class="mt-1">💼 <span class="text-amber-400 font-semibold">Pengendalian Mutu (Lapangan)</span> — PT Serena Indopangan (Oktober 2025 – Februari 2026)</div>
  <div class="text-slate-400 pl-4">• Melakukan inspeksi bahan baku, proses produksi, dan produk jadi sesuai standar mutu.</div>
  <div class="text-slate-400 pl-4">• Memantau kebersihan produksi, mendokumentasikan ketidaksesuaian mutu, dan mengikuti SOP keselamatan kerja.</div>
  <div class="mt-1">💼 <span class="text-cyan-400 font-semibold">Dukungan TI (Lepas)</span> — SMK Wijaya Kusuma (Maret 2023 – Juni 2025)</div>
  <div class="text-slate-400 pl-4">• Memasang, mengonfigurasi, dan memperbarui sistem operasi serta aplikasi.</div>
  <div class="text-slate-400 pl-4">• Memelihara dokumentasi aset TI dan mendukung pemeliharaan perangkat untuk kegiatan sekolah serta ujian.</div>
  <div class="text-slate-400 pl-4">• Berkoordinasi dengan tim TI untuk membantu ketersediaan perangkat sekolah.</div>
</div>`,

    education: `<div class="space-y-1">
  <div class="text-cyan-400 font-bold">Pendidikan & Bahasa:</div>
  <div>🎓 <span class="text-white font-semibold">Sarjana Teknik Informatika</span> — Universitas Gunadarma</div>
  <div class="text-slate-400">September 2022 – Agustus 2026 | IPK: 3,21 / 4,00 | Lulus: Agustus 2026</div>
  <div class="text-slate-300">• Bidang fokus: Pengembangan Aplikasi Web, Sistem Basis Data, Rekayasa Perangkat Lunak, Dukungan TI.</div>
  <div class="mt-1 text-slate-300">🌐 <span class="font-semibold text-white">Bahasa:</span> Indonesia (Fasih), Inggris (Dasar hingga Menengah)</div>
</div>`,

    certs: `<div class="space-y-1">
  <div class="text-cyan-400 font-bold">Lisensi & Sertifikasi:</div>
  <div>📜 Sertifikasi Junior Web Programmer</div>
  <div>📜 Professional IT Support Certificate</div>
  <div>📜 Sertifikat Ahli K3 Umum</div>
  <div>📜 Dasar-Dasar Pemrograman JavaScript</div>
  <div>📜 Membangun Situs Web dengan HTML5</div>
  <div>📜 Dasar-Dasar Desain Aplikasi Web</div>
  <div>📜 SQL Server untuk Pemula</div>
  <div>📜 Router Cisco WAN (Menengah)</div>
  <div>📜 Router Cisco LAN</div>
  <div>📜 SQL Server Tingkat Menengah</div>
  <div>📜 Dasar-Dasar Pengembangan Aplikasi Web</div>
</div>`,

    contact: `<div class="space-y-1">
  <div class="text-cyan-400 font-bold">Informasi Kontak:</div>
  <div>📧 Email: <a href="mailto:naufalfik777@gmail.com" class="text-cyan-300 hover:underline">naufalfik777@gmail.com</a></div>
  <div>📱 Telepon/WhatsApp: <a href="https://wa.me/6287773862920" target="_blank" class="text-emerald-300 hover:underline">+62 877-7386-2920</a></div>
  <div>💼 LinkedIn: <a href="https://linkedin.com/in/naufal-fikri-0500r" target="_blank" class="text-blue-300 hover:underline">linkedin.com/in/naufal-fikri-0500r</a></div>
  <div>🐙 GitHub: <a href="https://github.com/opangganteng" target="_blank" class="text-slate-300 hover:underline">github.com/opangganteng</a></div>
  <div>📍 Lokasi: Cibinong, Bogor, Jawa Barat, Indonesia</div>
  <div class="text-emerald-400 text-xs mt-1">Bersedia Relokasi | Terbuka untuk Bekerja di Kantor (WFO)</div>
</div>`,

    social: `<div class="space-y-1">
  <div class="text-cyan-400 font-bold">Profil Profesional:</div>
  <div>• LinkedIn: <a href="https://linkedin.com/in/naufal-fikri-0500r" target="_blank" class="text-cyan-300 underline">linkedin.com/in/naufal-fikri-0500r</a></div>
  <div>• GitHub: <a href="https://github.com/opangganteng" target="_blank" class="text-cyan-300 underline">github.com/opangganteng</a></div>
  <div>• Portofolio: <a href="https://portofolio-alpha-sable-44.vercel.app" target="_blank" class="text-cyan-300 underline">portofolio-alpha-sable-44.vercel.app</a></div>
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
    <div><span class="text-cyan-400 font-bold">Identitas:</span> Naufal Fikri</div>
      <div><span class="text-cyan-400 font-bold">Profil:</span> Lulusan Baru Teknik Informatika</div>
    <div><span class="text-cyan-400 font-bold">Pendidikan:</span> Universitas Gunadarma (IPK: 3,21)</div>
      <div><span class="text-cyan-400 font-bold">Pendidikan Menengah:</span> SMAN 1 Cibinong, MIPA (Nilai Akhir: 89,90/100)</div>
      <div><span class="text-cyan-400 font-bold">Bidang Kompetensi:</span> Teknologi Informasi, Dukungan Teknis, Pengembangan Aplikasi, dan Basis Data</div>
    <div><span class="text-cyan-400 font-bold">Basis Data:</span> SQL Server, MySQL, PostgreSQL</div>
    <div><span class="text-cyan-400 font-bold">Ketersediaan:</span> <span class="text-emerald-400 font-bold">Bersedia Relokasi | Terbuka untuk Bekerja di Kantor</span></div>
    <div><span class="text-cyan-400 font-bold">Lokasi:</span> Cibinong, Bogor, Jawa Barat, Indonesia</div>
  </div>
</div>`,

    catcv: `<div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
  <div class="text-cyan-400 font-bold border-b border-slate-700 pb-1">=== DAFTAR RIWAYAT HIDUP: NAUFAL FIKRI ===</div>
  <div><strong>Profil:</strong> Lulusan Baru Teknik Informatika</div>
  <div><strong>Kontak:</strong> +62 877-7386-2920 | naufalfik777@gmail.com</div>
  <div><strong>Lokasi:</strong> Cibinong, Bogor, Jawa Barat, Indonesia</div>
  <div><strong>Ketersediaan:</strong> Bersedia bekerja di kantor dan relokasi sesuai kebutuhan perusahaan</div>
  <div class="mt-2 text-cyan-300 font-semibold">[Pendidikan]</div>
  <div>• Sarjana Teknik Informatika — Universitas Gunadarma (September 2022 – Agustus 2026, IPK: 3,21)</div>
  <div>• MIPA — SMAN 1 Cibinong (Agustus 2019 – April 2022, Nilai Akhir: 89,90/100)</div>
  <div class="mt-2 text-cyan-300 font-semibold">[Pengalaman Kerja]</div>
  <div>• Dukungan TI — Jagat Satwa Nusantara, TMII (Mei 2026 – Juli 2026)</div>
  <div>• Pengendalian Mutu (Lapangan) — PT Serena Indopangan (Oktober 2025 – Februari 2026)</div>
  <div>• Dukungan TI (Lepas) — SMK Wijaya Kusuma (Maret 2023 – Juni 2025)</div>
  <div class="mt-2 text-cyan-300 font-semibold">[Proyek]</div>
  <div>1. Sistem Pengelolaan Piket Sekolah (E-Piket) [PHP, MySQL, HTML5, CSS3, JS]</div>
  <div>2. Toko Bahan Bangunan JeWePe [PHP, Laravel, MySQL]</div>
  <div>3. Situs Informasi Kelurahan Cibubur [Next.js, React, Express.js, PostgreSQL]</div>
  <div>4. Sistem Manajemen Sekolah [C#, ASP.NET MVC, Dapper, SQL Server]</div>
  <div class="mt-2 text-emerald-400">Ketik <strong>download</strong> untuk mengunduh CV resmi dalam format PDF!</div>
</div>`,

    tree: `<div class="font-mono text-xs text-slate-300 space-y-0.5">
<span class="text-cyan-400 font-bold">naufal-portfolio/</span>
├── <span class="text-cyan-300">keahlian-dukungan-ti/</span>
│   ├── pemecahan-masalah-perangkat-keras & konfigurasi-sistem-operasi
│   ├── sistem-tiket & dokumentasi-aset
│   ├── cisco-lan-wan & pemeliharaan-jaringan
│   └── pemeliharaan-pemantauan-cctv
├── <span class="text-blue-300">pengembangan-web/</span>
│   ├── sistem-piket-e-piket/ (PHP Native + MySQL)
│   ├── toko-bahan-bangunan-jewepe/ (PHP + Laravel + MySQL)
│   ├── portal-kelurahan-cibubur/ (Next.js + Express.js + PostgreSQL)
│   └── sistem-manajemen-sekolah/ (C# + ASP.NET MVC + SQL Server)
├── <span class="text-emerald-300">pengalaman-kerja/</span>
│   ├── dukungan-ti-tmii-jagat-satwa/ (Mei 2026 – Juli 2026)
│   ├── pengendalian-mutu-lapangan-pt-serena-indopangan/ (Oktober 2025 – Februari 2026)
│   └── dukungan-ti-smk-wijaya-kusuma/ (Maret 2023 – Juni 2025)
└── <span class="text-purple-300">pendidikan-dan-sertifikasi/</span>
    ├── sarjana-teknik-informatika-universitas-gunadarma (IPK 3,21)
    └── 8 sertifikasi (Cisco WAN/LAN, SQL Server, HTML5, JavaScript, desain & pengembangan web)
</div>`
  };

  const DEV_JOKES = [
    "Mengapa programmer menyukai mode gelap? Karena cahaya menarik bug! 🐛",
    "Ada 10 jenis orang di dunia: yang memahami bilangan biner dan yang tidak.",
    "Sebuah kueri SQL masuk ke bar, menghampiri dua tabel, lalu bertanya: 'Boleh JOIN?' 🍻",
    "Mengapa pengembang kehabisan uang? Karena seluruh cache-nya sudah habis! 💸",
    "Bagaimana menghibur bug JavaScript? Tampilkan ke console. ❤️",
    "Programmer sejati mulai menghitung dari 0."
  ];

  const TECH_QUOTES = [
    '"Bicara itu mudah. Tunjukkan kodenya." - Linus Torvalds',
    '"Siapa pun bisa menulis kode yang dipahami komputer. Programmer yang baik menulis kode yang dipahami manusia." - Martin Fowler',
    '"Kesederhanaan adalah prasyarat keandalan." - Edsger W. Dijkstra',
    '"Selesaikan masalahnya terlebih dahulu. Setelah itu, tulis kodenya." - John Johnson'
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

    appendLine(`<span class="text-cyan-400">naufal@infra:~$</span> ${trimmed}`, true);

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
        appendLine(`<span class="text-cyan-400">🚀 Membuka detail interaktif proyek ${pNum}...</span>`);
        if (window.openProjectModalByIndex) {
          window.openProjectModalByIndex(pNum - 1);
        }
      } else {
        appendLine(`<span class="text-amber-400">Pilih nomor proyek dari 1 sampai 4. Contoh: 'project 1'</span>`);
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
        appendLine(`<span class="text-amber-400">Berkas tidak ditemukan. Coba: <strong>cat cv.txt</strong></span>`);
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
  <div class="text-emerald-400">Sedang berada di cabang main</div>
  <div>Cabang Anda sudah mutakhir dengan 'origin/production'.</div>
  <div class="text-cyan-300 mt-1">Perubahan siap diterapkan:</div>
  <div class="text-emerald-300 pl-4">✔ Portal Kelurahan Cibubur (Next.js/Express/PostgreSQL)</div>
  <div class="text-emerald-300 pl-4">✔ Sistem Manajemen Sekolah (C# ASP.NET MVC/Dapper)</div>
  <div class="text-emerald-300 pl-4">✔ Sistem Piket Sekolah E-Piket (PHP Native/MySQL)</div>
  <div class="text-emerald-300 pl-4">✔ Toko Bahan Bangunan JeWePe (Laravel/MySQL)</div>
  <div class="text-slate-400 mt-1">tidak ada perubahan untuk disimpan, siap bergabung dengan tim Anda! 🚀</div>
</div>`);
      } else if (arg === 'log') {
        appendLine(`<div class="space-y-1 text-xs font-mono">
  <div><span class="text-amber-400">commit 9f4a12</span> - fitur: Membuat Portal Kelurahan Cibubur (Next.js, Express, PostgreSQL)</div>
  <div><span class="text-amber-400">commit 7b3d90</span> - fitur: Mengembangkan Sistem Manajemen Sekolah dengan C# ASP.NET MVC</div>
  <div><span class="text-amber-400">commit 4c8e61</span> - fitur: Menerapkan Sistem Piket & Kehadiran E-Piket dengan PHP Native</div>
  <div><span class="text-amber-400">commit 2a1f05</span> - fitur: Membuat Toko Bahan Bangunan JeWePe dengan Laravel MVC</div>
  <div><span class="text-amber-400">commit 0e89aa</span> - lulus: Meraih gelar Sarjana Teknik Informatika dari Universitas Gunadarma</div>
</div>`);
      } else {
        appendLine(`<span class="text-amber-400">Subperintah git yang tersedia: <strong>git status</strong> atau <strong>git log</strong></span>`);
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
  <div class="text-emerald-400 font-bold mt-1">--- statistik ping ${target} ---</div>
  <div>4 paket dikirim, 4 paket diterima, kehilangan paket 0,0%</div>
  <div class="text-cyan-300">Status koneksi Cisco LAN/WAN: SANGAT BAIK ✅</div>
</div>`);
      return;
    }

    if (cmd === 'calc') {
      if (!arg) {
        appendLine(`<span class="text-amber-400">Penggunaan: calc &lt;ekspresi matematika&gt;. Contoh: <strong>calc 25 * 4</strong></span>`);
        return;
      }
      try {
        const sanitized = arg.replace(/[^0-9+*\/().\s-]/g, '');
        const result = Function(`'use strict'; return (${sanitized})`)();
        appendLine(`<span class="text-cyan-300">${arg}</span> = <span class="text-emerald-400 font-bold">${result}</span>`);
      } catch (err) {
        appendLine(`<span class="text-red-400">Ekspresi matematika tidak dapat dihitung.</span>`);
      }
      return;
    }

    if (cmd === 'sound') {
      if (window.sfx) {
        if (arg === 'on') {
          if (!window.sfx.enabled) window.sfx.toggle();
          appendLine(`<span class="text-emerald-400">🔊 Efek suara: AKTIF</span>`);
        } else if (arg === 'off') {
          if (window.sfx.enabled) window.sfx.toggle();
          appendLine(`<span class="text-slate-400">🔇 Efek suara: NONAKTIF</span>`);
        } else {
          appendLine(`Status efek suara saat ini: <strong>${window.sfx.enabled ? 'AKTIF 🔊' : 'NONAKTIF 🔇'}</strong>. Gunakan: 'sound on' atau 'sound off'`);
        }
      }
      return;
    }

    if (cmd === 'coffee' || cmd === 'brew') {
      appendLine(`<div class="text-amber-400 font-mono">
  ☕ Menyeduh secangkir kopi Arabika hangat...
  [████████████████████] 100%
  <span class="text-emerald-400">Kopi siap! Semangat untuk menulis kode yang rapi dan bebas bug telah pulih.</span>
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
        appendLine(`Belum ada riwayat perintah.`);
      } else {
        const hist = commandHistory.map((h, i) => `${i + 1}. ${h}`).join('<br>');
        appendLine(`<div class="text-slate-400 font-mono text-xs">${hist}</div>`);
      }
      return;
    }

    if (cmd === 'whatsapp' || cmd === 'wa') {
      appendLine('<span class="text-emerald-400">Mengalihkan ke percakapan WhatsApp...</span>');
      window.open('https://wa.me/6287773862920?text=Halo%20Naufal,%20saya%20tertarik%20dengan%20portofolio%20Anda!', '_blank');
      return;
    }

    if (cmd === 'download' || cmd === 'cv' || cmd === 'resume') {
      appendLine('<span class="text-emerald-400">📥 Memulai pengunduhan CV...</span>');
      const link = document.createElement('a');
      link.href = 'assets/docs/Naufal_Fikri_CV_ATS.pdf?v=20261125-2324';
      link.download = 'Naufal_Fikri_CV_ATS.pdf';
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
      appendLine(`<span class="text-emerald-400">Mode Matrix: ${next === 'matrix' ? 'AKTIF ⚡' : 'NONAKTIF'}</span>`);
      return;
    }

    if (cmd === 'theme') {
      if (['dark', 'light', 'matrix'].includes(arg)) {
        document.documentElement.setAttribute('data-theme', arg);
        localStorage.setItem('portfolio-theme', arg);
        const themeNames = { dark: 'gelap', light: 'terang', matrix: 'matrix' };
        appendLine(`<span class="text-cyan-400">Tema diubah menjadi: <strong>${themeNames[arg]}</strong></span>`);
      } else {
        appendLine(`<span class="text-amber-400">Tema yang tersedia: dark, light, matrix. Penggunaan: 'theme light'</span>`);
      }
      return;
    }

    if (trimmed.toLowerCase() === 'sudo hire' || cmd === 'hire') {
      appendLine(`<div class="text-emerald-400 font-bold text-base">🎉 AKSES DIBERIKAN: Naufal Fikri siap bergabung dengan tim Anda!</div>
<div class="text-cyan-300">Cepat belajar, berpengalaman dalam diagnostik Dukungan TI dan pengembangan web. Bersedia relokasi dan bekerja di kantor!</div>
<div class="text-slate-300 mt-1">Menampilkan konfeti perayaan dan membuka WhatsApp...</div>`);
      
      if (window.confetti) {
        window.confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }

      setTimeout(() => {
        window.open('https://wa.me/6287773862920?text=Halo%20Naufal,%20kami%20ingin%20menawarkan%20peluang%20kerja!', '_blank');
      }, 1200);
      return;
    }

    if (cmd === 'date' || cmd === 'time') {
      appendLine(new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'long' }));
      return;
    }

    if (cmd === 'echo') {
      appendLine(arg);
      return;
    }

    appendLine(`<span class="text-red-400">Perintah tidak ditemukan: '${trimmed}'.</span> Ketik <span class="text-cyan-400">help</span> untuk melihat daftar perintah.`);
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
    if (e.key === 'Escape' && terminalModal && !terminalModal.classList.contains('hidden')) {
      closeTerminal();
    }
  });

  window.openTerminalModal = openTerminal;
})();
