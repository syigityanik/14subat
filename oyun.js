// Ay isimleri ve dosya isimleri
const aylar = [
    { name: 'Ocak', file: 'ocak' },
    { name: 'Şubat', file: 'subat' },
    { name: 'Mart', file: 'mart' },
    { name: 'Nisan', file: 'nisan' },
    { name: 'Mayıs', file: 'mayis' },
    { name: 'Haziran', file: 'haziran' },
    { name: 'Temmuz', file: 'temmuz' },
    { name: 'Ağustos', file: 'agustos' },
    { name: 'Eylül', file: 'eylul' },
    { name: 'Ekim', file: 'ekim' },
    { name: 'Kasım', file: 'kasim' },
    { name: 'Aralık', file: 'aralik' }
];

let selectedMonth = null;
let correctMatches = 0;
let wrongMatches = 0;
let matchedMonths = new Set();
let matchedImages = new Set();

// Oyunu başlat
document.addEventListener('DOMContentLoaded', function() {
    createGame();
});

function createGame() {
    // Ayları karıştır
    const shuffledMonths = [...aylar].sort(() => Math.random() - 0.5);
    
    // Fotoğrafları karıştır
    const shuffledImages = [...aylar].sort(() => Math.random() - 0.5);
    
    const monthsGrid = document.getElementById('monthsGrid');
    const imagesGrid = document.getElementById('imagesGrid');
    
    // Ayları oluştur
    shuffledMonths.forEach(ay => {
        const monthCard = document.createElement('div');
        monthCard.className = 'game-month-card';
        monthCard.dataset.month = ay.file;
        monthCard.textContent = ay.name;
        monthCard.addEventListener('click', () => selectMonth(ay.file, monthCard));
        monthsGrid.appendChild(monthCard);
    });
    
    // Fotoğrafları oluştur
    shuffledImages.forEach(ay => {
        const imageCard = document.createElement('div');
        imageCard.className = 'game-image-card';
        imageCard.dataset.image = ay.file;
        
        const img = document.createElement('img');
        img.src = `images/${ay.file}.jpg`;
        img.alt = ay.name;
        img.onerror = function() {
            this.style.display = 'none';
            imageCard.innerHTML = `<div class="no-image">${ay.name}</div>`;
        };
        
        imageCard.appendChild(img);
        imageCard.addEventListener('click', () => selectImage(ay.file, imageCard));
        imagesGrid.appendChild(imageCard);
    });
}

function selectMonth(monthFile, monthCard) {
    // Eğer zaten eşleştirilmişse, seçilemez
    if (matchedMonths.has(monthFile)) {
        return;
    }
    
    // Önceki seçimi temizle
    document.querySelectorAll('.game-month-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Yeni seçimi işaretle
    selectedMonth = monthFile;
    monthCard.classList.add('selected');
    
    // Fotoğraf seçimlerini temizle
    document.querySelectorAll('.game-image-card').forEach(card => {
        card.classList.remove('wrong');
    });
}

function selectImage(imageFile, imageCard) {
    // Eğer zaten eşleştirilmişse, seçilemez
    if (matchedImages.has(imageFile)) {
        return;
    }
    
    if (!selectedMonth) {
        showMessage('Önce bir ay seçmelisin!', 'warning');
        return;
    }
    
    // Eşleştirme kontrolü
    if (selectedMonth === imageFile) {
        // Doğru eşleştirme!
        correctMatches++;
        matchedMonths.add(selectedMonth);
        matchedImages.add(imageFile);
        
        // Başarılı işaretle
        document.querySelector(`[data-month="${selectedMonth}"]`).classList.add('matched');
        imageCard.classList.add('matched');
        
        updateScore();
        showMessage('🎉 Harika! Doğru eşleştirme!', 'success');
        
        // Seçimi temizle
        selectedMonth = null;
        document.querySelectorAll('.game-month-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Tüm eşleştirmeler tamamlandı mı?
        if (matchedMonths.size === aylar.length) {
            setTimeout(() => {
                showMessage('🎊 TEBRİKLER! Tüm fotoğrafları doğru eşleştirdin! ❤️', 'complete');
            }, 500);
        }
    } else {
        // Yanlış eşleştirme
        wrongMatches++;
        imageCard.classList.add('wrong');
        updateScore();
        showMessage('❌ Yanlış eşleştirme, tekrar dene!', 'error');
        
        // Kısa bir süre sonra yanlış işaretini kaldır
        setTimeout(() => {
            imageCard.classList.remove('wrong');
            selectedMonth = null;
            document.querySelectorAll('.game-month-card').forEach(card => {
                card.classList.remove('selected');
            });
        }, 1000);
    }
}

function updateScore() {
    document.getElementById('correctCount').textContent = correctMatches;
    document.getElementById('wrongCount').textContent = wrongMatches;
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('gameMessage');
    messageDiv.textContent = text;
    messageDiv.className = `game-message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 2000);
}

