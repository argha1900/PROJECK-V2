# Aplikasi Cek Transportasi

Aplikasi web untuk mengecek rute transportasi yang terhubung dengan Google Maps API untuk mendapatkan informasi yang akurat.

## 🚀 Fitur

- **Pencarian Rute**: Cari rute dari lokasi asal ke tujuan
- **Multi-Moda Transportasi**: 
  - Transportasi Umum (Bus, Kereta, MRT, LRT)
  - Mobil
  - Jalan Kaki
  - Sepeda
- **Peta Interaktif**: Visualisasi rute di Google Maps
- **Autocomplete**: Saran lokasi otomatis
- **Informasi Detail**: Jarak, waktu tempuh, dan langkah-langkah rute
- **Responsive Design**: Bekerja di desktop dan mobile
- **Rute Contoh**: Tombol cepat untuk rute populer

## 🛠️ Setup

### 1. Dapatkan Google Maps API Key

1. Kunjungi [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih yang sudah ada
3. Aktifkan API berikut:
   - Maps JavaScript API
   - Directions API
   - Places API
   - Geocoding API
4. Buat API Key di bagian Credentials
5. Batasi API Key untuk keamanan (opsional tapi direkomendasikan)

### 2. Konfigurasi API Key

Buka file `index.html` dan ganti `YOUR_GOOGLE_MAPS_API_KEY` dengan API Key Anda:

```html
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places&callback=initMap">
</script>
```

### 3. Jalankan Aplikasi

1. Buka file `index.html` di browser
2. Atau gunakan server lokal:
   ```bash
   # Menggunakan Python
   python -m http.server 8000
   
   # Menggunakan Node.js
   npx serve .
   
   # Menggunakan PHP
   php -S localhost:8000
   ```

## 📱 Cara Penggunaan

1. **Masukkan Lokasi**: Ketik lokasi asal dan tujuan
2. **Pilih Moda Transportasi**: Klik salah satu opsi transportasi
3. **Cari Rute**: Klik tombol "Cari Rute"
4. **Lihat Hasil**: Rute akan ditampilkan di peta dan panel informasi

## 🎯 Contoh Penggunaan

Aplikasi menyediakan beberapa rute contoh:
- Monas → Taman Mini Indonesia Indah
- Bandara Soekarno-Hatta → Kota Tua
- Mall Taman Anggrek → Ancol

## 🔧 Teknologi yang Digunakan

- **HTML5**: Struktur aplikasi
- **CSS3**: Styling modern dengan Flexbox dan Grid
- **JavaScript (ES6+)**: Logika aplikasi
- **Google Maps API**: Peta dan routing
- **Google Places API**: Autocomplete lokasi
- **Font Awesome**: Ikon

## 📊 API yang Digunakan

- **Maps JavaScript API**: Menampilkan peta
- **Directions API**: Menghitung rute
- **Places API**: Autocomplete lokasi
- **Geocoding API**: Konversi alamat ke koordinat

## 🎨 Fitur UI/UX

- **Design Modern**: Gradient background dan card-based layout
- **Responsive**: Bekerja di semua ukuran layar
- **Loading States**: Indikator loading saat mencari rute
- **Error Handling**: Pesan error yang informatif
- **Smooth Animations**: Transisi halus antar state

## 🔒 Keamanan

- API Key harus dibatasi untuk domain tertentu
- Gunakan HTTPS untuk production
- Validasi input di sisi client

## 📈 Pengembangan Selanjutnya

- [ ] Integrasi dengan API transportasi lokal
- [ ] Informasi real-time (delay, gangguan)
- [ ] Favorit lokasi
- [ ] Riwayat pencarian
- [ ] Notifikasi perjalanan
- [ ] Offline mode
- [ ] PWA (Progressive Web App)

## 🐛 Troubleshooting

### Masalah Umum

1. **Peta tidak muncul**: Pastikan API Key valid dan API Maps JavaScript aktif
2. **Autocomplete tidak bekerja**: Pastikan Places API aktif
3. **Rute tidak ditemukan**: Pastikan Directions API aktif
4. **CORS Error**: Gunakan server lokal, bukan file://

### Debug

Buka Developer Tools (F12) dan lihat Console untuk pesan error.

## 📄 Lisensi

Proyek ini open source dan dapat digunakan untuk tujuan pendidikan dan komersial.

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan buat pull request atau laporkan bug.

---

**Catatan**: Pastikan Anda mematuhi [Terms of Service Google Maps Platform](https://developers.google.com/maps/terms) saat menggunakan aplikasi ini.