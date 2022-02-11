/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useLogger from '../../hooks/useLogger';
import Comments from '../Comments';
import DefaultButton from '../DefaultButton';
import './style.scss';

function SinglePost({ greet, id, body, title, userName, comments }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  useLogger(() => greet(`SinglePost with id: ${id}`));
  return (
    <div className="singlePost">
      <div tabIndex={0} role="button" className="info" onClick={() => navigate(`/post/${id}`)}>
        <h1 className="title">{title}</h1>
        <p className="body">{body}</p>
      </div>
      <div className="postFooter">
        <p className="by">
          by: <span>{userName}</span>
        </p>
        {comments?.length && (
          <DefaultButton
            active={isOpen}
            text={`${isOpen ? 'Close' : 'Open'} Comments`}
            handleClick={() => setIsOpen(!isOpen)}
            greet={greet}
            postId={id}
          />
        )}
      </div>
      <Comments comments={comments} isOpen={isOpen} greet={greet} postId={id} />
    </div>
  );
}

SinglePost.defaultProps = {
  title: 'Untitled',
  body: 'No text',
  userName: 'unknown',
  comments: [{}]
};

SinglePost.propTypes = {
  greet: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  userName: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.object)
};

export default SinglePost;
