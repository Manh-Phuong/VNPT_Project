import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuth } from '../../../contexts/AuthContext';

const cx = classNames.bind(styles);

export default function RecipeReviewCard({ post }) {
    const { user } = useAuth();
    const [favorite, setFavorite] = useState(post?.favorite);

    const navigate = useNavigate();

    const handleFavorite = () => {
        setFavorite((prev) => {
            post.favorite = !prev;
            return !prev;
        });
        // console.log('click roi');
        // console.log('detailpost', post);
    };

    // useEffect(() => {// gọi API lấy dữ liệu post
    //     const fetchApi = async () => {
    //       try {
    //         const result = await postServices.getPost();
    //         console.log(result);

    //       } catch (error) {
    //         console.log("fetchApi CategoryList" + error);
    //       }
    //     };
    //     fetchApi();
    //   }, []);

    const handleDetailPost = () => {
        navigate(`/${post.author_id}/posts/${post.id}`, { state: { post } });
    };

    return (
        <Card className={cx('card-item')} >
            <CardHeader
                className={cx('cursor')}
                avatar={
                    // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" >
                    //     {post.author}
                    // </Avatar>
                    <Avatar alt={post.author_name} src={post.image_avatar} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={post.author_name}
                subheader={post.create_at}
            />
            <CardMedia
                onClick={handleDetailPost}
                component="img"
                height="194"
                image={post.image}
                alt="product image"
                className={cx('cursor', 'image-product')}
            />
            <CardContent className={cx('cursor')}>
                <Typography variant="body2" color="text.secondary">
                    <div className={cx('typography')}>{post.title}</div>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <div className={cx('price-label')}>{post.price} đ</div>
                <div className={cx('btn-bottom')}>
                    <IconButton aria-label="add to favorites" onClick={handleFavorite}>
                        {favorite ? (
                            <FavoriteIcon className={cx('favorite-icon')} />
                        ) : (
                            <FavoriteBorderIcon className={cx('favorite-icon')} />
                        )}
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    );
}
