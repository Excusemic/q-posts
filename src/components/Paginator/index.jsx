/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import useLogger from '../../hooks/useLogger';
import './style.scss';

function Pagination({ totalCount, limit, error, pageActive, handleChangePage, greet, place }) {
  useLogger(() => greet(`Pagination on ${place}`));
  if (error || !totalCount) {
    return null;
  }
  const returnNumberOfPages = () => {
    const numberOfPages = Math.ceil(totalCount / limit);
    return numberOfPages;
  };
  const numberOfPages = returnNumberOfPages();
  const showPageButton = (page) => {
    // logic for first page
    if (pageActive === 1 && page <= 3) {
      return true;
    }
    // logic for last page
    if (pageActive === numberOfPages && page >= numberOfPages - 2) {
      return true;
    }
    // logic for other pages
    if (page + 1 === pageActive || page - 1 === pageActive || page === pageActive) {
      return true;
    }
    return false;
  };
  const returnLastPage = () => {
    if (numberOfPages > 3) {
      if (pageActive < numberOfPages - 1) {
        return true;
      }
    }
    return false;
  };
  const returnFirstPage = () => {
    if (pageActive < 3) {
      return false;
    }
    return true;
  };

  return (
    <div className="paginator">
      <div className={`${returnFirstPage() ? 'show' : 'hide'}`}>
        <button type="button" onClick={() => handleChangePage(1)}>
          First page
        </button>
        <span>...</span>
      </div>
      {[...Array(numberOfPages)].map(
        (elem, index) =>
          showPageButton(index + 1) && (
            <button
              type="button"
              key={`${index}Page`}
              className={`numbered ${pageActive === index + 1 && 'active'}`}
              onClick={() => handleChangePage(index + 1)}>
              {index + 1}
            </button>
          )
      )}
      <div className={`${returnLastPage() ? 'show' : 'hide'}`}>
        <span>...</span>
        <button type="button" onClick={() => handleChangePage(numberOfPages)}>
          Last page
        </button>
      </div>
    </div>
  );
}
Pagination.defaultProps = {
  error: false,
  totalCount: 0,
  limit: 0,
  pageActive: 0,
  place: 'top',
  handleChangePage: () => {}
};
Pagination.propTypes = {
  error: PropTypes.bool,
  totalCount: PropTypes.number,
  limit: PropTypes.string,
  pageActive: PropTypes.number,
  handleChangePage: PropTypes.func,
  greet: PropTypes.func.isRequired,
  place: PropTypes.string
};
export default Pagination;
