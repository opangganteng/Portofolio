/**
 * Main Application Logic & Interactivity
 * Naufal Fikri Portfolio
 */

// Project Data Store for Rich Interactive Modal
const PROJECTS_DATA = [
  {
    id: 1,
    title: "Sistem Pengelolaan Piket Sekolah (E-Piket)",
    period: "Juli 2026 – September 2026",
    type: "Proyek Mandiri",
    category: "php",
    categoryLabel: "PHP Native · MySQL",
    role: "Pengembang Web Menyeluruh",
    badge: "Proyek Mandiri",
    heroGradient: "from-blue-700 via-indigo-700 to-cyan-600",
    summary: "Mengembangkan aplikasi web pengelolaan piket sekolah dari awal menggunakan PHP native dengan lebih dari lima modul CRUD: guru, siswa, kelas, ruangan, dan tahun ajaran.",
    tags: ["PHP Native", "MySQL", "HTML5", "CSS3", "JavaScript", "Modul CRUD", "Dasbor Admin"],
    architecture: "Arsitektur modular PHP native yang dikembangkan tanpa framework eksternal untuk memahami siklus sesi, perutean permintaan HTTP, dan operasi basis data relasional MySQL secara langsung.",
    keyFeatures: [
      "Mengembangkan aplikasi web pengelolaan piket sekolah dari awal menggunakan PHP native dengan lebih dari lima modul CRUD: guru, siswa, kelas, ruangan, dan tahun ajaran.",
      "Membuat fitur penjadwalan piket, pencatatan kehadiran, serta pencatatan ketidakhadiran dan keterlambatan siswa.",
      "Membuat dasbor admin untuk memantau seluruh kegiatan piket sekolah.",
      "Merancang basis data relasional MySQL, menerapkan aplikasi secara daring, dan memperbaiki kesalahan yang ditemukan saat pengujian."
    ],
    dbHighlights: "Merancang skema basis data relasional MySQL dengan integritas referensial antara data guru, kelas, semester, dan catatan kehadiran.",
    techTakeaway: "Menunjukkan dasar pemrograman dan desain basis data yang kuat, serta kemampuan menangani masalah dari tahap pengembangan hingga pengujian langsung."
  },
  {
    id: 2,
    title: "Toko Bahan Bangunan JeWePe",
    period: "Mei 2026 – Juni 2026",
    type: "Proyek Mandiri",
    category: "laravel",
    categoryLabel: "PHP · Laravel · MySQL",
    role: "Pengembang Sisi Server & Web",
    badge: "Proyek Mandiri",
    heroGradient: "from-cyan-700 via-blue-700 to-indigo-800",
    summary: "Mengembangkan sistem pengelolaan produk dan inventaris toko bahan bangunan menggunakan Laravel untuk menggantikan pencatatan manual dan mendukung operasional toko sehari-hari.",
    tags: ["PHP", "Laravel", "MySQL", "Arsitektur MVC", "Pengelolaan Inventaris", "CRUD"],
    architecture: "Pola desain MVC Laravel yang memisahkan logika bisnis, pemrosesan pengendali, model Eloquent ORM, dan tampilan.",
    keyFeatures: [
      "Mengembangkan sistem pengelolaan produk dan inventaris toko bahan bangunan menggunakan Laravel.",
      "Menerapkan fitur CRUD berbasis basis data untuk menggantikan pencatatan manual dan mendukung operasional toko sehari-hari.",
      "Menggunakan struktur MVC Laravel untuk memisahkan logika aplikasi dari pemrosesan data.",
      "Membuat kueri basis data relasional untuk melacak stok bahan bangunan secara akurat."
    ],
    dbHighlights: "Desain basis data MySQL untuk mendukung klasifikasi produk, data pemasok, dan riwayat transaksi inventaris dengan kunci asing.",
    techTakeaway: "Memahami prinsip arsitektur MVC dan alur kerja CRUD berbasis basis data untuk mengotomatisasi proses bisnis operasional."
  },
  {
    id: 3,
    title: "Situs Informasi Kelurahan Cibubur",
    period: "September 2025 – November 2025",
    type: "Proyek Mandiri",
    category: "fullstack",
    categoryLabel: "Next.js · React · Express.js · PostgreSQL",
    role: "Pengembang Web Menyeluruh",
    badge: "Proyek Mandiri",
    heroGradient: "from-slate-800 via-blue-900 to-cyan-700",
    summary: "Membuat situs informasi kelurahan dengan antarmuka Next.js yang terhubung ke layanan REST Express.js di sisi server dan basis data PostgreSQL.",
    tags: ["Next.js", "React", "Express.js", "Node.js", "PostgreSQL", "REST API", "Responsif"],
    architecture: "Arsitektur web menyeluruh yang memisahkan lapisan tampilan Next.js/React dan lapisan layanan Node.js/Express.js di sisi server melalui titik akhir REST API.",
    keyFeatures: [
      "Membuat situs informasi kelurahan dengan antarmuka Next.js yang terhubung ke layanan REST Express.js di sisi server.",
      "Merancang skema PostgreSQL untuk menyimpan dan mengelola konten layanan warga yang dinamis.",
      "Menerapkan tata letak responsif untuk desktop dan ponsel.",
      "Menerapkan situs secara daring dan memperbaiki kesalahan yang ditemukan pada versi aktif."
    ],
    dbHighlights: "Skema relasional PostgreSQL yang dirancang untuk katalog layanan warga dinamis, data administrasi publik, dan pengindeksan konten.",
    techTakeaway: "Memahami kontrak RESTful API, komunikasi klien-server, penyelesaian bug pada lingkungan produksi, dan pengembangan responsif untuk perangkat seluler."
  },
  {
    id: 4,
    title: "Sistem Manajemen Sekolah",
    period: "Juli 2025 – September 2025",
    type: "Proyek Mandiri",
    category: "csharp",
    categoryLabel: "C# · ASP.NET MVC · Dapper · SQL Server",
    role: "Pengembang Web Menyeluruh",
    badge: "Proyek Mandiri",
    heroGradient: "from-blue-900 via-indigo-800 to-sky-700",
    summary: "Mengembangkan sistem pengelolaan data sekolah dengan arsitektur MVC untuk memisahkan logika bisnis, tampilan, dan data, serta kueri Dapper berlatensi rendah ke SQL Server.",
    tags: ["C#", "ASP.NET MVC", "Dapper", "SQL Server", "Basis Data Relasional", "CRUD"],
    architecture: "Arsitektur Microsoft .NET MVC yang memisahkan logika bisnis, tampilan UI Razor, dan lapisan akses data khusus berkinerja tinggi menggunakan micro-ORM Dapper.",
    keyFeatures: [
      "Mengembangkan sistem pengelolaan data sekolah dengan arsitektur MVC untuk memisahkan logika bisnis, tampilan, dan data.",
      "Membuat fungsi CRUD untuk data induk sekolah menggunakan Dapper sebagai lapisan akses data ke SQL Server.",
      "Merancang skema relasional untuk pengelolaan informasi sekolah yang terstruktur.",
      "Menerapkan aplikasi secara daring dan memperbaiki kesalahan yang ditemukan saat pengujian."
    ],
    dbHighlights: "Desain basis data Microsoft SQL Server dengan batasan relasional, kunci terindeks, dan kueri berparameter yang dioptimalkan menggunakan Dapper ORM.",
    techTakeaway: "Memahami teknologi Microsoft untuk perusahaan, pemodelan skema relasional, optimasi akses data, dan penanganan kesalahan yang andal."
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
      if (soundText) soundText.innerText = 'Suara: AKTIF';
    } else {
      if (soundToggleBtn) soundToggleBtn.classList.remove('text-cyan-400');
      if (soundIcon) soundIcon.setAttribute('data-lucide', 'volume-x');
      if (soundText) soundText.innerText = 'Suara: NONAKTIF';
    }
    if (window.lucide) window.lucide.createIcons();
  }

  if (soundToggleBtn) {
    updateSoundUI();
    soundToggleBtn.addEventListener('click', () => {
      const state = sfx.toggle();
      updateSoundUI();
      if (state) sfx.click();
      showToast(state ? 'Efek suara diaktifkan 🔊' : 'Efek suara dinonaktifkan 🔇');
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
      const themeNames = { dark: 'gelap', light: 'terang', matrix: 'matrix' };
      showToast(`Tema diubah: ${themeNames[next]}`);
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
      "Lulusan Baru Teknik Informatika",
      "Teknologi Informasi & Sistem",
      "Pengembangan Aplikasi & Basis Data",
      "Operasional & Dukungan Teknis",
      "Siap Belajar dan Berkembang"
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
  const skillFilterBtns = document.querySelectorAll('.skill-tab-btn');
  const skillGroups = document.querySelectorAll('.skill-card-group');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.click();
      skillFilterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      skillGroups.forEach(group => {
        const isVisible = filter === 'all' || group.id === `skill-group-${filter}`;
        group.classList.toggle('hidden', !isVisible);
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
    if (modalRole) modalRole.textContent = `${project.type} • ${project.period} • ${project.categoryLabel}`;
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

  document.querySelectorAll('.open-project-modal-btn').forEach(btn => {
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

  // Certificate PDF preview modal
  const certificateModal = document.getElementById('certificate-modal');
  const certificateModalTitle = document.getElementById('certificate-modal-title');
  const certificateModalFrame = document.getElementById('certificate-modal-frame');
  const certificateModalDownload = document.getElementById('certificate-modal-download');
  const certificateModalClose = document.getElementById('certificate-modal-close');
  let certificateModalTrigger = null;

  function closeCertificateModal() {
    if (!certificateModal) return;
    certificateModal.classList.remove('active');
    certificateModal.setAttribute('aria-hidden', 'true');
    if (certificateModalFrame) certificateModalFrame.removeAttribute('src');
    document.body.style.overflow = '';
    certificateModalTrigger?.focus();
    certificateModalTrigger = null;
  }

  document.querySelectorAll('.view-certificate-btn').forEach(button => {
    button.addEventListener('click', () => {
      if (!certificateModal || !certificateModalTitle || !certificateModalFrame || !certificateModalDownload) return;
      const source = button.dataset.certificateSrc;
      const title = button.dataset.certificateTitle;
      if (!source || !title) return;

      certificateModalTrigger = button;
      certificateModalTitle.textContent = title;
      certificateModalFrame.title = `Pratinjau sertifikat: ${title}`;
      certificateModalFrame.src = source;
      certificateModalDownload.href = source;
      certificateModalDownload.download = decodeURIComponent(source.split('/').pop() || 'sertifikat.pdf');
      certificateModal.classList.add('active');
      certificateModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      certificateModalClose?.focus();
    });
  });

  certificateModalClose?.addEventListener('click', closeCertificateModal);
  certificateModal?.addEventListener('click', (event) => {
    if (event.target === certificateModal) closeCertificateModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('show')) {
      closeProjectModal();
    }
    if (e.key === 'Escape' && certificateModal?.classList.contains('active')) {
      closeCertificateModal();
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileNav) {
    const hamburgerIcon = document.getElementById('hamburger-icon');

    mobileMenuBtn.addEventListener('click', () => {
      sfx.click();
      mobileNav.classList.toggle('hidden');
      const isOpen = !mobileNav.classList.contains('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
      if (hamburgerIcon) {
        hamburgerIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        if (window.lucide) window.lucide.createIcons();
      }
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Buka menu navigasi');
        if (hamburgerIcon) {
          hamburgerIcon.setAttribute('data-lucide', 'menu');
          if (window.lucide) window.lucide.createIcons();
        }
      });
    });
  }

  const navLinks = document.querySelectorAll('.navbar-links a[href^="#"], .mobile-nav-link[href^="#"]');
  const navSections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && navSections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      const visibleEntry = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) return;

      navLinks.forEach(link => {
        link.classList.toggle('nav-active', link.getAttribute('href') === `#${visibleEntry.target.id}`);
      });
    }, {
      rootMargin: '-18% 0px -62% 0px',
      threshold: [0.05, 0.25, 0.5]
    });

    navSections.forEach(section => navObserver.observe(section));
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
        showToast('📋 Alamat email berhasil disalin: naufalfik777@gmail.com');
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
        showToast('⚠️ Masukkan nama dan pesan terlebih dahulu.');
        return;
      }

      sfx.success();
      if (window.confetti) {
        window.confetti({ particleCount: 70, spread: 60 });
      }

      const text = `Halo Naufal Fikri,\n\nNama: ${name}\nEmail: ${email || '-'}\n\nPesan:\n${message}\n\n(Dikirim melalui situs portofolio)`;
      const url = `https://wa.me/6287773862920?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
      showToast('🚀 Membuka percakapan WhatsApp...');
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
        showToast('⚠️ Masukkan nama dan pesan terlebih dahulu.');
        return;
      }

      sfx.success();
      if (window.confetti) {
        window.confetti({ particleCount: 70, spread: 60 });
      }

      const body = `Halo Naufal Fikri,\n\nNama Pengirim: ${name}\nEmail Pengirim: ${email}\n\nPesan:\n${message}`;
      const mailto = `mailto:naufalfik777@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      showToast('📧 Membuka aplikasi email...');
    });
  }
});
