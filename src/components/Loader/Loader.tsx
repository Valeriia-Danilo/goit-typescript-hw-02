import css from './Loader.module.css';
import { ThreeDots } from 'react-loader-spinner';

export default function Loader() {
    return (<div className={css.loaderContainer}><ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#251362"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
  
      /></div>)
}