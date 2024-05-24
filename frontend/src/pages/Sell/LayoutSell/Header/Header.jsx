import {
    AppBar,
    Avatar,
    Badge,
    Button,
    Container,
    FormControlLabel,
    Grid,
    IconButton,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { AccountCircle, Email, Lock } from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Search from '../Search';
import { useAuth } from '../../../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

import Popper from '@mui/material/Popper';
import SearchIcon from '@mui/icons-material/Search';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Message from '../../../../components/Message/Message';
import { setOpenPopper, setOpenDetailMessage } from '../../../../redux/slices/messageSlice';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);
const svgRight = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
`;
const svgLeft = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
</svg>
`;

const encodedSvgRight = encodeURIComponent(svgRight);
const encodedSvgLeft = encodeURIComponent(svgLeft);

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,${encodedSvgRight}')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#dad7d7',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,${encodedSvgLeft}')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

export default function Header() {
    const { user } = useAuth();
    const [buyer, setBuyer] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openPopper = useSelector((state) => state.message.openPopper);

    const [messages, setMessages] = useState([
        {
            id: 1,
            image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            author_name: 'Mạnh Phương',
            content: 'hôm nào thế bạn hôm nay trời đẹp nè bạn',
            time: '',
        },
        {
            id: 2,
            image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            author_name: 'Mạnh Phương',
            content: 'oke nhé',
            time: '',
        },
        {
            id: 3,
            image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            author_name: 'Mạnh Phương',
            content: 'oke nhé',
            time: '',
        },
        {
            id: 4,
            image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            author_name: 'Mạnh Phương',
            content: 'oke nhé',
            time: '',
        },
        {
            id: 5,
            image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            author_name: 'Mạnh Phương',
            content: 'oke nhé',
            time: '',
        },
        {
            id: 1,
            image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            author_name: 'Mạnh Phương',
            content: 'oke nhé',
            time: '',
        },
        {
            id: 2,
            image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            author_name: 'Mạnh Phương',
            content: 'oke nhé',
            time: '',
        },
        {
            id: 3,
            image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            author_name: 'Mạnh Phương',
            content: 'oke nhé',
            time: '',
        },
        {
            id: 4,
            image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            author_name: 'Mạnh Phương',
            content: 'oke nhé',
            time: '',
        },
        {
            id: 5,
            image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
            author_name: 'Mạnh Phương',
            content: 'oke nhé',
            time: '',
        },
    ]);

    const handlePopperClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
        dispatch(setOpenPopper(!openPopper));
    };

    // const handleMessage = () => {
    //     setOpenMessage(true);
    // };

    const handleOutsideClick = (event) => {
        if (anchorEl && anchorEl.contains(event.target)) {
            // Click is inside the Popper, do nothing
            return;
        }

        setOpen(false);
    };

    const handleMessageOutsideClick = (event) => {
        if (anchorEl && anchorEl.contains(event.target)) {
            // Click is inside the Popper, do nothing
            return;
        }

        setOpenMessage(false);
    };

    const handleCloseMessage = () => {
        setOpenMessage(false);
    };

    const handleSendMessage = () => {};

    useEffect(() => {
        if (buyer) {
            navigate('/');
        } else {
            navigate('/selling');
        }
    }, [buyer]);

    // useEffect(() => {
    //     document.addEventListener('click', handleOutsideClick);
    //     // document.addEventListener('click', handleMessageOutsideClick);

    //     return () => {
    //         document.removeEventListener('click', handleOutsideClick);
    //         // document.removeEventListener('click', handleMessageOutsideClick);
    //     };
    // }, [anchorEl]);

    const handleRoleChange = () => {
        console.log('oke', !buyer);
        setBuyer((prev) => !prev);
    };

    return (
        <div className={cx('header')}>
            {/* <div style={{ marginLeft: '408px' }}>
                <Search />
            </div> */}
            {user ? (
                <div className={cx('nav-right')}>
                    <FormControlLabel
                        control={<MaterialUISwitch onClick={handleRoleChange} sx={{ m: 1 }} defaultChecked={false} />}
                        label=""
                    />
                    <IconButton
                        size="large"
                        aria-label="show 4 new mails"
                        color="inherit"
                        sx={{ bgcolor: '#f5f5f5', marginRight: 1, visibility: 'hidden' }}
                    >
                        <Badge badgeContent={4} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="show 4 new mails"
                        color="inherit"
                        sx={{ bgcolor: '#f5f5f5', marginRight: 1 }}
                        onClick={handlePopperClick}
                    >
                        <Badge badgeContent={4} color="error">
                            <FontAwesomeIcon className={cx('icon-message')} icon={faFacebookMessenger} />
                            {/* <MailIcon /> */}
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        sx={{ bgcolor: '#f5f5f5', marginRight: 1 }}
                    >
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Avatar
                        className={cx('avatar')}
                        alt="Remy Sharp"
                        src="https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg"
                    />
                </div>
            ) : (
                <div className={cx('btn-right')}>
                    <Button variant="contained" className={cx('btn-custom')}>
                        Đăng nhập
                    </Button>
                    <Button variant="outlined" className={cx('btn-custom')}>
                        Đăng ký
                    </Button>
                </div>
            )}
            {/* <div className={cx('wrap-popper-message')}>
                <Message className={cx('wrap-popper-message')} />
            </div> */}
            <Message right="-1480px" top="66px" />

            {/* <Popper out open={open} anchorEl={anchorEl}>
                <ClickAwayListener onClickAway={handleOutsideClick}>
                    <div className={cx('popper')}>
                        <div className={cx('popper-header')}>
                            <div style={{ fontSize: '24px', fontWeight: '600' }}>Tin nhắn</div>
                            <div className={cx('popper-header-search')}>
                                <SearchIcon sx={{ color: '#637381', fontSize: '22px', marginLeft: '12px' }} />
                                <input className={cx('search-input')} placeholder="Tìm kiếm tin nhắn"></input>
                            </div>
                        </div>
                        <div className={cx('popper-content')}>
                            {messages.map((message, index) => (
                                <div
                                    key={message.id}
                                    className={cx('wrap-message')}
                                    onClick={() => {
                                        setOpen(false);
                                        setOpenMessage(true);
                                    }}
                                >
                                    <div className={cx('avatar-message')}>
                                        <img
                                            alt=""
                                            src="https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg"
                                        ></img>
                                    </div>
                                    <div className={cx('wrap-content-message')}>
                                        <div className={cx('author-message')}>{message.author_name}</div>
                                        <div className={cx('content-message')}>{message.content}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ClickAwayListener>
            </Popper> */}

            {/* <Popper open={openMessage} anchorEl={anchorEl}>
                <ClickAwayListener onClickAway={handleCloseMessage}>
                    <div className={cx('popper-message')}>
                        <div className={cx('popper-header')}>
                            <div className={cx('wrap-user-message')}>
                                <div className={cx('popper-avatar')}>
                                    <img
                                        alt=""
                                        src="https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg"
                                    ></img>
                                </div>
                                <div className={cx('popper-name')}>Mạnh Phương</div>
                            </div>
                            <IconButton aria-label="add" size="small" onClick={handleCloseMessage}>
                                <CloseIcon sx={{ color: '#637381', fontSize: '24px' }} />
                            </IconButton>
                        </div>
                        <div className={cx('popper-content')}>
                            {messages.map((message, index) => (
                                <div key={message.id} className={cx('wrap-message')}>
                                    <div className={cx('avatar-message')}>
                                        <img src="https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg"></img>
                                    </div>
                                    <div className={cx('wrap-content-message')}>
                                        <div className={cx('author-message')}>{message.author_name}</div>
                                        <div className={cx('content-message')}>{message.content}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={cx('input-message')}>
                            <input></input>
                            <SendIcon className={cx('send-icon')} onClick={handleSendMessage} />
                        </div>
                    </div>
                </ClickAwayListener>
            </Popper> */}
        </div>
    );
}
