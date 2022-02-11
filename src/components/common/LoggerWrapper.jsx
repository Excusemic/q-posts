import useLogger from '../../hooks/useLogger';

const Logger = ({ render }) => {
  const greet = (name) => {
    console.log(`Hello from ${name}`);
  };
  useLogger(() => greet('Logger'));

  return render(greet);
};

export default Logger;
