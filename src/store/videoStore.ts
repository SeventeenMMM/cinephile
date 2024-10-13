import { create } from "zustand";
import { apiKey, apiUrl } from "./url";
import axios from "axios";

interface VideosState {
  videoMovie: string | null;
  videoTv: string | null;
  fetchVideos: (type: 'movie' | 'tv', id: number) => Promise<void>;
}

const videosStore = create<VideosState>((set) => ({
  videoMovie: null,
  videoTv: null,
  fetchVideos: async (type, id) => {
    try {
      const url = `${apiUrl}${type}/${id}/videos?language=ru-RU&api_key=${apiKey}`;
      const response = await axios.get(url);
      set({ videoMovie: null, videoTv: null });
      if (type === 'movie') {
        set({ videoMovie: response.data.results[0]?.key || null }); 
      } else {
        set({ videoTv: response.data.results[0]?.key || null });
      }
    } catch (error) {
      console.error('Произошла ошибка в Videos', error);
    }
  },
}));

export const selectVideoMovie = (state: VideosState): string | null => state.videoMovie;
export const selectVideoTv = (state: VideosState): string | null => state.videoTv;

export default videosStore;
