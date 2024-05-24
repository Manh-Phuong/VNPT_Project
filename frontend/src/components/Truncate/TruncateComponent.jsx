import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Truncate.module.scss';

const cx = classNames.bind(styles);

const TruncateComponent = ({ comments }) => {
    const [showAllComments, setShowAllComments] = useState(false);

    // Hàm xử lý sự kiện khi người dùng bấm "Xem thêm"
    const handleShowMore = () => {
        setShowAllComments(true);
    };

    return (
        <div className={cx('wrap')}>
            {showAllComments ? (
                <div>{comments}</div>
            ) : (
                <div>
                    {comments.slice(0, 360)}
                    {!showAllComments && comments.length > 360 && (
                        <button onClick={handleShowMore} className={cx('button-more')}>
                            ... Xem thêm
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TruncateComponent;
