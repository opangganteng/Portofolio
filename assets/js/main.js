/**
 * Main Application Logic & Interactivity
 * Naufal Fikri Portfolio
 */

// Project Data Store for Rich Interactive Modal
const PROJECTS_DATA = [
  {
    id: 1,
    title: "Kelurahan Cibubur Information Website",
    category: "fullstack",
    categoryLabel: "Next.js & Express.js",
    role: "Full Stack Developer",
    badge: "Public Service Web App",
    heroGradient: "from-blue-600 via-indigo-600 to-cyan-500",
    summary: "Sistem website informasi kelurahan terpadu yang dibangun dari sisi front-end hingga back-end untuk mendigitalkan layanan warga serta diseminasi informasi publik.",
    tags: ["Next.js", "Express.js", "PostgreSQL", "Tailwind CSS", "REST API", "Responsive Design"],
    architecture: "Full-Stack Decoupled Architecture: Front-end modern dengan Next.js yang terhubung melalui RESTful API ke Express.js server, dengan PostgreSQL sebagai database relasional utama.",
    keyFeatures: [
      "Integrasi penuh end-to-end antara front-end Next.js dan back-end Express.js.",
      "Perancangan skema relasional database PostgreSQL untuk menyimpan konten layanan warga yang dinamis.",
      "Layout responsif yang dioptimalkan secara konsisten di perangkat smartphone, tablet, maupun desktop.",
      "Arsitektur kode modular berbasis komponen untuk mempermudah maintenance dan pengembangan fitur masa depan."
    ],
    dbHighlights: "PostgreSQL relational schema dengan normalisasi data untuk pelayanan kependudukan, pengumuman warga, dan log aktivitas.",
    techTakeaway: "Memperkuat keahlian integrasi API lintas domain, pengelolaan state di Next.js, dan optimasi performa query database relasional."
  },
  {
    id: 2,
    title: "School Management System",
    category: "csharp",
    categoryLabel: "C# · ASP.NET MVC",
    role: "Full Stack Developer (Independent Project)",
    badge: "Enterprise Web App",
    heroGradient: "from-purple-600 via-indigo-700 to-blue-600",
    summary: "Sistem tata kelola data sekolah komprehensif mengadopsi arsitektur MVC enterprise untuk memisahkan business logic, user interface, dan akses data.",
    tags: ["C#", "ASP.NET MVC", "Dapper ORM", "SQL Server", "MVC Architecture", "CRUD"],
    architecture: "Enterprise MVC Pattern: Pemisahan tegas Model-View-Controller dengan Dapper sebagai lightweight ORM untuk eksekusi query cepat ke database Microsoft SQL Server.",
    keyFeatures: [
      "Penerapan arsitektur MVC untuk pemisahan logika bisnis, Razor views, dan layer akses data secara bersih.",
      "Implementasi fungsionalitas CRUD lengkap untuk master data sekolah (siswa, guru, kelas, mata pelajaran).",
      "Pemanfaatan Dapper ORM untuk efisiensi transfer data dengan latensi minimal ke Microsoft SQL Server.",
      "Perancangan skema database relasional dengan foreign key constraints untuk menjaga integritas data akademik."
    ],
    dbHighlights: "Microsoft SQL Server dengan tabel berelasi one-to-many & many-to-many, dioptimalkan dengan indeks performa dan parameterized queries via Dapper.",
    techTakeaway: "Menguasai struktur C# .NET ecosystem, pola arsitektur MVC enterprise, serta pencegahan SQL Injection dengan Dapper ORM."
  },
  {
    id: 3,
    title: "E-Piket: School Duty Management System",
    category: "php",
    categoryLabel: "PHP Native · MySQL",
    role: "PHP Developer (Independent Project)",
    badge: "Real-time School System",
    heroGradient: "from-emerald-600 via-teal-700 to-cyan-600",
    summary: "Sistem manajemen operasional piket harian sekolah yang dirancang dari nol menggunakan PHP Native dengan 5+ modul CRUD dan dashboard monitoring real-time.",
    tags: ["PHP Native", "MySQL", "HTML5", "CSS3", "JavaScript", "Admin Dashboard"],
    architecture: "Custom Modular Native PHP: Dibangun tanpa framework eksternal untuk memperdalam pemahaman mendasar seputar HTTP request handling, session management, dan database connection pooling.",
    keyFeatures: [
      "Mencakup 5+ modul CRUD lengkap: Guru Piket, Siswa, Kelas, Ruang Kelas, dan Tahun Ajaran.",
      "Fitur penjadwalan jadwal piket mingguan dan pencatatan absensi piket terstruktur.",
      "Pencatatan log ketidakhadiran dan keterlambatan siswa secara detail dan tercatat di database.",
      "Dashboard admin interaktif untuk pemantauan seluruh aktivitas piket sekolah secara real-time.",
      "Desain skema database relasional MySQL yang menopang seluruh dependensi data aplikasi."
    ],
    dbHighlights: "Relational database MySQL dengan trigger logika bisnis sederhana dan query aggregation untuk laporan statistik kehadiran harian.",
    techTakeaway: "Pemahaman fundamental yang kokoh mengenai siklus hidup aplikasi web, keamanan dasar (XSS/CSRF prevention), dan query native SQL."
  },
  {
    id: 4,
    title: "JeWePe Toko Bahan Bangunan",
    category: "php",
    categoryLabel: "PHP · Laravel",
    role: "Full Stack Developer (Independent Project)",
    badge: "Inventory & POS System",
    heroGradient: "from-rose-600 via-orange-600 to-amber-500",
    summary: "Aplikasi manajemen produk, katalog barang, serta monitoring inventaris stok untuk toko material bahan bangunan berbasis framework Laravel.",
    tags: ["PHP", "Laravel", "MySQL", "Bootstrap", "Inventory CRUD", "MVC"],
    architecture: "Laravel MVC Ecosystem: Memanfaatkan Routing, Controllers, Eloquent ORM, Blade Templating, dan Database Migrations untuk siklus pengembangan yang terstruktur.",
    keyFeatures: [
      "Sistem katalog produk dan inventarisasi material bangunan dengan tracking stok secara akurat.",
      "Fitur CRUD berbasis database untuk mendukung operasional inventaris harian toko.",
      "Penerapan struktur MVC Laravel guna memisahkan kode tampilan antarmuka dari logika komputasi data.",
      "Desain database relasional MySQL untuk mencatat data kategori, supplier, produk, dan log mutasi barang."
    ],
    dbHighlights: "Schema relational MySQL dengan integrasi foreign key yang dikelola melalui Laravel Migrations & relasi Eloquent Model.",
    techTakeaway: "Kemahiran memanfaatkan ekosistem Laravel modern, validasi request form otomatis, dan pengelolaan data relasional secara efisien."
  }
];

// ==========================================
// Web Audio API - Interactive Sound System
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('portfolio-sound') === 'true';
    this.initAudioContext();
  }

  initAudioContext() {
    if (!this.ctx && typeof window.AudioContext !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('portfolio-sound', this.enabled ? 'true' : 'false');
    if (this.enabled && (!this.ctx || this.ctx.state === 'suspended')) {
      this.initAudioContext();
      this.ctx.resume();
    }
    return this.enabled;
  }

  playBeep(freq = 600, type = 'sine', duration = 0.05, gainValue = 0.04) {
    if (!this.enabled) return;
    try {
      this.initAudioContext();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio not supported or blocked by browser policy
    }
  }

  click() {
    this.playBeep(880, 'sine', 0.04, 0.03);
  }

  modalOpen() {
    this.playBeep(520, 'triangle', 0.08, 0.04);
  }

  modalClose() {
    this.playBeep(380, 'triangle', 0.06, 0.04);
  }

  success() {
    if (!this.enabled) return;
    setTimeout(() => this.playBeep(523, 'sine', 0.08, 0.05), 0);
    setTimeout(() => this.playBeep(659, 'sine', 0.08, 0.05), 90);
    setTimeout(() => this.playBeep(784, 'sine', 0.15, 0.06), 180);
  }
}

const sfx = new SoundFX();
window.sfx = sfx;
window.playKeySound = () => sfx.playBeep(920, 'sine', 0.015, 0.02);

// ==========================================
// DOM Ready Controller
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons Render
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Sound FX UI Button
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  const soundText = document.getElementById('sound-text');

  function updateSoundUI() {
    if (sfx.enabled) {
      if (soundToggleBtn) soundToggleBtn.classList.add('text-cyan-400');
      if (soundIcon) soundIcon.setAttribute('data-lucide', 'volume-2');
      if (soundText) soundText.innerText = 'Sound: ON';
    } else {
      if (soundToggleBtn) soundToggleBtn.classList.remove('text-cyan-400');
      if (soundIcon) soundIcon.setAttribute('data-lucide', 'volume-x');
      if (soundText) soundText.innerText = 'Sound: OFF';
    }
    if (window.lucide) window.lucide.createIcons();
  }

  if (soundToggleBtn) {
    updateSoundUI();
    soundToggleBtn.addEventListener('click', () => {
      const state = sfx.toggle();
      updateSoundUI();
      if (state) sfx.click();
      showToast(state ? 'Efek audio diaktifkan 🔊' : 'Efek audio dinonaktifkan 🔇');
    });
  }

  // Theme Management
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeIcons = {
    dark: 'moon',
    light: 'sun',
    matrix: 'terminal'
  };

  function updateThemeButton(theme) {
    const iconEl = document.getElementById('theme-icon');
    if (iconEl && themeIcons[theme]) {
      iconEl.setAttribute('data-lucide', themeIcons[theme]);
      if (window.lucide) window.lucide.createIcons();
    }
  }
  updateThemeButton(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      sfx.click();
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      let next = 'light';
      if (current === 'light') next = 'matrix';
      else if (current === 'matrix') next = 'dark';
      else next = 'light';

      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
      updateThemeButton(next);
      showToast(`Tema diubah: ${next.toUpperCase()}`);
    });
  }

  // Reading Progress Bar
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';

    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      if (winScroll > 300) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      }
    }
  });

  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      sfx.click();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Custom Cursor
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing && window.innerWidth > 768) {
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderRing);
    }
    renderRing();

    // Hover interactive elements
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .glass-card, .filter-btn, .interactive-hover');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // Dynamic Typewriter Hero
  const typewriterEl = document.getElementById('typewriter-text');
  if (typewriterEl) {
    const roles = [
      "Junior Full Stack Developer",
      "Backend & MVC Architecture Specialist",
      "Modern Web Developer (Next.js & Laravel)",
      "Informatics Engineering Graduate",
      "Reliable IT Support & Problem Solver"
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeLoop() {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 45;
      } else {
        typewriterEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typingSpeed = 1800; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingSpeed = 350;
      }

      setTimeout(typeLoop, typingSpeed);
    }
    typeLoop();
  }

  // Skills Filter
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.click();
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => card.classList.add('hidden'), 200);
        }
      });
    });
  });

  // Project Category Filter
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.click();
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => card.classList.add('hidden'), 200);
        }
      });
    });
  });

  // Project Modal Logic
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalRole = document.getElementById('modal-role');
  const modalSummary = document.getElementById('modal-summary');
  const modalTags = document.getElementById('modal-tags');
  const modalArch = document.getElementById('modal-arch');
  const modalFeatures = document.getElementById('modal-features');
  const modalDb = document.getElementById('modal-db');
  const modalTakeaway = document.getElementById('modal-takeaway');
  const modalBanner = document.getElementById('modal-banner');

  function openProjectModal(index) {
    const project = PROJECTS_DATA[index];
    if (!project) return;
    sfx.modalOpen();

    if (modalTitle) modalTitle.textContent = project.title;
    if (modalRole) modalRole.textContent = `${project.role} • ${project.categoryLabel}`;
    if (modalSummary) modalSummary.textContent = project.summary;
    if (modalArch) modalArch.textContent = project.architecture;
    if (modalDb) modalDb.textContent = project.dbHighlights;
    if (modalTakeaway) modalTakeaway.textContent = project.techTakeaway;

    if (modalBanner) {
      modalBanner.className = `p-6 md:p-8 rounded-2xl bg-gradient-to-r ${project.heroGradient} text-white shadow-xl relative overflow-hidden`;
    }

    if (modalTags) {
      modalTags.innerHTML = project.tags
        .map(t => `<span class="px-3 py-1 text-xs font-mono rounded-full bg-white/20 backdrop-blur-sm border border-white/25 text-white">${t}</span>`)
        .join('');
    }

    if (modalFeatures) {
      modalFeatures.innerHTML = project.keyFeatures
        .map(f => `<li class="flex items-start gap-2.5 text-sm text-slate-300"><span class="text-cyan-400 mt-1 font-bold">✓</span><span>${f}</span></li>`)
        .join('');
    }

    if (projectModal) {
      projectModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeProjectModal() {
    if (!projectModal) return;
    sfx.modalClose();
    projectModal.classList.remove('show');
    document.body.style.overflow = '';
  }

  window.openProjectModalByIndex = openProjectModal;

  document.querySelectorAll('.open-modal-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pId = parseInt(btn.getAttribute('data-project-id'), 10);
      const idx = PROJECTS_DATA.findIndex(p => p.id === pId);
      if (idx !== -1) openProjectModal(idx);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('show')) {
      closeProjectModal();
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      sfx.click();
      mobileNav.classList.toggle('hidden');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
      });
    });
  }

  // Toast System
  function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, duration);
  }
  window.showToast = showToast;

  // Copy Email & WhatsApp helpers
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.click();
      navigator.clipboard.writeText('naufalfik777@gmail.com').then(() => {
        showToast('📋 Email berhasil disalin: naufalfik777@gmail.com');
      }).catch(() => {
        showToast('naufalfik777@gmail.com');
      });
    });
  });

  const copyPhoneBtns = document.querySelectorAll('.copy-phone-btn');
  copyPhoneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.click();
      navigator.clipboard.writeText('+6287773862920').then(() => {
        showToast('📋 Nomor WhatsApp berhasil disalin: +62 877-7386-2920');
      });
    });
  });

  // Interactive Contact Form Handling
  const contactForm = document.getElementById('interactive-contact-form');
  const sendWaBtn = document.getElementById('send-wa-btn');
  const sendEmailBtn = document.getElementById('send-email-btn');

  if (sendWaBtn && contactForm) {
    sendWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sfx.click();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !message) {
        showToast('⚠️ Silakan isi nama dan pesan Anda terlebih dahulu.');
        return;
      }

      sfx.success();
      if (window.confetti) {
        window.confetti({ particleCount: 70, spread: 60 });
      }

      const text = `Halo Naufal Fikri,\n\nNama: ${name}\nEmail: ${email || '-'}\n\nPesan:\n${message}\n\n(Dikirim via Portofolio Web)`;
      const url = `https://wa.me/6287773862920?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
      showToast('🚀 Membuka WhatsApp chat...');
    });
  }

  if (sendEmailBtn && contactForm) {
    sendEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sfx.click();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject')?.value.trim() || 'Peluang Kerja / Kolaborasi';
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !message) {
        showToast('⚠️ Silakan isi nama dan pesan Anda terlebih dahulu.');
        return;
      }

      sfx.success();
      if (window.confetti) {
        window.confetti({ particleCount: 70, spread: 60 });
      }

      const body = `Halo Naufal Fikri,\n\nNama Pengirim: ${name}\nEmail Pengirim: ${email}\n\nPesan:\n${message}`;
      const mailto = `mailto:naufalfik777@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      showToast('📧 Membuka aplikasi email Anda...');
    });
  }
});
