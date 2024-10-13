import { imageFull, imageMini } from "../../store/url";
import { upcomingItemProps } from "../../types/type";
import BtnMore from "../UI/BtnMore"

const UpcomingItem: React.FC<upcomingItemProps> = ({ movie, nextSlide, next}) => {
  return (
    <div className="main__upcoming-item">
      <img src={imageFull + movie.backdrop_path} alt="" />
      <div className="main__upcoming-content">
        <h1>{ movie.title }</h1>
        <p>{ movie.overview ? movie.overview : 'Меня забыли добавить(((' }</p>
        <BtnMore type="movie" id={movie.id}/>
      </div>
      <div className="main__upcoming-next" onClick={next}>
        <img src={imageMini + nextSlide.backdrop_path} alt="" />
        <div>
          <span>Следующий</span>
          <h3>{nextSlide.title}</h3>
        </div>
        <div className="main__upcoming-next-line">

        </div>
      </div>
    </div>
  )
}

export default UpcomingItem