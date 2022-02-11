import PropTypes from 'prop-types';
import useLogger from '../../../hooks/useLogger';
import './style.scss';

function DefaultLayout({ children, greet }) {
  useLogger(() => greet('DefaultLayout'));
  return (
    <div className="defaultContainer">
      <div className="content">{children}</div>
    </div>
  );
}
DefaultLayout.propTypes = {
  greet: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default DefaultLayout;
