import { useEffect } from 'react';

const useLogger = (fn) => {
  useEffect(() => {
    fn();
  }, []);
};

export default useLogger;
