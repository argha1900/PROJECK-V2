// GHAA TRANS Configuration
const CONFIG = {
    // Google Maps Configuration
    MAPS: {
        DEFAULT_CENTER: { lat: -6.2088, lng: 106.8456 }, // Jakarta
        DEFAULT_ZOOM: 10,
        API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY' // Ganti dengan API Key Anda
    },

    // Transportation Rates (in Rupiah)
    RATES: {
        TRANSIT: {
            BASE_FARE: 3500,
            PER_KM: 500
        },
        DRIVING: {
            PER_KM: 2000 // Fuel cost per km
        },
        WALKING: 0,
        BICYCLING: 0
    },

    // UI Configuration
    UI: {
        APP_NAME: 'GHAA TRANS',
        APP_DESCRIPTION: 'Cek Transportasi & Rute Terbaik',
        PRIMARY_COLOR: '#667eea',
        SECONDARY_COLOR: '#764ba2',
        MAX_ROUTES_DISPLAY: 3
    },

    // Map Styles
    MAP_STYLES: [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "transit",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        }
    ],

    // Error Messages
    MESSAGES: {
        ERROR_NO_ROUTE: "Tidak dapat menemukan rute. Silakan coba lagi.",
        ERROR_INVALID_INPUT: "Mohon isi lokasi asal dan tujuan",
        LOADING: "🔄 Mencari rute terbaik...",
        FREE: "Gratis"
    },

    // Transport Icons
    ICONS: {
        TRANSIT: '🚌',
        DRIVING: '🚗',
        WALKING: '🚶',
        BICYCLING: '🚲'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}