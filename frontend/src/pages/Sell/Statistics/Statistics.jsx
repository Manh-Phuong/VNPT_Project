import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Statistics.module.scss';
import { DailySalesChart, WeeklySalesChart, MonthlySalesChart } from '../../../components/Charts/Charts';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Select from 'react-select';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const optionsStatisticsOrder = [
    { value: 'day', label: 'Thống kê theo ngày' },
    { value: 'week', label: 'Thống kê theo tuần' },
    { value: 'month', label: 'Thống kê theo tháng' },
];

const optionsStatisticsRevenue = [
    { value: 'day', label: 'Thống kê theo ngày' },
    { value: 'week', label: 'Thống kê theo tuần' },
    { value: 'month', label: 'Thống kê theo tháng' },
];

const customStyles = {
    option: (provided, state) => ({
        ...provided,

        cursor: 'pointer',
    }),

    control: (provided) => ({
        ...provided,
        minHeight: '40px',
        width: '230px',
    }),
};

const today = dayjs().add(0, 'day');

function Statistics() {
    const navigate = useNavigate();

    const [selectedStatisticOrder, setSelectedStatisticOrder] = useState({ value: 'day', label: 'Thống kê theo ngày' });
    const [selectedStatisticRevenue, setSelectedStatisticRevenue] = useState({
        value: 'day',
        label: 'Thống kê theo ngày',
    });
    const [dataOrder, setDataOrder] = useState([]);
    const [dataRevenue, setDataRevenue] = useState([]);
    const [dayOrder, setDayOrder] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });
    const [dayRevenue, setDayRevenue] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });

    const [openPrintReport, setOpenPrintReport] = useState(false);

    const handleClosePrintReport = () => setOpenPrintReport(false);
    const handleOpenPrintReport = (content) => {
        setOpenPrintReport(true);
    };

    // const data = [
    //     { date: '2023-01-01', value: 100 },
    //     { date: '2023-02-02', value: 150 },
    //     { date: '2023-03-03', value: 80 },
    //     { date: '2023-04-04', value: 190 },
    //     { date: '2023-05-01', value: 180 },
    //     { date: '2023-06-02', value: 165 },
    //     { date: '2023-07-03', value: 89 },
    //     { date: '2023-08-04', value: 120 },

    //     { date: '2023-09-01', value: 130 },
    //     { date: '2023-09-02', value: 115 },
    //     { date: '2023-09-03', value: 90 },
    //     { date: '2023-09-04', value: 110 },
    //     { date: '2023-09-05', value: 115 },
    //     { date: '2023-09-06', value: 105 },
    //     { date: '2023-09-07', value: 180 },
    //     { date: '2023-09-08', value: 155 },
    //     { date: '2023-09-09', value: 125 },
    //     { date: '2023-09-10', value: 130 },
    //     { date: '2023-09-11', value: 185 },
    //     { date: '2023-09-12', value: 123 },
    //     { date: '2023-10-01', value: 116 },
    //     { date: '2023-11-02', value: 136 },
    //     { date: '2023-12-03', value: 161 },
    //     // Thêm dữ liệu hàng ngày ở đây
    // ];

    useEffect(() => {
        //fetch API
        setDataOrder([
            { date: '2023-01-01', value: 100 },
            { date: '2023-02-02', value: 150 },
            { date: '2023-03-03', value: 80 },
            { date: '2023-04-04', value: 190 },
            { date: '2023-05-01', value: 180 },
            { date: '2023-06-02', value: 165 },
            { date: '2023-07-03', value: 89 },
            { date: '2023-08-04', value: 120 },

            { date: '2023-09-01', value: 130 },
            { date: '2023-09-02', value: 115 },
            { date: '2023-09-03', value: 90 },
            { date: '2023-09-04', value: 110 },
            { date: '2023-09-05', value: 115 },
            { date: '2023-09-06', value: 105 },
            { date: '2023-09-07', value: 180 },
            { date: '2023-09-08', value: 155 },
            { date: '2023-09-09', value: 125 },
            { date: '2023-09-10', value: 130 },
            { date: '2023-09-11', value: 185 },
            { date: '2023-09-12', value: 123 },
            { date: '2023-10-01', value: 116 },
            { date: '2023-11-02', value: 136 },
            { date: '2023-12-03', value: 161 },
            // Thêm dữ liệu hàng ngày ở đây
        ]);

        setDataRevenue([
            { date: '2023-01-01', value: 100000 },
            { date: '2023-02-02', value: 150000 },
            { date: '2023-03-03', value: 800000 },
            { date: '2023-04-04', value: 190000 },
            { date: '2023-05-01', value: 180000 },
            { date: '2023-06-02', value: 165000 },
            { date: '2023-07-03', value: 890000 },
            { date: '2023-08-04', value: 120000 },

            { date: '2023-09-01', value: 130000 },
            { date: '2023-09-02', value: 115000 },
            { date: '2023-09-03', value: 900000 },
            { date: '2023-09-04', value: 110000 },
            { date: '2023-09-05', value: 115000 },
            { date: '2023-09-06', value: 105000 },
            { date: '2023-09-07', value: 180000 },
            { date: '2023-09-08', value: 155000 },
            { date: '2023-09-09', value: 125000 },
            { date: '2023-09-10', value: 130000 },
            { date: '2023-09-11', value: 185000 },
            { date: '2023-09-12', value: 123000 },
            { date: '2023-10-01', value: 116000 },
            { date: '2023-11-02', value: 136000 },
            { date: '2023-12-03', value: 161000 },
            // Thêm dữ liệu hàng ngày ở đây
        ]);
    }, []);

    const handleStatisticOrderChange = (selectedOption) => {
        setSelectedStatisticOrder(selectedOption);
    };

    const handleStatisticRevenueChange = (selectedOption) => {
        setSelectedStatisticRevenue(selectedOption);
    };

    const handleDateOrderStartChange = (date) => {
        setDayOrder((prev) => {
            return { ...prev, startDate: date.$d };
        });
    };

    const handleDateOrderEndChange = (date) => {
        if (date.$d < dayOrder.startDate) {
            toast.error('Lỗi ngày bắt đầu lớn hơn ngày kết thúc');
        } else {
            setDayOrder((prev) => {
                return { ...prev, endDate: date.$d };
            });
        }
    };

    const handleDateRevenueStartChange = (date) => {
        setDayRevenue((prev) => {
            return { ...prev, startDate: date.$d };
        });
    };

    const handleDateRevenueEndChange = (date) => {
        if (date.$d < dayRevenue.startDate) {
            toast.error('Lỗi ngày bắt đầu lớn hơn ngày kết thúc');
        } else {
            setDayRevenue((prev) => {
                return { ...prev, endDate: date.$d };
            });
        }
    };

    const handleDateChange = (date) => {
        console.log(date);
        console.log(date.$D, date.$M + 1, date.$y);
        const ngayDate = dayjs(`${date.$y}-${date.$M + 1}-${date.$D}`).toDate();
        console.log(date.$d);
        // setDay(date);
    };

    const weeklyData = (data) => {
        return data.reduce((result, item) => {
            const weekNumber = getWeekNumber(new Date(item.date));
            if (!result[weekNumber]) {
                result[weekNumber] = { week: `Tuần ${weekNumber}`, value: 0 };
            }
            result[weekNumber].value += item.value;
            return result;
        }, {});
    };

    const monthlyData = (data) => {
        return data.reduce((result, item) => {
            const month = item.date.substring(0, 7);
            if (!result[month]) {
                result[month] = { month, value: 0 };
            }
            result[month].value += item.value;
            return result;
        }, {});
    };

    function getWeekNumber(date) {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startDate) / 86400000);
        return Math.ceil((days + startDate.getDay() + 1) / 7);
    }

    const handleCreateReport = () => {
        console.log('create report');
    };

    return (
        <>
            <div className={cx('wrap')}>
                <div className={cx('header')}>
                    
                </div>
                <div className={cx('content')}>
                    <div className={cx('contentTitle')}>Thống kê đơn hàng</div>
                    <div className={cx('contentHeader')}>
                        <div className={cx('optionsStatistic')}>
                            <span>Chọn loại thống kê</span>
                            <div className={cx('innerOptionsStatistic')}>
                                <Select
                                    value={selectedStatisticOrder}
                                    onChange={handleStatisticOrderChange}
                                    options={optionsStatisticsOrder}
                                    styles={customStyles}
                                    placeholder="Chọn nhóm bán hàng"
                                />
                            </div>
                        </div>
                        <div className={cx('dateStatistic')}>
                            <div className={cx('wrapDatePicker')}>
                                <span>Từ ngày</span>
                                <div style={{ width: '230px' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            defaultValue={dayjs().add(0, 'day')}
                                            onChange={handleDateOrderStartChange}
                                            disableFuture
                                            views={['day', 'month', 'year']}
                                            format="DD/MM/YYYY"
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <span className={cx('lineTo')}></span>
                            <div className={cx('wrapDatePicker')}>
                                <span>Tới ngày</span>
                                <div style={{ width: '230px' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            defaultValue={dayjs().add(0, 'day')}
                                            onChange={handleDateOrderEndChange}
                                            disableFuture
                                            views={['day', 'month', 'year']}
                                            format="DD/MM/YYYY"
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('contentBody')}>
                        <div className={cx('contentBodyTitle')}>
                            <span>
                                Thống kê số lượng đơn hàng theo{' '}
                                {selectedStatisticOrder.value === 'day' && <span>ngày</span>}
                                {selectedStatisticOrder.value === 'week' && <span>tuần</span>}
                                {selectedStatisticOrder.value === 'month' && <span>tháng</span>}
                            </span>
                        </div>
                        <div className={cx('contentBodyCharts')}>
                            {selectedStatisticOrder.value === 'day' && (
                                <DailySalesChart data={dataOrder} nameChart="đơn" />
                            )}
                            {selectedStatisticOrder.value === 'week' && (
                                <WeeklySalesChart data={Object.values(weeklyData(dataOrder))} nameChart="đơn" />
                            )}
                            {selectedStatisticOrder.value === 'month' && (
                                <MonthlySalesChart data={Object.values(monthlyData(dataOrder))} nameChart="đơn" />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('wrap')}>
                <div className={cx('content')}>
                    <div className={cx('contentTitle')}>Thống kê doanh thu</div>
                    <div className={cx('contentHeader')}>
                        <div className={cx('optionsStatistic')}>
                            <span>Chọn loại thống kê</span>
                            <div className={cx('innerOptionsStatistic')}>
                                <Select
                                    value={selectedStatisticRevenue}
                                    onChange={handleStatisticRevenueChange}
                                    options={optionsStatisticsRevenue}
                                    styles={customStyles}
                                    placeholder="Chọn nhóm bán hàng"
                                />
                            </div>
                        </div>
                        <div className={cx('dateStatistic')}>
                            <div className={cx('wrapDatePicker')}>
                                <span>Từ ngày</span>
                                <div style={{ width: '230px' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            defaultValue={dayjs().add(0, 'day')}
                                            onChange={handleDateRevenueStartChange}
                                            disableFuture
                                            views={['day', 'month', 'year']}
                                            format="DD/MM/YYYY"
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <span className={cx('lineTo')}></span>
                            <div className={cx('wrapDatePicker')}>
                                <span>Tới ngày</span>
                                <div style={{ width: '230px' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            defaultValue={dayjs().add(0, 'day')}
                                            onChange={handleDateRevenueEndChange}
                                            disableFuture
                                            views={['day', 'month', 'year']}
                                            format="DD/MM/YYYY"
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('contentBody')}>
                        <div className={cx('contentBodyTitle')}>
                            <span>
                                Thống kê doanh thu theo {selectedStatisticRevenue.value === 'day' && <span>ngày</span>}
                                {selectedStatisticRevenue.value === 'week' && <span>tuần</span>}
                                {selectedStatisticRevenue.value === 'month' && <span>tháng</span>}
                            </span>
                        </div>
                        <div className={cx('contentBodyCharts')}>
                            {selectedStatisticRevenue.value === 'day' && (
                                <DailySalesChart data={dataRevenue} nameChart="doanh thu" />
                            )}
                            {selectedStatisticRevenue.value === 'week' && (
                                <WeeklySalesChart data={Object.values(weeklyData(dataRevenue))} nameChart="doanh thu" />
                            )}
                            {selectedStatisticRevenue.value === 'month' && (
                                <MonthlySalesChart
                                    data={Object.values(monthlyData(dataRevenue))}
                                    nameChart="doanh thu"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Statistics;
