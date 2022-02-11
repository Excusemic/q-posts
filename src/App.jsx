// router
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
// constants
import PropTypes from 'prop-types';
import { PATHS } from './utils/constants';
// layouts
import DefaultLayout from './components/layouts/DefaultLayout';
// contexts
import { SearchContextProvider } from './contexts/SearchContext';
// views/pages/wrappers
import Posts from './views/Posts';
import PostDetails from './views/PostDetails';
import Logger from './components/common/LoggerWrapper';
// hooks
import useLogger from './hooks/useLogger';

const App = ({ greet }) => {
  useLogger(() => greet('App'));
  const element = useRoutes([
    { path: PATHS.home, element: <Posts greet={greet} /> },
    { path: PATHS.posts, element: <Posts greet={greet} /> },
    { path: PATHS.postDetails, element: <PostDetails greet={greet} /> }
  ]);
  return element;
};
function AppWrapper() {
  return (
    <SearchContextProvider>
      <Logger
        render={(greet) => (
          <DefaultLayout greet={greet}>
            <Router>
              <App greet={greet} />
            </Router>
          </DefaultLayout>
        )}
      />
    </SearchContextProvider>
  );
}
export default AppWrapper;
App.propTypes = {
  greet: PropTypes.func.isRequired
};
