import { ProgressBar } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <ProgressBar
        className={css.loader}
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        borderColor="#FFF"
        barColor="#51E5FF"
      />
      ;
    </div>
  );
};

export default Loader;
