import { useEffect, useRef } from "react";
import actorsStore, {
  selectMovieActors,
  selectTvActors,
} from "../../store/actorsStore";
import { imageMini } from "../../store/url";

interface ActorsProps {
  type: 'movie' | 'tv';
  id: number;
  count: number;
}

const Actors: React.FC<ActorsProps> = ({ type, id, count }) => {
  const fetchActors = actorsStore((state) => state.fetchActors);
  const movieActors = actorsStore(selectMovieActors);
  const tvActors = actorsStore(selectTvActors);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) {
      fetchActors(type, id, count);
    }
    isMounted.current = true;
  }, [fetchActors, type, id, count]); 

  return (
    <div className="actors">
      {type === "movie"
        ? movieActors?.map((item) => (
            <div className="actors__item" key={item.id}>
              <img src={imageMini + item.profile_path} alt={item.name} />
              <span>{item.name}</span>
            </div>
          )) : tvActors?.map((item) => (
            <div className="actors__item" key={item.id}>
              <img src={imageMini + item.profile_path} alt={item.name} />
              <span>{item.name}</span>
            </div>
          ))}
    </div>
  );
};

export default Actors;
