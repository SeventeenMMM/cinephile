import { Link } from "react-router-dom";

interface BtnMoreProps {
  type: 'movie' | 'tv'; 
  id: number; 
}

const BtnMore: React.FC<BtnMoreProps> = ({ type, id }) => {
  return (
    <Link to={`/${type}/${id}`} className="btn-more">
      <i className="fa-solid fa-bars"></i>
      Подробнее
    </Link>
  );
};

export default BtnMore;
