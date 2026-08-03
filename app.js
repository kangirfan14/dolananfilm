document.addEventListener("DOMContentLoaded", () => {
    initAcaraEngine();
    renderCrew();
    renderPrestasi();
    renderKegiatan();
});

// --- LOGIKA CERDAS ACARA (POPUP, BANNER & HISTORY) ---
function initAcaraEngine() {
    const now = new Date().getTime();
    
    // Sort acara berdasarkan tanggal terdekat
    const activeEvents = acaraData.filter(e => new Date(e.tanggal).getTime() >= now);
    const historyEvents = acaraData.filter(e => new Date(e.tanggal).getTime() < now);

    const bannerContainer = document.getElementById("highlightAcaraContainer");
    const modalContent = document.getElementById("modalContentArea");
    const modalOverlay = document.getElementById("eventModal");

    // 1. TAMPILAN JIKA ADA ACARA AKTIF (MENDATANG/BERLANGSUNG)
    if (activeEvents.length > 0) {
        const nextEvent = activeEvents[0]; // Acara paling dekat
        
        // Render Banner Beranda
        if (bannerContainer) {
            bannerContainer.innerHTML = `
                <div class="highlight-permanen reveal pulse-anim">
                    <div class="pamflet-wrapper">
                        <img src="${nextEvent.poster}" alt="${nextEvent.judul}" class="pamflet-img">
                        <div class="pamflet-info">
                            <span style="color: #8b0000; font-weight: 900; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px;">Acara Mendatang</span>
                            <h2 class="event-title" style="font-weight: 900; text-transform: uppercase; margin: 5px 0;">${nextEvent.judul}</h2>
                            <p class="event-desc">${nextEvent.deskripsi}</p>
                            
                            <div class="timer-container" id="countdownTimer">
                                <div class="time-box"><span id="days">00</span><p>Hari</p></div>
                                <div class="timer-divider">:</div>
                                <div class="time-box"><span id="hours">00</span><p>Jam</p></div>
                                <div class="timer-divider">:</div>
                                <div class="time-box"><span id="minutes">00</span><p>Menit</p></div>
                                <div class="timer-divider">:</div>
                                <div class="time-box"><span id="seconds">00</span><p>Detik</p></div>
                            </div>

                            <a href="${nextEvent.linkDetail}" class="btn-event-link">Lihat Detail Acara</a>
                        </div>
                    </div>
                </div>
            `;
            startCountdown(nextEvent.tanggal);
        }

        // Render Pop-Up Modal
        if (modalContent && modalOverlay) {
            modalContent.innerHTML = `
                <div class="close-btn" onclick="closeModal()">&times;</div>
                <p style="font-size: 0.7rem; letter-spacing: 3px; font-weight: 700; color: #8b0000; margin-bottom: 5px; text-transform: uppercase;">Acara Mendatang</p>
                <h2 style="font-weight: 900; font-size: 1.5rem; margin-bottom: 15px; text-transform: uppercase;">${nextEvent.judul}</h2>
                <div style="border: 2px solid #000; border-radius: 15px; overflow: hidden; margin-bottom: 20px;">
                    <img src="${nextEvent.poster}" style="width: 100%; display: block;" />
                </div>
                <a href="${nextEvent.linkDetail}" class="btn-more-popup">LIHAT SELENGKAPNYA</a>
            `;
            modalOverlay.style.display = "flex"; // Tampilkan Pop-Up
        }

    } else {
        // 2. TAMPILAN JIKA TIDAK ADA ACARA AKTIF
        if (bannerContainer) {
            bannerContainer.innerHTML = `
                <div class="highlight-permanen" style="text-align: center; padding: 40px 20px;">
                    <h3 style="font-weight: 900; text-transform: uppercase; font-size: 1.3rem; margin-bottom: 10px;">Belum Ada Acara Aktif Saat Ini</h3>
                    <p style="font-size: 0.9rem; font-weight: 600; margin-bottom: 20px; color: #555;">Tetap pantau pembaruan mendatang atau lihat riwayat kegiatan kami sebelumnya.</p>
                    <a href="#riwayat-acara" class="btn-event-link">Cek Riwayat Acara</a>
                </div>
            `;
        }
        if (modalOverlay) {
            modalOverlay.style.display = "none"; // Hide Pop-Up otomatis
        }
    }

    // Render Riwayat Acara (History) di Section Khusus jika ada
    renderHistoryAcara(historyEvents);
}

// Countdown Engine
function startCountdown(targetDateStr) {
    const targetDate = new Date(targetDateStr).getTime();
    
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(interval);
            initAcaraEngine(); // Re-index status acara otomatis saat waktu habis
            return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        if(document.getElementById("days")) document.getElementById("days").innerText = d < 10 ? '0'+d : d;
        if(document.getElementById("hours")) document.getElementById("hours").innerText = h < 10 ? '0'+h : h;
        if(document.getElementById("minutes")) document.getElementById("minutes").innerText = m < 10 ? '0'+m : m;
        if(document.getElementById("seconds")) document.getElementById("seconds").innerText = s < 10 ? '0'+s : s;
    }, 1000);
}

// Render Crew dari JS
function renderCrew() {
    const container = document.getElementById("crewGrid");
    if (!container) return;
    container.innerHTML = crewData.map(c => `
        <div class="card-genz">
            <img src="${c.foto}" alt="${c.nama}">
            <div style="padding: 15px; text-align: center;">
                <h4 style="font-weight: 900; text-transform: uppercase; font-size: 1.1rem;">${c.nama}</h4>
                <p style="font-size: 0.8rem; font-weight: 700; color: #8b0000; text-transform: uppercase; margin-top: 5px;">${c.jabatan}</p>
            </div>
        </div>
    `).join('');
}

// Render Prestasi dari JS
function renderPrestasi() {
    const container = document.getElementById("prestasiGrid");
    if (!container) return;
    container.innerHTML = prestasiData.map(p => `
        <div class="card-genz">
            <img src="${p.foto}" alt="${p.judul}">
            <div style="padding: 20px;">
                <span class="year-tag" style="background: var(--accent-red); color:#fff; font-size:0.75rem; font-weight:900; padding:4px 12px; border-radius:50px; border:2px solid #000;">${p.tahun}</span>
                <h3 style="font-weight: 900; font-size: 1.2rem; text-transform: uppercase; margin: 12px 0 8px;">${p.judul}</h3>
                <p style="font-size: 0.85rem; font-weight: 600; color: #333;">${p.keterangan}</p>
            </div>
        </div>
    `).join('');
}

// Render Kegiatan dari JS
function renderKegiatan() {
    const container = document.getElementById("kegiatanGrid");
    if (!container) return;
    container.innerHTML = kegiatanData.map(k => `
        <div class="gallery-item">
            <img src="${k.foto}" alt="${k.judul}">
            <div class="gallery-caption">
                <h4>${k.judul}</h4>
                <p>${k.deskripsi}</p>
            </div>
        </div>
    `).join('');
}

// Render History Acara
function renderHistoryAcara(historyEvents) {
    const container = document.getElementById("historyAcaraContainer");
    if (!container) return;
    
    if (historyEvents.length === 0) {
        container.innerHTML = `<p style="text-align:center; font-weight:700;">Belum ada riwayat acara sebelumnya.</p>`;
        return;
    }

    container.innerHTML = historyEvents.map(h => `
        <div class="card-genz" style="margin-bottom: 20px;">
            <div style="display: flex; flex-wrap: wrap; gap: 20px; padding: 20px; align-items: center;">
                <img src="${h.poster}" style="width: 120px; height: 150px; object-fit: cover; border: 2px solid #000; border-radius: 12px;">
                <div style="flex: 1;">
                    <span style="background: #000; color: #fff; font-size: 0.7rem; font-weight: 900; padding: 4px 10px; border-radius: 50px;">ACARA SELESAI</span>
                    <h3 style="font-weight: 900; text-transform: uppercase; margin-top: 8px;">${h.judul}</h3>
                    <p style="font-size: 0.85rem; color: #555; margin-bottom: 10px;">${h.deskripsi}</p>
                    <small style="font-weight: 800;">📍 ${h.lokasi}</small>
                </div>
            </div>
        </div>
    `).join('');
}

function closeModal() {
    document.getElementById("eventModal").style.display = "none";
}