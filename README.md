# codeba.dev

```
npm install
npm run dev
```

- Hizmetler ve çalışma adımları: `src/data/services.ts`
- İşler: `src/data/projects.ts`
- Yazılar: `src/content/yazilar/` (yeni `.md` = yeni yazı, `draft: true` yayınlamaz)
- E-posta, GitHub: `src/consts.ts`
- Renkler, yazı tipi: `src/styles/global.css`
- Proje videoları: animos.app'te hazırla, MP4 indir, `public/isler/` içine koy, `projects.ts`'te `media` satırını aç

## Yayına alma
1. GitHub'da yeni bir repo aç, bu klasörün içeriğini yükle.
2. vercel.com → Add New → Project → repoyu seç → Deploy (Astro otomatik tanınır).
3. Vercel projesi → Settings → Domains → codeba.dev ve www.codeba.dev ekle; Vercel'in gösterdiği DNS kayıtlarını alan adını aldığın firmanın paneline gir.
