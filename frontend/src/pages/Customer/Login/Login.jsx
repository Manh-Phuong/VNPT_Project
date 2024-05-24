import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import validator from 'validator';
import { toast } from 'react-toastify';

import * as AuthServices from '../../../services/authService';
import { setStoreToken, setStoreUser } from '../../../redux/slices/authSlice';
// import { setUserId, setConnect, setSendPrivateValue } from '../../../redux/slices/messageSlice';
import { setUserId } from '../../../redux/slices/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const defaultTheme = createTheme();

export default function Login() {
    // const { handleLoggedin } = React.useContext(AuthContext);
    const dispatch = useDispatch();
    const [isPhoneEmpty, setIsPhoneEmpty] = React.useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log('login ne data',data.get('email'))
        const payload = {
            username: data.get('email'),
            password: data.get('password'),
        };

        if (validator.isEmpty(payload.username)) {
            setIsPhoneEmpty(true);
        }

        if (validator.isEmpty(payload.password)) {
            setIsPasswordEmpty(true);
        }

        if (!validator.isEmpty(payload.username) && !validator.isEmpty(payload.password)) {
            AuthServices.login(payload)
                .then((res) => {
                    const token = res.data.token;
                    dispatch(setStoreToken(token));
                    const user = res.data.userInfoDto;
                    dispatch(setStoreUser(user));
                    console.log(token, user) 
                    console.log(user.id)
                    dispatch(setUserId(user.id));
                    // dispatch(setConnect(user.id));
                    // dispatch(setConnect(user.id, dispatch));
                    navigate('/');
                })
                .catch((err) => {
                    console.log("err ", err)
                    toast.error('Sai thông tin đăng nhập !');
                });
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ mt: 8 }}>
                        Đăng nhập
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            error={isPhoneEmpty}
                            helperText={isPhoneEmpty && 'Bạn phải điền địa chỉ email'}
                            name="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            error={isPasswordEmpty}
                            helperText={isPasswordEmpty && 'Bạn phải điền mật khẩu'}
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Đăng nhập
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="#" variant="body2">
                                    Quên mật khẩu?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {'Đăng ký'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
