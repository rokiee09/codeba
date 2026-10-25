import type { Lang } from '../i18n';

type Service = { icon: string; title: string; text: string };

export const services: Record<Lang, Service[]> = {
  tr: [
    { icon: 'mobile', title: 'Mobil uygulama', text: 'Flutter ile Android ve iOS için tek koddan uygulama. Fikir aşamasından mağazaya çıkana kadar.' },
    { icon: 'web', title: 'Web sitesi', text: 'Kişisel site, tanıtım sayfası, blog. Astro, React ya da WordPress; ihtiyaca hangisi uyuyorsa.' },
    { icon: 'auto', title: 'Otomasyon ve veri', text: 'Her hafta elle yaptığınız Excel ve rapor işlerini kısaltmak. Küçük scriptler, düzenli tablolar.' },
    { icon: 'fix', title: 'Var olan projeye destek', text: 'Yarım kalmış bir uygulama, çalışmayan bir özellik ya da bir hata. Bakıp ne yapılabileceğini söylerim.' },
  ],
  en: [
    { icon: 'mobile', title: 'Mobile apps', text: 'Android and iOS apps from a single Flutter codebase, from the first idea to the store release.' },
    { icon: 'web', title: 'Websites', text: 'Personal sites, landing pages, blogs. Astro, React or WordPress, whichever fits the job.' },
    { icon: 'auto', title: 'Automation and data', text: 'Cutting down the Excel and reporting work you do by hand every week. Small scripts, tidy spreadsheets.' },
    { icon: 'fix', title: 'Help with an existing project', text: "An unfinished app, a broken feature or a bug. I'll take a look and tell you what can be done." },
  ],
};

export const steps: Record<Lang, string[]> = {
  tr: [
    'Önce ne istediğinizi konuşuyoruz. Kısa bir e-posta yeterli.',
    'Neyin yapılacağını, ne kadar süreceğini netleştiriyorum. Belirsiz yer kalmasın.',
    'İşi küçük parçalar halinde gösteriyorum, siz de yol boyunca yön veriyorsunuz.',
    'Teslimden sonra da bir süre buradayım. Bir şey çıkarsa birlikte bakıyoruz.',
  ],
  en: [
    'First we talk about what you need. A short email is enough.',
    'I pin down what will be built and how long it will take, so nothing is left vague.',
    'I show the work in small pieces, and you steer along the way.',
    'I stick around after delivery. If something comes up, we look at it together.',
  ],
};

export const pillars: Record<Lang, { title: string; text: string; icon: string }[]> = {
  tr: [
    { title: 'Güvenlik baştan düşünülür', text: 'Giriş, veri saklama ve yetkiler en baştan planlanır. Güncel bağımlılıklar, şifreli bağlantı, gereksiz veri toplamama.', icon: 'shield' },
    { title: 'Hızlı açılır', text: 'Gereksiz eklenti ve ağır tema yok. Sayfalar önceden hazırlanır, telefonda bile anında açılır.', icon: 'bolt' },
    { title: 'Kod sizin olur', text: 'Proje bittiğinde kaynak kod, hesaplar ve kısa bir kullanım notu size teslim edilir. Bana bağlı kalmazsınız.', icon: 'lock' },
  ],
  en: [
    { title: 'Security from day one', text: 'Login, data storage and permissions are planned from the start. Up-to-date dependencies, encrypted connections, no unnecessary data collection.', icon: 'shield' },
    { title: 'Loads fast', text: 'No bloated plugins or heavy themes. Pages are prebuilt, so they open instantly, even on a phone.', icon: 'bolt' },
    { title: 'The code is yours', text: "When the project is done, you get the source code, the accounts and a short handover note. You're never locked in.", icon: 'lock' },
  ],
};

// 24x24 çizgi ikonlar
export const icons: Record<string, string> = {
  mobile: '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18h2"/>',
  web: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M9.5 6.5h.01"/>',
  auto: '<path d="M4 12a8 8 0 0 1 13.7-5.6M20 12a8 8 0 0 1-13.7 5.6"/><path d="M18 3v4h-4M6 21v-4h4"/>',
  fix: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.5-2"/>',
};
