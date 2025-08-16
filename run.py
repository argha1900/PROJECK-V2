#!/usr/bin/env python3
"""
Script untuk menjalankan AI Chatbot
"""

import os
import sys
import subprocess
from pathlib import Path

def check_python_version():
    """Check Python version"""
    if sys.version_info < (3, 7):
        print("❌ Error: Python 3.7 atau lebih baru diperlukan!")
        print(f"   Versi Python Anda: {sys.version}")
        sys.exit(1)
    print(f"✅ Python {sys.version.split()[0]} terdeteksi")

def install_requirements():
    """Install requirements jika belum ada"""
    try:
        import flask
        print("✅ Dependencies sudah terinstall")
    except ImportError:
        print("📦 Installing dependencies...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
            print("✅ Dependencies berhasil diinstall")
        except subprocess.CalledProcessError:
            print("❌ Gagal install dependencies")
            sys.exit(1)

def run_web_app():
    """Jalankan web application"""
    print("🚀 Menjalankan AI Chatbot...")
    print("📱 Web interface akan tersedia di: http://localhost:5000")
    print("💡 Tekan Ctrl+C untuk menghentikan")
    print("-" * 50)
    
    try:
        from web_app import app
        app.run(debug=True, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("\n👋 AI Chatbot dihentikan")
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

def run_terminal_chat():
    """Jalankan chat di terminal"""
    print("🤖 Menjalankan AI Chatbot di Terminal...")
    print("💡 Ketik 'quit' untuk keluar")
    print("-" * 50)
    
    try:
        from ai_chatbot import AIChatbot
        ai = AIChatbot()
        
        print("🤖 AI Chatbot siap!")
        print("-" * 50)
        
        while True:
            user_input = input("👤 Anda: ")
            if user_input.lower() in ['quit', 'exit', 'keluar']:
                print("🤖 AI: Sampai jumpa! 👋")
                break
            
            response = ai.process_message(user_input)
            print(f"🤖 AI: {response}")
            
    except KeyboardInterrupt:
        print("\n👋 AI Chatbot dihentikan")
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

def run_tests():
    """Jalankan tests"""
    print("🧪 Menjalankan tests...")
    try:
        subprocess.check_call([sys.executable, "test_ai.py"])
        print("✅ Semua tests berhasil!")
    except subprocess.CalledProcessError:
        print("❌ Beberapa tests gagal")
        sys.exit(1)

def run_demo():
    """Jalankan demo"""
    print("🎬 Menjalankan demo...")
    try:
        subprocess.check_call([sys.executable, "test_ai.py", "demo"])
    except subprocess.CalledProcessError:
        print("❌ Demo gagal dijalankan")
        sys.exit(1)

def show_help():
    """Tampilkan bantuan"""
    print("""
🤖 AI Chatbot - Script Runner

Cara penggunaan:
  python run.py [option]

Options:
  web          - Jalankan web interface (default)
  terminal     - Jalankan chat di terminal
  test         - Jalankan unit tests
  demo         - Jalankan demo
  help         - Tampilkan bantuan ini

Contoh:
  python run.py web
  python run.py terminal
  python run.py test
  python run.py demo
""")

def main():
    """Main function"""
    print("🤖 AI Chatbot Saya")
    print("=" * 50)
    
    # Check Python version
    check_python_version()
    
    # Install requirements
    install_requirements()
    
    # Parse arguments
    if len(sys.argv) > 1:
        option = sys.argv[1].lower()
        
        if option == "terminal":
            run_terminal_chat()
        elif option == "test":
            run_tests()
        elif option == "demo":
            run_demo()
        elif option == "help":
            show_help()
        elif option == "web":
            run_web_app()
        else:
            print(f"❌ Option tidak dikenal: {option}")
            show_help()
            sys.exit(1)
    else:
        # Default: run web app
        run_web_app()

if __name__ == "__main__":
    main()