import { useEffect, useRef, useState } from "react";
import searchStore, { selectData } from "../store/searchStore";
import { Link } from "react-router-dom";
import { imageMini } from "../store/url";
import { TAM } from "../types/type";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const fetchData = searchStore((state) => state.fetchData);
  const data = searchStore(selectData) as TAM[];
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current && query.length > 2) {
      fetchData(query);
    }
    isMounted.current = true;
  }, [fetchData, query]);

  return (
    <div className="container search">
      <input
        type="search"
        placeholder="Найти фильм, сериал..."
        autoFocus
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="search__result">
        {data && data.length > 0 ? (
          data.map((item: TAM, idx: number) => (
            <Link to={`/${item.title ? 'movie' : 'tv'}/${item.id}`} key={idx}>
              <img src={imageMini + item.poster_path} alt={item.title || item.name} />
            </Link>
          ))
        ) : (
          <p>Нет результатов</p>
        )}
      </div>
    </div>
  );
};

export default Search;
