import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faChevronLeft, faChevronRight, faEllipsis, faHomeUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RecommendIcon from '@mui/icons-material/Recommend';
import SendIcon from '@mui/icons-material/Send';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import * as ProductServices from '../../../services/productService';
import * as CartServices from '../../../services/cartService';
import * as UserServices from '../../../services/userService';
import { Badge } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import numeral from 'numeral';

import { useAuth } from '../../../contexts/AuthContext';
import TruncateComponent from '../../../components/Truncate/TruncateComponent';
import _ from 'lodash';
import { setStoreListItem, setStoreCartSize } from '../../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import {
    setOpenPopper,
    setOpenDetailMessage,
    setAddMessage,
    setDetailIdTexting,
} from '../../../redux/slices/messageSlice';

const cx = classNames.bind(styles);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '66%',
    height: '80%',
    borderRadius: '6px',
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
};

function Post() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { post } = location.state || {};
    const { user, login } = useAuth();
    const token = useSelector((state) => state.auth.token);

    const imageContainerRef = useRef();
    const [detailPost, setDetailPost] = useState({});
    const [imagePrimary, setImagePrimary] = useState(post?.image);
    const [imageDemo, setImageDemo] = useState([]);
    const [variants, setVariants] = useState([]);
    const [edit, setEdit] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [favorite, setFavorite] = useState(post.favorite);
    const [feedback, setFeedback] = useState(true);
    const [commentText, setCommentText] = useState('');
    const [repondText, setRepondText] = useState('');
    const [openBuyNow, setOpenBuyNow] = useState(false);
    const [selectVariant, setSelectVariant] = useState({});
    const [orderSelect, setOrderSelect] = useState([]);
    const itemCart = useSelector((state) => state.cart.listItem);
    const cartSize = useSelector((state) => state.cart.cartSize);
    const [owner, setOwner] = useState({});

    // const userId = useSelector((state) => state.message.userId);
    // console.log("userId: ================== post", userId)

    const listComment2 = [
        {
            id: 1,
            author_id: 'manhphuong123',
            author_name: 'Mạnh Phương',
            author_tick: true,
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content:
                'Sản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh em',
            is_like: true,
            number_like: 19,
            create_at: '01/08/2023',
            create_update: '',
        },
        {
            id: 2,
            author_id: 'manhphuong698',
            author_name: 'Mạnh Phương',
            author_tick: true,
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content:
                'Sản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh emSản phẩm này như nào thế anh em',
            is_like: false,
            number_like: 19,
            create_at: '01/08/2023',
            create_update: '01/09/2023',
        },
        {
            id: 3,
            author_id: 'manhphuong123',
            author_name: 'Mạnh Phương',
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content: 'Sản phẩm này như nào thế anh em',
            is_like: false,
            number_like: 0,
            create_at: '01/08/2023',
            create_update: '01/09/2023',
        },
        {
            id: 4,
            author_id: 'manhphuong123686',
            author_name: 'Mạnh Phương',
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content: 'Sản phẩm này như nào thế anh em',
            is_like: false,
            number_like: 0,
            create_at: '01/08/2023',
            create_update: '01/09/2023',
        },
        {
            id: 5,
            author_id: 'manhphuong123696',
            author_name: 'Mạnh Phương',
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content: 'Sản phẩm này như nào thế anh em',
            is_like: false,
            number_like: 0,
            create_at: '01/08/2023',
            create_update: '01/09/2023',
        },
        {
            id: 6,
            author_id: 'manhphuong123996',
            author_name: 'Mạnh Phương',
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content: 'Sản phẩm này như nào thế anh em',
            is_like: false,
            number_like: 0,
            create_at: '01/08/2023',
            create_update: '01/09/2023',
        },
        {
            id: 7,
            author_id: 'manhphuong123696',
            author_name: 'Mạnh Phương',
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content: 'Sản phẩm này như nào thế anh em',
            is_like: false,
            number_like: 0,
            create_at: '01/08/2023',
            create_update: '01/09/2023',
        },
        {
            id: 8,
            author_id: 'manhphuong123996',
            author_name: 'Mạnh Phương',
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content: 'Sản phẩm này như nào thế anh em',
            is_like: false,
            number_like: 0,
            create_at: '01/08/2023',
            create_update: '01/09/2023',
        },
        {
            id: 9,
            author_id: 'manhphuong123696',
            author_name: 'Mạnh Phương',
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content: 'Sản phẩm này như nào thế anh em',
            is_like: false,
            number_like: 0,
            create_at: '01/08/2023',
            create_update: '01/09/2023',
        },
        {
            id: 10,
            author_id: 'manhphuong123996',
            author_name: 'Mạnh Phương',
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content: 'Sản phẩm này như nào thế anh em',
            is_like: false,
            number_like: 0,
            create_at: '01/08/2023',
            create_update: '01/09/2023',
        },
    ];

    const listRespond2 = [
        {
            id: 1,
            author_id: 'manhphuong12666',
            author_name: 'Mạnh Phương',
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content: 'Sản phẩm tốt',
            is_like: false,
            number_like: 0,
            create_at: '01/09/2023',
        },
        {
            id: 2,
            author_id: 'manhphuong1266',
            author_name: 'Mạnh Phương',
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content: 'Sản phẩm tốt',
            is_like: false,
            number_like: 0,
            create_at: '01/09/2023',
        },
        {
            id: 3,
            author_id: 'manhphuong126',
            author_name: 'Mạnh Phương',
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content: 'Sản phẩm tốt',
            is_like: false,
            number_like: 0,
            create_at: '01/09/2023',
        },
        {
            id: 4,
            author_id: 'manhphuong128',
            author_name: 'Mạnh Phương',
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content: 'Sản phẩm tốt',
            is_like: false,
            number_like: 0,
            create_at: '01/09/2023',
        },
        {
            id: 5,
            author_id: 'manhphuong129',
            author_name: 'Mạnh Phương',
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content: 'Sản phẩm tốt',
            is_like: false,
            number_like: 0,
            create_at: '01/09/2023',
        },
        {
            id: 6,
            author_id: 'manhphuong1299',
            author_name: 'Mạnh Phương',
            avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            content: 'Sản phẩm tốt',
            is_like: false,
            number_like: 0,
            create_at: '01/09/2023',
        },
    ];

    const [listComment, setListComment] = useState(listComment2);
    const [listRespond, setListRespond] = useState(listRespond2);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await ProductServices.getProductDetail(post?.id, token);
                const resultOwner = await UserServices.getUserById(result?.data?.userId, token);
                console.log('ProductServices.getProductDetail', result?.data);
                setDetailPost(result?.data);
                console.log('owner========', resultOwner?.data);
                setOwner(resultOwner?.data);
                setImagePrimary(result?.data?.imageBase);
                // var listImage = result?.data?.variants?.map(variant => variant.image) || [];
                var listImage = [
                    'https://down-vn.img.susercontent.com/file/sg-11134201-7rbnd-lp977epz641qd5',
                    'https://down-vn.img.susercontent.com/file/sg-11134201-7rbn2-lp977eb9q8lqcc',
                    'https://down-vn.img.susercontent.com/file/sg-11134201-7rble-lq0994mrhguc4e',
                    'https://down-vn.img.susercontent.com/file/my-11134201-7qukx-lj9l7cxtxvtv5b',
                    'https://down-vn.img.susercontent.com/file/my-11134201-7qul4-lj9l7e5o5qar1e',
                    'https://down-vn.img.susercontent.com/file/vn-11134201-23030-vn9ubw9nm9nv4e',
                    'https://down-vn.img.susercontent.com/file/vn-11134201-23030-p9ltfx9nm9nv68',
                    'https://down-vn.img.susercontent.com/file/vn-11134201-23030-6c5mv29nm9nv3e',
                    'https://down-vn.img.susercontent.com/file/my-11134201-7qukx-lj9l7cxtxvtv5b',
                    'https://down-vn.img.susercontent.com/file/my-11134201-7qul4-lj9l7e5o5qar1e',
                    'https://down-vn.img.susercontent.com/file/vn-11134201-23030-vn9ubw9nm9nv4e',
                    'https://down-vn.img.susercontent.com/file/vn-11134201-23030-p9ltfx9nm9nv68',
                    'https://down-vn.img.susercontent.com/file/vn-11134201-23030-6c5mv29nm9nv3e',
                ];
                setImageDemo([result?.data?.imageBase, ...listImage]);

                var listTemp = [
                    {
                        barcode: '123',
                        baseId: 1,
                        createdAt: '2024-03-01T15:37:53.125+00:00',
                        discount: 0,
                        id: 1,
                        image: 'https://down-vn.img.susercontent.com/file/sg-11134201-7rbnd-lp977epz641qd5',
                        importPrice: 90000,
                        name: 'test - PB1',
                        quantity: 9,
                        retailPrice: 110000,
                        sku: '123',
                        updatedAt: '2024-03-01T15:37:53.125+00:00',
                        value1: 'XL',
                        value2: 'Xám',
                        value3: '',
                        wholeSalePrice: 109000,
                    },
                    {
                        barcode: '123',
                        baseId: 1,
                        createdAt: '2024-03-01T15:37:53.125+00:00',
                        discount: 0,
                        id: 2,
                        image: 'https://down-vn.img.susercontent.com/file/my-11134201-7qul4-lj9l7e5o5qar1e',
                        importPrice: 90000,
                        name: 'test - PB1',
                        quantity: 11,
                        retailPrice: 110000,
                        sku: '123',
                        updatedAt: '2024-03-01T15:37:53.125+00:00',
                        value1: 'L',
                        value2: '',
                        value3: '',
                        wholeSalePrice: 109000,
                    },
                    {
                        barcode: '123',
                        baseId: 1,
                        createdAt: '2024-03-01T15:37:53.125+00:00',
                        discount: 0,
                        id: 3,
                        image: 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-vn9ubw9nm9nv4e',
                        importPrice: 90000,
                        name: 'test - PB1',
                        quantity: 23,
                        retailPrice: 110000,
                        sku: '123',
                        updatedAt: '2024-03-01T15:37:53.125+00:00',
                        value1: 'M',
                        value2: '',
                        value3: '',
                        wholeSalePrice: 109000,
                    },
                    {
                        barcode: '123',
                        baseId: 1,
                        createdAt: '2024-03-01T15:37:53.125+00:00',
                        discount: 0,
                        id: 4,
                        image: 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-6c5mv29nm9nv3e',
                        importPrice: 90000,
                        name: 'test - PB1',
                        quantity: 88,
                        retailPrice: 110000,
                        sku: '123',
                        updatedAt: '2024-03-01T15:37:53.125+00:00',
                        value1: 'XLL',
                        value2: '',
                        value3: '',
                        wholeSalePrice: 109000,
                    },
                    {
                        barcode: '123',
                        baseId: 1,
                        createdAt: '2024-03-01T15:37:53.125+00:00',
                        discount: 0,
                        id: 5,
                        image: 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-p9ltfx9nm9nv68',
                        importPrice: 90000,
                        name: 'test - PB1',
                        quantity: 66,
                        retailPrice: 110000,
                        sku: '123',
                        updatedAt: '2024-03-01T15:37:53.125+00:00',
                        value1: 'XLLLL',
                        value2: '',
                        value3: '',
                        wholeSalePrice: 109000,
                    },
                    {
                        barcode: '123',
                        baseId: 1,
                        createdAt: '2024-03-01T15:37:53.125+00:00',
                        discount: 0,
                        id: 6,
                        image: 'https://down-vn.img.susercontent.com/file/sg-11134201-7rbn2-lp977eb9q8lqcc',
                        importPrice: 90000,
                        name: 'test - PB1',
                        quantity: 39,
                        retailPrice: 110000,
                        sku: '123',
                        updatedAt: '2024-03-01T15:37:53.125+00:00',
                        value1: 'G',
                        value2: '',
                        value3: '',
                        wholeSalePrice: 109000,
                    },
                ];
                setVariants(listTemp);
                // setVariants(result?.data?.variants);
            } catch (error) {
                console.log('fetchApi Home.js' + error);
            }
        };
        fetchApi();
    }, [post?.id, token]);

    // useEffect(() => {
    //     console.log(imageDemo);
    // }, [imageDemo]);

    const handleFavorite = () => {
        setFavorite((prev) => {
            post.favorite = !prev;
            return !prev;
        });
    };

    const handleChangeQuantity = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        // const newQuantity = event.target.value;
        var temp = newQuantity <= detailPost?.quantity ? newQuantity : '';

        if (newQuantity > detailPost?.quantity) {
            toast.warn(`Sản phẩm này chỉ có thể bán tối đa ${detailPost?.quantity} sản phẩm`);
        } else {
            setQuantity(temp);
            handleOrderVariant(selectVariant, temp);
        }
    };

    const handleChangeFeedback = (value) => {
        setFeedback(value);
    };

    const handleSendComment = () => {
        if (commentText.trim() == '') {
            toast.warn('Hãy nhập nội dung bình luận');
        } else {
            toast.success(`Gửi thành công bình luận: ${commentText}`);
            setCommentText('');
        }
    };

    const handleSendRepond = () => {
        if (repondText.trim() == '') {
            toast.warn('Hãy nhập nội dung phản hồi');
        } else {
            toast.success(`Gửi thành công phản hồi: ${repondText}`);
            setRepondText('');
        }
    };

    const decreaseQuantity = (index) => {
        if (quantity > 0) {
            setQuantity((prev) => prev - 1);
        } else {
            toast.warn(`Không thể chọn số lượng sản phẩm nhỏ hơn 0`);
        }
    };

    const increaseQuantity = (index) => {
        if (quantity + 1 > detailPost?.quantity) {
            toast.warn(`Sản phẩm này chỉ có thể bán tối đa ${detailPost?.quantity} sản phẩm`);
        } else {
            setQuantity((prev) => prev + 1);
        }
    };

    const handleLikeComment = (is_like, number_like, id) => {
        is_like = !is_like;
        number_like = is_like ? number_like + 1 : number_like - 1;
        const updatedComments = listComment.map((cmt) => {
            if (id === cmt.id) {
                cmt.is_like = is_like;
                cmt.number_like = number_like;
            }
            return cmt;
        });
        setListComment(updatedComments);
    };

    const handleLikeRepond = (is_like, number_like, id) => {
        is_like = !is_like;
        number_like = is_like ? number_like + 1 : number_like - 1;
        const updatedResponds = listRespond.map((res) => {
            if (id === res.id) {
                res.is_like = is_like;
                res.number_like = number_like;
            }
            return res;
        });
        setListRespond(updatedResponds);
    };

    const handleCloseBuyNow = () => {
        setOpenBuyNow(false);
    };

    const handleBuyNow = () => {
        setOpenBuyNow(true);
    };

    const handleConfirmBuyNow = () => {
        // setOpenBuyNow(true);
        navigate('/checkout');
    };

    const handleClickImageDemo = (image) => {
        setImagePrimary(image);
    };

    const scrollToRight = () => {
        imageContainerRef.current.scrollTo({
            left: imageContainerRef.current.scrollLeft + 450,
            behavior: 'smooth',
        });
    };

    const scrollToLeft = () => {
        imageContainerRef.current.scrollTo({
            left: imageContainerRef.current.scrollLeft - 450,
            behavior: 'smooth',
        });
    };

    const handleSelectVariant = (variant) => {
        const index = orderSelect.findIndex((item) => item?.id === variant?.id);
        // const updatedOrderSelect = [...orderSelect];
        // updatedOrderSelect[index] = variant;
        var quantityBuy = orderSelect[index]?.quantityBuy || 0;
        // var quantityBuy = orderSelect[orderSelect.findIndex((item) => item?.id === variant?.id)]?.quantityBuy || 0;
        setQuantity(quantityBuy);
        if (variant?.id == selectVariant?.id) {
            setSelectVariant({});
        } else {
            setSelectVariant(variant);
        }
    };

    useEffect(() => {
        console.log('hanleOrderVariant orderSelect===========', orderSelect);
    }, [orderSelect]);

    // const handleOrderVariant = (variant, quantity) => {
    //     console.log('hanleOrderVariant variant', variant)
    //     console.log('hanleOrderVariant quantity', quantity)

    //     if (_.isEmpty(variant)) {
    //         toast.warn('Vui lòng chọn phiên bản');
    //     } else {
    //         // Tìm index của variant trong mảng orderSelect
    //         const index = _.findIndex(orderSelect, { variant });
    //         if (quantity >= 0 && quantity < variant?.quantity) {
    //             setQuantity(quantity);
    //         } else if(quantity < 0) {
    //             toast.warn(`Không thể chọn số lượng sản phẩm nhỏ hơn 0`);
    //             setQuantity(0);
    //         }
    //         else if (quantity > variant?.quantity) {
    //             toast.warn(`Sản phẩm này chỉ có thể bán tối đa ${variant?.quantity} sản phẩm`);
    //             setQuantity(variant?.quantity);
    //         }

    //         if (quantity <= 0) {
    //             // Nếu quantity <= 0, xóa variant khỏi mảng
    //             if (index !== -1) {
    //                 orderSelect.splice(index, 1);
    //             }
    //         } else {
    //             // Nếu quantity > 0, cập nhật variant
    //             if (index !== -1) {
    //                 orderSelect[index] = variant;
    //             } else {
    //                 // Nếu variant không tồn tại, thêm mới vào mảng
    //                 orderSelect.push(variant);
    //             }
    //         }

    //         // Cập nhật state hoặc thực hiện các hành động khác
    //         setOrderSelect(orderSelect);
    //     }
    // };

    const handleOrderVariant = (variant, quantity) => {
        console.log('handleOrderVariant variant', variant);
        console.log('handleOrderVariant quantity', quantity);

        if (_.isEmpty(variant)) {
            toast.warn('Vui lòng chọn phiên bản');
        } else {
            const index = orderSelect.findIndex((item) => item?.id === variant.id);

            if (quantity >= 0 && quantity <= variant.quantity) {
                setQuantity(quantity);
            } else if (quantity < 0) {
                toast.warn('Không thể chọn số lượng sản phẩm nhỏ hơn 0');
                setQuantity(0);
            } else if (quantity > variant?.quantity) {
                toast.warn(`Sản phẩm này chỉ có thể bán tối đa ${variant.quantity} sản phẩm`);
                setQuantity(variant.quantity);
            }

            if (quantity <= 0) {
                // Nếu quantity <= 0, xóa variant khỏi mảng
                if (index !== -1) {
                    const updatedOrderSelect = [...orderSelect];
                    updatedOrderSelect.splice(index, 1);
                    setOrderSelect(updatedOrderSelect);
                }
            } else if (quantity < variant?.quantity) {
                // Nếu quantity > 0, cập nhật variant
                if (index !== -1) {
                    const updatedOrderSelect = [...orderSelect];
                    updatedOrderSelect[index] = { ...variant, quantityBuy: quantity };
                    setOrderSelect(updatedOrderSelect);
                } else {
                    // Nếu variant không tồn tại, thêm mới vào mảng
                    // setOrderSelect(prevOrderSelect => [...prevOrderSelect, variant]);
                    setOrderSelect([...orderSelect, { ...variant, quantityBuy: quantity }]);
                }
            } else {
                // Nếu quantity > 0, cập nhật variant
                if (index !== -1) {
                    const updatedOrderSelect = [...orderSelect];
                    updatedOrderSelect[index] = { ...variant, quantityBuy: variant?.quantity };
                    setOrderSelect(updatedOrderSelect);
                } else {
                    // Nếu variant không tồn tại, thêm mới vào mảng
                    // setOrderSelect(prevOrderSelect => [...prevOrderSelect, variant]);
                    setOrderSelect([...orderSelect, { ...variant, quantityBuy: variant?.quantity }]);
                }
            }
        }
    };

    const handleAddItemInCart = async () => {
        console.log('addItemInCart', detailPost);
        const result = await CartServices.addItemInCart(detailPost?.id, token);
        if (result?.responseCode == 200) {
            dispatch(setStoreCartSize(cartSize + 1));
            toast.success('Thêm thành công sản phẩm vào giở hàng', {
                autoClose: 1500,
            });
        } else if (result?.statusCode == 400 && result?.message == 'baseProductId is exist') {
            toast.warn('Sản phẩm đã có trong giỏ hàng', {
                autoClose: 1500,
            });
        } else {
            toast.error('Thêm không thành công', {
                autoClose: 1000,
            });

            // dispatch(
            //     setStoreListItem([
            //         ...itemCart,
            //         {
            //             id: detailPost?.id,
            //             userId: detailPost?.userId,
            //             image: detailPost?.imageBase,
            //             product_name: detailPost?.name,
            //             price: detailPost?.priceBase,
            //             product_id: detailPost?.baseProductId,
            //             author: detailPost?.userName,
            //         },
            //     ]),
            // );
        }
    };

    const handleMessage = () => {
        dispatch(setOpenDetailMessage(true));
        dispatch(
            setDetailIdTexting({
                userId: owner.id,
                image:
                    owner?.imageAvatar ||
                    'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
                author_name: owner?.userName,
            }),
        );
    };

    return (
        <div className={cx('wrap')}>
            <div className={cx('content')}>
                <div className={cx('image-description')}>
                    <div className={cx('image-main')}>
                        <img src={imagePrimary}></img>
                    </div>

                    <div className={cx('wrap-list-image')}>
                        <FontAwesomeIcon
                            className={cx('icon-button-left')}
                            icon={faChevronLeft}
                            onClick={scrollToLeft}
                        />
                        <div className={cx('list-image')} ref={imageContainerRef}>
                            {imageDemo?.map((image, index) => (
                                <div
                                    className={cx('wrap-image')}
                                    key={index}
                                    onClick={() => handleClickImageDemo(image)}
                                >
                                    <img src={image}></img>
                                </div>
                            ))}
                        </div>
                        <FontAwesomeIcon
                            className={cx('icon-button-right')}
                            icon={faChevronRight}
                            onClick={scrollToRight}
                        />
                    </div>
                </div>
                <div className={cx('description')}>
                    <div className={cx('header-description')}>
                        <div className={cx('title')}>{post.title}</div>
                        <div className={cx('parameter')}>
                            <div className={cx('rating')}>
                                {post.ratting}
                                <StarIcon sx={{ fontSize: '20px' }} />
                            </div>
                            <div className={cx('evaluate')}>
                                <strong>2,2k</strong> đánh giá
                            </div>
                            <div className={cx('sold')}>
                                <strong>6,9k</strong> đã bán
                            </div>
                            <div className={cx('favorite')} onClick={handleFavorite}>
                                <strong>1,6k</strong> đã thích
                                {favorite ? (
                                    <FavoriteIcon className={cx('favorite-icon')} />
                                ) : (
                                    <FavoriteBorderIcon className={cx('favorite-icon')} />
                                )}
                            </div>
                        </div>
                        <div className={cx('product-description')}>{detailPost?.descriptionProduct}</div>
                        <div className={cx('quantity-purchased')}>
                            <span>Số lượng</span>
                            <div className={cx('quantity-purchased-parameter')}>
                                {/* <div className={cx('quantity-purchased-wrap-btn')}>
                                    <RemoveIcon className={cx('quantity-purchased-btn')} onClick={decreaseQuantity} />
                                    <input value={quantity} onChange={(e) => handleChangeQuantity(e)}></input>
                                    <AddIcon className={cx('quantity-purchased-btn')} onClick={increaseQuantity} />
                                </div> */}
                                <span>
                                    <strong>{detailPost?.quantity}</strong> sản phẩm có sẵn
                                </span>
                            </div>
                        </div>
                        <div className={cx('button-buy')}>
                            <Button
                                variant="outlined"
                                startIcon={<AddShoppingCartIcon />}
                                onClick={handleAddItemInCart}
                                style={{
                                    backgroundColor: 'rgba(220, 210, 209, 0.4)',
                                    color: '#f44336',
                                    borderColor: '#f44336',
                                }}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                            <Button
                                onClick={handleBuyNow}
                                variant="contained"
                                style={{
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    borderColor: '#f44336',
                                }}
                            >
                                mua ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <hr className={cx('divided')}></hr>

            <div className={cx('shop')}>
                <div className={cx('shop-left')}>
                    <img src="https://down-vn.img.susercontent.com/file/cn-11134207-7r98o-lob20do0cdzb04"></img>
                    <div>
                        <div className={cx('shop-name')}>{owner?.userName}</div>
                        <div className={cx('shop-btn')}>
                            <div onClick={handleMessage}>
                                {' '}
                                <FontAwesomeIcon className={cx('icon-btn')} icon={faFacebookMessenger} />
                                Nhắn tin
                            </div>
                            <div>
                                <FontAwesomeIcon className={cx('icon-btn')} icon={faHomeUser} />
                                Xem shop
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('shop-right')}>
                    <div>
                        <div className={cx('shop-right-item')}>
                            <div>Sản phẩm: </div>
                            <div>825</div>
                        </div>
                        <div className={cx('shop-right-item')}>
                            <div>Đang theo dõi: </div>
                            <div>825</div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('shop-right-item')}>
                            <div>Người theo dõi: </div>
                            <div>825</div>
                        </div>
                        <div className={cx('shop-right-item')}>
                            <div>Đánh giá: </div>
                            <div>825</div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className={cx('divided')}></hr>

            <div className={cx('feedback')}>
                <div className={cx('feedback-header')}>
                    <div className={cx('comment-button')} onClick={() => handleChangeFeedback(true)}>
                        Bình luận
                    </div>
                    <div className={cx('response-button')} onClick={() => handleChangeFeedback(false)}>
                        Phản hồi
                    </div>
                    <div className={cx('bar', { 'bar-right': !feedback })}></div>
                </div>
                <div className={cx('feedback-content')}>
                    {feedback
                        ? listComment.map((comment) => {
                              return (
                                  <div key={comment.id} className={cx('wrap-item')}>
                                      <div className={cx('header-item')}>
                                          <div className={cx('avatar-item')}>
                                              <img src={comment.avatar}></img>
                                          </div>
                                          <div className={cx('wrap-content-item')}>
                                              <Link
                                                  //   to={`http://localhost:3000/${comment.author_id}`}
                                                  to={`/${comment.author_id}`}
                                                  className={cx('owner-item')}
                                              >
                                                  {comment.author_name}
                                                  {comment.author_tick && (
                                                      <CheckCircleIcon
                                                          sx={{ fontSize: '20px', color: '#0dcaf0', marginLeft: '4px' }}
                                                      />
                                                  )}
                                                  {comment.author_id == post.author_id && <span>Người bán</span>}
                                              </Link>
                                              <div className={cx('content-item')}>
                                                  <TruncateComponent comments={comment.content} />
                                              </div>
                                          </div>
                                          {user.id == comment.author_id ||
                                              (user.id == post.author_id && (
                                                  <IconButton aria-label="option" sx={{ marginLeft: '8px' }}>
                                                      <FontAwesomeIcon icon={faEllipsis} />
                                                  </IconButton>
                                              ))}
                                      </div>
                                      <div className={cx('footer-item')}>
                                          <div
                                              className={cx('like-item', { 'is-like': comment.is_like })}
                                              onClick={() =>
                                                  handleLikeComment(comment.is_like, comment.number_like, comment.id)
                                              }
                                          >
                                              Thích
                                          </div>
                                          <div className={cx('response-item')}>Phản hồi</div>
                                          {comment.create_update ? (
                                              <div className={cx('time-item')}>{comment.create_update}</div>
                                          ) : (
                                              <div className={cx('time-item')}>{comment.create_at}</div>
                                          )}
                                          {comment.create_update && <div>Đã chỉnh sửa</div>}
                                          {comment.number_like > 0 && (
                                              <div className={cx('react')}>
                                                  <RecommendIcon sx={{ color: '#0573e6', fontSize: '18px' }} />
                                                  <span>{comment.number_like}</span>
                                              </div>
                                          )}
                                      </div>
                                  </div>
                              );
                          })
                        : listRespond.map((respond) => {
                              return (
                                  <div key={respond.id} className={cx('wrap-item')}>
                                      <div className={cx('header-item')}>
                                          <div className={cx('avatar-item')}>
                                              <img src={respond.avatar}></img>
                                          </div>
                                          <div className={cx('wrap-content-item')}>
                                              <Link
                                                  //   to={`http://localhost:3000/${respond.author_id}`}
                                                  to={`/${respond.author_id}`}
                                                  className={cx('owner-item')}
                                              >
                                                  {respond.author_name}
                                                  {respond.author_tick && (
                                                      <CheckCircleIcon
                                                          sx={{ fontSize: '20px', color: '#0dcaf0', marginLeft: '4px' }}
                                                      />
                                                  )}
                                                  {/* {respond.author_id == post.author_id && <span>Người bán</span>} */}
                                              </Link>
                                              <div className={cx('content-item')}>
                                                  <TruncateComponent comments={respond.content} />
                                              </div>
                                          </div>
                                      </div>
                                      <div className={cx('footer-item')}>
                                          <div
                                              className={cx('like-item', { 'is-like': respond.is_like })}
                                              onClick={() =>
                                                  handleLikeRepond(respond.is_like, respond.number_like, respond.id)
                                              }
                                          >
                                              Thích
                                          </div>
                                          <div className={cx('response-item')}>Phản hồi</div>

                                          <div className={cx('time-item')}>{respond.create_at}</div>

                                          {respond.number_like > 0 && (
                                              <div className={cx('react')}>
                                                  <RecommendIcon sx={{ color: '#0573e6', fontSize: '18px' }} />
                                                  <span>{respond.number_like}</span>
                                              </div>
                                          )}
                                      </div>
                                  </div>
                              );
                          })}
                </div>
                <hr className={cx('divided')}></hr>
                {feedback ? (
                    <div className={cx('wrap-send')}>
                        <div className={cx('header-item')}>
                            <div className={cx('avatar-item')}>
                                <img src={user.avatar}></img>
                            </div>
                            <div className={cx('wrap-content-item')}>
                                <a
                                    href="https://www.facebook.com/manhphuongg"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={cx('owner-item')}
                                >
                                    {user.name}
                                    {user.tick && (
                                        <CheckCircleIcon
                                            sx={{ fontSize: '20px', color: '#0dcaf0', marginLeft: '4px' }}
                                        />
                                    )}
                                    {/* {respond.author_id == post.author_id && <span>Người bán</span>} */}
                                </a>
                                <div className={cx('content-item')}>
                                    <textarea
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Viết bình luận..."
                                    ></textarea>
                                    <SendIcon className={cx('send-icon')} onClick={handleSendComment} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* <div className={cx('wrap-send')}>
                            <div className={cx('header-item')}>
                                <div className={cx('avatar-item')}>
                                    <img src={user.avatar}></img>
                                </div>
                                <div className={cx('wrap-content-item')}>
                                    <a
                                        href="https://www.facebook.com/manhphuongg"
                                        target="_blank"
                                        className={cx('owner-item')}
                                    >
                                        {user.name}
                                        {user.tick && (
                                            <CheckCircleIcon
                                                sx={{ fontSize: '20px', color: '#0dcaf0', marginLeft: '4px' }}
                                            />
                                        )}
                                        
                                    </a>
                                    <div className={cx('content-item')}>
                                        <textarea
                                            value={repondText}
                                            onChange={(e) => setRepondText(e.target.value)}
                                            placeholder="Viết phản hồi..."
                                        ></textarea>
                                        <SendIcon className={cx('send-icon')} onClick={handleSendRepond} />
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </>
                )}
            </div>

            <Modal
                open={openBuyNow}
                onClose={handleCloseBuyNow}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={cx('buy-now-icon-close')}>
                        <IconButton aria-label="add" size="small" onClick={handleCloseBuyNow}>
                            <CloseIcon sx={{ color: '#637381', fontSize: '24px' }} />
                        </IconButton>
                    </div>
                    <div className={cx('buy-now')}>
                        <div className={cx('buy-now-wrap-image')}>
                            <img src={selectVariant?.image || post?.image} className={cx('buy-now-image')}></img>
                        </div>

                        <div className={cx('buy-now-content')}>
                            <div className={cx('buy-now-name')}>Sản phẩm: {selectVariant?.name}</div>
                            <div className={cx('buy-now-price')}>
                                Giá: {numeral(selectVariant?.retailPrice).format('0,0')} VNĐ
                            </div>
                            <div className={cx('buy-now-quantity')}>Số lượng có sẵn: {selectVariant?.quantity}</div>

                            <div className={cx('modal-wrap-list-variant')}>
                                {variants?.map((variant, index) => (
                                    <div
                                        className={cx('modal-wrap-variant', {
                                            'modal-wrap-variant-active': selectVariant?.id == variant.id,
                                        })}
                                        onClick={() => handleSelectVariant(variant)}
                                        key={index}
                                    >
                                        <img src={variant?.image} className={cx('modal-variant-image')}></img>
                                        <div className={cx('modal-variant-value')}>
                                            {variant?.value1}
                                            {variant?.value2 && <div>- {variant?.value2}</div>}
                                            {variant?.value3 && <div>- {variant?.value3}</div>}
                                        </div>
                                        <div className={cx('modal-wrap-variant-badge')}>
                                            {orderSelect.findIndex((item) => item?.id === variant.id) != -1 && (
                                                <Badge
                                                    badgeContent={
                                                        orderSelect[
                                                            orderSelect.findIndex((item) => item?.id === variant?.id)
                                                        ]?.quantityBuy || 0
                                                    }
                                                    color="error"
                                                ></Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <div className={cx('quantity-purchased')}>
                                    <span>Số lượng</span>
                                    <div className={cx('quantity-purchased-parameter')}>
                                        <div className={cx('quantity-purchased-wrap-btn')}>
                                            <RemoveIcon
                                                className={cx('quantity-purchased-btn')}
                                                onClick={() => handleOrderVariant(selectVariant, quantity - 1)}
                                            />
                                            <input
                                                type="number"
                                                min={0}
                                                value={quantity}
                                                onChange={(e) => handleChangeQuantity(e)}
                                            ></input>
                                            <AddIcon
                                                className={cx('quantity-purchased-btn')}
                                                onClick={() => handleOrderVariant(selectVariant, quantity + 1)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    onClick={handleConfirmBuyNow}
                                    variant="contained"
                                    style={{
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        borderColor: '#f44336',
                                        margin: '16px 8px',
                                        marginTop: '26px',
                                    }}
                                >
                                    xác nhận mua
                                </Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Post;
