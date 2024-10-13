import { create } from "zustand";
import { apiKey, apiUrl } from "./url";
import axios from "axios";

interface Recommendation {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
}

interface RecState {
  rec: Recommendation[] | null;
  fetchRec: (type: 'movie' | 'tv', id: string) => Promise<void>;
}

const recStore = create<RecState>((set) => ({
  rec: null,
  fetchRec: async (type, id) => {
    try {
      const url = `${apiUrl}${type}/${id}/recommendations?language=ru-RU&api_key=${apiKey}`;
      const response = await axios.get(url);
      const data = response.data.results;

      const rec = data.slice(0, 4);
      set({ rec });
    } catch (error) {
      console.error('Произошла ошибка в rec', error);
    }
  },
}));

export const selectRec = (state: RecState) => state.rec;
export default recStore;
