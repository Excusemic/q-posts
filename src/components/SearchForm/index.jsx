import { useRef } from 'react';
import PropTypes from 'prop-types';
import useLogger from '../../hooks/useLogger';
import './style.scss';

function SearchForm({ handleSubmit, handleReset, hasReset, greet }) {
  const inputRef = useRef(null);
  const resetRefValue = () => {
    inputRef.current.value = '';
  };
  useLogger(() => greet('SearchForm'));
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(inputRef.current.value, resetRefValue);
      }}>
      {hasReset && (
        <button
          className="reset"
          type="button"
          onClick={() => {
            resetRefValue();
            return handleReset();
          }}>
          Reset
        </button>
      )}
      <input
        ref={inputRef}
        type="text"
        name="search"
        id="searchBar"
        placeholder="Enter user info"
      />
      <button type="submit" className="submit">
        Search
      </button>
    </form>
  );
}

SearchForm.defaultProps = {
  hasReset: false,
  handleSubmit: () => {},
  handleReset: () => {}
};
SearchForm.propTypes = {
  greet: PropTypes.func.isRequired,
  handleReset: PropTypes.func,
  handleSubmit: PropTypes.func,
  hasReset: PropTypes.bool
};
export default SearchForm;
