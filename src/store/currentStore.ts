import { create } from "zustand";
import { apiKey, apiUrl } from "./url";
import axios from "axios";

interface Movie {
    title: string;
    overview: string;
    release_date?: string;
    genres: { name: string }[];
    runtime: number;
    budget: number;
    revenue: number;
    poster_path?: string;
    backdrop_path?: string;
    status: string;
    original_title: string;
}

interface TV {
    name: string;
    overview: string;
    first_air_date?: string;
    genres: { name: string }[];
    number_of_seasons: number;
    number_of_episodes: number;
    poster_path?: string;
    backdrop_path?: string;
    status: string;
    original_name: string;
}

interface CurrentStore {
    currentMovie: Movie | null;
    currentTv: TV | null;
    fetchCurrent: (type: "movie" | "tv", id: string) => Promise<void>;
}

const currentStore = create<CurrentStore>((set) => ({
    currentMovie: null,
    currentTv: null,
    fetchCurrent: async (type, id) => {
        try {
            const url = `${apiUrl}${type}/${id}?language=ru-RU&api_key=${apiKey}`;
            const response = await axios.get(url);
            set({ currentMovie: null, currentTv: null });
            if (type === 'movie') set({ currentMovie: response.data });
            else set({ currentTv: response.data });
        } catch (error) {
            console.error('Произошла ошибка в Current', error);
        }
    }
}));

export const selectCurrentMovie = (state: CurrentStore) => state.currentMovie;
export const selectCurrentTv = (state: CurrentStore) => state.currentTv;

export default currentStore;
