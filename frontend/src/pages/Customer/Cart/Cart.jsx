import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

import { useCallback, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom/dist';
import { useNavigate } from 'react-router-dom';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { setStoreListItem, setStoreCartSize } from '../../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import * as CartServices from '../../../services/cartService';
import numeral from 'numeral';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

// const defaultTheme = createTheme();

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const itemCart = useSelector((state) => state.cart.listItem);
    const [isDelete, setIsDelete] = useState(0);
    const cartSize = useSelector((state) => state.cart.cartSize);
    // const [itemCart, setItemCart] = useState([
    //     {
    //         id: '1',
    //         author: 'MP',
    //         image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljcicm4b30ng0f',
    //         product_name:
    //             'Áo khoác hoodie nam zip form rộng, áo khoác ngoài nam có mũ 2 lớp kiểu dáng Basic thời trang Unisex Hàn Quốc trẻ trung',
    //         attribute: ['Đen', 'XL'],
    //         price: '189000',
    //         quantity: 5,
    //     },
    //     {
    //         id: '2',
    //         author: 'MEN Lì Fashion',
    //         image: 'https://down-vn.img.susercontent.com/file/85762a251058b200e9e95cbb998c17df',
    //         product_name: 'Áo Thun Unisex Nam Nữ Form Rộng Tay Lỡ BUNNY WIOOPS THỎ TAI DÀI UIzzang AT76',
    //         attribute: ['Đen', 'XL'],
    //         price: '39000',
    //         quantity: 9,
    //     },
    // ]);

    const handleDeleteItemInCart = async (id) => {
        // setIsDelete((prev) => prev + 1);
        const result = await CartServices.deleteItemInCart(id, token);
        if (result?.responseCode == 200) {
            toast.success('Xóa thành công sản phẩm khỏi giở hàng');
            fetchApi();
            dispatch(setStoreCartSize(cartSize - 1));
        } else {
            toast.error('Xóa không thành công');
        }
    };

    const fetchApi = async () => {
        try {
            const result = await CartServices.getItemInCart(token);
            console.log('list cart', result?.data);
            dispatch(
                setStoreListItem(
                    result?.data?.map((item) => {
                        return {
                            id: item?.id,
                            userId: item?.userId,
                            image: item?.imageBase,
                            product_name: item?.name,
                            price: item?.priceBase,
                            product_id: item?.baseProductId,
                            author: item?.userName,
                        };
                    }),
                ),
            );
            // setVariants(result?.data?.variants);
        } catch (error) {
            console.log('fetchApi CartServices Cart.js' + error);
        }
    };

    useEffect(() => {
        fetchApi();
    }, [token]);

    const handleDetailPost = (item) => {
        var post = {
            id: item?.product_id,
            title: item?.product_name,
            author_id: item?.userId,
            image: item?.image,
        };
        navigate(`/${item?.userId}/posts/${item?.product_id}`, { state: { post } });
    };

    const handleConfirmBuyNow = () => {
        navigate('/checkout');
    };

    return (
        <>
            <div className={cx('wrap')}>
                <div className={cx('wrap-item')}>
                    {itemCart?.map((item, index) => {
                        return (
                            <>
                                <div key={item?.id} className={cx('item')}>
                                    <div className={cx('item-header')}>
                                        <div className={cx('author')}>Người bán: {item.author}</div>
                                        <div className={cx('item-header-button')}>
                                            <Button
                                                // onClick={handleConfirmBuyNow}
                                                variant="contained"
                                                onClick={() => handleDeleteItemInCart(item?.id)}
                                                style={{
                                                    backgroundColor: 'white',
                                                    color: 'red',
                                                    borderColor: '#f44336',
                                                    margin: '16px 8px',
                                                }}
                                            >
                                                xóa
                                            </Button>
                                            <Button
                                                onClick={() => handleDetailPost(item)}
                                                variant="contained"
                                                style={{
                                                    backgroundColor: '#f44336',
                                                    color: 'white',
                                                    borderColor: '#f44336',
                                                    margin: '16px 8px',
                                                }}
                                            >
                                                đi mua
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={cx('item-content')}>
                                        <img className={cx('item-image')} src={item?.image}></img>
                                        <div className={cx('item-name')}>{item?.product_name}</div>
                                        <div className={cx('item-parameter')}>
                                            <div className={cx('attribute')}>
                                                {/* Phân loại hàng */}
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
                                            <div className={cx('price')}>{numeral(item?.price).format('0,0')} vnđ</div>
                                            {/* <div className={cx('quantity')}> */}
                                            {/* <div className={cx('quantity-purchased-parameter')}>
                                                    <div className={cx('quantity-purchased-wrap-btn')}>
                                                        <RemoveIcon
                                                            className={cx('quantity-purchased-btn')}
                                                            // onClick={decreaseQuantity}
                                                            onClick={() => {item?.quantity - 1}}
                                                        />
                                                        <input
                                                            value={item?.quantity}
                                                            // onChange={(e) => handleChangeQuantity(e)}
                                                        ></input>
                                                        <AddIcon
                                                            className={cx('quantity-purchased-btn')}
                                                            // onClick={increaseQuantity}
                                                            onClick={() => {item?.quantity + 1}}
                                                        />
                                                    </div>
                                                </div> */}
                                            {/* {item?.quantity}
                                            </div> */}
                                            {/* <div className={cx('price-total')}>{item?.price * item?.quantity}</div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('item-div')}></div>
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
