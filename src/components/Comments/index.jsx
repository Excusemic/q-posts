import PropTypes from 'prop-types';
import useLogger from '../../hooks/useLogger';
import './style.scss';

function Comments({ isOpen, comments, greet, postId }) {
  useLogger(() => greet(`Comments from post with id: ${postId}`));
  return (
    <div className={`comments ${isOpen ? 'active' : null}`}>
      {comments?.map((comment) => {
        return (
          <div className="comment" key={comment?.id}>
            <h5>name: {comment?.name})</h5>
            <h6>email: {comment?.email})</h6>
            <p>{comment?.body}</p>
          </div>
        );
      })}
    </div>
  );
}

Comments.defaultProps = {
  comments: [{}],
  isOpen: false,
  postId: 'unknown'
};

Comments.propTypes = {
  isOpen: PropTypes.bool,
  greet: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object),
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Comments;
