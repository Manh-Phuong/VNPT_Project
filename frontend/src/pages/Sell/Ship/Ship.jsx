import classNames from 'classnames/bind';
import styles from './Ship.module.scss';

const cx = classNames.bind(styles);

function Ship() {
    
    return (
        <div className={cx('wrap')}>
            <div>Ship manage</div>
        </div>
    );
}

export default Ship;