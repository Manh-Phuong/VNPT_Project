import classNames from 'classnames/bind';
import styles from './OrderAll.module.scss';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Space, Select, Input, Button, Flex, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useState } from 'react';

import TableOrder from '../../../../components/Table/TableOrder';

const cx = classNames.bind(styles);

const { Search } = Input;

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
const customWeekStartEndFormat = (value) =>
    `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value).endOf('week').format(weekFormat)}`;

const optionsSearch = [
    {
        value: '1',
        label: 'Mã đơn hàng',
    },
    {
        value: '2',
        label: 'Tên người mua',
    },
    {
        value: '3',
        label: 'Sản phẩm',
    },
    {
        value: '4',
        label: 'Mã vận đơn',
    },
    {
        value: '5',
        label: 'Mã yêu cầu trả hàng',
    },
    // {
    //     value: '6',
    //     label: 'Mã vận đơn cho yêu cầu trả hàng',
    // },
];

function OrderAll() {
    const [labelSearch, setLabelSearch] = useState('Mã đơn hàng');

    const currentDate = dayjs();
    const oneMonthAgo = currentDate.subtract(1, 'month');

    const handleChange = (value, choose) => {
        // console.log(`selected ${choose.label}`);
        // console.log(choose);
        setLabelSearch(choose.label);
    };

    const onSearch = (value, _e, info) => console.log(info?.source, value);

    return (
        <div className={cx('wrap')}>
            <div className={cx('choose-date')}>
                <div style={{ marginRight: '12px' }}>Ngày đặt hàng</div>
                <Space direction="vertical" size={12}>
                    <RangePicker
                        // defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
                        defaultValue={[oneMonthAgo, currentDate]}
                        format={dateFormat}
                    />
                </Space>
                <div style={{ marginLeft: '12px' }}>
                    <Button icon={<DownloadOutlined />}>Xuất file</Button>
                </div>
            </div>

            <div className={cx('search')}>
                <Select
                    defaultValue="1"
                    style={{
                        minWidth: 220,
                    }}
                    onChange={handleChange}
                    options={optionsSearch}
                />

                <Search placeholder={`Nhập ${labelSearch}`} onSearch={onSearch} enterButton />
            </div>

            <div className={cx('table')}>
                <TableOrder />
            </div>
        </div>
    );
}

export default OrderAll;
