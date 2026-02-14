

export function DynamicUrl() {
    // Vite sets MODE = 'development' when running locally
    if (import.meta.env.MODE === "development") {
      return import.meta.env.VITE_SERVER_URL;  // local
    } else {
      return import.meta.env.VITE_APP_BACKEND_URL; // production
    }
  }
  