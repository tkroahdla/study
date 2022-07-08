import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
function Detail() {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie.genres);
    setLoading(false);
    setDetail(json.data.movie);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Detail loading...</h1>
      ) : (
        <MovieDetail
          coverImg={detail.medium_cover_image}
          id={id}
          title={detail.title}
          year={detail.year}
          rating={detail.rating}
          description_intro={detail.description_intro}
          language={detail.language}
          genres={detail.genres}
        ></MovieDetail>
      )}
    </div>
  );
}

export default Detail;
