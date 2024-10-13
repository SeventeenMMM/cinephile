import { useEffect, useRef } from "react";
import topRatedStore, { selectTop } from "../../store/TopRatedStore";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { imageMini } from "../../store/url";
import { Link } from "react-router-dom";

const TopRated: React.FC = () => {
  const fetchTop = topRatedStore((state) => state.fetchTop);
  const top = topRatedStore(selectTop);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) {
      fetchTop();
    } else {
      isMounted.current = true;
    }
  }, [fetchTop]);

  return (
    <section className="top">
      <h2 className="top-title">
        ТОП
        <span>10</span>
      </h2>
      {top && top.length > 0 && ( 
        <Splide
          className="top__slider"
          options={{
            type: 'loop',
            autoplay: true,
            gap: '23px',
            perPage: 3.5,
            perMove: 1,
            pagination: false
          }}
        >
          {top.map((item, idx) => (
            <SplideSlide 
              className="top__slider-item"
              key={item.id}
            >
              <Link to={`/movie/${item.id}`} className="top__slider-item-content">
                <img src={imageMini + item.poster_path} alt={item.title || "Фильм"} />
                <div><span>{idx + 1}</span></div>
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      )}
    </section>
  );
};

export default TopRated;
