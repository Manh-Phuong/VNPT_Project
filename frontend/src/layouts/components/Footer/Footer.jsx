import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import { useAuth } from '../../../contexts/AuthContext';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const cx = classNames.bind(styles);

export default function Header() {
    const { user } = useAuth();
    return (
        <footer className={cx('footer')}>
            <div className={cx('wrap-colum')}>
                <div className={cx('column')}>
                    <div className={cx('title')}>CHĂM SÓC KHÁCH HÀNG</div>
                    <a className={cx('item-label')}>Trung tâm trợ giúp</a>
                    <a className={cx('item-label')}>Hướng dẫn mua hàng</a>
                    <a className={cx('item-label')}>Hướng dẫn bán hàng</a>
                    <a className={cx('item-label')}>Chính sách bảo hành</a>
                </div>
                <div className={cx('column')}>
                    <div className={cx('title')}>VỀ CHÚNG TÔI</div>
                    <div className={cx('item-label')}>Giới thiệu</div>
                    <div className={cx('item-label')}>Tuyển dụng</div>
                    <div className={cx('item-label')}>Điều khoản</div>
                    <div className={cx('item-label')}>Chính sách bảo mật</div>
                </div>
                <div className={cx('column')}>
                    <div className={cx('title')}>THANH TOÁN</div>
                    <div className={cx('wrap-item-icon')}>
                        <div className={cx('item-icon')}>
                            <img src="https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8" />
                        </div>
                        <div className={cx('item-icon')}>
                            <img src="https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16" />
                        </div>
                        <div className={cx('item-icon')}>
                            <img src="https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08" />
                        </div>
                    </div>
                    <div className={cx('wrap-item-icon')}>
                        <div className={cx('item-icon')}>
                            <img src="https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c" />
                        </div>
                        <div className={cx('item-icon')}>
                            <img src="https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281" />
                        </div>
                        <div className={cx('item-icon')}>
                            <img src="https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09" />
                        </div>
                    </div>
                </div>
                <div className={cx('column')}>
                    <div className={cx('title')}>VẬN CHUYỂN</div>
                    <div className={cx('wrap-item-icon')}>
                        <div className={cx('item-icon')}>
                            <img src="https://down-vn.img.susercontent.com/file/vn-50009109-159200e3e365de418aae52b840f24185" />
                        </div>
                        <div className={cx('item-icon')}>
                            <img src="https://down-vn.img.susercontent.com/file/d10b0ec09f0322f9201a4f3daf378ed2" />
                        </div>
                        <div className={cx('item-icon')}>
                            <img src="https://down-vn.img.susercontent.com/file/77bf96a871418fbc21cc63dd39fb5f15" />
                        </div>
                    </div>
                    <div className={cx('wrap-item-icon')}>
                        <div className={cx('item-icon')}>
                            <img src="https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f" />
                        </div>
                        <div className={cx('item-icon')}>
                            <img src="https://down-vn.img.susercontent.com/file/957f4eec32b963115f952835c779cd2c" />
                        </div>
                        <div className={cx('item-icon')}>
                            <img src="https://down-vn.img.susercontent.com/file/0d349e22ca8d4337d11c9b134cf9fe63" />
                        </div>
                    </div>
                </div>
                <div className={cx('column')}>
                    <div className={cx('title')}>THEO DÕI CHÚNG TÔI TRÊN</div>
                    <a href='https://www.facebook.com/manhphuongg' target='_blank' className={cx('wrap-icon')}>
                        <FacebookRoundedIcon />
                        <div className={cx('item-label')}>Facebook</div>
                    </a>
                    <a className={cx('wrap-icon')}>
                        <InstagramIcon />
                        <div className={cx('item-label')}>Instagram</div>
                    </a>
                    <a href='https://www.linkedin.com/in/ph%C6%B0%C6%A1ng-nguy%E1%BB%85n-153235271/' target='_blank' className={cx('wrap-icon')}>
                        <LinkedInIcon />
                        <div className={cx('item-label')}>LinkedIn</div>
                    </a>
                </div>
            </div>
        </footer>
    );
}
