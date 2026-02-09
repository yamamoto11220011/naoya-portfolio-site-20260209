/* ============================
   Main JavaScript
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
  const I18N_STORAGE_KEY = 'portfolio_lang';
  let currentLang = localStorage.getItem(I18N_STORAGE_KEY) || 'ja';
  const translations = {
    ja: {
      menu_about: 'About',
      menu_works: 'Works',
      menu_now: 'Now',
      menu_links: 'Links',
      menu_contact: 'Contact',
      menu_cta: '相談する',
      opening_copy: 'この瞬間から、AIは道具ではなく、創造の神経になる。',
      opening_enter: '未来へ入る',
      splash_manifesto: '心が動く場所から、次のプロダクトが生まれる。',
      splash_sub: 'Artificial Intelligence changes everything.',
      splash_enter: 'ENTER',
      hero_titles: 'ZEN大学 ｜ Google 学生AIアンバサダー ｜ NewsPicks アンバサダー ｜ 積水グループアンバサダー',
      hero_catch: 'AIと自動化で、やりたい<br class="sp-only">ことを最短で形にする。',
      hero_lead: 'AI秘書や業務自動化ツールの試作からWebサイト制作まで、プロトタイプを高速で回して実装します。',
      hero_btn_contact: 'コラボ・相談する',
      hero_btn_works: '実績を見る',
      hero_note: '企画→実装→改善までを短いサイクルで回せます。',
      chat_title: 'Ask AI about Naoya',
      chat_subtitle: '山本直哉について何でも聞いてください。AIが回答します。',
      chat_intro: 'こんにちは！下の候補から選んで質問してください。<br>このチャットは登録済みデータから回答します。',
      chat_select_note: 'この中から選んでください：',
      chip_1: '👤 山本直哉とは？',
      chip_2: '🎬 好きなYouTuberは？',
      chip_3: '🤝 西村博之との関係',
      chip_4: '🧠 AGIは来ますか？',
      about_subtitle: 'AIネイティブ世代で、とにかくAIツールを触るのが好き。',
      about_title: 'About',
      about_p1: 'AIが好きという原動力を活かし、日々の学習と制作を加速させています。強みは、情報収集から整理、そして実装までのサイクルを短期間で回せることです。',
      about_p2: '現在は、AI秘書のようなエージェント機能を持つ自動化ツールや、誰でも更新可能なWebサイトの仕組みづくりに注力しています。',
      about_p3: '長期的には、汎用人工知能に近づく技術やプロダクトの実装に携わり続けることを目標としています。',
      strengths_heading: '強み',
      strength_1: '情報収集→要点抽出→意思決定の整理',
      strength_2: '自動化ツールの試作（ワークフロー/AI秘書系）',
      strength_3: 'Webサイト制作（実装→改善まで）',
      tag_research: 'リサーチ',
      tag_analysis: '分析',
      tag_automation: '自動化',
      tag_proto: 'プロトタイピング',
      tag_web: 'Web制作',
      tag_improve: '改善',
      tag_planning: '企画',
      tag_ops: '運営',
      tag_community: 'コミュニティ',
      tag_systemize: '仕組み化',
      works_title: 'Works / Projects',
      work_label_role: '役割',
      work_label_scale: '規模',
      work1_title: 'Google 学生AIアンバサダー',
      work1_role: '学生アンバサダー',
      work1_scale: '70名規模',
      work1_desc: 'イベント運営、参加者サポート、企画推進',
      work1_result: '優秀評価を獲得',
      work2_title: 'AIサークル長（270名）',
      work2_role: '代表／運営体制づくり',
      work2_scale: '270名',
      work2_desc: 'イベント企画運営、メンバー支援、運営フロー整備',
      work2_result: '30人規模のオフライン・オンラインイベントを開催',
      now_title: 'Now',
      now_1: 'AI秘書・自動化ツールの開発',
      now_2: '誰でも作れて更新できるサイト制作の仕組み化',
      now_3: 'AI活用で学習と制作の速度を上げる',
      now_updated: '最終更新：2026年2月9日',
      links_title: 'Links',
      email_label: 'Email',
      contact_title: 'Contact',
      contact_lead: '相談内容が固まってなくても大丈夫です。<br>目的だけ教えてください。',
      template_label: '依頼テンプレート',
      copy_btn: 'コピー',
      copy_done: 'コピー済み',
      template_body: '目的：\n依頼内容：\n希望納期：\n予算感（任意）：\n連絡手段：',
      contact_btn: 'メールで相談する',
      footer_message: 'AIネイティブ世代として、日本の生産性を上げるプロトタイプを作り続ける。',
      bgm_play: 'BGM 再生',
      bgm_stop: 'BGM 停止'
    },
    en: {
      menu_about: 'About',
      menu_works: 'Works',
      menu_now: 'Now',
      menu_links: 'Links',
      menu_contact: 'Contact',
      menu_cta: 'Contact',
      opening_copy: 'From this moment, AI stops being a tool and becomes the nerve of creation.',
      opening_enter: 'ENTER THE FUTURE',
      splash_manifesto: 'Where emotion moves first, the next product is born.',
      splash_sub: 'Artificial Intelligence changes everything.',
      splash_enter: 'ENTER',
      hero_titles: 'ZEN University | Google Student AI Ambassador | NewsPicks Ambassador | Sekisui Group Ambassador',
      hero_catch: 'Build what you want faster<br class="sp-only">with AI and automation.',
      hero_lead: 'From AI assistant prototypes and workflow automation to website production, I iterate and ship quickly.',
      hero_btn_contact: 'Contact / Collaborate',
      hero_btn_works: 'View Works',
      hero_note: 'Fast cycle from planning to implementation to improvement.',
      chat_title: 'Ask AI about Naoya',
      chat_subtitle: 'Ask anything about Naoya Yamamoto. The assistant will answer.',
      chat_intro: 'Hi! Please choose a question from below.<br>This chat answers from registered data.',
      chat_select_note: 'Choose from below:',
      chip_1: '👤 Who is Naoya Yamamoto?',
      chip_2: '🎬 Favorite YouTuber?',
      chip_3: '🤝 Relationship with Hiroyuki?',
      chip_4: '🧠 Is AGI coming?',
      about_subtitle: 'AI-native generation. I simply love touching AI tools.',
      about_title: 'About',
      about_p1: 'Driven by my passion for AI, I accelerate learning and production every day.',
      about_p2: 'I focus on AI assistant-like automation tools and systems to build/update websites easily.',
      about_p3: 'Long-term, I aim to keep building products that get us closer to AGI.',
      strengths_heading: 'Strengths',
      strength_1: 'Research -> summarize -> decision support',
      strength_2: 'Automation tool prototyping (workflow / AI assistant)',
      strength_3: 'Website production (implementation -> improvement)',
      tag_research: 'Research',
      tag_analysis: 'Analysis',
      tag_automation: 'Automation',
      tag_proto: 'Prototyping',
      tag_web: 'Web Dev',
      tag_improve: 'Improve',
      tag_planning: 'Planning',
      tag_ops: 'Operations',
      tag_community: 'Community',
      tag_systemize: 'Systemization',
      works_title: 'Works / Projects',
      work_label_role: 'Role',
      work_label_scale: 'Scale',
      work1_title: 'Google Student AI Ambassador',
      work1_role: 'Student Ambassador',
      work1_scale: '70 members',
      work1_desc: 'Event operations, participant support, project promotion',
      work1_result: 'Received excellent evaluation',
      work2_title: 'AI Circle Leader (270 members)',
      work2_role: 'Leader / operations structure',
      work2_scale: '270 members',
      work2_desc: 'Event planning, member support, operations workflow setup',
      work2_result: 'Hosted online/offline events for about 30 participants',
      now_title: 'Now',
      now_1: 'Building AI assistant and automation tools',
      now_2: 'Creating systems for easy website creation and updates',
      now_3: 'Using AI to speed up learning and production',
      now_updated: 'Last updated: Feb 9, 2026',
      links_title: 'Links',
      email_label: 'Email',
      contact_title: 'Contact',
      contact_lead: 'Even if your request is not fully defined, that is okay.<br>Just share your goal.',
      template_label: 'Request Template',
      copy_btn: 'Copy',
      copy_done: 'Copied',
      template_body: 'Goal:\nRequest details:\nPreferred deadline:\nBudget (optional):\nContact method:',
      contact_btn: 'Contact by Email',
      footer_message: 'As an AI-native creator, I keep building prototypes that raise productivity in Japan.',
      bgm_play: 'Play BGM',
      bgm_stop: 'Stop BGM'
    },
    id: {
      menu_about: 'Tentang',
      menu_works: 'Karya',
      menu_now: 'Sekarang',
      menu_links: 'Tautan',
      menu_contact: 'Kontak',
      menu_cta: 'Hubungi',
      opening_copy: 'Mulai saat ini, AI bukan lagi sekadar alat, melainkan saraf kreativitas.',
      opening_enter: 'MASUK KE MASA DEPAN',
      splash_manifesto: 'Produk berikutnya lahir dari momen yang menggerakkan hati.',
      splash_sub: 'Kecerdasan buatan mengubah segalanya.',
      splash_enter: 'MASUK',
      hero_titles: 'Universitas ZEN | Duta AI Mahasiswa Google | Duta NewsPicks | Duta Grup Sekisui',
      hero_catch: 'Wujudkan ide lebih cepat<br class="sp-only">dengan AI dan otomatisasi.',
      hero_lead: 'Mulai dari prototipe asisten AI hingga pembuatan website, saya eksekusi dengan cepat.',
      hero_btn_contact: 'Kolaborasi / Konsultasi',
      hero_btn_works: 'Lihat Karya',
      hero_note: 'Siklus cepat dari rencana, implementasi, hingga perbaikan.',
      chat_title: 'Tanya AI tentang Naoya',
      chat_subtitle: 'Tanyakan apa saja tentang Naoya Yamamoto.',
      chat_intro: 'Halo! Pilih pertanyaan di bawah.<br>Chat ini menjawab dari data yang terdaftar.',
      chat_select_note: 'Pilih dari sini:',
      chip_1: '👤 Siapa Naoya Yamamoto?',
      chip_2: '🎬 YouTuber favorit?',
      chip_3: '🤝 Hubungan dengan Hiroyuki?',
      chip_4: '🧠 Apakah AGI akan datang?',
      about_subtitle: 'Generasi native-AI. Saya sangat suka mengeksplor alat AI.',
      about_title: 'Tentang',
      about_p1: 'Didorong kecintaan pada AI, saya mempercepat belajar dan produksi setiap hari.',
      about_p2: 'Fokus pada alat otomatisasi seperti asisten AI dan sistem website yang mudah diperbarui.',
      about_p3: 'Target jangka panjang: terus membangun produk menuju AGI.',
      strengths_heading: 'Kekuatan',
      strength_1: 'Riset -> rangkum -> dukungan keputusan',
      strength_2: 'Prototipe alat otomatisasi (workflow / asisten AI)',
      strength_3: 'Pembuatan website (implementasi -> perbaikan)',
      tag_research: 'Riset',
      tag_analysis: 'Analisis',
      tag_automation: 'Otomatisasi',
      tag_proto: 'Prototipe',
      tag_web: 'Web',
      tag_improve: 'Perbaikan',
      tag_planning: 'Perencanaan',
      tag_ops: 'Operasional',
      tag_community: 'Komunitas',
      tag_systemize: 'Sistemisasi',
      works_title: 'Karya / Proyek',
      work_label_role: 'Peran',
      work_label_scale: 'Skala',
      work1_title: 'Duta AI Mahasiswa Google',
      work1_role: 'Duta Mahasiswa',
      work1_scale: '70 anggota',
      work1_desc: 'Operasi acara, dukungan peserta, dorong inisiatif',
      work1_result: 'Mendapat evaluasi unggul',
      work2_title: 'Ketua Komunitas AI (270 anggota)',
      work2_role: 'Ketua / struktur operasional',
      work2_scale: '270 anggota',
      work2_desc: 'Perencanaan acara, dukungan anggota, penataan alur operasional',
      work2_result: 'Mengadakan event online/offline sekitar 30 orang',
      now_title: 'Sekarang',
      now_1: 'Membangun asisten AI dan alat otomatisasi',
      now_2: 'Membuat sistem website yang mudah dibuat dan diperbarui',
      now_3: 'Memakai AI untuk mempercepat belajar dan produksi',
      now_updated: 'Pembaruan terakhir: 9 Feb 2026',
      links_title: 'Tautan',
      email_label: 'Email',
      contact_title: 'Kontak',
      contact_lead: 'Meski kebutuhan belum jelas, tidak masalah.<br>Cukup beritahu tujuan Anda.',
      template_label: 'Template Permintaan',
      copy_btn: 'Salin',
      copy_done: 'Tersalin',
      template_body: 'Tujuan:\nDetail permintaan:\nTenggat diinginkan:\nAnggaran (opsional):\nMetode kontak:',
      contact_btn: 'Hubungi lewat Email',
      footer_message: 'Sebagai generasi AI-native, saya terus membuat prototipe untuk meningkatkan produktivitas Jepang.',
      bgm_play: 'Putar BGM',
      bgm_stop: 'Hentikan BGM'
    },
    zh: {
      menu_about: '关于',
      menu_works: '作品',
      menu_now: '现在',
      menu_links: '链接',
      menu_contact: '联系',
      menu_cta: '咨询',
      opening_copy: '从这一刻起，AI不只是工具，而是创造的神经。',
      opening_enter: '进入未来',
      splash_manifesto: '当内心被触动，下一代产品就此诞生。',
      splash_sub: '人工智能正在改变一切。',
      splash_enter: '进入',
      hero_titles: 'ZEN大学｜Google 学生AI大使｜NewsPicks 大使｜积水集团大使',
      hero_catch: '用AI与自动化<br class="sp-only">更快实现想法。',
      hero_lead: '从AI助手原型、工作流自动化到网站制作，我都能快速推进落地。',
      hero_btn_contact: '合作 / 咨询',
      hero_btn_works: '查看成果',
      hero_note: '规划→实现→优化，保持短周期迭代。',
      chat_title: 'Ask AI about Naoya',
      chat_subtitle: '你可以询问任何关于山本直哉的问题。',
      chat_intro: '你好！请从下方问题中选择。<br>本聊天基于已登记数据回答。',
      chat_select_note: '请从下方选择：',
      chip_1: '👤 山本直哉是谁？',
      chip_2: '🎬 最喜欢的YouTuber？',
      chip_3: '🤝 与西村博之的关系？',
      chip_4: '🧠 AGI会到来吗？',
      about_subtitle: 'AI原生世代，热爱尝试各类AI工具。',
      about_title: '关于',
      about_p1: '以对AI的热爱为动力，我持续加速学习与制作。',
      about_p2: '目前专注于AI秘书型自动化工具，以及可轻松更新的网站机制。',
      about_p3: '长期目标是持续参与接近AGI的技术与产品实现。',
      strengths_heading: '优势',
      strength_1: '信息收集→要点提炼→决策整理',
      strength_2: '自动化工具原型（工作流 / AI秘书）',
      strength_3: '网站制作（实现→改进）',
      tag_research: '调研',
      tag_analysis: '分析',
      tag_automation: '自动化',
      tag_proto: '原型',
      tag_web: '网站开发',
      tag_improve: '改进',
      tag_planning: '企划',
      tag_ops: '运营',
      tag_community: '社区',
      tag_systemize: '体系化',
      works_title: '成果 / 项目',
      work_label_role: '角色',
      work_label_scale: '规模',
      work1_title: 'Google 学生AI大使',
      work1_role: '学生大使',
      work1_scale: '70人规模',
      work1_desc: '活动运营、参与者支持、项目推进',
      work1_result: '获得优秀评价',
      work2_title: 'AI社团负责人（270人）',
      work2_role: '代表 / 运营体制搭建',
      work2_scale: '270人',
      work2_desc: '活动策划与运营、成员支持、运营流程建设',
      work2_result: '举办约30人规模线上/线下活动',
      now_title: '当前重点',
      now_1: '开发AI秘书与自动化工具',
      now_2: '搭建人人可创建并更新的网站机制',
      now_3: '通过AI提升学习与制作速度',
      now_updated: '最后更新：2026年2月9日',
      links_title: '链接',
      email_label: '邮箱',
      contact_title: '联系',
      contact_lead: '即使需求尚未完全明确也没关系。<br>只需告诉我目标即可。',
      template_label: '委托模板',
      copy_btn: '复制',
      copy_done: '已复制',
      template_body: '目标：\n委托内容：\n期望交付时间：\n预算（可选）：\n联系方式：',
      contact_btn: '邮件联系',
      footer_message: '作为AI原生世代，我将持续打造提升日本生产力的原型。',
      bgm_play: '播放 BGM',
      bgm_stop: '停止 BGM'
    },
    ko: {
      menu_about: '소개',
      menu_works: '작업',
      menu_now: '현재',
      menu_links: '링크',
      menu_contact: '문의',
      menu_cta: '상담하기',
      opening_copy: '이 순간부터 AI는 도구를 넘어, 창조의 신경이 됩니다.',
      opening_enter: '미래로 입장',
      splash_manifesto: '마음이 먼저 움직일 때, 다음 프로덕트가 태어납니다.',
      splash_sub: '인공지능은 모든 것을 바꿉니다.',
      splash_enter: '입장',
      hero_titles: 'ZEN대학교 | Google 학생 AI 앰배서더 | NewsPicks 앰배서더 | 세키스이 그룹 앰배서더',
      hero_catch: 'AI와 자동화로<br class="sp-only">하고 싶은 일을 더 빠르게.',
      hero_lead: 'AI 비서 프로토타입부터 웹사이트 제작까지 빠르게 구현하고 개선합니다.',
      hero_btn_contact: '협업 / 상담',
      hero_btn_works: '실적 보기',
      hero_note: '기획→구현→개선을 짧은 사이클로 진행합니다.',
      chat_title: 'Ask AI about Naoya',
      chat_subtitle: '야마모토 나오야에 대해 무엇이든 물어보세요.',
      chat_intro: '안녕하세요! 아래 질문을 선택해 주세요.<br>이 채팅은 등록된 데이터로 답변합니다.',
      chat_select_note: '아래에서 선택하세요:',
      chip_1: '👤 야마모토 나오야는?',
      chip_2: '🎬 좋아하는 유튜버는?',
      chip_3: '🤝 니시무라 히로유키와의 관계는?',
      chip_4: '🧠 AGI는 올까요?',
      about_subtitle: 'AI 네이티브 세대로서 AI 도구를 다루는 것을 좋아합니다.',
      about_title: '소개',
      about_p1: 'AI에 대한 열정을 바탕으로 학습과 제작 속도를 높이고 있습니다.',
      about_p2: '현재는 AI 비서형 자동화 도구와 누구나 업데이트 가능한 웹 구조에 집중합니다.',
      about_p3: '장기적으로는 AGI에 가까운 기술과 제품 구현에 계속 참여하는 것이 목표입니다.',
      strengths_heading: '강점',
      strength_1: '정보 수집→핵심 추출→의사결정 정리',
      strength_2: '자동화 도구 프로토타입 (워크플로우 / AI 비서)',
      strength_3: '웹사이트 제작 (구현→개선)',
      tag_research: '리서치',
      tag_analysis: '분석',
      tag_automation: '자동화',
      tag_proto: '프로토타이핑',
      tag_web: '웹 제작',
      tag_improve: '개선',
      tag_planning: '기획',
      tag_ops: '운영',
      tag_community: '커뮤니티',
      tag_systemize: '체계화',
      works_title: '작업 / 프로젝트',
      work_label_role: '역할',
      work_label_scale: '규모',
      work1_title: 'Google 학생 AI 앰배서더',
      work1_role: '학생 앰배서더',
      work1_scale: '70명 규모',
      work1_desc: '이벤트 운영, 참가자 지원, 기획 추진',
      work1_result: '우수 평가 획득',
      work2_title: 'AI 서클장 (270명)',
      work2_role: '대표 / 운영체계 구축',
      work2_scale: '270명',
      work2_desc: '이벤트 기획/운영, 멤버 지원, 운영 플로우 정비',
      work2_result: '약 30명 규모 온/오프라인 이벤트 개최',
      now_title: '현재 집중',
      now_1: 'AI 비서·자동화 도구 개발',
      now_2: '누구나 만들고 업데이트할 수 있는 웹 구조화',
      now_3: 'AI 활용으로 학습/제작 속도 향상',
      now_updated: '최종 업데이트: 2026년 2월 9일',
      links_title: '링크',
      email_label: '이메일',
      contact_title: '문의',
      contact_lead: '요청 내용이 완전히 정리되지 않아도 괜찮습니다.<br>목적만 알려주세요.',
      template_label: '의뢰 템플릿',
      copy_btn: '복사',
      copy_done: '복사됨',
      template_body: '목적:\n의뢰 내용:\n희망 납기:\n예산(선택):\n연락 수단:',
      contact_btn: '이메일로 문의',
      footer_message: 'AI 네이티브 세대로서 일본의 생산성을 높이는 프로토타입을 계속 만듭니다.',
      bgm_play: 'BGM 재생',
      bgm_stop: 'BGM 정지'
    }
  };

  function t(key) {
    const dict = translations[currentLang] || translations.ja;
    return dict[key] || key;
  }

  function applyLanguage(lang) {
    currentLang = translations[lang] ? lang : 'ja';
    const dict = translations[currentLang];
    const fallbackDict = translations.en;
    const defaultDict = translations.ja;
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const text = dict[key] || fallbackDict[key] || defaultDict[key];
      if (text) el.textContent = text;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      const html = dict[key] || fallbackDict[key] || defaultDict[key];
      if (html) el.innerHTML = html;
    });
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Opening Cinematic ──
  const openingCinematic = document.getElementById('openingCinematic');
  const openingEnter = document.getElementById('openingEnter');
  const homeSection = document.getElementById('hero');
  const openingSeenKey = 'opening_seen_v2026_02_09';
  let openingTimer = null;
  let openingClosed = false;

  function closeOpening(immediate = false) {
    if (openingClosed) return;
    openingClosed = true;
    document.body.classList.remove('is-opening');
    localStorage.setItem(openingSeenKey, '1');

    if (!openingCinematic) return;

    if (immediate) {
      openingCinematic.hidden = true;
      return;
    }

    openingCinematic.classList.add('is-leaving');
    window.setTimeout(() => {
      openingCinematic.hidden = true;
    }, 950);
  }

  function moveToHomeSection() {
    if (!homeSection) return;
    homeSection.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
    if (window.history && typeof window.history.replaceState === 'function') {
      window.history.replaceState(null, '', '#hero');
    } else {
      window.location.hash = 'hero';
    }
  }

  if (openingCinematic) {
    const seenBefore = localStorage.getItem(openingSeenKey) === '1';
    if (prefersReducedMotion || seenBefore) {
      closeOpening(true);
    } else {
      openingCinematic.classList.add('is-intense');
      openingTimer = window.setTimeout(() => closeOpening(false), 3000);
      if (openingEnter) {
        openingEnter.addEventListener('click', () => {
          if (openingTimer) window.clearTimeout(openingTimer);
          closeOpening(false);
          window.setTimeout(() => {
            moveToHomeSection();
          }, prefersReducedMotion ? 0 : 120);
        });
      }
      openingCinematic.addEventListener('click', (event) => {
        if (event.target === openingCinematic) {
          if (openingTimer) window.clearTimeout(openingTimer);
          closeOpening(false);
        }
      });
      document.addEventListener('keydown', (event) => {
        if (openingClosed) return;
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
          if (openingTimer) window.clearTimeout(openingTimer);
          closeOpening(false);
        }
      });
    }
  } else {
    document.body.classList.remove('is-opening');
  }

  // ── Hamburger Menu ──
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // モバイルナビのリンクをクリックしたら閉じる
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Copy Template Button ──
  const copyBtn = document.getElementById('copyBtn');
  const templateBody = document.getElementById('templateBody');
  const copyTextEl = copyBtn ? copyBtn.querySelector('[data-i18n]') : null;

  if (copyBtn && templateBody) {
    copyBtn.addEventListener('click', () => {
      const text = templateBody.textContent;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.classList.add('copied');
        if (copyTextEl) copyTextEl.textContent = t('copy_done');
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          if (copyTextEl) copyTextEl.textContent = t('copy_btn');
        }, 2000);
      }).catch(() => {
        // フォールバック
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copyBtn.classList.add('copied');
        if (copyTextEl) copyTextEl.textContent = t('copy_done');
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          if (copyTextEl) copyTextEl.textContent = t('copy_btn');
        }, 2000);
      });
    });
  }

  // ── Scroll Fade-in Animation ──
  const fadeTargets = document.querySelectorAll(
    '.section-title, .section-subtitle, .about-body, .strengths, ' +
    '.work-card, .now-item, .link-card, .contact-template, .contact-lead, .contact-btn, ' +
    '.hero-name-row, .hero-titles, .hero-catch, .hero-lead, .hero-buttons, .hero-note, ' +
    '.chat-container'
  );

  fadeTargets.forEach((el, index) => {
    el.classList.add('fade-in');
    const delay = Math.min((index % 8) * 44, 320);
    el.style.setProperty('--fade-delay', `${delay}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeTargets.forEach(el => observer.observe(el));

  // ── Active Nav Link Highlight ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ── Header Background on Scroll ──
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scrollProgress');
  const splash = document.getElementById('splash');
  const splashContent = document.querySelector('.splash-content');

  function updateHeader() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  let scrollTicking = false;
  function updateScrollUi() {
    const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(100, (window.scrollY / scrollMax) * 100);
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (!prefersReducedMotion && splash && splashContent) {
      const splashHeight = splash.offsetHeight || window.innerHeight;
      const passed = Math.min(window.scrollY, splashHeight);
      const offsetY = passed * 0.075;
      const fade = 1 - Math.min(0.45, passed / splashHeight);
      splashContent.style.transform = `translate3d(0, ${offsetY}px, 0)`;
      splashContent.style.opacity = String(fade);
    }
  }

  function syncScrollEffects() {
    updateHeader();
    updateActiveNav();
    updateScrollUi();
    scrollTicking = false;
  }

  function requestScrollSync() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(syncScrollEffects);
  }

  window.addEventListener('scroll', requestScrollSync, { passive: true });
  window.addEventListener('resize', requestScrollSync, { passive: true });
  requestScrollSync();

  // ── Language Menu ──
  const langSelect = document.getElementById('langSelect');
  const savedLang = currentLang;
  applyLanguage(savedLang);
  if (langSelect) {
    langSelect.value = savedLang;
    langSelect.addEventListener('change', () => {
      const nextLang = langSelect.value;
      localStorage.setItem(I18N_STORAGE_KEY, nextLang);
      applyLanguage(nextLang);
      const toggle = document.getElementById('bgmToggle');
      if (toggle && toggle.getAttribute('aria-expanded') === 'true') {
        const label = toggle.querySelector('.link-label');
        if (label) label.textContent = t('bgm_stop');
      }
    });
  }

  // ── BGM Toggle (YouTube background playback) ──
  const bgmToggle = document.getElementById('bgmToggle');
  const bgmPlayerWrap = document.getElementById('bgmPlayerWrap');
  const bgmPlayer = document.getElementById('bgmPlayer');

  if (bgmToggle && bgmPlayerWrap && bgmPlayer) {
    const videoId = 'jK2aIUmmdP4';
    const bgmUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&start=0&autoplay=1&loop=1&playlist=${videoId}&playsinline=1`;
    let isPlaying = false;
    let isStoppedByUser = false;
    let player = null;
    const bgmLabel = bgmToggle.querySelector('.link-label');
    const bgmArrow = bgmToggle.querySelector('.link-arrow');

    function setBgmUiState(playing) {
      bgmToggle.setAttribute('aria-expanded', playing ? 'true' : 'false');
      if (bgmLabel) bgmLabel.textContent = t(playing ? 'bgm_stop' : 'bgm_play');
      if (bgmArrow) bgmArrow.innerHTML = playing ? '<i class="fas fa-stop"></i>' : '<i class="fas fa-play"></i>';
    }

    function loadIframeSource(forceReload = false) {
      if (forceReload) {
        bgmPlayer.src = '';
      }
      if (bgmPlayer.src !== bgmUrl) {
        bgmPlayer.src = bgmUrl;
      }
    }

    function startBgm() {
      isStoppedByUser = false;
      if (player && typeof player.playVideo === 'function') {
        player.playVideo();
      } else {
        // YouTube API準備前でも、ユーザー操作時に確実に再試行させる
        loadIframeSource(true);
      }
    }

    function stopBgm() {
      isStoppedByUser = true;
      if (player && typeof player.pauseVideo === 'function') {
        player.pauseVideo();
      } else {
        bgmPlayer.src = '';
      }
      isPlaying = false;
      setBgmUiState(false);
    }

    function initYouTubePlayer() {
      if (!window.YT || !window.YT.Player || player) return;
      player = new window.YT.Player('bgmPlayer', {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          start: 0,
          playlist: videoId
        },
        events: {
          onReady: (event) => {
            if (!isStoppedByUser) {
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            const state = event.data;
            if (state === window.YT.PlayerState.PLAYING) {
              isPlaying = true;
              setBgmUiState(true);
            } else if (state === window.YT.PlayerState.PAUSED || state === window.YT.PlayerState.ENDED) {
              if (isStoppedByUser) {
                isPlaying = false;
                setBgmUiState(false);
                return;
              }
              if (state === window.YT.PlayerState.ENDED) {
                event.target.seekTo(0);
                event.target.playVideo();
              }
            }
          },
          onError: () => {
            isPlaying = false;
            setBgmUiState(false);
          }
        }
      });
    }

    function ensureYouTubeApi() {
      if (window.YT && window.YT.Player) {
        initYouTubePlayer();
        return;
      }

      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevReady === 'function') prevReady();
        initYouTubePlayer();
      };

      if (document.querySelector('script[data-yt-api="true"]')) return;

      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.dataset.ytApi = 'true';
      document.head.appendChild(script);
    }

    // 背景再生用プレイヤーを常時ロード。音あり自動再生はブラウザ側でブロックされる場合がある。
    bgmPlayerWrap.hidden = false;
    loadIframeSource();
    ensureYouTubeApi();
    setBgmUiState(false);

    // 初回ユーザー操作時に再生を再試行
    const bootstrapPlayback = () => {
      if (!isStoppedByUser) {
        startBgm();
      }
    };
    document.addEventListener('pointerdown', bootstrapPlayback, { once: true, passive: true });
    document.addEventListener('keydown', bootstrapPlayback, { once: true, passive: true });
    document.addEventListener('touchstart', bootstrapPlayback, { once: true, passive: true });

    bgmToggle.addEventListener('click', (event) => {
      event.preventDefault();
      if (!isPlaying) {
        startBgm();
      } else {
        stopBgm();
      }
    });
  }
});
