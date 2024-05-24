import classNames from 'classnames/bind';
// import styles from './Sidebar.module.scss';
import styles from './SideBar.module.scss';

import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PaymentIcon from '@mui/icons-material/Payment';
import { HomeIcon, OrderIcon, ProductIcon, ClientIcon, StatsIcon, SalesCounterIcon } from '../../../components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import routes from '../../../config/routes';

const cx = classNames.bind(styles);

function Sidebar({ setToggleButton }) {
    const { handleLoggedOut, user } = useContext(AuthContext);
    const roles = user.roles?.map((item) => item.name);
    const [details, setDetails] = useState({
        showDetailOrder: false,
        showDetailProduct: false,
        showDetailClient: false,
        showDetailCustomerCare: false,
        showDetailWarehouse: false,
        showDetailStats: false,
        showDetailManage: false,
    });

    const [active, setActive] = useState({
        home: true,
        listOrder: false,
        returnOrder: false,
        listProduct: false,
        listProvider: false,
        listCustomer: false,
        listResponse: false,
        importWarehouse: false,
        statisticSale: false,
        manageStaff: false,
        paymentSetting: false,
    });
    const [toggle, setToggle] = useState({
        action: false,
        value: 0,
    });

    const handleShowDetail = (detailName) => {
        setDetails((prevState) => ({
            showDetailOrder: false,
            showDetailProduct: false,
            showDetailClient: false,
            showDetailCustomerCare: false,
            showDetailWarehouse: false,
            showDetailStats: false,
            showDetailManage: false,
            manageStaff: false,
            paymentSetting: false,
            [detailName]: !prevState[detailName],
        }));
    };

    const handleActive = (detailName) => {
        setActive((prevState) => ({
            home: false,
            listOrder: false,
            returnOrder: false,
            listProduct: false,
            listProvider: false,
            listCustomer: false,
            listResponse: false,
            importWarehouse: false,
            statisticSale: false,
            manageStaff: false,
            [detailName]: true,
        }));
    };

    const handleToggle = () => {
        if (toggle.action) {
            setToggle({
                action: false,
                value: 0,
                display: 'block',
            });
            console.log(setToggleButton());

            setToggleButton({
                action: false,
                value: 0,
            });
        } else {
            setToggle({
                action: true,
                value: 178,
                display: 'none',
            });
            console.log(setToggleButton());
            setToggleButton({
                action: true,
                value: 178,
            });
        }
    };

    return (
        <div className={cx('wrapper')} style={{ width: `calc(230px - ${toggle.value}px)` }}>
            <nav>
                <div className={cx('menuTopHeader')}>
                    <div className={cx('menuTopLogo')}>
                        {!toggle.action && (
                            <Link to="/selling">
                                <img
                                    src="https://res.cloudinary.com/manhphuong/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1701768561/nmp-logo_chokue.jpg?_s=public-apps"
                                    className={cx('logo')}
                                    alt="logo"
                                ></img>
                            </Link>
                        )}
                        <button className={cx('buttonArrowLeft')} onClick={handleToggle}>
                            {toggle.action ? (
                                <FontAwesomeIcon className={cx('iconArrowLeft')} icon={faAngleRight} />
                            ) : (
                                <FontAwesomeIcon className={cx('iconArrowLeft')} icon={faAngleLeft} />
                            )}
                        </button>
                    </div>
                </div>
                <hr className={cx('menuDivider')}></hr>

                <div className={cx('menuInnerWrapper')}>
                    <div className={cx('menuPrimaryInner')}>
                        <nav className={cx('menuList')}>
                            <Link
                                to="/selling"
                                className={cx('homeMenuItem', 'itemNav', { active: active.home })}
                                onClick={() => handleActive('home')}
                            >
                                <div className={cx('wrapIconItem')}>
                                    <HomeIcon />
                                </div>
                                {!toggle.action && (
                                    <div className={cx('menuItemTitle')}>
                                        <span>Tổng quan</span>
                                    </div>
                                )}
                            </Link>

                            <Link
                                to="/sell_order"
                                className={cx('homeMenuItem', 'itemNav', { active: active.listOrder })}
                                onClick={() => handleActive('listOrder')}
                            >
                                <div className={cx('wrapIconItem')}>
                                    <OrderIcon />
                                </div>
                                {!toggle.action && (
                                    <div className={cx('menuItemTitle')}>
                                        <span>Quản lý đơn hàng</span>
                                    </div>
                                )}
                            </Link>

                            <Link
                                to="/sell_product"
                                className={cx('homeMenuItem', 'itemNav', { active: active.listProduct })}
                                onClick={() => handleActive('listProduct')}
                            >
                                <div className={cx('wrapIconItem')}>
                                    <ProductIcon />
                                </div>
                                {!toggle.action && (
                                    <div className={cx('menuItemTitle')}>
                                        <span>Quản lý sản phẩm</span>
                                    </div>
                                )}
                            </Link>

                            <Link
                                to="/sell_ship"
                                className={cx('homeMenuItem', 'itemNav', { active: active.manageStaff })}
                                onClick={() => handleActive('manageStaff')}
                            >
                                <div className={cx('wrapIconItem')}>
                                    <FontAwesomeIcon icon={faTruckFast} size="lg" />
                                </div>
                                {!toggle.action && (
                                    <div className={cx('menuItemTitle')}>
                                        <span>Quản lý vận chuyển</span>
                                    </div>
                                )}
                            </Link>

                            <Link
                                to="/sell_payment"
                                className={cx('homeMenuItem', 'itemNav', { active: active.paymentSetting })}
                                onClick={() => handleActive('paymentSetting')}
                            >
                                <div className={cx('wrapIconItem')}>
                                    <PaymentIcon />
                                </div>
                                {!toggle.action && (
                                    <div className={cx('menuItemTitle')}>
                                        <span>Quản lý thanh toán</span>
                                    </div>
                                )}
                            </Link>

                            <>
                                {/* Thống kê */}
                                <div
                                    className={cx('homeMenuItem', 'itemNav', { active: active.statisticSale })}
                                    onClick={() => handleShowDetail('showDetailStats')}
                                >
                                    <div className={cx('wrapIconItem')}>
                                        <StatsIcon />
                                    </div>
                                    {!toggle.action && (
                                        <>
                                            <div className={cx('menuItemTitle')}>
                                                <span>Thống kê</span>
                                            </div>
                                            <div>
                                                <FontAwesomeIcon
                                                    className={cx('iconArrowRight', {
                                                        activeIcon: details.showDetailStats,
                                                    })}
                                                    icon={faAngleRight}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                                {/* Chi tiết trong thống kê */}
                                {!toggle.action && (
                                    <div
                                        className={cx('wrapCollapseItem', {
                                            showCollapseItem: details.showDetailStats,
                                        })}
                                    >
                                        <Link
                                            to={
                                                roles?.some(
                                                    (permission) => permission === 'ADMIN' || permission === 'SALE',
                                                )
                                                    ? '/statistics_sales'
                                                    : '/403'
                                            }
                                            className={cx('homeMenuItem', 'itemNav', 'innerWrapCollapseItem')}
                                            onClick={() => handleActive('statisticSale')}
                                        >
                                            <div className={cx('menuItemTitle')}>
                                                <span>Thống kê bán hàng</span>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </>

                            {/* <hr className={cx('menuDivider')}></hr> */}

                            {/* <Link to="/login" className={cx('homeMenuItem', 'itemNav')} onClick={handleLoggedOut}>
                                <div className={cx('wrapIconItem')}>
                                    <LogoutIcon />
                                </div>
                                {!toggle.action && (
                                    <div className={cx('menuItemTitle')}>
                                        <span>Đăng xuất</span>
                                    </div>
                                )}
                            </Link> */}
                        </nav>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;
