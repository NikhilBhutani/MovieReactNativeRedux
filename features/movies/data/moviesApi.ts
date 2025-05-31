export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_TOKEN,
  headers: {
      accept: `application/json`,
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_TOKEN}`
  }
}

export const fetchMoviesApi = async ({ query }: { query: string }) => {
  const endpoint = query ?
    `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  
  console.log('API Call - Starting request to:', endpoint);
  console.log('API Call - Token:', TMDB_CONFIG.API_KEY ? 'Present' : 'Missing');

  if (!TMDB_CONFIG.API_KEY) {
    throw new Error('TMDB API token is not configured');
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    console.log('API Call - Headers:', JSON.stringify(TMDB_CONFIG.headers, null, 2));

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMDB_CONFIG.headers
    });

    clearTimeout(timeoutId);
    console.log('API Call - Response received:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API call failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Call - Success, movies count:', data.results?.length || 0);
    return data.results || [];
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('API request timed out after 30 seconds');
    }
    console.error('API Error:', error);
    throw error;
  }
};
