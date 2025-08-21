#!/bin/bash

echo "========================================"
echo "    Aplikasi Cek Transportasi"
echo "========================================"
echo ""
echo "Memulai server lokal..."
echo ""

# Cek apakah Python tersedia
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python3 tidak ditemukan!"
    echo "Silakan install Python dari https://python.org"
    exit 1
fi

# Buat file executable
chmod +x start-server.py

# Jalankan server
echo "Server berjalan di http://localhost:8000"
echo "Tekan Ctrl+C untuk menghentikan server"
echo ""
python3 start-server.py