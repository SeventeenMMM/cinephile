import { create } from "zustand";
import { apiKey, apiUrl } from "./url";
import axios from "axios";

interface Actor {
  id: number;
  name: string;
  profile_path: string;
}

interface ActorsState {
  movieActors: Actor[] | null;
  tvActors: Actor[] | null;
  fetchActors: (type: 'movie' | 'tv', id: number, count: number) => Promise<void>;
}

const actorsStore = create<ActorsState>((set) => ({
  movieActors: null,
  tvActors: null,
  fetchActors: async (type, id, count) => {
    try {
      const url = `${apiUrl}${type}/${id}/credits?language=ru-RU&api_key=${apiKey}`;
      const response = await axios.get(url);
      const actors = response.data.cast.slice(0, count) as Actor[]; 
      if (type === 'movie') set({ movieActors: actors });
      else set({ tvActors: actors });
    } catch (error) {
      console.error('Произошла ошибка в Actors', error);
    }
  }
}));

export const selectMovieActors = (state: ActorsState) => state.movieActors;
export const selectTvActors = (state: ActorsState) => state.tvActors;
export default actorsStore;
