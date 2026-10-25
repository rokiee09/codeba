// İki dil: Türkçe varsayılan (kök adres), İngilizce /en/ altında.
export type Lang = 'tr' | 'en';
export const LANGS: Lang[] = ['tr', 'en'];

export function getLang(url: URL): Lang {
  const p = url.pathname;
  return p === '/en' || p.startsWith('/en/') ? 'en' : 'tr';
}

// aynı sayfanın iki dildeki adresi
const ROUTES: Record<string, Record<Lang, string>> = {
  home: { tr: '/', en: '/en/' },
  works: { tr: '/isler/', en: '/en/work/' },
  about: { tr: '/hakkimda/', en: '/en/about/' },
  contact: { tr: '/iletisim/', en: '/en/contact/' },
  privacy: { tr: '/gizlilik/', en: '/en/privacy/' },
};

export function path(key: keyof typeof ROUTES, lang: Lang) {
  return ROUTES[key][lang];
}

// şu anki sayfanın diğer dildeki karşılığı; karşılığı yoksa (blog) o dilin ana sayfası
export function switchPath(url: URL, target: Lang) {
  const p = url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
  for (const r of Object.values(ROUTES)) {
    if (r.tr === p || r.en === p) return r[target];
  }
  return ROUTES.home[target];
}

export function hasAlternate(url: URL) {
  const p = url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
  return Object.values(ROUTES).some((r) => r.tr === p || r.en === p);
}

export const ui = {
  tr: {
    'meta.suffix': 'uygulama ve web geliştirme',
    'meta.homeTitle': 'Burak Avcı · Mobil Uygulama ve Web Geliştirme | codeba',
    'meta.jobTitle': 'Mobil ve Web Geliştirici',
    'works.metaTitle': 'İşler: mobil, web ve masaüstü projeleri',
    'about.metaTitle': 'Hakkımda: Burak Avcı',
    'about.description': 'Burak Avcı kimdir: siber güvenlik geçmişi olan, Flutter, React Native, React ve Astro ile uygulama ve web sitesi geliştiren bir geliştirici.',
    'meta.description': 'Burak Avcı · Flutter ve React Native ile Android ve iOS uygulamaları, Astro ve React ile hızlı web siteleri, Windows için masaüstü uygulamaları geliştiriyorum.',
    'nav.works': 'İşler',
    'nav.blog': 'Yazılar',
    'nav.about': 'Hakkımda',
    'nav.cta': 'İletişim',
    'nav.home': 'codeba ana sayfa',
    'lang.label': 'Dil seçimi',
    'intro.skip': 'Geç',

    'hero.status': 'Yeni fikirlere açık',
    'hero.title': 'Mobil uygulama ve web geliştirme.',
    'hero.sub': 'Fikirden yayına, tek elden.',
    'hero.lede':
      'Flutter ile Android ve iOS uygulamaları, Astro ve React ile hızlı web siteleri geliştiriyorum. Ajans değilim; projenizle baştan sona bizzat ilgileniyorum.',
    'hero.cta': 'Fikrini anlat →',
    'hero.works': 'İşleri gör',
    'hero.stack': 'Teknolojiler',
    'hero.stackAria': 'Kullandığım teknolojiler',
    'hero.scene': 'Laptopta yazılan kodun telefonda uygulamaya dönüştüğü 3D animasyon',

    'home.services.eyebrow': 'Neler yapıyorum',
    'home.services.title': 'Dört alanda yardımcı oluyorum.',
    'home.value.eyebrow': 'Neden codeba',
    'home.value.title': 'Hızlı, güvenli ve size ait.',
    'home.value.text':
      'Yıllarca bilgisayar sistemleri, mobil cihazlar ve dijital güvenlik üzerine çalıştım. Bu yüzden güvenlik benim için sonradan eklenen bir özellik değil, işin başlangıç noktası.',
    'home.works.eyebrow': 'Seçili işler',
    'home.works.title': 'Son yaptıklarım',
    'home.works.all': 'Tümü →',
    'home.process.eyebrow': 'Nasıl çalışıyorum',
    'home.process.title': 'Sürpriz yok, adım adım.',
    'home.blog.eyebrow': 'Yazılar',
    'home.blog.title': 'Notlar',
    'home.contact.eyebrow': 'İletişim',
    'home.contact.title': 'Bir fikriniz mi var?',
    'home.contact.text': 'Yeni bir proje, yarım kalmış bir uygulama ya da sadece bir soru. Kısaca anlatın, size dönüş yapayım.',

    'works.eyebrow': 'Portfolyo',
    'works.title': 'İşler',
    'works.text': 'Üzerinde çalıştığım ve teslim ettiğim projeler.',
    'works.all': 'Tümü',
    'works.filter': 'Kategoriye göre filtrele',
    'works.description': 'SAHA 2559 mobil uygulaması, Kitap Stüdyosu masaüstü uygulaması ve jerupath.com gibi geliştirdiğim mobil, web ve masaüstü projeleri.',

    'cat.mobile': 'Mobil',
    'cat.web': 'Web',
    'cat.desktop': 'Masaüstü',
    'cat.automation': 'Otomasyon',

    'contact.title.meta': 'İletişim',
    'contact.description': 'Projenizi anlatın, size dönüş yapayım.',
    'contact.eyebrow': 'İletişim',
    'contact.title': 'Projenizi anlatın.',
    'contact.text':
      'Birkaç cümle yeterli. Okuyup ne yapılabileceğini, nasıl ilerleyebileceğimizi e-postayla yazarım. Bir yükümlülüğünüz yok.',
    'contact.email': 'E-posta',
    'contact.github': 'Kodlarıma bakın',
    'contact.linkedin': 'Profilim',

    'form.name': 'Adınız',
    'form.email': 'E-posta',
    'form.service': 'Ne yapmak istiyorsunuz?',
    'form.unsure': 'Henüz emin değilim',
    'form.timeline': 'Ne zamana lazım?',
    'form.t1': 'Acil (2 hafta içinde)',
    'form.t2': '1 ay içinde',
    'form.t3': '1–3 ay',
    'form.t4': 'Acelem yok',
    'form.message': 'Projenizi kısaca anlatın',
    'form.placeholder': 'Ne yapmak istiyorsunuz, elinizde hazır bir şey var mı, örnek aldığınız bir site ya da uygulama...',
    'form.consent.link': 'Aydınlatma metnini',
    'form.consent.rest':
      'okudum; bilgilerimin talebime dönüş yapılması amacıyla işlenmesini ve form hizmet sağlayıcısı üzerinden iletilmesini kabul ediyorum.',
    'form.submit': 'Gönder →',
    'form.sending': 'Gönderiliyor...',
    'form.note': 'Genelde {time} dönüş yaparım.',
    'form.ok': 'Talebiniz ulaştı, teşekkürler. En kısa sürede e-postayla dönüş yapacağım.',
    'form.err': 'Gönderilemedi.',
    'form.notReady': 'Form henüz bağlanmadı.',
    'form.fallback': 'Form şu an çalışmıyor. Doğrudan şu adrese yazabilirsiniz:',
    'form.subject': 'codeba.dev · yeni mesaj',

    'process.s1': 'Konuşalım',
    'process.s2': 'Tasarlayalım',
    'process.s3': 'Geliştirelim',
    'process.s4': 'Yayına alalım',
    'process.ui.request': 'Yeni mesaj',
    'process.ui.service': 'Konu',
    'process.ui.serviceVal': 'Mobil uygulama',
    'process.ui.time': 'Süre',
    'process.ui.timeVal': '1 ay içinde',
    'process.ui.reply': 'Yanıtla',
    'process.ui.frame': 'Ana ekran',
    'process.ui.live': 'Yayında',
    'process.ui.c1': 'HTTPS ile güvenli',
    'process.ui.c2': 'Telefona uyumlu',
    'process.ui.c3': 'Kaynak kod teslim edildi',
    'process.ui.preview': 'Önizleme',
    'app.eyebrow': 'Mobil uygulama örneği',
    'app.title': 'Uygulamanız elde canlı dursun.',
    'app.text': "Akıcı animasyonlar, net bir arayüz ve iOS ile Android'de aynı deneyim. Yandaki ekran, nasıl bir his hedeflediğimi gösteren örnek bir tasarım.",
    'app.b1': 'Tek koddan iOS ve Android (Flutter)',
    'app.b2': 'Hızlı açılan, akıcı ekranlar',
    'app.b3': 'Karanlık ve aydınlık tema',
    'app.replay': 'Tekrar oynat',
    'app.badge': 'Örnek arayüz',
    'app.aria': 'Su takibi uygulaması için örnek mobil arayüz animasyonu',
    'app.month': 'Eki',
    'app.days': 'P,S,Ç,P,C,C,P',
    'app.unit': 'ml',
    'app.goal': 'Günlük hedef: 2.500 ml',
    'app.pct': 'Hedefin %86’sı tamam',
    'app.c1': '8 bardak',
    'app.c2': '5 gün seri',
    'app.c3': 'Paylaş',
    'about.title': 'Hakkımda',
    'about.p1':
      'Ben Burak Avcı. Pamukkale Üniversitesi’nde Bilgisayar ve Öğretim Teknolojileri Eğitimi okudum, Anadolu Üniversitesi’nde Bilgisayar Programcılığı önlisansına devam ediyorum. Yaklaşık yedi yıl siber güvenlik alanında, mobil cihaz inceleme ve veri analizi üzerine çalıştım. Bu yüzden yaptığım her uygulamada güvenliği baştan düşünürüm.',
    'about.p2':
      'Yazılıma ihtiyaçtan başladım. Bir işi üçüncü kez elle yapınca "bunu bilgisayar yapsın" diye düşünmeye başlıyorum, oradan da bir şeyler çıkıyor. codeba da bu merakın biraz büyümüş hali.',
    'about.p3':
      'Her şeyi bildiğimi iddia etmem. Bir iş bana uygun değilse bunu baştan söylerim, uygunsa sonuna kadar götürürüm.',
    'about.tools': 'Kullandıklarım',
    'about.toolsText':
      "Flutter ve Dart, React Native ve Expo, JavaScript, TypeScript ve React, Android. Siteler için Astro ve WordPress, Windows masaüstü uygulamaları için Tauri ve Rust, tasarım için Figma. Kod GitHub'da, yayın Vercel'de. Excel'le de aram iyidir.",
    'about.cta': 'İletişime geçin →',
    'about.cert': 'Sertifika',
    'about.certTitle': 'Mobile App & Frontend Developer Yetiştirme Programı',
    'about.certOrg': 'Only JavaScript',
    'about.certDate': 'Kasım 2024 – Ağustos 2025',
    'about.certText':
      'React ve React Native ağırlıklı, 10 ay süren kapsamlı bir program. Tasarımdan API testine kadar bir uygulamanın bütün aşamalarını gerçek projeler üzerinden çalıştık.',
    'about.certTech': 'Programda kullanılanlar',

    'footer.tagline': 'Mobil uygulama ve web geliştirme üzerine çalışmalarım.',
    'footer.site': 'Site',
    'footer.contact': 'İletişim',
    'footer.privacy': 'Gizlilik ve KVKK',
    'footer.email': 'E-posta',
    'footer.aria': 'Alt menü',
  },
  en: {
    'meta.suffix': 'app and web development',
    'meta.homeTitle': 'Burak Avcı · Mobile App and Web Development | codeba',
    'meta.jobTitle': 'Mobile and Web Developer',
    'works.metaTitle': 'Work: mobile, web and desktop projects',
    'about.metaTitle': 'About Burak Avcı',
    'about.description': 'About Burak Avcı: a developer with a cybersecurity background who builds apps and websites with Flutter, React Native, React and Astro.',
    'meta.description': 'Burak Avcı · I build Android and iOS apps with Flutter and React Native, fast websites with Astro and React, and desktop apps for Windows.',
    'nav.works': 'Work',
    'nav.blog': 'Writing',
    'nav.about': 'About',
    'nav.cta': 'Contact',
    'nav.home': 'codeba home',
    'lang.label': 'Language',
    'intro.skip': 'Skip',

    'hero.status': 'Open to new ideas',
    'hero.title': 'Mobile apps and web development.',
    'hero.sub': 'From idea to launch, end to end.',
    'hero.lede':
      "I build Android and iOS apps with Flutter, and fast websites with Astro and React. I'm not an agency; I handle your project personally from start to finish.",
    'hero.cta': 'Share your idea →',
    'hero.works': 'See work',
    'hero.stack': 'Tech',
    'hero.stackAria': 'Technologies I use',
    'hero.scene': 'A 3D animation of code typed on a laptop turning into an app on a phone',

    'home.services.eyebrow': 'What I do',
    'home.services.title': 'Four ways I can help.',
    'home.value.eyebrow': 'Why codeba',
    'home.value.title': 'Fast, secure and yours.',
    'home.value.text':
      "I spent years working with computer systems, mobile devices and digital security. So security isn't something I add at the end; it's where the work starts.",
    'home.works.eyebrow': 'Selected work',
    'home.works.title': 'Recent projects',
    'home.works.all': 'All →',
    'home.process.eyebrow': 'How I work',
    'home.process.title': 'No surprises, step by step.',
    'home.blog.eyebrow': 'Writing',
    'home.blog.title': 'Notes',
    'home.contact.eyebrow': 'Contact',
    'home.contact.title': 'Got an idea?',
    'home.contact.text': "A new project, an unfinished app or just a question. Tell me briefly and I'll get back to you.",

    'works.eyebrow': 'Portfolio',
    'works.title': 'Work',
    'works.text': "Projects I've worked on and delivered.",
    'works.all': 'All',
    'works.filter': 'Filter by category',
    'works.description': 'Mobile, web and desktop projects I have built, including the SAHA 2559 app, the Kitap Stüdyosu desktop app and jerupath.com.',

    'cat.mobile': 'Mobile',
    'cat.web': 'Web',
    'cat.desktop': 'Desktop',
    'cat.automation': 'Automation',

    'contact.title.meta': 'Contact',
    'contact.description': "Tell me about your project and I'll get back to you.",
    'contact.eyebrow': 'Contact',
    'contact.title': 'Tell me about your project.',
    'contact.text':
      "A few sentences is enough. I'll read it and reply by email with what can be done and how we could go about it. No commitment.",
    'contact.email': 'Email',
    'contact.github': 'See my code',
    'contact.linkedin': 'My profile',

    'form.name': 'Your name',
    'form.email': 'Email',
    'form.service': 'What do you need?',
    'form.unsure': 'Not sure yet',
    'form.timeline': 'When do you need it?',
    'form.t1': 'Urgent (within 2 weeks)',
    'form.t2': 'Within a month',
    'form.t3': '1–3 months',
    'form.t4': 'No rush',
    'form.message': 'Tell me briefly about your project',
    'form.placeholder': 'What do you want to build, do you have anything ready, a site or app you like as a reference...',
    'form.consent.link': "I've read the privacy notice",
    'form.consent.rest':
      'and agree that my details are processed to respond to my request and sent through the form service provider.',
    'form.submit': 'Send →',
    'form.sending': 'Sending...',
    'form.note': 'I usually reply within {time}.',
    'form.ok': "Got it, thanks. I'll get back to you by email soon.",
    'form.err': "Couldn't send.",
    'form.notReady': "The form isn't connected yet.",
    'form.fallback': "The form isn't working right now. You can email me directly at:",
    'form.subject': 'codeba.dev · new message',

    'process.s1': 'Talk',
    'process.s2': 'Design',
    'process.s3': 'Build',
    'process.s4': 'Launch',
    'process.ui.request': 'New message',
    'process.ui.service': 'Topic',
    'process.ui.serviceVal': 'Mobile app',
    'process.ui.time': 'Timeline',
    'process.ui.timeVal': 'Within a month',
    'process.ui.reply': 'Reply',
    'process.ui.frame': 'Home screen',
    'process.ui.live': 'Live',
    'process.ui.c1': 'Secured with HTTPS',
    'process.ui.c2': 'Works on phones',
    'process.ui.c3': 'Source code handed over',
    'process.ui.preview': 'Preview',
    'app.eyebrow': 'Mobile app example',
    'app.title': 'Apps that feel alive in the hand.',
    'app.text': 'Smooth animations, a clear interface and the same experience on iOS and Android. The screen on the right is a sample design that shows the feel I aim for.',
    'app.b1': 'iOS and Android from one codebase (Flutter)',
    'app.b2': 'Fast, fluid screens',
    'app.b3': 'Dark and light themes',
    'app.replay': 'Replay',
    'app.badge': 'Sample interface',
    'app.aria': 'Sample mobile interface animation for a water tracking app',
    'app.month': 'Oct',
    'app.days': 'M,T,W,T,F,S,S',
    'app.unit': 'ml',
    'app.goal': 'Daily goal: 2,500 ml',
    'app.pct': '86% of your goal',
    'app.c1': '8 glasses',
    'app.c2': '5-day streak',
    'app.c3': 'Share',
    'about.title': 'About',
    'about.p1':
      "I'm Burak Avcı. I studied Computer and Instructional Technology Education at Pamukkale University, and I'm currently studying Computer Programming (associate degree) at Anadolu University. I spent about seven years in cybersecurity, working on mobile device examination and data analysis, so security is something I think about from day one in every app.",
    'about.p2':
      'I got into software out of necessity. When I do something by hand for the third time, I start thinking "a computer should do this", and that is usually how something new begins. codeba is that curiosity, grown up a little.',
    'about.p3':
      "I don't claim to know everything. If a job isn't a good fit for me, I'll say so up front; if it is, I'll see it through.",
    'about.tools': 'What I use',
    'about.toolsText':
      "Flutter and Dart, React Native and Expo, JavaScript, TypeScript and React, Android. Astro and WordPress for websites, Tauri and Rust for Windows desktop apps, Figma for design. Code on GitHub, hosting on Vercel. And I'm pretty handy with Excel.",
    'about.cta': 'Get in touch →',
    'about.cert': 'Certificate',
    'about.certTitle': 'Mobile App & Frontend Developer Training Program',
    'about.certOrg': 'Only JavaScript',
    'about.certDate': 'November 2024 – August 2025',
    'about.certText':
      'A 10-month intensive program focused on React and React Native. We worked through every stage of an app, from design to API testing, on real projects.',
    'about.certTech': 'Used in the program',

    'footer.tagline': 'My work in mobile and web development.',
    'footer.site': 'Site',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy',
    'footer.email': 'Email',
    'footer.aria': 'Footer menu',
  },
} as const;

export type UIKey = keyof (typeof ui)['tr'];

export function useT(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui.tr[key];
}
