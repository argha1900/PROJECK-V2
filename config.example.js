// Contoh file konfigurasi - Salin file ini ke config.local.js dan sesuaikan
const CONFIG = {
    // Google Maps API Key - Ganti dengan API Key Anda
    GOOGLE_MAPS_API_KEY: 'YOUR_ACTUAL_API_KEY_HERE',
    
    // Pengaturan Default
    DEFAULT_CENTER: {
        lat: -6.2088,  // Jakarta
        lng: 106.8456
    },
    DEFAULT_ZOOM: 10,
    
    // Pengaturan Transportasi
    TRANSIT_MODES: [
        'BUS',
        'TRAIN', 
        'SUBWAY',
        'TRAM'
    ],
    
    // Estimasi Biaya Transportasi Umum (IDR)
    TRANSIT_COST_RANGE: {
        min: 3500,
        max: 15000
    },
    
    // Pengaturan UI
    ANIMATION_DURATION: 300,
    LOADING_TIMEOUT: 10000,
    
    // Pesan Error
    ERROR_MESSAGES: {
        NO_ORIGIN: 'Mohon isi lokasi asal',
        NO_DESTINATION: 'Mohon isi lokasi tujuan',
        SAME_LOCATION: 'Lokasi asal dan tujuan tidak boleh sama',
        LOCATION_NOT_FOUND: 'Tidak dapat menemukan lokasi yang dimaksud',
        ROUTE_NOT_FOUND: 'Tidak dapat menemukan rute untuk lokasi tersebut',
        API_ERROR: 'Terjadi kesalahan saat menghubungi server',
        NETWORK_ERROR: 'Koneksi internet bermasalah'
    },
    
    // Rute Contoh - Sesuaikan dengan lokasi Anda
    SAMPLE_ROUTES: [
        {
            name: 'Monas ke TMII',
            origin: 'Monas, Jakarta',
            destination: 'Taman Mini Indonesia Indah, Jakarta'
        },
        {
            name: 'Bandara ke Kota Tua',
            origin: 'Bandara Soekarno-Hatta, Tangerang',
            destination: 'Kota Tua, Jakarta'
        },
        {
            name: 'Mall ke Ancol',
            origin: 'Mall Taman Anggrek, Jakarta',
            destination: 'Ancol, Jakarta'
        },
        {
            name: 'GBK ke Mall Kelapa Gading',
            origin: 'Gelora Bung Karno, Jakarta',
            destination: 'Mall Kelapa Gading, Jakarta'
        }
    ]
};

// Fungsi untuk mendapatkan API Key
function getApiKey() {
    return CONFIG.GOOGLE_MAPS_API_KEY;
}

// Fungsi untuk mendapatkan pengaturan default
function getDefaultSettings() {
    return {
        center: CONFIG.DEFAULT_CENTER,
        zoom: CONFIG.DEFAULT_ZOOM
    };
}

// Fungsi untuk mendapatkan pesan error
function getErrorMessage(key) {
    return CONFIG.ERROR_MESSAGES[key] || 'Terjadi kesalahan yang tidak diketahui';
}

// Fungsi untuk format biaya
function formatCost(min, max) {
    return `Rp ${min.toLocaleString('id-ID')} - Rp ${max.toLocaleString('id-ID')}`;
}

// Export untuk penggunaan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}