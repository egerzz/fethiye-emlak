# Fethiye Emlak

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-hazır-2ea44f?logo=github&logoColor=white)

Fethiye ve çevresindeki satılık ve kiralık konutları tanıtan; Türkçe, mobil uyumlu ve tamamen statik bir emlak web sitesi. Derleme adımı, paket yöneticisi veya sunucu gerektirmez; doğrudan tarayıcıda çalışır.

## Canlı Demo

🌐 **[fethiye-emlak](https://egerzz.github.io/fethiye-emlak/)**

<!-- Ekran görüntüsü eklemek için dosyayı docs/ klasörüne koyup aşağıdaki satırı etkinleştirin:
![Fethiye Emlak ana sayfa](docs/screenshot.png)
-->

## İçindekiler

- [Canlı demo](#canlı-demo)
- [Özellikler](#özellikler)
- [Sayfa bölümleri](#sayfa-bölümleri)
- [Kullanılan teknolojiler](#kullanılan-teknolojiler)
- [Proje yapısı](#proje-yapısı)
- [Kurulum ve çalıştırma](#kurulum-ve-çalıştırma)
- [GitHub Pages ile yayınlama](#github-pages-ile-yayınlama)
- [Özelleştirme](#özelleştirme)
- [Yayından önce yapılacaklar](#yayından-önce-yapılacaklar)
- [Katkıda bulunma](#katkıda-bulunma)

## Özellikler

- **Mobil uyumlu tasarım:** Telefon, tablet ve masaüstü ekranlara uyum sağlayan duyarlı düzen ve mobil açılır menü.
- **İlan arama:** İlan adı veya konuma göre anlık filtreleme, sonuç sayısı bilgisi ve sonuç bulunamadığında bilgilendirme mesajı.
- **Favori ilanlar:** İlanları kaydetme ve yalnızca kaydedilen ilanları listeleme.
- **İlan detay penceresi:** Her ilan için fiyat, konum, açıklama ve ayrıntıların gösterildiği modal pencere (`<dialog>` elemanı ile).
- **İlan kartları:** Satılık/Kiralık etiketi, fiyat, oda, banyo ve metrekare bilgisi, fotoğraf ve video sayısı.
- **Erişilebilirlik:** "İçeriğe geç" bağlantısı, anlamlı HTML5 yapısı, ARIA nitelikleri ve ekran okuyucular için etiketler.
- **SEO temelleri:** Sayfa başlığı, açıklama (`meta description`) ve tema rengi tanımlı.
- **Hafif yapı:** Framework yok; yalnızca HTML, CSS ve JavaScript.

## Sayfa bölümleri

| Bölüm | Bağlantı | İçerik |
|---|---|---|
| Ana sayfa | `#home` | Karşılama alanı ve bilgi alma / ilanları keşfetme düğmeleri |
| Hakkımızda | `#about` | Şirket tanıtımı ve öne çıkan özellikler |
| Hizmetler | `#service` | Ana odak alanları kartları |
| İlanlar | `#property` | Aranabilir ve favorilenebilir ilan listesi |
| Bina özellikleri | `#features` | Otopark, havuz, güvenlik, fitness, akıllı ev gibi olanaklar |
| Gazete | `#blog` | Son haberler ve yazılar |
| İletişim | `#contact` | Adres, telefon, e-posta ve hızlı bağlantılar |

## Kullanılan teknolojiler

- **HTML5:** Anlamsal yapı ve `<dialog>` elemanı
- **CSS3:** Özel stil dosyası, duyarlı düzen
- **JavaScript (ES6+):** Menü, arama, favoriler ve ilan detay penceresi (framework kullanılmadan)
- **[Lucide](https://lucide.dev/):** Simge kütüphanesi (yerel dosya olarak projeye dahildir)
- **[Google Fonts](https://fonts.google.com/):** Cormorant Garamond ve Nunito Sans yazı tipleri

## Proje yapısı

```text
fethiye-emlak/
├── assets/
│   ├── css/
│   │   └── style.css        # Görünüm ve duyarlı düzen
│   ├── images/              # İlan, hizmet ve haber görselleri
│   └── js/
│       ├── lucide.min.js    # Simge kütüphanesi
│       └── script.js        # Gezinme, arama, favoriler, ilan detayı
├── .gitignore               # Git tarafından yok sayılan dosyalar
├── favicon.svg              # Tarayıcı sekmesi simgesi
├── index.html               # Sayfa içeriği
└── README.md
```

## Kurulum ve çalıştırma

Projeyi bilgisayarınıza indirin ve `index.html` dosyasını tarayıcıda açın:

```bash
git clone https://github.com/<kullanici-adi>/fethiye-emlak.git
cd fethiye-emlak
```

Ardından `index.html` dosyasına çift tıklayın. Ek bir kurulum gerekmez.

İsterseniz yerel bir sunucu ile de çalıştırabilirsiniz (Python kuruluysa):

```bash
python -m http.server 8000
```

Tarayıcıda `http://localhost:8000` adresini açın.

> Yazı tipleri Google Fonts üzerinden yüklendiği için tam görünüm için internet bağlantısı gerekir.

## GitHub Pages ile yayınlama

1. Projeyi GitHub deposuna yükleyin.
2. Depoda **Settings → Pages** bölümünü açın.
3. **Build and deployment** altında kaynak olarak **Deploy from a branch** seçin.
4. Dal olarak `main`, klasör olarak `/ (root)` seçip **Save** düğmesine basın.
5. Birkaç dakika içinde site `https://<kullanici-adi>.github.io/<depo-adi>/` adresinde yayına girer.

Görseller ve diğer statik dosyalar göreli yollarla (`./assets/...`) yüklendiği için kök dizinden yayınlamaya uygundur.

## Özelleştirme

- **İlanlar:** `index.html` içindeki `#property` bölümünde her ilan bir karttır. Başlığı, fiyatı, konumu, oda/banyo/metrekare bilgisini ve görseli kendi ilanınıza göre değiştirin.
- **Görseller:** Yeni fotoğrafları `assets/images/` klasörüne ekleyin ve kartlardaki `src` yollarını güncelleyin.
- **İletişim bilgileri:** Üst bilgi çubuğundaki ve alt bilgideki e-posta, telefon ve adres alanlarını gerçek bilgilerle değiştirin.
- **Renkler ve yazı tipleri:** `assets/css/style.css` dosyasından düzenleyin.
- **Simgeler:** [Lucide](https://lucide.dev/icons/) simge adlarını `data-lucide` niteliğiyle kullanın.

## Yayından önce yapılacaklar

Bu depodaki bazı içerikler tasarım amaçlı örnek verilerdir. Siteyi yayına almadan önce şunları gerçek içerikle değiştirin:

- [ ] "Lorem Ipsum" metinleri (Hakkımızda bölümü, alt bilgi açıklaması, ilan ve haber metinleri)
- [ ] Örnek ilan bilgileri ve fiyatları (tüm ilanlarda örnek fiyat kullanılmıştır; satılık ilanlar için aylık fiyat gösterimini kontrol edin)
- [ ] Telefon numarası ve adres bilgileri
- [ ] E-posta adresleri (üst bilgide `info@fethiyemlak.com`, alt bilgide `iletişim@fethiyeemlak.com` yazıyor; tek bir adreste birleştirin)
- [ ] Menüdeki "Home" bağlantısını Türkçeleştirin ("Ana Sayfa")
- [ ] `docs/screenshot.png` ekran görüntüsünü ekleyip README'deki satırı etkinleştirin

## Katkıda bulunma

Hata bildirimleri ve önerileriniz için **Issues** bölümünü kullanabilirsiniz. Değişiklik önermek için depoyu fork edin, yeni bir dal açın ve Pull Request gönderin.

## Lisans

Lisans henüz belirtilmemiştir. Açık kaynak olarak paylaşmayı düşünüyorsanız depoya bir `LICENSE` dosyası ekleyin (örneğin MIT).
