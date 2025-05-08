export default {
    async fetch(request, env) {
      const url = new URL(request.url);
      if (url.pathname.startsWith('/api/')) {
        // Handle API routes
        return await handleApiRequest(request, env);
      }
      
      // Fallback to static assets or pages
      return env.ASSETS.fetch(request);
    }
  };
  
  async function handleApiRequest(request, env) {
    // Forward the request to the Next.js API handler
    return await env.NEXT_API.fetch(request);
  }
  