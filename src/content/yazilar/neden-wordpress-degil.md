---
title: Bu siteyi neden WordPress'le yapmadım
description: Kişisel bir site için WordPress yerine Astro'yu seçme sebeplerim.
draft: true
date: 2026-10-22
---

İlk aklıma gelen WordPress'ti. Daha önce kurdum, kullandım, eklentisini temasını biliyorum. Ama oturup ne istediğimi yazınca vazgeçtim.

İstediğim şey aslında çok basit: birkaç sayfa, bir de ara sıra yazdığım notlar. Bunun için bir veritabanı, her ay ödenen bir hosting ve sürekli güncelleme isteyen bir yönetim paneli fazla geldi. Hele eklentilerin açık verdiğini çok gördüm. Kendi sitemle uğraşırken bir de onu takip etmek istemedim.

Sonunda [Astro](https://astro.build)'da karar kıldım. Mantığı şu: site her güncellediğimde baştan derleniyor ve ortaya düz HTML dosyaları çıkıyor. Ziyaretçi geldiğinde arkada çalışan bir sunucu kodu yok, hazır sayfa gidiyor. Bu yüzden hızlı, bu yüzden açık verecek pek bir yeri yok.

Yazıları da Markdown olarak yazıyorum. Yani bu yazı aslında klasörde duran bir `.md` dosyası. Kodla birlikte GitHub'da duruyor, `git push` deyince Vercel siteyi kendisi güncelliyor.

Eksisi yok mu? Var. Telefondan girip hızlıca yazı ekleyemiyorum, bilgisayar başında olmam lazım. Yorum sistemi de yok. Şimdilik ikisine de ihtiyacım yok, olursa bakarım.
