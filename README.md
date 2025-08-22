# 🚗 GHAA TRANS - Aplikasi Cek Transportasi

Aplikasi web untuk mengecek rute transportasi dengan integrasi Google Maps API yang memberikan informasi lengkap tentang perjalanan.

## ✨ Fitur Utama

- 🗺️ **Peta Interaktif**: Visualisasi rute dengan Google Maps
- 🔍 **Pencarian Otomatis**: Autocomplete untuk lokasi asal dan tujuan
- 🚌 **Multi-Mode Transportasi**: Transit, Mobil, Jalan Kaki, Sepeda
- ⏱️ **Informasi Rute**: Durasi, jarak, dan estimasi biaya
- 📱 **Responsive Design**: Optimal untuk desktop dan mobile
- 🎨 **UI Modern**: Desain yang menarik dan user-friendly

## 🚀 Cara Menggunakan

### 1. Setup Google Maps API

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih yang sudah ada
3. Aktifkan **Maps JavaScript API** dan **Places API**
4. Buat API Key
5. Ganti `YOUR_GOOGLE_MAPS_API_KEY` di file `index.html` dengan API Key Anda

```html
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&libraries=places&callback=initMap">
</script>
```

### 2. Menjalankan Aplikasi

1. Buka file `index.html` di browser
2. Masukkan lokasi asal dan tujuan
3. Pilih mode transportasi
4. Klik "Cari Rute"
5. Lihat hasil di peta dan informasi detail

## 📋 Mode Transportasi

| Mode | Deskripsi | Estimasi Biaya |
|------|-----------|----------------|
| 🚌 Transit | Bus, MRT, KRL | Rp 3.500 + Rp 500/km |
| 🚗 Mobil | Kendaraan pribadi | Rp 2.000/km (BBM) |
| 🚶 Jalan Kaki | Pejalan kaki | Gratis |
| 🚲 Sepeda | Sepeda | Gratis |

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur aplikasi
- **CSS3**: Styling dan animasi
- **JavaScript**: Logika aplikasi
- **Google Maps API**: Peta dan routing
- **Google Places API**: Autocomplete lokasi

## 📱 Fitur Responsive

Aplikasi ini responsive dan dapat digunakan di:
- 💻 Desktop
- 📱 Smartphone
- 📱 Tablet

## 🎯 Cara Kerja

1. **Input Lokasi**: User memasukkan asal dan tujuan
2. **API Call**: Aplikasi memanggil Google Maps Directions API
3. **Route Calculation**: Google menghitung rute terbaik
4. **Display Results**: Hasil ditampilkan di peta dan card
5. **Cost Estimation**: Biaya diperkirakan berdasarkan jarak dan mode

## 🔧 Customization

### Mengubah Estimasi Biaya

Edit fungsi `estimateCost()` di file `index.html`:

```javascript
function estimateCost(distanceMeters, mode) {
    const distanceKm = distanceMeters / 1000;
    
    const rates = {
        'transit': 3500 + (distanceKm * 500), // Sesuaikan tarif
        'driving': distanceKm * 2000, // Sesuaikan tarif BBM
        'walking': 0,
        'bicycling': 0
    };
    
    const cost = rates[mode];
    return cost > 0 ? `Rp ${Math.round(cost).toLocaleString()}` : 'Gratis';
}
```

### Mengubah Styling

Edit CSS di bagian `<style>` untuk mengubah tampilan aplikasi.

## ⚠️ Penting

- **API Key**: Pastikan API Key Google Maps Anda aktif dan memiliki quota yang cukup
- **HTTPS**: Untuk production, gunakan HTTPS karena Google Maps API memerlukan secure connection
- **Quota**: Google Maps API memiliki batasan penggunaan harian

## 🐛 Troubleshooting

### Peta Tidak Muncul
- Periksa API Key Google Maps
- Pastikan Maps JavaScript API dan Places API aktif
- Cek console browser untuk error

### Autocomplete Tidak Berfungsi
- Pastikan Places API aktif
- Periksa koneksi internet

### Rute Tidak Ditemukan
- Pastikan lokasi asal dan tujuan valid
- Coba dengan lokasi yang berbeda
- Periksa apakah mode transportasi tersedia di area tersebut

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

**GHAA TRANS** - Solusi transportasi terbaik untuk perjalanan Anda! 🚗✨