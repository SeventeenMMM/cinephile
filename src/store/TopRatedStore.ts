import { create } from "zustand";
import { apiKey, apiUrl } from "./url";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  overview?: string;
}

interface TopRatedState {
  top: Movie[] | null;
  fetchTop: () => Promise<void>;
}

const topRatedStore = create<TopRatedState>((set) => ({
  top: null,
  fetchTop: async () => {
    try {
      const url = `${apiUrl}movie/top_rated?language=ru-RU&api_key=${apiKey}`;
      const response = await axios.get(url);
      const top20 = response.data.results as Movie[]; 
      const top10 = top20.slice(0, 10); 
      set({ top: top10 });
    } catch (error) {
      console.error('Произошла ошибка в TopRated', error);
    }
  },
}));

export const selectTop = (state: TopRatedState): Movie[] | null => state.top;
export default topRatedStore;
