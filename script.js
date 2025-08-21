// Global variables
let map;
let directionsService;
let directionsRenderer;
let autocompleteOrigin;
let autocompleteDestination;
let currentMode = 'transit';

// Initialize the application
function initMap() {
    // Initialize Google Maps services
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    
    // Get default settings from config
    const defaultSettings = getDefaultSettings();
    
    // Create map centered on Indonesia
    map = new google.maps.Map(document.getElementById('map'), {
        center: defaultSettings.center,
        zoom: defaultSettings.zoom,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });
    
    directionsRenderer.setMap(map);
    
    // Initialize autocomplete
    initializeAutocomplete();
    
    // Add event listeners
    addEventListeners();
    
    console.log('Aplikasi Transportasi berhasil diinisialisasi!');
}

// Initialize Google Places Autocomplete
function initializeAutocomplete() {
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');
    
    autocompleteOrigin = new google.maps.places.Autocomplete(originInput, {
        types: ['geocode'],
        componentRestrictions: { country: 'id' }
    });
    
    autocompleteDestination = new google.maps.places.Autocomplete(destinationInput, {
        types: ['geocode'],
        componentRestrictions: { country: 'id' }
    });
}

// Add event listeners
function addEventListeners() {
    // Search button
    document.getElementById('searchBtn').addEventListener('click', searchRoute);
    
    // Enter key in input fields
    document.getElementById('origin').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchRoute();
    });
    
    document.getElementById('destination').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchRoute();
    });
    
    // Transport mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            currentMode = this.dataset.mode;
            
            // If we have a route, search again with new mode
            if (document.getElementById('results').classList.contains('hidden') === false) {
                searchRoute();
            }
        });
    });
}

// Search route function
async function searchRoute() {
    const origin = document.getElementById('origin').value.trim();
    const destination = document.getElementById('destination').value.trim();
    
    // Validate inputs
    if (!origin || !destination) {
        showError(getErrorMessage('NO_ORIGIN'));
        return;
    }
    
    if (origin === destination) {
        showError(getErrorMessage('SAME_LOCATION'));
        return;
    }
    
    // Show loading
    showLoading();
    
    try {
        // Get coordinates for origin and destination
        const originCoords = await getCoordinates(origin);
        const destCoords = await getCoordinates(destination);
        
        if (!originCoords || !destCoords) {
            showError(getErrorMessage('LOCATION_NOT_FOUND'));
            return;
        }
        
        // Calculate route
        const request = {
            origin: originCoords,
            destination: destCoords,
            travelMode: google.maps.TravelMode[currentMode.toUpperCase()],
            provideRouteAlternatives: true
        };
        
        // Add transit options if using transit mode
        if (currentMode === 'transit') {
            request.transitOptions = {
                modes: [
                    google.maps.TransitMode.BUS,
                    google.maps.TransitMode.TRAIN,
                    google.maps.TransitMode.SUBWAY,
                    google.maps.TransitMode.TRAM
                ],
                routingPreference: google.maps.TransitRoutePreference.FEWER_TRANSFERS
            };
        }
        
        directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                displayRoute(result);
            } else {
                showError(getErrorMessage('ROUTE_NOT_FOUND'));
            }
        });
        
    } catch (error) {
        console.error('Error searching route:', error);
        showError(getErrorMessage('API_ERROR'));
    }
}

// Get coordinates from address
function getCoordinates(address) {
    return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === 'OK') {
                const location = results[0].geometry.location;
                resolve(location);
            } else {
                resolve(null);
            }
        });
    });
}

// Display route results
function displayRoute(result) {
    // Hide loading and error
    hideLoading();
    hideError();
    
    // Display route on map
    directionsRenderer.setDirections(result);
    
    // Get the best route (first route)
    const route = result.routes[0];
    const leg = route.legs[0];
    
    // Display route information
    const routeInfo = document.getElementById('routeInfo');
    routeInfo.innerHTML = `
        <h4>Informasi Rute</h4>
        <p><strong>Dari:</strong> ${leg.start_address}</p>
        <p><strong>Ke:</strong> ${leg.end_address}</p>
        <p><strong>Jarak:</strong> <span class="highlight">${leg.distance.text}</span></p>
        <p><strong>Waktu Tempuh:</strong> <span class="highlight">${leg.duration.text}</span></p>
        ${currentMode === 'transit' ? `<p><strong>Biaya:</strong> <span class="highlight">${formatCost(CONFIG.TRANSIT_COST_RANGE.min, CONFIG.TRANSIT_COST_RANGE.max)}</span></p>` : ''}
    `;
    
    // Display route steps
    const routeSteps = document.getElementById('routeSteps');
    let stepsHTML = '<div class="route-steps">';
    
    leg.steps.forEach((step, index) => {
        const icon = getStepIcon(step);
        const isActive = index === 0;
        
        stepsHTML += `
            <div class="step ${isActive ? 'active' : ''}">
                <div class="step-icon">${icon}</div>
                <div class="step-title">${step.instructions.replace(/<[^>]*>/g, '')}</div>
                <div class="step-details">
                    ${step.distance.text} • ${step.duration.text}
                    ${step.transit ? `<br><small>${step.transit.line.name} - ${step.transit.line.short_name}</small>` : ''}
                </div>
            </div>
        `;
    });
    
    stepsHTML += '</div>';
    routeSteps.innerHTML = stepsHTML;
    
    // Show results
    document.getElementById('results').classList.remove('hidden');
    
    // Fit map to show entire route
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(leg.start_location);
    bounds.extend(leg.end_location);
    map.fitBounds(bounds);
}

// Get icon for step based on travel mode
function getStepIcon(step) {
    const travelMode = step.travel_mode;
    
    switch (travelMode) {
        case 'WALKING':
            return '<i class="fas fa-walking"></i>';
        case 'TRANSIT':
            if (step.transit.line.vehicle.type === 'BUS') {
                return '<i class="fas fa-bus"></i>';
            } else if (step.transit.line.vehicle.type === 'TRAIN') {
                return '<i class="fas fa-train"></i>';
            } else if (step.transit.line.vehicle.type === 'SUBWAY') {
                return '<i class="fas fa-subway"></i>';
            } else {
                return '<i class="fas fa-train"></i>';
            }
        case 'DRIVING':
            return '<i class="fas fa-car"></i>';
        case 'BICYCLING':
            return '<i class="fas fa-bicycle"></i>';
        default:
            return '<i class="fas fa-arrow-right"></i>';
    }
}

// Show loading state
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('results').classList.add('hidden');
    document.getElementById('error').classList.add('hidden');
}

// Hide loading state
function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Show error message
function showError(message) {
    hideLoading();
    document.getElementById('results').classList.add('hidden');
    document.getElementById('error').classList.remove('hidden');
    document.getElementById('errorMessage').textContent = message;
}

// Hide error message
function hideError() {
    document.getElementById('error').classList.add('hidden');
}

// Utility function to format time
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
        return `${hours} jam ${minutes} menit`;
    } else {
        return `${minutes} menit`;
    }
}

// Utility function to format distance
function formatDistance(meters) {
    if (meters >= 1000) {
        return `${(meters / 1000).toFixed(1)} km`;
    } else {
        return `${meters} m`;
    }
}

// Add some sample data for demonstration
function addSampleData() {
    // Add sample buttons
    const sampleContainer = document.createElement('div');
    sampleContainer.className = 'sample-routes';
    sampleContainer.innerHTML = `
        <h4>Rute Contoh:</h4>
        <div class="sample-buttons">
            ${CONFIG.SAMPLE_ROUTES.map((route, index) => `
                <button class="sample-btn" data-origin="${route.origin}" data-destination="${route.destination}">
                    ${route.name}
                </button>
            `).join('')}
        </div>
    `;
    
    document.querySelector('.search-container').appendChild(sampleContainer);
    
    // Add event listeners to sample buttons
    document.querySelectorAll('.sample-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('origin').value = this.dataset.origin;
            document.getElementById('destination').value = this.dataset.destination;
            searchRoute();
        });
    });
}

// Initialize sample data when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add sample data after a short delay
    setTimeout(addSampleData, 1000);
});