import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MovieDetail({
  id,
  rating,
  coverImg,
  title,
  description_intro,
  genres,
  year,
}) {
  return (
    <div>
      <img src={coverImg} alt={title}></img>
      <ul>
        <li>Title : {title}</li>
        <li>ID : {id}</li>
        <li>Rating : {rating}</li>
        <li>Year: {year}</li>
        <li>description_intro : {description_intro}</li>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}
MovieDetail.propTypes = {
  id: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  description_intro: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default MovieDetail;
