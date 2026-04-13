'use strict';

(function initTranslator() {

  const SUPPORTED = ['ms', 'en', 'jp', 'kr'];
  const LABELS    = { ms: '🇲🇾 MY', en: '🇬🇧 EN', jp: '🇯🇵 JP', kr: '🇰🇷 KR' };
  const DEFAULT   = 'ms';

  const LANG_DATA = {
    ms: {
      /* NAV */
      nav_about: "Tentang",
      nav_projects: "Projek",
      nav_server: "Pelayan",
      nav_contact: "Hubungi",

      /* HERO */
      hero_tag: "Terbuka untuk peluang kerja",
      hero_title: "IMS IT · <span>Sistem Maklumat</span> · Juruteknik &amp; Pembangun Sistem",
      hero_desc: "Seorang <strong>Pembangun Sistem</strong> yang berpengalaman dalam <span class='hero-tech-tag'>PHP</span>, <span class='hero-tech-tag'>Laravel</span>, <span class='hero-tech-tag'>JavaScript</span>. Fokus membina penyelesaian digital yang kukuh dan aplikasi enterprise berskala.<br><br>Sedang melanjutkan pengajian <strong>Pasca Siswazah</strong> di <strong>UiTM Shah Alam</strong> dalam bidang <strong>Teknologi Maklumat</strong> untuk mendalami seni bina sistem maklumat.",
      hero_btn_projects: "Lihat Projek",
      hero_btn_contact: "Hubungi Saya",
      stat_projects: "Projek Dibina",
      stat_exp: "Pengalaman Industri",
      stat_stacks: "Tumpukan Teknologi",

      /* HERO AVATAR BADGES */
      badge_technician: "Juruteknik · LUNAS",
      badge_education: "IMS IT · UiTM",
      badge_freelancer: "Freelancer · Projek Solo",
      badge_dev: "Pembangun Sistem PHP",

      /* ABOUT */
      section_about_tag: "01 — Tentang Saya",
      section_about_title: "Abdul Shakir",
      about_status_label: "Status Semasa",
      about_status_value: "Pelajar Pasca Siswazah",
      about_status_sub: "Sarjana Sains dalam Teknologi Maklumat",
      about_edu_label: "Pendidikan",
      about_exp_label: "Pengalaman",
      exp1_role: "Pelatih IT — Jabatan Sistem Maklumat",
      exp1_desc: "Pengalaman hands-on dalam operasi IS naval, penyelenggaraan sistem, dan sokongan infrastruktur IT dalaman.",
      exp2_role: "Pembangun Web Bebas",
      exp2_company: "Projek Bebas",
      exp2_duration: "Berasaskan Projek",
      exp2_desc: "Membangun dan menggunakan Sistem Pengurusan Kandungan (WordPress) untuk sebuah Madrasah tempatan. Menguruskan persediaan domain, penyesuaian tema, dan menstrukturkan seni bina kandungan digital.",
      exp3_role: "Pembangun &amp; Pentadbir Sistem",
      exp3_company: "Projek Solo",
      exp3_duration: "Berterusan",
      exp3_desc: "Mengendalikan pelbagai persekitaran Linux (Kali, Mint) untuk pemasangan pelayan tempatan dan ujian. Membina aplikasi full-stack menggunakan PHP, Laravel, dan tindanan pembangunan tempatan yang disesuaikan.",
      about_p1: "Saya <strong>Abdul Shakir Hakim</strong>, seorang graduan <strong>Pengurusan Sistem Maklumat</strong> yang memfokuskan kepada pembangunan sistem logik dan infrastruktur digital. Selepas menamatkan ijazah sarjana muda, saya kini sedang melanjutkan pengajian di peringkat Sarjana (MSc in Information Technology) di <strong>UiTM Shah Alam</strong> untuk mendalami selok-belok pengurusan data dan seni bina sistem peringkat tinggi.",
      about_p2: "Pengalaman praktikal di jabatan Information Systems, <strong>Lumut Naval Shipyard (LUNAS)</strong> telah mendedahkan saya kepada operasi IT gred industri. Persekitaran kerja yang kritikal dan berdisiplin tinggi di pangkalan tentera laut tersebut membentuk standard saya dalam memastikan setiap aplikasi yang dibangunkan mempunyai tahap kebolehpercayaan, prestasi, dan keselamatan yang ketat sebelum digunakan.",
      about_p3: "Selain ekosistem korporat, saya aktif membina dan menyelenggara sistem secara peribadi, dari pembangunan web penuh (full-stack) hingga ke konfigurasi pelayan (server) Linux. Dalam aliran kerja moden, saya turut mengaplikasikan kepakaran sebagai <strong>Pakar Prom (Prompt Engineer)</strong>. Saya mengintegrasikan bantuan AI secara strategik untuk mempercepatkan penulisan kod, mengoptimumkan logik, dan menyelesaikan ralat (debugging). Ini memastikan proses pembangunan sistem menjadi jauh lebih efisien berbanding kaedah pengekodan manual tradisional.",
      skills_title: "Tindanan Teknologi &amp; Alatan",

      /* PROJECTS */
      section_projects_tag: "02 — Projek",
      section_projects_title: "<span>Kerja</span> Terpilih",
      featured_badge: "<i class='bx bxs-star'></i> Projek Pilihan",
      proj_lunas_title: "Sistem E-Shop LUNAS",
      proj_lunas_desc: "Sistem e-commerce dalaman untuk Lumut Naval Shipyard — pengurusan katalog, pesanan, dan transaksi secara digital.",
      proj_lunas_meta_type: "Latihan Industri",
      proj_lunas_meta_org: "LUNAS · Lumut",
      proj_detail_btn: "Lihat Butiran",
      proj_madrasah_title: "Portal CMS Madrasah",
      proj_madrasah_desc: "Platform CMS untuk institusi Madrasah — pengurusan kandungan, kos operasi dan maklumat awam secara mandiri.",
      proj_netsec_title: "Analisis Keselamatan Rangkaian",
      proj_netsec_desc: "Analisis kelemahan rangkaian menggunakan Wireshark dan Nmap — kenal pasti, dokumentasi, dan cadangan mitigasi ancaman.",

      /* SERVER SECTION */
      section_server_tag: "04 — Sistem Langsung",
      section_server_title: "Pelayan <span>Poket</span>",
      ps_desc: "Pelayan web peribadi berjalan di atas <strong>Vivo Y91i</strong> menggunakan <span class='ps-tag'>Termux</span> + <span class='ps-tag'>nginx</span> + <span class='ps-tag'>PHP-FPM</span> + <span class='ps-tag'>MariaDB</span>. Exposed melalui <span class='ps-tag'>ngrok</span> dan diproxy dengan <span class='ps-tag'>Cloudflare Workers</span>.",
      ps_spec_hardware_label: "Perkakasan",
      ps_spec_hardware_val: "Vivo Y91i · 2GB RAM",
      ps_spec_stack_label: "Tindanan",
      ps_spec_stack_val: "nginx · PHP 8.5 · MariaDB 12",
      ps_spec_tunnel_label: "Terowong",
      ps_spec_tunnel_val: "ngrok → Cloudflare Workers",
      ps_spec_uptime_label: "Nota Uptime",
      ps_spec_uptime_val: "Bergantung pada bateri telefon 😅",
      ps_launch_btn: "Lancar PocketServer",
      ps_terminal_title: "pelayan — status@vivo-y91i",
      ps_terminal_cmd: "ping pocketserver --semak",
      ps_terminal_checking: "# menyemak sambungan...",
      ps_offline_hint: "# pelayan mungkin tengah cas phone 😅",
      ps_visit_hint: "# klik Lancar PocketServer untuk lawati →",
      ps_connected: "> sambungan berjaya ✓",
      ps_failed: "> sambungan gagal ✗",

      /* CONTACT */
      section_contact_tag: "03 — Hubungi",
      section_contact_title: "Jom <span>Berhubung</span>",
      contact_desc: "Sama ada untuk peluang kerja, kolaborasi projek, atau perbincangan teknikal berkaitan pembangunan sistem dan IT — inbox saya sentiasa terbuka.",
      quick_info: "Maklumat Ringkas",
      location_label: "Lokasi",
      location_val: "Shah Alam, Selangor 🇲🇾",
      availability_label: "Ketersediaan",
      availability_val: "Terbuka untuk Peluang",
      interest_label: "Bidang Minat",
      interest_val: "Keselamatan Siber Asas · Sistem Maklumat<br/>Keselamatan Rangkaian Asas · Pembangunan Web<br/>Pembangunan Sistem · Sistem Maklumat Sumber Manusia (HRIS)",

      /* FOOTER */
      footer_hosted: "&copy; 2026 · Dihoskan di GitHub Pages",
      footer_top: "Atas",
      footer_about: "Tentang",
      footer_projects: "Projek"
    },

    en: {
      nav_about: "About",
      nav_projects: "Projects",
      nav_server: "Server",
      nav_contact: "Contact",

      hero_tag: "Available for opportunities",
      hero_title: "IMS IT · <span>Information Systems</span> · Technician &amp; System Developer",
      hero_desc: "Dedicated <strong>System Developer</strong> specializing in <span class='hero-tech-tag'>PHP</span>, <span class='hero-tech-tag'>Laravel</span>, <span class='hero-tech-tag'>JavaScript</span>. Focused on building robust digital solutions and scalable enterprise applications.<br><br>Currently pursuing <strong>Postgraduate</strong> studies at <strong>UiTM Shah Alam</strong> in <strong>Information Technology</strong> to further expertise in strategic information architecture.",
      hero_btn_projects: "View Projects",
      hero_btn_contact: "Let's Talk",
      stat_projects: "Projects Built",
      stat_exp: "Industry Exp.",
      stat_stacks: "Tech Stacks",

      badge_technician: "Technician · LUNAS",
      badge_education: "IMS IT · UiTM",
      badge_freelancer: "Freelancer · Solo Projects",
      badge_dev: "PHP System Dev",

      section_about_tag: "01 — About Me",
      section_about_title: "Abdul Shakir",
      about_status_label: "Current Status",
      about_status_value: "Postgraduate Student",
      about_status_sub: "Master of Science in Information Technology",
      about_edu_label: "Education",
      about_exp_label: "Experience",
      exp1_role: "IT Intern — Information Systems Dept.",
      exp1_desc: "Hands-on experience in naval IS operations, system maintenance, and internal IT infrastructure support.",
      exp2_role: "Freelance Web Developer",
      exp2_company: "Independent Project",
      exp2_duration: "Project-Based",
      exp2_desc: "Developed and deployed a Content Management System (WordPress) for a local Madrasah. Managed domain setup, theme customization, and structured the digital content architecture.",
      exp3_role: "System Developer &amp; Administrator",
      exp3_company: "Solo Projects",
      exp3_duration: "Continuous",
      exp3_desc: "Operated various Linux environments (Kali, Mint) for local server deployment and testing. Built full-stack applications utilizing PHP, Laravel, and customized local development stacks.",
      about_p1: "I am <strong>Abdul Shakir Hakim</strong>, an <strong>Information Systems Management</strong> graduate focused on logical system development and digital infrastructure. After completing my bachelor's degree, I am now pursuing a Master's (MSc in Information Technology) at <strong>UiTM Shah Alam</strong> to deepen my expertise in data management and high-level system architecture.",
      about_p2: "My practical experience at the Information Systems department, <strong>Lumut Naval Shipyard (LUNAS)</strong>, exposed me to industry-grade IT operations. The critical and highly disciplined working environment at the naval base shaped my standards in ensuring every application built meets strict levels of reliability, performance, and security before deployment.",
      about_p3: "Beyond the corporate ecosystem, I actively build and maintain systems personally — from full-stack web development to Linux server configuration. In modern workflows, I also apply expertise as a <strong>Prompt Engineer</strong>, strategically integrating AI assistance to accelerate coding, optimize logic, and resolve bugs — making system development far more efficient than traditional manual coding.",
      skills_title: "Tech Stack &amp; Tools",

      section_projects_tag: "02 — Projects",
      section_projects_title: "Featured <span>Work</span>",
      featured_badge: "<i class='bx bxs-star'></i> Featured Project",
      proj_lunas_title: "LUNAS E-Shop System",
      proj_lunas_desc: "Internal e-commerce system for Lumut Naval Shipyard — digital management of catalog, orders, and transactions.",
      proj_lunas_meta_type: "Industrial Internship",
      proj_lunas_meta_org: "LUNAS · Lumut",
      proj_detail_btn: "View Details",
      proj_madrasah_title: "Madrasah CMS Portal",
      proj_madrasah_desc: "CMS platform for a Madrasah institution — independent management of content, operational costs, and public information.",
      proj_netsec_title: "Network Security Analysis",
      proj_netsec_desc: "Network vulnerability analysis using Wireshark and Nmap — identify, document, and recommend threat mitigations.",

      section_server_tag: "04 — Live System",
      section_server_title: "Pocket <span>Server</span>",
      ps_desc: "Personal web server running on <strong>Vivo Y91i</strong> using <span class='ps-tag'>Termux</span> + <span class='ps-tag'>nginx</span> + <span class='ps-tag'>PHP-FPM</span> + <span class='ps-tag'>MariaDB</span>. Exposed via <span class='ps-tag'>ngrok</span> and proxied through <span class='ps-tag'>Cloudflare Workers</span>.",
      ps_spec_hardware_label: "Hardware",
      ps_spec_hardware_val: "Vivo Y91i · 2GB RAM",
      ps_spec_stack_label: "Stack",
      ps_spec_stack_val: "nginx · PHP 8.5 · MariaDB 12",
      ps_spec_tunnel_label: "Tunnel",
      ps_spec_tunnel_val: "ngrok → Cloudflare Workers",
      ps_spec_uptime_label: "Uptime Note",
      ps_spec_uptime_val: "Depends on phone battery 😅",
      ps_launch_btn: "Launch PocketServer",
      ps_terminal_title: "server — status@vivo-y91i",
      ps_terminal_cmd: "ping pocketserver --check",
      ps_terminal_checking: "# checking connection...",
      ps_offline_hint: "# server might be charging the phone 😅",
      ps_visit_hint: "# click Launch PocketServer to visit →",
      ps_connected: "> connection established ✓",
      ps_failed: "> connection failed ✗",

      section_contact_tag: "03 — Contact",
      section_contact_title: "Let's <span>Connect</span>",
      contact_desc: "Whether for job opportunities, project collaboration, or technical discussions related to system development and IT — my inbox is always open.",
      quick_info: "Quick Info",
      location_label: "Location",
      location_val: "Shah Alam, Selangor 🇲🇾",
      availability_label: "Availability",
      availability_val: "Open to Opportunities",
      interest_label: "Interest Areas",
      interest_val: "Basic Cybersecurity · Information Systems<br/>Basic Network Security · Web Development<br/>System Development · Human Resource Information System (HRIS)",

      footer_hosted: "&copy; 2026 · Hosted on GitHub Pages",
      footer_top: "Top",
      footer_about: "About",
      footer_projects: "Projects"
    },

    jp: {
      nav_about: "自己紹介",
      nav_projects: "プロジェクト",
      nav_server: "サーバー",
      nav_contact: "お問い合わせ",

      hero_tag: "機会を求めています",
      hero_title: "IMS IT · <span>情報システム</span> · テクニシャン＆システム開発者",
      hero_desc: "<strong>PHP</strong>・<strong>Laravel</strong>・<strong>JavaScript</strong> を専門とする<strong>システム開発者</strong>です。堅牢なデジタルソリューションと拡張可能なアプリケーションの構築に注力しています。<br><br>現在、<strong>UiTM Shah Alam</strong> で<strong>情報技術</strong>の修士課程に在籍し、情報アーキテクチャの専門知識を深めています。",
      hero_btn_projects: "プロジェクトを見る",
      hero_btn_contact: "連絡する",
      stat_projects: "プロジェクト数",
      stat_exp: "実務経験",
      stat_stacks: "技術スタック",

      badge_technician: "テクニシャン · LUNAS",
      badge_education: "IMS IT · UiTM",
      badge_freelancer: "フリーランサー · 個人プロジェクト",
      badge_dev: "PHPシステム開発者",

      section_about_tag: "01 — 自己紹介",
      section_about_title: "Abdul Shakir",
      about_status_label: "現在のステータス",
      about_status_value: "大学院生",
      about_status_sub: "情報技術修士課程",
      about_edu_label: "学歴",
      about_exp_label: "職歴",
      exp1_role: "IT インターン — 情報システム部門",
      exp1_desc: "海軍情報システムの運用、システム保守、および内部ITインフラのサポートを実務経験として習得。",
      exp2_role: "フリーランス Web 開発者",
      exp2_company: "個人プロジェクト",
      exp2_duration: "プロジェクト単位",
      exp2_desc: "地元のマドラサ向けにWordPressを使ったコンテンツ管理システムを構築・展開。ドメイン設定、テーマカスタマイズ、デジタルコンテンツ設計を担当。",
      exp3_role: "システム開発者 &amp; 管理者",
      exp3_company: "個人プロジェクト",
      exp3_duration: "継続中",
      exp3_desc: "Kali・MintなどのLinux環境でローカルサーバーの構築とテストを実施。PHP・Laravelを使ったフルスタックアプリケーションを開発。",
      about_p1: "私は<strong>Abdul Shakir Hakim</strong>、論理的なシステム開発とデジタルインフラに焦点を当てた<strong>情報システム管理</strong>の卒業生です。学士号取得後、現在は<strong>UiTM Shah Alam</strong>で情報技術の修士課程に在籍し、データ管理と高度なシステムアーキテクチャの専門知識を深めています。",
      about_p2: "<strong>Lumut Naval Shipyard（LUNAS）</strong>の情報システム部門での実務経験を通じて、産業レベルのIT運用に触れました。海軍基地における厳格な職場環境は、開発するすべてのアプリケーションに高い信頼性・パフォーマンス・セキュリティを求める基準を形成しました。",
      about_p3: "企業環境に限らず、フルスタック開発からLinuxサーバー構成まで、個人的にシステムの構築・保守を積極的に行っています。また、<strong>プロンプトエンジニア</strong>としてAIを戦略的に活用し、コーディングの加速・ロジックの最適化・デバッグを効率的に実施しています。",
      skills_title: "技術スタック &amp; ツール",

      section_projects_tag: "02 — プロジェクト",
      section_projects_title: "注目の<span>作品</span>",
      featured_badge: "<i class='bx bxs-star'></i> 注目プロジェクト",
      proj_lunas_title: "LUNAS E-Shop システム",
      proj_lunas_desc: "Lumut Naval Shipyard 向け社内 EC システム — カタログ・注文・取引のデジタル管理。",
      proj_lunas_meta_type: "産業インターンシップ",
      proj_lunas_meta_org: "LUNAS · Lumut",
      proj_detail_btn: "詳細を見る",
      proj_madrasah_title: "マドラサ CMS ポータル",
      proj_madrasah_desc: "マドラサ機関向けCMSプラットフォーム — コンテンツ・運営コスト・公開情報の自主管理。",
      proj_netsec_title: "ネットワークセキュリティ分析",
      proj_netsec_desc: "WiresharkとNmapを用いたネットワーク脆弱性分析 — 脅威の特定・文書化・緩和策の提案。",

      section_server_tag: "04 — ライブシステム",
      section_server_title: "ポケット<span>サーバー</span>",
      ps_desc: "<strong>Vivo Y91i</strong> 上で動作するパーソナルウェブサーバー — <span class='ps-tag'>Termux</span> + <span class='ps-tag'>nginx</span> + <span class='ps-tag'>PHP-FPM</span> + <span class='ps-tag'>MariaDB</span> 使用。<span class='ps-tag'>ngrok</span> 経由で公開し、<span class='ps-tag'>Cloudflare Workers</span> でプロキシしています。",
      ps_spec_hardware_label: "ハードウェア",
      ps_spec_hardware_val: "Vivo Y91i · 2GB RAM",
      ps_spec_stack_label: "スタック",
      ps_spec_stack_val: "nginx · PHP 8.5 · MariaDB 12",
      ps_spec_tunnel_label: "トンネル",
      ps_spec_tunnel_val: "ngrok → Cloudflare Workers",
      ps_spec_uptime_label: "稼働時間メモ",
      ps_spec_uptime_val: "スマホのバッテリー次第 😅",
      ps_launch_btn: "PocketServer を開く",
      ps_terminal_title: "server — status@vivo-y91i",
      ps_terminal_cmd: "ping pocketserver --check",
      ps_terminal_checking: "# 接続を確認中...",
      ps_offline_hint: "# サーバーが充電中かもしれません 😅",
      ps_visit_hint: "# PocketServer を起動してアクセス →",
      ps_connected: "> 接続確立 ✓",
      ps_failed: "> 接続失敗 ✗",

      section_contact_tag: "03 — お問い合わせ",
      section_contact_title: "<span>繋がりましょう</span>",
      contact_desc: "就職の機会、プロジェクトのコラボレーション、またはシステム開発・ITに関する技術的な議論など、どんなことでもお気軽にご連絡ください。",
      quick_info: "基本情報",
      location_label: "所在地",
      location_val: "シャーアラム、スランゴール 🇲🇾",
      availability_label: "応募状況",
      availability_val: "機会を求めています",
      interest_label: "興味分野",
      interest_val: "基本的なサイバーセキュリティ · 情報システム<br/>基本的なネットワークセキュリティ · Web 開発<br/>システム開発 · HRIS",

      footer_hosted: "&copy; 2026 · GitHub Pages にホスト",
      footer_top: "トップ",
      footer_about: "自己紹介",
      footer_projects: "プロジェクト"
    },

    kr: {
      nav_about: "소개",
      nav_projects: "프로젝트",
      nav_server: "서버",
      nav_contact: "연락처",

      hero_tag: "기회를 찾고 있습니다",
      hero_title: "IMS IT · <span>정보 시스템</span> · 기술자 &amp; 시스템 개발자",
      hero_desc: "<strong>PHP</strong>, <strong>Laravel</strong>, <strong>JavaScript</strong> 전문 <strong>시스템 개발자</strong>입니다. 견고한 디지털 솔루션과 확장 가능한 애플리케이션 구축에 집중합니다.<br><br>현재 <strong>UiTM Shah Alam</strong>에서 <strong>정보기술</strong> 석사 과정 중이며, 전략적 정보 아키텍처 전문성을 키우고 있습니다.",
      hero_btn_projects: "프로젝트 보기",
      hero_btn_contact: "연락하기",
      stat_projects: "완성 프로젝트",
      stat_exp: "업계 경험",
      stat_stacks: "기술 스택",

      badge_technician: "기술자 · LUNAS",
      badge_education: "IMS IT · UiTM",
      badge_freelancer: "프리랜서 · 개인 프로젝트",
      badge_dev: "PHP 시스템 개발자",

      section_about_tag: "01 — 소개",
      section_about_title: "Abdul Shakir",
      about_status_label: "현재 상태",
      about_status_value: "대학원생",
      about_status_sub: "정보기술 이학 석사 과정",
      about_edu_label: "학력",
      about_exp_label: "경력",
      exp1_role: "IT 인턴 — 정보시스템 부서",
      exp1_desc: "해군 정보시스템 운영, 시스템 유지보수, 내부 IT 인프라 지원에 대한 실무 경험을 습득.",
      exp2_role: "프리랜서 웹 개발자",
      exp2_company: "독립 프로젝트",
      exp2_duration: "프로젝트 단위",
      exp2_desc: "지역 마드라사를 위한 WordPress CMS를 구축 및 배포. 도메인 설정, 테마 커스터마이징, 디지털 콘텐츠 아키텍처 설계를 담당.",
      exp3_role: "시스템 개발자 &amp; 관리자",
      exp3_company: "개인 프로젝트",
      exp3_duration: "지속적",
      exp3_desc: "Kali, Mint 등 다양한 Linux 환경에서 로컬 서버 배포 및 테스트를 진행. PHP, Laravel을 활용한 풀스택 애플리케이션을 개발.",
      about_p1: "저는 <strong>Abdul Shakir Hakim</strong>으로, 논리적 시스템 개발과 디지털 인프라에 집중하는 <strong>정보시스템관리</strong> 졸업생입니다. 학사 학위 취득 후, 현재 <strong>UiTM Shah Alam</strong>에서 정보기술 석사 과정을 이수하며 데이터 관리 및 고급 시스템 아키텍처 전문성을 심화하고 있습니다.",
      about_p2: "<strong>Lumut Naval Shipyard(LUNAS)</strong>의 정보시스템 부서에서의 실무 경험은 산업 수준의 IT 운영을 경험하게 해주었습니다. 해군 기지의 엄격한 근무 환경은 모든 애플리케이션에 높은 신뢰성, 성능, 보안 기준을 적용하는 습관을 길러주었습니다.",
      about_p3: "기업 환경을 넘어, 풀스택 웹 개발부터 Linux 서버 구성까지 개인적으로도 시스템을 구축·관리합니다. 또한 <strong>프롬프트 엔지니어</strong>로서 AI를 전략적으로 활용해 코딩 가속화, 로직 최적화, 디버깅을 효율적으로 수행합니다.",
      skills_title: "기술 스택 &amp; 도구",

      section_projects_tag: "02 — 프로젝트",
      section_projects_title: "주요 <span>작업</span>",
      featured_badge: "<i class='bx bxs-star'></i> 주요 프로젝트",
      proj_lunas_title: "LUNAS E-Shop 시스템",
      proj_lunas_desc: "Lumut Naval Shipyard 내부 전자상거래 시스템 — 카탈로그, 주문, 거래의 디지털 관리.",
      proj_lunas_meta_type: "산업체 인턴십",
      proj_lunas_meta_org: "LUNAS · Lumut",
      proj_detail_btn: "상세 보기",
      proj_madrasah_title: "마드라사 CMS 포털",
      proj_madrasah_desc: "마드라사 기관을 위한 CMS 플랫폼 — 콘텐츠, 운영 비용, 공개 정보의 자체 관리.",
      proj_netsec_title: "네트워크 보안 분석",
      proj_netsec_desc: "Wireshark와 Nmap을 활용한 네트워크 취약점 분석 — 위협 식별, 문서화, 완화 방안 제안.",

      section_server_tag: "04 — 라이브 시스템",
      section_server_title: "포켓 <span>서버</span>",
      ps_desc: "<strong>Vivo Y91i</strong>에서 실행되는 개인 웹 서버 — <span class='ps-tag'>Termux</span> + <span class='ps-tag'>nginx</span> + <span class='ps-tag'>PHP-FPM</span> + <span class='ps-tag'>MariaDB</span> 사용. <span class='ps-tag'>ngrok</span>으로 노출하고 <span class='ps-tag'>Cloudflare Workers</span>로 프록시 처리.",
      ps_spec_hardware_label: "하드웨어",
      ps_spec_hardware_val: "Vivo Y91i · 2GB RAM",
      ps_spec_stack_label: "스택",
      ps_spec_stack_val: "nginx · PHP 8.5 · MariaDB 12",
      ps_spec_tunnel_label: "터널",
      ps_spec_tunnel_val: "ngrok → Cloudflare Workers",
      ps_spec_uptime_label: "업타임 메모",
      ps_spec_uptime_val: "스마트폰 배터리에 따라 다름 😅",
      ps_launch_btn: "PocketServer 열기",
      ps_terminal_title: "server — status@vivo-y91i",
      ps_terminal_cmd: "ping pocketserver --check",
      ps_terminal_checking: "# 연결 확인 중...",
      ps_offline_hint: "# 서버가 충전 중일 수 있습니다 😅",
      ps_visit_hint: "# PocketServer 실행 버튼을 클릭해 방문 →",
      ps_connected: "> 연결 성공 ✓",
      ps_failed: "> 연결 실패 ✗",

      section_contact_tag: "03 — 연락처",
      section_contact_title: "<span>연결</span>합시다",
      contact_desc: "취업 기회, 프로젝트 협업, 또는 시스템 개발 및 IT 관련 기술적 논의 — 언제든지 연락 주세요.",
      quick_info: "기본 정보",
      location_label: "위치",
      location_val: "샤알람, 슬랑오르 🇲🇾",
      availability_label: "구직 상태",
      availability_val: "기회 모집 중",
      interest_label: "관심 분야",
      interest_val: "기본 사이버보안 · 정보시스템<br/>기본 네트워크 보안 · 웹 개발<br/>시스템 개발 · HRIS",

      footer_hosted: "&copy; 2026 · GitHub Pages 호스팅",
      footer_top: "상단",
      footer_about: "소개",
      footer_projects: "프로젝트"
    }
  };

  let currentLang = localStorage.getItem('portfolio-lang') || DEFAULT;

  const wrapper = null; // lang switcher removed, using AssistiveTouch instead

  /* ── Apply translations ── */
  function applyLang(data) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (data[key] === undefined) return;
      el.innerHTML = data[key];
    });
  }

  function switchLang(lang) {
    const data = LANG_DATA[lang];
    if (!data) return;
    applyLang(data);
    currentLang = lang;
    localStorage.setItem('portfolio-lang', lang);
  }

  /* ── AssistiveTouch lang panel integration ── */
  function populateLangPanel() {
    const panel = document.getElementById('at-lang-panel');
    if (!panel) return;
    panel.querySelectorAll('.at-lang-option').forEach(el => el.remove());
    SUPPORTED.forEach(lang => {
      const btn = document.createElement('button');
      btn.className = 'at-lang-option' + (lang === currentLang ? ' active' : '');
      btn.dataset.lang = lang;
      btn.textContent = LABELS[lang];
      btn.addEventListener('click', e => {
        e.stopPropagation();
        switchLang(lang);
        panel.querySelectorAll('.at-lang-option').forEach(b =>
          b.classList.toggle('active', b.dataset.lang === lang)
        );
      });
      panel.appendChild(btn);
    });
  }
  setTimeout(populateLangPanel, 150);

  /* ── Bind option clicks ── */
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      switchLang(btn.dataset.lang);
    });
  });

  /* ── Init ── */
  switchLang(currentLang);

})();