import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    
    return (
        <div className={cx('wrap')}>
            <div>Home manage</div>
        </div>
    );
}

export default Home;