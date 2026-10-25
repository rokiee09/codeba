---
title: Her hafta aynı tabloyu yapmak
description: Tekrar eden Excel işlerini otomatiğe bağlamadan önce sorduğum birkaç soru.
draft: true
date: 2026-10-15
---

İşte her hafta hazırladığım bir tablo var. Veri farklı ama adımlar hep aynı: dosyayı aç, sütunları düzelt, birkaç toplam al, grafiği güncelle, sunuma yapıştır. Yarım saat sürüyor, yılda yirmi beş saat eder.

Bunu otomatiğe bağlamaya karar vermeden önce kendime şunları soruyorum:

**Girdi her seferinde aynı formatta mı geliyor?** Gelmiyorsa otomasyon ilk hafta bozulur. Önce girdiyi sabitlemek lazım.

**Hangi adım gerçekten zaman alıyor?** Çoğu zaman bütün süreci değil, bir iki adımı otomatikleştirmek yetiyor.

**Bozulursa fark eder miyim?** Elle yaparken hatayı gözüm görüyordu. Script sessizce yanlış toplam verirse kimse fark etmez. Bu yüzden sonuna basit bir kontrol koyuyorum: toplamlar tutuyor mu, satır sayısı geçen haftayla aynı mı.

Çoğu iş için Excel'in kendi araçları (Power Query, birkaç formül) yetiyor. Gerçekten gerekirse Python'a geçiyorum. Her şeyi koda dökmek gerekmiyor, bazen doğru bir şablon yetiyor.
