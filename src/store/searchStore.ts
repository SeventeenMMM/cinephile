import { create } from "zustand";
import { apiKey, apiUrl } from "./url";
import axios from "axios";
import { TAM } from "../types/type"; 

interface SearchState {
  data: TAM[] | null; 
  fetchData: (query: string) => Promise<void>;
}

const searchStore = create<SearchState>((set) => ({
  data: null,
  fetchData: async (query) => {
    try {
      const url = `${apiUrl}search/multi?query=${query}&language=ru-RU&api_key=${apiKey}`;
      const response = await axios.get(url);
      set({ data: response.data.results as TAM[] });
    } catch (error) {
      console.error('Произошла ошибка в searchStore', error);
    }
  },
}));

export const selectData = (state: SearchState) => state.data;
export default searchStore;
