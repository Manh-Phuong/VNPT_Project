import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Search() {
    const [focus, setFocus] = useState(false);

    const handleFocusInput = () => {
        setFocus(true);
    };

    const handleBlurInput = () => {
        setFocus(false);
    };

    return (
        <div className={cx('wrap-search', { active: focus })} onClick={handleFocusInput}>
            <SearchIcon sx={{ color: '#637381', fontSize: '22px', marginLeft: '12px' }} />
            <input
                className={cx('search-input')}
                placeholder="Tìm kiếm người dùng, sản phẩm"
                onBlur={handleBlurInput}
            ></input>
        </div>
    );
}

export default Search;
