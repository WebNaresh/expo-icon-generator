// Google Maps API loader utility
// This ensures that the Google Maps API is loaded only once

let isLoaded = false;
let isLoading = false;
let callbacks: Array<() => void> = [];

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export function loadGoogleMapsApi(): Promise<void> {
    return new Promise((resolve, reject) => {
        // If already loaded, resolve immediately
        if (isLoaded && window.google && window.google.maps) {
            resolve();
            return;
        }

        // Add to callbacks if currently loading
        if (isLoading) {
            callbacks.push(resolve);
            return;
        }

        // Start loading
        isLoading = true;

        // Create script element
        const script = document.createElement('script');
        script.id = 'google-maps-api';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;

        // When script loads
        script.onload = () => {
            isLoaded = true;
            isLoading = false;

            // Resolve this promise
            resolve();

            // Resolve any pending promises
            callbacks.forEach(callback => callback());
            callbacks = [];
        };

        // If script fails to load
        script.onerror = () => {
            isLoading = false;
            reject(new Error('Failed to load Google Maps API'));
            callbacks.forEach(callback => callback());
            callbacks = [];
        };

        // Check if the script is already in the document
        if (!document.getElementById('google-maps-api')) {
            document.head.appendChild(script);
        }
    });
}

export function useGoogleMapsApi() {
    if (typeof window !== 'undefined') {
        // If the API is already loaded, return true
        if (window.google && window.google.maps) {
            return true;
        }

        // Otherwise, load it
        loadGoogleMapsApi();
    }

    return false;
} 