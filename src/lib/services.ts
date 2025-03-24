import { getAuthToken } from '@/app/actions/getAuthToken';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers : {
    Accept: 'application/json',
  }
});

const BASE_URL_TMDB = 'https://api.themoviedb.org/3';

export async function fetchTrending() {
  const token = await getAuthToken();
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await instance.get('/trending/all/day', headers);
  return res.data.results;
}

export async function fetchMovies({ pageParam, filters }: { pageParam: number; filters: { type: string; startDate: string } }) {
  const token = await getAuthToken();
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const typeCondition = filters.type === 'movie' ? 'movie' : 'tv';
  const dateType = filters.type === 'movie' ? 'primary_release_date' : 'first_air_date';
  const res = await instance.get(`/discover/${typeCondition}`, {
    params: {
      page: pageParam,
      [`${dateType}_gte`]: `${filters.startDate}-01-01`,
    },
    ...headers
  });

  return res.data.results;
}

export async function fetchMoviesSearch(query = '') {
  const token = await getAuthToken();
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await instance.get(`/search/multi`, { params: { query }, ...headers });
  return res.data;
}

export async function fetchDetailMovie(type: string, movie_id: string) {
  const token = await getAuthToken();
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const params = { append_to_response: 'credits,recommendations' };
  const res = await instance.get(`/${type}/`.concat(movie_id), { params, ...headers });
  return res.data;
}

export async function fetchLogin(email: string, password: string) {
  const body = {
    email,
    password,
  };

  const res = await axios.post('/api/auth/login', body);
  return res.data;
}

export async function fetchRegister(name: string, email: string, password: string) {
  const body = {
    name,
    email,
    password,
  };

  const res = await axios.post('/api/auth/register', body);
  return res.data;
}

export async function fetchValidationKey(token: string) {
  const res = await axios.get(BASE_URL_TMDB.concat('/authentication'), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}
