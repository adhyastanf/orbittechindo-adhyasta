import { fetchMoviesSearch } from '@/lib/services';
import { create } from 'zustand';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  first_air_date?: string;
  release_date?: string;
}

interface MovieState {
  search: Movie[] | null;
}

interface LoadingState {
  search: boolean;
}

interface ErrorState {
  search: string | null;
}

interface Filters {
  type: string;
  startDate: string;
}

interface MovieStoreState {
  movies: MovieState;
  loading: LoadingState;
  error: ErrorState;
  searchQuery: string;
  filters: Filters;
  loadSearchData: () => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Filters) => void;
}

const initialData: { movies: MovieState; loading: LoadingState; error: ErrorState } = {
  movies: { search: null },
  loading: { search: true },
  error: { search: null },
};

export const useMovieStore = create<MovieStoreState>((set, get) => ({
  ...initialData,
  searchQuery: '',
  filters: { type: 'movie', startDate: '1980' },
  loadSearchData: async () => {
    try {
      const { searchQuery } = get();

      set((state) => ({
        ...state,
        loading: { ...state.loading, search: true },
      }));

      const res = await fetchMoviesSearch(searchQuery);
      const data = res.results;

      set((state) => ({
        ...state,
        movies: { ...state.movies, search: data },
        loading: { ...state.loading, search: false },
      }));
    } catch (err) {
      set((state) => ({
        ...state,
        loading: { ...state.loading, search: false },
        error: { ...state.error, search: String(err) },
      }));
    }
  },
  setSearchQuery: (query) => {
    let timeout: NodeJS.Timeout | null = null;
    set({ searchQuery: query });

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      get().loadSearchData();
    }, 500);
  },
  setFilters: (filters) => {
    set((state) => ({
      ...state,
      filters,
      page: 1,
    }));
  },
}));
