import classNames from 'classnames/bind';
import styles from './LayoutSell.module.scss';
import SideBar from './SideBar';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

function LayoutSell({ children }) {
    const [toggleButton, setToggleButton] = useState({
        action: false,
        value: 0,
    });

    return (
        <div className={cx('wrap')}>
            <Header />
            <div className={cx('body')}>
                <SideBar setToggleButton={setToggleButton} />
                <div
                    className={cx('wrapContent')}
                    style={{
                        width: `calc(100% - 230px + ${toggleButton.value}px)`,
                        marginLeft: `calc(230px - ${toggleButton.value}px)`,
                    }}
                >
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default LayoutSell;
