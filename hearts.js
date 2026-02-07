// Kalp animasyonu için JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const monthCards = document.querySelectorAll('.month-card');
    
    monthCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Sayfa yönlendirmesini engelle
            e.preventDefault();
            
            // Kalpleri oluştur
            createHearts(e);
            
            // Kalplerin görünmesi için kısa bir gecikme sonrası sayfaya yönlendir
            const href = card.getAttribute('href');
            setTimeout(() => {
                window.location.href = href;
            }, 800); // 800ms sonra yönlendir
        });
    });
});

function createHearts(event) {
    // Ekran boyutlarını al
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Daha fazla kalp oluştur (tüm ekran için)
    const heartCount = Math.floor(Math.random() * 10) + 30;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = '❤️';
            
            // Ekranın herhangi bir yerinden rastgele başlangıç pozisyonu
            const startX = Math.random() * windowWidth;
            const startY = Math.random() * windowHeight;
            
            heart.style.left = startX + 'px';
            heart.style.top = startY + 'px';
            
            // Rastgele boyut (daha büyük aralık)
            const size = Math.random() * 15 + 15;
            heart.style.fontSize = size + 'px';
            
            // Rastgele animasyon süresi
            const duration = Math.random() * 1.5 + 2.5;
            heart.style.animationDuration = duration + 's';
            
            // Rastgele yön için farklı animasyon sınıfları
            const animationType = Math.floor(Math.random() * 3);
            if (animationType === 0) {
                heart.style.animationName = 'floatUp';
            } else if (animationType === 1) {
                heart.style.animationName = 'floatUpLeft';
            } else {
                heart.style.animationName = 'floatUpRight';
            }
            
            document.body.appendChild(heart);
            
            // Animasyon bitince kalbi kaldır
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, duration * 1000);
        }, i * 20); // Her kalp için 20ms gecikme (daha hızlı)
    }
}

