import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import useLogger from '../hooks/useLogger';
import { getSinglePost } from '../service/api';
import DefaultLoader from '../components/Loaders/DefaultLoader';
import Comments from '../components/Comments';
import DefaultButton from '../components/DefaultButton';

function PostDetails({ greet }) {
  useLogger(() => greet('PostDetails'));
  const [pageState, setPageState] = useState({ loading: true, error: false, data: null });
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleFetchPost = async () => {
    try {
      const response = await getSinglePost(id);
      return response;
    } catch (err) {
      // place to handle various types of error, for placeholder's sake just left with console.log
      return console.log(err);
    }
  };
  const returnLayout = () => {
    if (!pageState?.data?.id) {
      // place to handle non-existing post
      return <h1>Sorry, couldn&apos;t find such a post...</h1>;
    }
    return (
      <div className="postDetails">
        <DefaultButton
          greet={greet}
          active
          text="Back"
          handleClick={() => navigate('/posts')}
          postId={`${pageState?.data?.id}'back button`}
        />
        <h1 className="title">{pageState?.data?.title}</h1>
        <div className="text">
          <p className="body">{pageState?.data?.body}</p>
          <div className="by">
            <div>
              <h4>name: {pageState?.data?.user?.name}</h4>
              <h5>email: {pageState?.data?.user?.email}</h5>
            </div>
            {pageState?.data?.comments?.length && (
              <DefaultButton
                active={isOpen}
                text={`${isOpen ? 'Close' : 'Open'} Comments`}
                handleClick={() => setIsOpen(!isOpen)}
                greet={greet}
                postId={pageState?.data?.id}
              />
            )}
          </div>
          <Comments
            comments={pageState?.data?.comments}
            isOpen={isOpen}
            greet={greet}
            postId={pageState?.data?.id}
          />
        </div>
      </div>
    );
  };
  useEffect(() => {
    if (id) {
      handleFetchPost()
        .then((resp) => {
          setPageState({ loading: false, error: false, data: resp.data.data?.[0] });
        })
        .catch((err) => {
          setPageState({ loading: false, error: true, data: null });
          console.log(err);
        });
    }
    return setPageState({ loading: false, error: false, data: null });
  }, []);
  if (pageState.error) {
    return 'Something went wrong...';
  }
  return (
    <div className="postDetailsContainer">
      {pageState.loading ? <DefaultLoader greet={greet} /> : returnLayout()}
    </div>
  );
}
PostDetails.propTypes = {
  greet: PropTypes.func.isRequired
};
export default PostDetails;
