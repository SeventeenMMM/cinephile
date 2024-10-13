import { useEffect, useState } from 'react';
import currentStore, { selectCurrentMovie, selectCurrentTv } from '../../store/currentStore';
import { Link, useParams } from 'react-router-dom';
import { imageMini } from '../../store/url';
import videosStore, { selectVideoMovie, selectVideoTv } from '../../store/videoStore';
import Actors from '../Actors/Actors';
import recStore, { selectRec } from '../../store/recStore';

type Params = {
  type: 'movie' | 'tv';
  id: string;
};

const Current = () => {
  const fetchCurrent = currentStore(state => state.fetchCurrent);
  const movie = currentStore(selectCurrentMovie);
  const tv = currentStore(selectCurrentTv);
  const fetchVideos = videosStore(state => state.fetchVideos);
  const movieVideo = videosStore(selectVideoMovie);
  const tvVideo = videosStore(selectVideoTv);
  const fetchRec = recStore(state => state.fetchRec);
  const rec = recStore(selectRec);
  const { type, id } = useParams<Params>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!type || !id) return;

    const fetchData = async () => {
      setIsLoading(true);
      await fetchCurrent(type, id);
      await fetchVideos(type, Number(id));
      await fetchRec(type, id);
      setIsLoading(false);
      window.scroll(0, 0);
    };
    fetchData();
  }, [id, type, fetchCurrent, fetchVideos, fetchRec]);

  const formatCurrency = (value?: number) => {
    return value ? '$' + value.toLocaleString() : 'Неизвестно...';
  };

  const getBudget = () => formatCurrency(movie?.budget);
  const getRevenue = () => formatCurrency(movie?.revenue);

  const genres = movie?.genres || tv?.genres || [];
  const runtimeOrSeasons = movie
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : `${tv?.number_of_seasons ?? 0}s ${tv?.number_of_episodes ?? 0}e`;

  return (
    <div className="current">
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <div className="current__content">
          <div className="current__content-descr">
            <h1>{movie?.title ?? tv?.name}</h1>
            <p>{movie?.overview ?? tv?.overview}</p>
            <div>
              <span>
                {new Date(movie?.release_date ?? tv?.first_air_date ?? '').getFullYear()},
              </span>
              {genres.map((item, idx) => (
                <span key={idx}>{item.name},</span>
              ))}
              <span>{runtimeOrSeasons}</span>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${movieVideo ?? tvVideo}`}
              target="_blank"
              className="btn-more"
            >
              <i className="fa-solid fa-play"></i>
              Смотреть трейлер
            </a>
            <h2>В главных ролях</h2>
            <div className="current__content-descr-actors">
              <Actors count={6} type={type as 'movie' | 'tv'} id={Number(id)} />
            </div>
          </div>
          <img
            src={imageMini + (movie ? movie?.poster_path : tv?.poster_path)}
            alt=""
            className="poster"
          />
          <img
            src={imageMini + (movie ? movie?.backdrop_path : tv?.backdrop_path)}
            alt=""
            className="backdrop"
          />
        </div>
      )}
      <div className="container extra">
        <div className="extra__info">
          <div className="extra__info-item">
            <h2>Бюджет</h2>
            <p>{getBudget()}</p>
          </div>
          <div className="extra__info-item">
            <h2>Сборы</h2>
            <p>{getRevenue()}</p>
          </div>
          <div className="extra__info-item">
            <h2>Статус</h2>
            <p>{movie?.status ?? tv?.status}</p>
          </div>
          <div className="extra__info-item">
            <h2>Исходное название</h2>
            <p>{movie?.original_title ?? tv?.original_name}</p>
          </div>
        </div>
        <div className="extra__rec">
          <h2>Рекомендации</h2>
          <div className="content__info">
            {rec?.map((item, idx) => (
              <Link to={`/${type}/${item.id}`} key={idx}>
                <img src={imageMini + item.poster_path} alt="" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Current;
