# Panduan Setup Aplikasi Transportasi

## 🚀 Langkah-langkah Setup Cepat

### 1. Persiapan Awal

Pastikan Anda memiliki:
- ✅ Browser modern (Chrome, Firefox, Safari, Edge)
- ✅ Koneksi internet
- ✅ Google Maps API Key

### 2. Dapatkan Google Maps API Key

1. **Buka Google Cloud Console**
   - Kunjungi: https://console.cloud.google.com/
   - Login dengan akun Google Anda

2. **Buat Project Baru**
   - Klik "Select a project" → "New Project"
   - Beri nama project (misal: "Transportasi App")
   - Klik "Create"

3. **Aktifkan API yang Diperlukan**
   - Buka "APIs & Services" → "Library"
   - Cari dan aktifkan API berikut:
     - ✅ Maps JavaScript API
     - ✅ Directions API
     - ✅ Places API
     - ✅ Geocoding API

4. **Buat API Key**
   - Buka "APIs & Services" → "Credentials"
   - Klik "Create Credentials" → "API Key"
   - Copy API Key yang muncul

5. **Batasi API Key (Opsional tapi Direkomendasikan)**
   - Klik API Key yang baru dibuat
   - Di "Application restrictions", pilih "HTTP referrers"
   - Tambahkan domain Anda (misal: `localhost:8000/*`)
   - Di "API restrictions", pilih "Restrict key"
   - Pilih semua API yang sudah diaktifkan
   - Klik "Save"

### 3. Konfigurasi Aplikasi

1. **Edit File Konfigurasi**
   - Buka file `config.js`
   - Ganti `YOUR_GOOGLE_MAPS_API_KEY` dengan API Key Anda
   - Simpan file

2. **Atau Gunakan File Contoh**
   ```bash
   cp config.example.js config.local.js
   # Edit config.local.js dan masukkan API Key Anda
   ```

### 4. Jalankan Aplikasi

#### Opsi A: Menggunakan Script Otomatis

**Windows:**
```bash
# Double click file start-server.bat
# Atau jalankan di Command Prompt:
start-server.bat
```

**Linux/Mac:**
```bash
# Jalankan di terminal:
./start-server.sh
```

**Python (Semua OS):**
```bash
python start-server.py
```

#### Opsi B: Manual

**Menggunakan Python:**
```bash
python -m http.server 8000
```

**Menggunakan Node.js:**
```bash
npx serve .
```

**Menggunakan PHP:**
```bash
php -S localhost:8000
```

### 5. Akses Aplikasi

1. Buka browser
2. Kunjungi: `http://localhost:8000`
3. Aplikasi akan terbuka otomatis

## 🔧 Troubleshooting

### Masalah Umum

#### ❌ Peta tidak muncul
**Penyebab:** API Key tidak valid atau API tidak aktif
**Solusi:**
- Pastikan API Key sudah benar
- Pastikan Maps JavaScript API sudah aktif
- Cek billing di Google Cloud Console

#### ❌ Autocomplete tidak bekerja
**Penyebab:** Places API tidak aktif
**Solusi:**
- Aktifkan Places API di Google Cloud Console
- Pastikan API Key memiliki akses ke Places API

#### ❌ Rute tidak ditemukan
**Penyebab:** Directions API tidak aktif
**Solusi:**
- Aktifkan Directions API di Google Cloud Console
- Pastikan lokasi yang dimasukkan valid

#### ❌ CORS Error
**Penyebab:** Membuka file langsung di browser
**Solusi:**
- Gunakan server lokal, bukan file://
- Jalankan salah satu script server di atas

#### ❌ Port sudah digunakan
**Penyebab:** Ada aplikasi lain yang menggunakan port 8000
**Solusi:**
- Hentikan aplikasi yang menggunakan port tersebut
- Atau ganti port di script server

### Debug Mode

1. Buka Developer Tools (F12)
2. Lihat tab Console untuk pesan error
3. Lihat tab Network untuk request yang gagal

## 💰 Biaya API

Google Maps API memiliki kuota gratis:
- **Maps JavaScript API**: 28,500 requests/bulan
- **Directions API**: 2,500 requests/bulan
- **Places API**: 1,000 requests/bulan
- **Geocoding API**: 2,500 requests/bulan

Untuk penggunaan intensif, Anda perlu mengaktifkan billing.

## 🔒 Keamanan

1. **Batasi API Key** untuk domain tertentu
2. **Gunakan HTTPS** untuk production
3. **Jangan share API Key** di repository publik
4. **Monitor penggunaan** di Google Cloud Console

## 📱 Testing

Setelah aplikasi berjalan, coba:
1. Masukkan lokasi asal dan tujuan
2. Pilih moda transportasi berbeda
3. Klik tombol rute contoh
4. Test di mobile browser

## 🆘 Bantuan

Jika masih mengalami masalah:
1. Cek Console browser untuk error
2. Pastikan semua API sudah aktif
3. Verifikasi API Key sudah benar
4. Coba di browser berbeda

---

**Catatan:** Pastikan Anda mematuhi [Terms of Service Google Maps Platform](https://developers.google.com/maps/terms).