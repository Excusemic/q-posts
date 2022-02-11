import PropTypes from 'prop-types';
import useLogger from '../../hooks/useLogger';
import './style.scss';

function DefaultButton({ active, handleClick, text, greet, postId }) {
  useLogger(() => greet(`DefaultButton from post with id: ${postId}`));
  return (
    <button
      type="button"
      className={`defaultButton ${active ? 'active' : null}`}
      onClick={handleClick}>
      {text}
    </button>
  );
}
DefaultButton.defaultProps = {
  text: 'Button',
  handleClick: () => {},
  active: false
};

DefaultButton.propTypes = {
  greet: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
  active: PropTypes.bool,
  text: PropTypes.string,
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
export default DefaultButton;
