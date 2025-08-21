#!/usr/bin/env python3
"""
Script untuk menjalankan server lokal untuk aplikasi transportasi
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

def main():
    # Port untuk server
    PORT = 8000
    
    # Direktori saat ini
    current_dir = Path(__file__).parent.absolute()
    
    # Ubah ke direktori aplikasi
    os.chdir(current_dir)
    
    # Handler untuk server
    Handler = http.server.SimpleHTTPRequestHandler
    
    try:
        # Buat server
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"🚀 Server berjalan di http://localhost:{PORT}")
            print(f"📁 Direktori: {current_dir}")
            print("🌐 Buka browser dan kunjungi URL di atas")
            print("⏹️  Tekan Ctrl+C untuk menghentikan server")
            print("-" * 50)
            
            # Buka browser otomatis
            try:
                webbrowser.open(f'http://localhost:{PORT}')
                print("✅ Browser dibuka otomatis")
            except:
                print("⚠️  Tidak dapat membuka browser otomatis")
            
            # Jalankan server
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server dihentikan")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} sudah digunakan")
            print("💡 Coba port lain atau hentikan aplikasi yang menggunakan port tersebut")
        else:
            print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()