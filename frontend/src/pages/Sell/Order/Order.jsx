import classNames from 'classnames/bind';
import styles from './Order.module.scss';

import { Tabs } from 'antd';
import OrderAll from './OrderAll';
import OrderWaitConfirm from './OrderWaitConfirm/OrderWaitConfirm';
import OrderWaitDelivery from './OrderWaitDelivery/OrderWaitDelivery';
import OrderDelivering from './OrderDelivering/OrderDelivering';
import OrderDelivered from './OrderDelivered/OrderDelivered';
import OrderCancel from './OrderCancel/OrderCancel';
import OrderReturn from './OrderReturn/OrderReturn';
import OrderFailed from './OrderFailed/OrderFailed';


const cx = classNames.bind(styles);

const items = [
    {
      key: '1',
      label: 'Tất cả',
      children: <OrderAll />,
    },
    {
      key: '2',
      label: 'Chờ xác nhận',
      children: <OrderWaitConfirm />,
    },
    {
      key: '3',
      label: 'Chờ lấy hàng',
      children: <OrderWaitDelivery />,
    },
    {
        key: '4',
        label: 'Đang giao',
        children: <OrderDelivering />,
      },
      {
        key: '5',
        label: 'Đã giao',
        children: <OrderDelivered />,
      },
      {
        key: '6',
        label: 'Đơn hủy',
        children: <OrderCancel />,
      },
      {
        key: '7',
        label: 'Trả hàng/Hoàn tiền',
        children: <OrderReturn />,
      },
      {
        key: '8',
        label: 'Giao không thành công',
        children: <OrderFailed />,
      },
  ];

function Order() {
    const onChange = (key) => {
        console.log(key);
      };
    
    return (
        <div className={cx('wrap')}>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    );
}

export default Order;