/**
 * DATABASE ACARA DOLANAN FILM
 * -----------------------------------------------------------------------
 * Petunjuk Pengisian:
 * 1. id             : Angka unik untuk setiap acara.
 * 2. judul          : Nama acara.
 * 3. tanggalMulai   : Format YYYY-MM-DDTHH:mm:ss (PENTING untuk hitungan jam & status real-time).
 * 4. tanggalSelesai : Format YYYY-MM-DDTHH:mm:ss.
 * 5. tanggalFormatted: Teks tanggal yang rapi untuk ditampilkan di UI.
 * 6. waktuFormatted  : Teks jam yang rapi (contoh: "19:00 - 22:00 WIB").
 * 7. lokasi         : Tempat acara berlangsung.
 * 8. deskripsi      : Penjelasan singkat/narasi acara.
 * 9. poster         : Path/URL file gambar poster.
 * 10. statusAdmin   : "aktif" (tampil di web) atau "nonaktif" (disembunyikan total).
 * 11. tampilDiPanel : true (tampil di section Panel Acara index.html) atau false (hanya ada di acara.html).
 */

window.acaraData = [
  {
    id: 1,
    judul: "Nyabar Vol. 3: Pameran & Pemutaran Film",
    tanggalMulai: "2026-07-10T18:30:00",
    tanggalSelesai: "2026-07-10T23:00:00",
    tanggalFormatted: "10 Juli 2026",
    waktuFormatted: "18:30 - 23:59 WIB",
    lokasi: "AREA LAPANG GOR KARANGSARI",
    deskripsi: "Apresiasi karya seni dengan mini Pameran, penampilan dan di akhiri dengan Pemutaran film dari berbagai komunitas.",
    poster: "NY1.png",
    statusAdmin: "aktif",
    tampilDiPanel: true
  },
  
];

// Alias untuk kompatibilitas jika ada fungsi lama yang memanggil 'dataAcara'
window.dataAcara = window.acaraData;