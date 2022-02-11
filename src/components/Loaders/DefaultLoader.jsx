import PropTypes from 'prop-types';
import useLogger from '../../hooks/useLogger';
import './style.scss';

function Loader({ greet }) {
  useLogger(() => greet('Loader'));
  return (
    <div className="loaderContainer">
      <div className="loader" />
    </div>
  );
}
Loader.propTypes = {
  greet: PropTypes.func.isRequired
};
export default Loader;
