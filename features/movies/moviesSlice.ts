import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMoviesApi } from './data/moviesApi';
import { Movie } from './model/movie';

export interface MoviesState {
  list: Movie[];             // 🔹 Actual movie data
  loading: boolean;          // 🔹 UI loading indicator
  error: string | null;      // 🔹 Track error for UX
}

// 🔸 Initial state for the slice
const initialState: MoviesState = {
  list: [],
  loading: false,
  error: null,
};

// 🔹 Async thunk that wraps our API call
export const fetchMovies = createAsyncThunk<Movie[]>(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Slice - Starting API call');
      const movies = await fetchMoviesApi({query: ''});
      console.log('Slice - API call successful, movies count:', movies.length);
      return movies;
    } catch (err: any) {
      console.error('Slice - API call failed:', err);
      return rejectWithValue(err.message || 'Failed to fetch movies');
    }
  }
);

// 🔹 Create the slice
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        console.log('Slice - Fetch pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        console.log('Slice - Fetch fulfilled');
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        console.log('Slice - Fetch rejected:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// 🔸 Export the reducer (for store.ts)
export default moviesSlice.reducer;

// 🔸 Optional actions (e.g., reset)
export const { setMovies, setLoading, setError } = moviesSlice.actions;