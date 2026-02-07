// Tüm ayların listesi
const allMonths = ['ocak', 'subat', 'mart', 'nisan', 'mayis', 'haziran', 
                   'temmuz', 'agustos', 'eylul', 'ekim', 'kasim', 'aralik'];

// Sayfa yüklendiğinde kontrol et
document.addEventListener('DOMContentLoaded', function() {
    checkAllMonthsVisited();
});

function checkAllMonthsVisited() {
    // Ziyaret edilen ayları al
    const visitedMonths = JSON.parse(localStorage.getItem('visitedMonths') || '[]');
    
    // Tüm aylar ziyaret edildi mi kontrol et
    const allVisited = allMonths.every(month => visitedMonths.includes(month));
    
    // Eğer tüm aylar ziyaret edildiyse butonu göster
    const continueButtonContainer = document.getElementById('continueButtonContainer');
    if (allVisited && continueButtonContainer) {
        continueButtonContainer.style.display = 'block';
        continueButtonContainer.style.animation = 'fadeInUp 0.8s ease';
    }
}

