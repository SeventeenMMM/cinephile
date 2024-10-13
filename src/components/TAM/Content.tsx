import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import popularStore, { selectPopularMovies, selectPopularTvs } from '../../store/popularStore';
import { useEffect, useState } from 'react';
import { imageMini } from '../../store/url';
import { popularState, TAM } from '../../types/type';
import ItemBlock from '../ItemBlock/ItemBlock';

interface ContentProp {
  type: 'movie' | 'tv'; 
}

const Content: React.FC<ContentProp> = ({ type }) => {
  const fetchPopular = popularStore((state: popularState) => state.fetchPopular);
  const popularMovies = popularStore(selectPopularMovies);
  const popularTvs = popularStore(selectPopularTvs);
  const [media, setMedia] = useState<TAM | null>(null);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    fetchPopular(type, 1);
  }, [fetchPopular, type]); 

  const getMedia = (item: TAM) => {
    setMedia(item);
    setActive(true);
  };

  const closeItemBlock = () => {
    setActive(false);
  };

  return (
    <section className="media">
      <h2>
        <a href="#" className="media-title">
          {type === 'movie' ? 'Фильмы' : 'Сериалы'}
          <i className="fa-solid fa-chevron-right"></i>
        </a>
      </h2>
      <Splide 
        className="media__slider"
        options={{
          type: 'loop',
          autoplay: true,
          gap: '24px',
          perPage: 5.5,
          perMove: 3,
          pagination: false
        }}
      >
        {type === 'movie' ? popularMovies?.map((item, idx: number) => (
          <SplideSlide className="media__slider-item" key={idx}>
            <div onClick={() => getMedia(item)}> {}
              <img src={imageMini + item.poster_path} alt={item.title} />
            </div>
          </SplideSlide>
        )) : popularTvs?.map((item, idx: number) => (
          <SplideSlide className="media__slider-item" key={idx}>
            <div onClick={() => getMedia(item)}> {}
              <img src={imageMini + item.poster_path} alt={item.name} />
            </div>
          </SplideSlide>
        ))}
      </Splide>
      <ItemBlock media={media} active={active} type={type} close={closeItemBlock} />
    </section>
  );
}

export default Content;
