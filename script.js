document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openInvitationBtn');
    const coverPage = document.getElementById('coverPage');
    const mainContent = document.getElementById('mainContent');

    // Buka Undangan (Animasi Amplop -> Transisi ke Main Content)
    openBtn.addEventListener('click', () => {
        const envelopeContainer = document.getElementById('envelopeContainer');
        
        // 1. Tambahkan class 'open' untuk memicu animasi buka flap dan tarik surat
        envelopeContainer.classList.add('open');
        
        // 2. Tunggu animasi amplop selesai (flap buka lambat + surat naik = ~2 detik)
        setTimeout(() => {
            // Animasi fade out untuk keseluruhan cover
            coverPage.classList.add('fade-out');
            
            // 3. Setelah cover hilang, tampilkan main content dengan animasi pop-up
            setTimeout(() => {
                coverPage.classList.add('hidden');
                
                // Siapkan state awal sebelum muncul
                mainContent.classList.add('prepare-popup');
                mainContent.classList.remove('hidden');
                
                // Force browser reflow
                void mainContent.offsetWidth;
                
                // Jalankan animasi pop-up
                mainContent.classList.remove('prepare-popup');
                mainContent.classList.add('show-popup');
                
                // Trigger scroll animation untuk elemen di dalamnya
                observeElements();
            }, 1200); // Sesuai durasi fade-out cover-page
        }, 1800); // Waktu tunggu surat ditarik keluar
    });

    // Fungsi untuk animasi scroll (Intersection Observer)
    function observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Target elemen yang akan dianimasikan
        const elementsToAnimate = document.querySelectorAll('.header, .hero-section, .titles-container, .message-section, .detail-card, .divider, .footer, .countdown-wrapper');
        elementsToAnimate.forEach(el => {
            el.classList.add('animate-hidden'); // Set initial state
            observer.observe(el);
        });
    }

    // =========================================
    // GIMMICK 2: COUNTDOWN TIMER
    // =========================================
    const targetDate = new Date("April 21, 2026 14:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById("countdownTimer").innerHTML = "<h3 class='countdown-title'>Acara Sedang Berlangsung</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }

    // Update setiap detik
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Auto-resize textarea
    const guestMessage = document.getElementById('guestMessage');
    if (guestMessage) {
        guestMessage.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
});
