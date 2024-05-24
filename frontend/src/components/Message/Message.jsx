import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import Popper from '@mui/material/Popper';
import SearchIcon from '@mui/icons-material/Search';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';
import {
    setOpenPopper,
    setOpenDetailMessage,
    setAddMessage,
    setDetailIdTexting,
} from '../../redux/slices/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { over } from 'stompjs';

import * as MessageServices from '../../services/messageSerivce';

const cx = classNames.bind(styles);

var stompClient = null;

const Message = ({ top, right }) => {
    const dispatch = useDispatch();
    const [privateChats, setPrivateChats] = useState(new Map());
    // const [messages, setMessages] = useState([
    //     {
    //         id: 1,
    //         image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
    //         author_name: 'Mạnh Phương',
    //         content: 'hôm nào thế bạn hôm nay trời đẹp nè bạn',
    //         time: '',
    //     },
    //     {
    //         id: 2,
    //         image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
    //         author_name: 'Mạnh Phương',
    //         content: 'oke nhé',
    //         time: '',
    //     },
    //     {
    //         id: 3,
    //         image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
    //         author_name: 'Mạnh Phương',
    //         content: 'oke nhé',
    //         time: '',
    //     },
    //     {
    //         id: 4,
    //         image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
    //         author_name: 'Mạnh Phương',
    //         content: 'oke nhé',
    //         time: '',
    //     },
    //     {
    //         id: 5,
    //         image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
    //         author_name: 'Mạnh Phương',
    //         content: 'oke nhé',
    //         time: '',
    //     },
    //     {
    //         id: 6,
    //         image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
    //         author_name: 'Mạnh Phương',
    //         content: 'oke nhé',
    //         time: '',
    //     },
    //     {
    //         id: 7,
    //         image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
    //         author_name: 'Mạnh Phương',
    //         content: 'oke nhé',
    //         time: '',
    //     },
    //     {
    //         id: 8,
    //         image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
    //         author_name: 'Mạnh Phương',
    //         content: 'oke nhé',
    //         time: '',
    //     },
    //     {
    //         id: 9,
    //         image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
    //         author_name: 'Mạnh Phương',
    //         content: 'oke nhé',
    //         time: '',
    //     },
    //     {
    //         id: 10,
    //         image: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
    //         author_name: 'Mạnh Phương',
    //         content: 'oke nhé',
    //         time: '',
    //     },
    // ]);

    const [messages, setMessages] = useState([]);
    const [userIdDetail, setUserIdDetail] = useState({});
    const [inputMessage, setInputMessage] = useState('');
    const [activeIconSend, setActiveIconSend] = useState(false);
    const [open, setOpen] = useState(true);
    const [openMessage, setOpenMessage] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [privateChats]);

    const handlePopperClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    };

    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const openPopper = useSelector((state) => state.message.openPopper);
    const openDetailMessage = useSelector((state) => state.message.openDetailMessage);
    const detailIdTexting = useSelector((state) => state.message.detailIdTexting);
    // const listMessage = useSelector((state) => state.message.listMessage);

    const onConnected = () => {
        console.log('================userId============:', user?.id);
        stompClient.subscribe('/user/' + user.id + '/private', onPrivateMessage);
    };

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, () => onConnected(), onError);
    };

    const onError = (err) => {
        console.log(err);
    };

    const onPrivateMessage = (payload) => {
        var payloadData = JSON.parse(payload.body);
        var userIdKey = user.id == payloadData.userSend ? payloadData.userReceive : payloadData.userSend;
        if (privateChats.get(parseInt(userIdKey))) {
            privateChats.get(parseInt(userIdKey)).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(parseInt(userIdKey), list);
            setPrivateChats(new Map(privateChats));
        }
    };

    const addMessage = (payloadData) => {
        var userIdKey = user.id == payloadData.userSend ? payloadData.userReceive : payloadData.userSend;
        if (privateChats.get(parseInt(userIdKey))) {
            privateChats.get(parseInt(userIdKey)).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(parseInt(userIdKey), list);
            setPrivateChats(new Map(privateChats));
        }
    };

    const handleSendPrivateValue = (chatMessage) => {
        console.log('setSendPrivateValue', chatMessage);
        var message = {
            userSend: user.id,
            userReceive: chatMessage.userReceive,
            content: chatMessage.content,
        };

        if (stompClient) {
            stompClient.send('/app/private-message', {}, JSON.stringify(message));
        } else {
            connect();
            stompClient.send('/app/private-message', {}, JSON.stringify(message));
        }
        addMessage(message);
    };

    // useEffect(() => {
    //     connect();
    // }, []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await MessageServices.getListUserMessage(token);
                console.log(res.data);
                setMessages(
                    res?.data?.map((item) => {
                        return {
                            userId: item.userId,
                            image:
                                item?.imageAvatar ||
                                'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
                            author_name: item?.name,
                            content: item?.content,
                            time: '',
                        };
                    }),
                );
            } catch (error) {
                console.log('fetchApi getListUserMessage Message.js' + error);
            }
        };
        fetchApi();
    }, [openPopper, token]);

    const handleOutsideClick = (event) => {
        if (anchorEl && anchorEl.contains(event.target)) {
            // Click is inside the Popper, do nothing
            return;
        }

        setOpen(false);
        dispatch(setOpenPopper(false));
    };

    const apiDetailMessage = async () => {
        const res = await MessageServices.getDetailMessage(detailIdTexting?.userId, token);
        console.log('handleDetailMessage', res?.data);

        privateChats.set(detailIdTexting.userId, res?.data);
        setPrivateChats(new Map(privateChats));
    };

    useEffect(() => {
        apiDetailMessage();
        console.log('da goi api deltail message')
    }, [openDetailMessage, detailIdTexting]);

    const handleDetailMessage = async (message) => {
        dispatch(setOpenPopper(false));
        dispatch(setOpenDetailMessage(true));
        dispatch(setDetailIdTexting(message));
        console.log('message', message);
        setUserIdDetail(message);

        apiDetailMessage();

        // const res = await MessageServices.getDetailMessage(message?.userId, token);
        // console.log('handleDetailMessage', res?.data);

        // privateChats.set(message.userId, res?.data);
        // setPrivateChats(new Map(privateChats));
    };

    const handleCloseMessage = () => {
        setOpenMessage(false);
        dispatch(setOpenDetailMessage(false));
    };

    const handleChangeInputMessage = (e) => {
        console.log(e.target.value);
        if (e.target.value.trim() != '') {
            setActiveIconSend(true);
        } else {
            setActiveIconSend(false);
        }
        setInputMessage(e.target.value);
    };

    const handleSendMessage = () => {
        var chatMessage = {
            // userSend: "4",
            userReceive: parseInt(userIdDetail?.userId),
            content: inputMessage,
        };
        console.log('send');
        // dispatch(setSendPrivateValue(chatMessage));
        if (inputMessage.trim() != '') {
            handleSendPrivateValue(chatMessage);
        } else {
            toast.error('Chưa nhập nội dung');
        }
        setActiveIconSend(false);
        setInputMessage('');
    };

    return (
        <div className={cx('wrap')}>
            <Popper out open={openPopper} anchorEl={anchorEl}>
                <ClickAwayListener onClickAway={handleOutsideClick}>
                    <div
                        className={cx('popper')}
                        style={{
                            top: `${top}`,
                            right: `${right}`,
                        }}
                    >
                        <div className={cx('popper-header')}>
                            <div style={{ fontSize: '24px', fontWeight: '600' }}>Tin nhắn</div>
                            <div className={cx('popper-header-search')}>
                                <SearchIcon sx={{ color: '#637381', fontSize: '22px', marginLeft: '12px' }} />
                                <input className={cx('search-input')} placeholder="Tìm kiếm tin nhắn"></input>
                            </div>
                        </div>
                        <div className={cx('popper-content')}>
                            {messages?.map((message, index) => (
                                <div
                                    key={message.userId}
                                    className={cx('wrap-message')}
                                    onClick={() => handleDetailMessage(message)}
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
            </Popper>

            <Popper open={openDetailMessage} anchorEl={anchorEl}>
                <ClickAwayListener onClickAway={handleCloseMessage}>
                    <div
                        className={cx('popper-message')}
                        style={{
                            top: `250px`,
                            // bottom: '-1000px',
                            right: `${right}`,
                        }}
                    >
                        <div className={cx('popper-header')}>
                            <div className={cx('wrap-user-message')}>
                                <div className={cx('popper-avatar')}>
                                    <img
                                        alt=""
                                        src="https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg"
                                    ></img>
                                </div>
                                <div className={cx('popper-name')}>{detailIdTexting?.author_name}</div>
                            </div>
                            <IconButton aria-label="add" size="small" onClick={handleCloseMessage}>
                                <CloseIcon sx={{ color: '#637381', fontSize: '24px' }} />
                            </IconButton>
                        </div>
                        <div className={cx('popper-content')}>
                            {privateChats.get(detailIdTexting?.userId)?.map((message, index) => (
                                <div key={message.id} className={cx('wrap-message')}>
                                    {message?.userSend == user?.id ? (
                                        <div className={cx('wrap-content-message-send')} ref={messagesEndRef}>
                                            <div className={cx('content-message-send')}>{message?.content}</div>{' '}
                                        </div>
                                    ) : (
                                        <div className={cx('wrap-content-message-receive')} ref={messagesEndRef}>
                                            {message?.content}{' '}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className={cx('input-message')}>
                            <input onChange={handleChangeInputMessage} value={inputMessage}></input>
                            <SendIcon
                                className={cx('send-icon', {
                                    active: activeIconSend,
                                })}
                                onClick={handleSendMessage}
                            />
                        </div>
                    </div>
                </ClickAwayListener>
            </Popper>
        </div>
    );
};

export default Message;
