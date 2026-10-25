import type { Lang } from '../i18n';

export type Media =
  | { type: 'video'; src: string; poster?: string }
  | { type: 'image'; src: string; alt: string };

type Text = Record<Lang, string>;

export type Project = {
  name: string;
  category: 'mobile' | 'web' | 'automation';
  stack: string[];
  summary: Text;
  detail?: Text;
  link?: string;
  // false: site henüz yayında değil; link gösterilmez, "Yakında yayında" rozeti çıkar
  live?: boolean;
  // animos'tan indirdiğin MP4'ü public/isler/ klasörüne koy, yolunu buraya yaz
  media?: Media;
  featured?: boolean;
};

// yeni iş ekledikçe buraya bir obje daha ekle
export const projects: Project[] = [
  {
    name: 'SAHA 2559',
    category: 'mobile',
    stack: ['Flutter', 'Dart'],
    summary: {
      tr: 'Saha personeli için mevzuatı ve günlük işte lazım olan araçları tek yerde toplayan uygulama.',
      en: 'An app that brings legislation and everyday tools for field staff together in one place.',
    },
    detail: {
      tr: 'Mevzuat bölümü cihazda saklanıyor, internet yokken de açılıyor. Araçlar kısmında vardiya, maaş tahmini, lojman ve görev puanı, yol harcırahı gibi hesaplayıcılar var. Kişisel notlar PIN ya da biyometrik kilitli yerel bir kasada AES-256-GCM ile şifreleniyor ve hiçbir sunucuya gönderilmiyor.',
      en: 'The legislation section is stored on the device and opens without a connection. The tools section has calculators for shifts, salary estimates, housing and duty points and travel allowance. Personal notes live in a local vault locked by PIN or biometrics, encrypted with AES-256-GCM and never sent to a server.',
    },
    media: { type: 'image', src: '/isler/saha-2559.jpg', alt: 'SAHA 2559: hesaplayıcılar ekranı ve PIN kilitli yerel kasa' },
    featured: true,
  },
  {
    name: 'jerupath.com',
    category: 'web',
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    summary: {
      tr: 'Kudüs’ü ve Kutsal Topraklar’ı ziyaret edecek turistler için dijital seyahat rehberi. Amaç, yolculuğu daha kolay, bilinçli ve planlı hale getirmek.',
      en: 'A digital travel guide for visitors to Jerusalem and the Holy Land, built to make the trip easier, better informed and well planned.',
    },
    detail: {
      tr: 'Tarihî, dinî ve kültürel mekânların tanıtıldığı bir gezi rehberi; harita destekli rota planlama; konaklama, ulaşım ve yeme-içme önerileri. Yanında seyahat paketleri ve videolar için ayrı sayfalar var. Kod GitHub’da, dağıtım Vercel üzerinde.',
      en: 'A guide to historic, religious and cultural sites; map-based route planning; tips on where to stay, how to get around and where to eat. Separate pages for travel packages and videos. Code on GitHub, deployed on Vercel.',
    },
    link: 'https://www.jerupath.com',
    // hosting açılınca true yap: kart linke dönüşür, rozet kalkar
    live: false,
    // ekran görüntüsünü public/isler/jerupath.png olarak koyup bu satırı aç
    // media: { type: 'image', src: '/isler/jerupath.png', alt: 'jerupath.com ana sayfası' },
    featured: true,
  },
  {
    name: 'codeba.dev',
    category: 'web',
    stack: ['Astro'],
    summary: {
      tr: 'Şu an baktığınız site. Hızlı açılsın, bakımı kolay olsun diye özenle kurdum.',
      en: "The site you're looking at. Built with care so it loads fast and is easy to maintain.",
    },
    media: { type: 'image', src: '/isler/codeba.jpg', alt: 'codeba.dev ana sayfası: 3D laptop ve telefon sahnesi' },
    featured: true,
  },
];
