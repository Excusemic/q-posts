import PropTypes from 'prop-types';
import useLogger from '../../hooks/useLogger';
import './style.scss';

function SearchInfo({ error, totalCount, searchTerm, greet }) {
  useLogger(() => greet('SearchInfo'));
  const returnMessage = () => {
    if (error) {
      return 'Something went wrong while searching...';
    }
    return `Total found: ${totalCount}`;
  };
  const returnKeyword = () => {
    if (searchTerm) {
      return (
        <>
          {' '}
          for the keyword<span className="highlight"> &ldquo;{searchTerm}&ldquo;</span>
        </>
      );
    }
    return null;
  };
  return (
    <h3 className="infoMessage">
      {returnMessage()}
      {returnKeyword()}
    </h3>
  );
}

export default SearchInfo;

SearchInfo.defaultProps = {
  error: false,
  totalCount: 0,
  searchTerm: ''
};

SearchInfo.propTypes = {
  error: PropTypes.bool,
  totalCount: PropTypes.number,
  searchTerm: PropTypes.string,
  greet: PropTypes.func.isRequired
};
