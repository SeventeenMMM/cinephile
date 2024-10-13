import { useEffect, useRef, useState } from "react";
import popularStore, {
  selectPopularMovies,
  selectPopularTvs,
} from "../../store/popularStore";
import { popularState, TAM } from "../../types/type";
import { Link } from "react-router-dom";
import { imageMini } from "../../store/url";

interface ContentProps {
  type: 'movie' | 'tv'; 
}

const Content: React.FC<ContentProps> = ({ type }) => {
  const fetchPopular = popularStore(
    (state: popularState) => state.fetchPopular
  );
  const popularMovies = popularStore(selectPopularMovies);
  const popularTvs = popularStore(selectPopularTvs);
  const isMounted = useRef<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages] = useState<number>(500); 
  const [content, setContent] = useState<null | TAM[]>(null);

  useEffect(() => {
    if (isMounted.current) {
      fetchPopular(type, currentPage);
      if (type === "movie") {
        setContent(popularMovies);
      } else {
        setContent(popularTvs);
      }
    }
    isMounted.current = true;
  }, [type, currentPage, fetchPopular, popularMovies, popularTvs]);

  const changePage = (dir: string) => {
    if (dir === 'back') {
      setCurrentPage(prev => Math.max(prev - 1, 1)); 
    } else {
      setCurrentPage(prev => Math.min(prev + 1, totalPages)); 
    }
    window.scroll(0, 0);
  };

  return (
    <div className="container content">
      <h2>{type === "movie" ? "Все фильмы" : "Все сериалы"}</h2>
      <div className="content__info">
        {content?.map((item) => (
          <Link to={`/${type}/${item.id}`} key={item.id}>
            <img src={imageMini + item.poster_path} alt={item.title} /> {}
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => changePage('back')} disabled={currentPage === 1}>BACK</button>
        <span>Страница: {currentPage} - {totalPages}</span>
        <button onClick={() => changePage('next')} disabled={currentPage >= totalPages}>NEXT</button>
      </div>
    </div>
  );
};

export default Content;
