function getBackendUrl(slug: string) {
  // Determine the environment
  const isDevelopment = process.env.NODE_ENV === "development";

  // Construct the API URL based on the environment
  return isDevelopment
    ? `http://localhost:5173/api/${slug}` // Using Vite's port
    : `https://us-central1-content-creator-x.cloudfunctions.net/${slug}`; // Production URL
}

export default getBackendUrl;
