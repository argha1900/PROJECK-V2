# 🤖 AI Chatbot Saya

AI Chatbot yang dibuat khusus untuk Anda dengan interface web yang modern dan responsif.

## ✨ Fitur

- **Chat Interaktif**: Percakapan alami dengan AI
- **Interface Web Modern**: Desain yang cantik dan responsif
- **Lelucon**: AI bisa memberikan lelucon lucu
- **Informasi Waktu & Tanggal**: Tanya waktu dan tanggal saat ini
- **Cuaca**: Informasi cuaca (simulasi)
- **Riwayat Percakapan**: Menyimpan semua percakapan
- **Statistik**: Melihat statistik penggunaan AI
- **Responsif**: Bekerja dengan baik di desktop dan mobile

## 🚀 Cara Menjalankan

### Prerequisites
- Python 3.7 atau lebih baru
- pip (Python package manager)

### Instalasi

1. **Clone repository ini**
```bash
git clone <URL_REPOSITORY_ANDA>
cd ai-chatbot-saya
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Jalankan aplikasi**
```bash
python web_app.py
```

4. **Buka browser**
Buka `http://localhost:5000` di browser Anda

## 📁 Struktur Proyek

```
ai-chatbot-saya/
├── ai_chatbot.py          # Core AI chatbot logic
├── web_app.py             # Flask web application
├── requirements.txt       # Python dependencies
├── README.md             # Dokumentasi proyek
├── templates/
│   └── index.html        # HTML template
├── static/
│   ├── css/
│   │   └── style.css     # CSS styles
│   └── js/
│       └── script.js     # JavaScript functionality
└── .gitignore            # Git ignore file
```

## 🎯 Cara Menggunakan

### Melalui Web Interface
1. Buka aplikasi di browser
2. Ketik pesan di kotak input
3. Tekan Enter atau klik tombol kirim
4. AI akan merespons dengan cepat

### Melalui Terminal
```bash
python ai_chatbot.py
```

### Contoh Percakapan
- "Halo" → AI akan menyapa
- "Lelucon" → AI akan memberikan lelucon
- "Jam berapa sekarang?" → AI akan memberitahu waktu
- "Tanggal berapa hari ini?" → AI akan memberitahu tanggal
- "Bagaimana cuaca?" → AI akan memberitahu cuaca

## 🔧 Customization

### Menambah Pengetahuan AI
Anda bisa menambah pengetahuan AI dengan mengedit file `ai_chatbot.py`:

```python
# Menambah kategori baru
ai.add_knowledge("makanan", [
    "Saya suka pizza!",
    "Nasi goreng adalah makanan favorit saya",
    "Saya tidak bisa makan, saya hanya AI"
])
```

### Mengubah Tampilan
- Edit `static/css/style.css` untuk mengubah tampilan
- Edit `templates/index.html` untuk mengubah struktur HTML
- Edit `static/js/script.js` untuk mengubah fungsi JavaScript

## 🌐 Deployment

### Deploy ke Heroku
1. Buat file `Procfile`:
```
web: python web_app.py
```

2. Deploy ke Heroku:
```bash
heroku create ai-chatbot-saya
git push heroku main
```

### Deploy ke Vercel
1. Buat file `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "web_app.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "web_app.py"
    }
  ]
}
```

## 📊 API Endpoints

- `GET /` - Halaman utama
- `POST /chat` - Kirim pesan ke AI
- `GET /history` - Ambil riwayat percakapan
- `POST /clear` - Hapus riwayat percakapan
- `GET /stats` - Ambil statistik AI
- `POST /add_knowledge` - Tambah pengetahuan baru

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan:

1. Fork proyek ini
2. Buat branch fitur baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -am 'Menambah fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## 📝 License

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🙏 Terima Kasih

Terima kasih telah menggunakan AI Chatbot Saya! 

Jika Anda menyukai proyek ini, jangan lupa untuk:
- ⭐ Star repository ini
- 🔄 Fork dan share
- 🐛 Laporkan bug
- 💡 Berikan saran fitur

## 📞 Kontak

Jika ada pertanyaan atau saran, silakan buat issue di GitHub atau hubungi saya.

---

**Dibuat dengan ❤️ untuk komunitas AI Indonesia**