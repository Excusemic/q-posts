import PropTypes from 'prop-types';
import { useSearchContext } from '../contexts/SearchContext';
import useLogger from '../hooks/useLogger';
import SearchForm from '../components/SearchForm';
import SearchInfo from '../components/SearchInfo';
import Pagination from '../components/Paginator';
import SinglePost from '../components/SinglePost';
import { LIMIT } from '../utils/constants';
import DefaultLoader from '../components/Loaders/DefaultLoader';

function Posts({ greet }) {
  const { changeSearchTerm, resetSearch, state, changePage } = useSearchContext();
  const { error, loading, searchTerm, totalCount, page, posts } = state;
  const handleSearch = (value) => {
    if (!value.replace(/\s/g, '').length) {
      if (state.searchTerm) {
        return changeSearchTerm('');
      }
      return null;
    }
    return changeSearchTerm(value);
  };
  const handleResetSearch = () => {
    return resetSearch();
  };
  useLogger(() => greet('Posts'));
  return (
    <div>
      <div className="searchFormContainer">
        <SearchForm
          hasReset
          handleSubmit={handleSearch}
          handleReset={handleResetSearch}
          greet={greet}
        />
        <SearchInfo error={error} searchTerm={searchTerm} totalCount={totalCount} greet={greet} />
      </div>
      <Pagination
        place="top"
        greet={greet}
        error={error}
        limit={LIMIT}
        totalCount={totalCount}
        pageActive={page}
        handleChangePage={changePage}
      />
      <div className="postsContainer">
        {loading ? (
          <DefaultLoader greet={greet} />
        ) : (
          posts.map((post) => {
            return (
              <SinglePost
                key={post?.id}
                greet={greet}
                id={post?.id}
                title={post?.title}
                body={post?.body}
                comments={post?.comments}
                userName={post?.user?.name}
              />
            );
          })
        )}
      </div>
      <Pagination
        place="bottom"
        greet={greet}
        error={error}
        limit={LIMIT}
        totalCount={totalCount}
        pageActive={page}
        handleChangePage={changePage}
      />
    </div>
  );
}

Posts.propTypes = {
  greet: PropTypes.func.isRequired
};
export default Posts;
