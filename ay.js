// URL'den ay parametresini al
const urlParams = new URLSearchParams(window.location.search);
const ay = urlParams.get('ay');

// Ay isimleri mapping
const ayIsimleri = {
    'ocak': 'Ocak',
    'subat': 'Şubat',
    'mart': 'Mart',
    'nisan': 'Nisan',
    'mayis': 'Mayıs',
    'haziran': 'Haziran',
    'temmuz': 'Temmuz',
    'agustos': 'Ağustos',
    'eylul': 'Eylül',
    'ekim': 'Ekim',
    'kasim': 'Kasım',
    'aralik': 'Aralık'
};

// Ay mesajları mapping
const ayMesajlari = {
    'ocak': 'Yeni yıl seninle başlıyorsa, her günüm umut 💫',
    'subat': 'Sevgi ayı değil, senin ayın benim için 💖',
    'mart': 'Bahar senin gülüşünle başlıyor 🌸',
    'nisan': 'Kalbim seninle her gün yeniden çiçek açıyor 🌼',
    'mayis': 'Bir dilek hakkım olsa, her yaşında yanında olmak isterdim 🌿',
    'haziran': 'Güneş bile senin yanında sönük kalır ☀️',
    'temmuz': 'Sıcakta serinleten tek şey: varlığın 🌊',
    'agustos': 'Yaz biter, sevgim bitmez 🔥',
    'eylul': 'Sonbahar değil, seninle yeniden başlıyorum 🍁',
    'ekim': 'Kalbimin en derin mevsimi sensin 🍂',
    'kasim': 'Soğuk günlerde içimi ısıtan sensin ❄️',
    'aralik': 'Bir yılı seninle bitiriyorsam, her şey tamamdır ✨'
};

// Her ay için farklı fotoğraf efektleri
const ayEfektleri = {
    'ocak': 'image-zoom-in',
    'subat': 'image-fade-in',
    'mart': 'image-slide-left',
    'nisan': 'image-slide-right',
    'mayis': 'image-slide-up',
    'haziran': 'image-rotate',
    'temmuz': 'image-scale',
    'agustos': 'image-bounce',
    'eylul': 'image-flip',
    'ekim': 'image-spin',
    'kasim': 'image-float',
    'aralik': 'image-glow'
};

// Balon oluşturma fonksiyonu
function createBalloons() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Balon renkleri (emoji)
    const balloonColors = ['🎈', '🎈', '🎈', '🎈', '🎈'];

    // 20-30 balon oluştur
    const balloonCount = Math.floor(Math.random() * 11) + 20;

    for (let i = 0; i < balloonCount; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';

            // Rastgele balon rengi
            const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            balloon.textContent = randomColor;

            // Ekranın alt kısmından rastgele başlangıç pozisyonu
            const startX = Math.random() * windowWidth;
            const startY = windowHeight + Math.random() * 100; // Ekranın altından başla

            balloon.style.left = startX + 'px';
            balloon.style.top = startY + 'px';

            // Rastgele boyut
            const size = Math.random() * 20 + 25;
            balloon.style.fontSize = size + 'px';

            // Rastgele animasyon süresi
            const duration = Math.random() * 2 + 3.5;
            balloon.style.animationDuration = duration + 's';

            // Rastgele yön için farklı animasyon
            const animationType = Math.floor(Math.random() * 3);
            if (animationType === 0) {
                balloon.style.animationName = 'balloonFloat';
            } else if (animationType === 1) {
                balloon.style.animationName = 'balloonFloatLeft';
            } else {
                balloon.style.animationName = 'balloonFloatRight';
            }

            document.body.appendChild(balloon);

            // Animasyon bitince balonu kaldır
            setTimeout(() => {
                if (balloon.parentNode) {
                    balloon.remove();
                }
            }, duration * 1000);
        }, i * 50); // Her balon için 50ms gecikme
    }
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function () {
    const monthTitle = document.getElementById('monthTitle');
    const monthMessage = document.getElementById('monthMessage');
    const monthImage = document.getElementById('monthImage');
    const imagePlaceholder = document.getElementById('imagePlaceholder');

    // Sayfa açılır açılmaz balonları başlat
    createBalloons();

    if (ay && ayIsimleri[ay]) {
        // Bu ayın ziyaret edildiğini kaydet
        const visitedMonths = JSON.parse(localStorage.getItem('visitedMonths') || '[]');
        if (!visitedMonths.includes(ay)) {
            visitedMonths.push(ay);
            localStorage.setItem('visitedMonths', JSON.stringify(visitedMonths));
        }
        // Ay başlığını ayarla
        monthTitle.textContent = ayIsimleri[ay];

        // Ay mesajını ayarla
        if (ayMesajlari[ay]) {
            monthMessage.textContent = ayMesajlari[ay];
            monthMessage.style.display = 'block';
        }

        // Resim yolunu ayarla (tüm aylar için .jpg)
        const imagePath = `images/${ay}.jpg`;
        monthImage.src = imagePath;

        // Resim yüklendiğinde placeholder'ı gizle ve efekti uygula
        monthImage.onload = function () {
            imagePlaceholder.style.display = 'none';
            monthImage.style.display = 'block';

            // Önceki efekt sınıflarını temizle
            monthImage.className = 'month-image';

            // Bu ay için efekt sınıfını ekle
            if (ayEfektleri[ay]) {
                monthImage.classList.add(ayEfektleri[ay]);
            }
        };

        // Resim yüklenemediğinde
        monthImage.onerror = function () {
            imagePlaceholder.style.display = 'flex';
            monthImage.style.display = 'none';
            imagePlaceholder.innerHTML = `
                <div>
                    <p>💕 ${ayIsimleri[ay]} ayı için resim bulunamadı</p>
                    <p class="placeholder-note">Lütfen "images/${ay}.jpg" dosyasını ekleyin</p>
                </div>
            `;
        };
    } else {
        // Geçersiz ay parametresi
        monthTitle.textContent = 'Ay Bulunamadı';
        monthMessage.style.display = 'none';
        imagePlaceholder.innerHTML = `
            <div>
                <p>Geçersiz ay seçimi</p>
                <a href="index.html" style="color: #667eea; text-decoration: none;">Ana Sayfaya Dön</a>
            </div>
        `;
    }
});

