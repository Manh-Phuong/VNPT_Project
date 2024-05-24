import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';

import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom/dist';
import { useNavigate } from 'react-router-dom';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Flex, Radio } from 'antd';

const cx = classNames.bind(styles);

// const defaultTheme = createTheme();

export default function Checkout() {
    const navigate = useNavigate();
    const [itemCart, setItemCart] = useState([
        {
            id: '1',
            author: 'MP',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljcicm4b30ng0f',
            product_name:
                'Áo khoác hoodie nam zip form rộng, áo khoác ngoài nam có mũ 2 lớp kiểu dáng Basic thời trang Unisex Hàn Quốc trẻ trung',
            attribute: ['Đen', 'XL'],
            price: '189000',
            quantity: 5,
        },
        {
            id: '2',
            author: 'MEN Lì Fashion',
            image: 'https://down-vn.img.susercontent.com/file/85762a251058b200e9e95cbb998c17df',
            product_name: 'Áo Thun Unisex Nam Nữ Form Rộng Tay Lỡ BUNNY WIOOPS THỎ TAI DÀI UIzzang AT76',
            attribute: ['Đen', 'XL'],
            price: '39000',
            quantity: 9,
        },
    ]);
    const [customer, setCustomer] = useState({
        name: 'Nguyễn Mạnh Phương',
        address: 'Nhà Văn Hóa, Thôn Cự Dũng, Xã Tân Quang, Huyện Văn Lâm, Hưng Yên',
        phone: '0123456789',
    });
    const [paymentMethod, setPaymentMethod] = useState('cash');

    return (
        <div className={cx('wrap')}>
            <div className={cx('wrap-item')}>
                <div className={cx('delivery-wrap')}>
                    <div className={cx('delivery-address')}>Địa Chỉ Nhận Hàng</div>
                    <div className={cx('delivery-info')}>
                        <div
                            style={{
                                fontWeight: '600',
                            }}
                        >
                            {customer?.name} {customer?.phone}
                        </div>
                        <div>{customer?.address}</div>
                    </div>
                </div>
                <div className={cx('div')}></div>

                <div className={cx('label')}>
                    <div className={cx('label-product')}>Sản phẩm</div>
                    <div className={cx('label-parameter')}>
                        <div className={cx('label-price')}>Đơn giá</div>
                        <div className={cx('label-quantity')}>Số lượng</div>
                        <div className={cx('label-price-final')}>Thành tiền</div>
                    </div>
                </div>

                {itemCart?.map((item, index) => {
                    return (
                        <>
                            <div key={item?.id} className={cx('item')}>
                                <div className={cx('item-header')}>
                                    <div className={cx('author')}>Người bán: {item.author}</div>
                                </div>
                                <div className={cx('item-content')}>
                                    <img className={cx('item-image')} src={item?.image}></img>
                                    <div className={cx('item-name')}>{item?.product_name}</div>
                                    <div className={cx('item-parameter')}>
                                        <div className={cx('attribute')}>
                                            Phân loại hàng
                                            <div className={cx('attribute-detail')}>
                                                {item?.attribute?.map((attr) => {
                                                    return (
                                                        <>
                                                            <p>{attr}</p>
                                                        </>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className={cx('price')}>{item?.price}</div>
                                        <div className={cx('quantity')}>{item?.quantity}</div>
                                        <div className={cx('price-total')}>{item?.price * item?.quantity}</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}
                <div className={cx('message')}>
                    <div className={cx('message-label')}>Lời nhắn</div>
                    <textarea
                        className={cx('message-content')}
                        // value={description}
                        // onChange={(e) => setDescription(e.target.value)}
                        placeholder="Lời nhắn cho người bán"
                    />
                </div>
                <div className={cx('div')}></div>
                <div>
                    <div className={cx('payment-method')}>
                        <div>Phương thức thanh toán</div>
                        <Radio.Group defaultValue="cash" buttonStyle="solid">
                            <Radio.Button value="cash">Tiền mặt</Radio.Button>
                            <Radio.Button value="vnpay">VNPay</Radio.Button>
                            <Radio.Button value="momo">MOMO</Radio.Button>
                            <Radio.Button value="credit">Thẻ tín dụng</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div
                        style={{
                            borderBottom: '1px solid #ccc',
                        }}
                    >
                        {paymentMethod == 'cash' && (
                            <div className={cx('cash')}>
                                <div className={cx('cash-wrap')}>
                                    <div className={cx('cash-item')}>
                                        <div className={cx('cash-item-title')}>Tổng tiền hàng</div>
                                        <div className={cx('cash-item-value')}>595000</div>
                                    </div>
                                    <div className={cx('cash-item')}>
                                        <div className={cx('cash-item-title')}>Phí vận chuyển</div>
                                        <div className={cx('cash-item-value')}>595000</div>
                                    </div>
                                    <div className={cx('cash-item')}>
                                        <div className={cx('cash-item-title')}>Tổng cộng Voucher giảm giá</div>
                                        <div className={cx('cash-item-value')}>595000</div>
                                    </div>
                                    <div className={cx('cash-item')}>
                                        <div className={cx('cash-item-title')}>Tổng thanh toán</div>
                                        <div
                                            className={cx('cash-item-value')}
                                            style={{
                                                fontSize: '26px',
                                                color: 'var(--primary)',
                                            }}
                                        >
                                            595000
                                        </div>
                                    </div>
                                    <Button
                                        // onClick={handleConfirmBuyNow}
                                        variant="contained"
                                        style={{
                                            backgroundColor: '#f44336',
                                            color: 'white',
                                            borderColor: '#f44336',
                                            margin: '16px 0px',
                                            float: 'right',
                                            padding: '8px 36px',
                                        }}
                                    >
                                        đặt hàng
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={cx('div')} style={{ height: '60px' }}></div>
                </div>
            </div>
        </div>
    );
}
