import classNames from 'classnames/bind';
import styles from './PaymentSetting.module.scss';

const cx = classNames.bind(styles);

function PaymentSetting() {
    
    return (
        <div className={cx('wrap')}>
            <div>PaymentSetting manage</div>
        </div>
    );
}

export default PaymentSetting;