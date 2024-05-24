import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// import Header from '~/layouts/components/Header';
// import Sidebar from '../components/Sidebar';
import Header from '../components/Header'
import Footer from '../components/Footer'

import { useAuth } from '../../contexts/AuthContext'
import { useEffect } from "react";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const { user, logout } = useAuth();

  useEffect(() => {
    console.log("login user:", user)
  })
  const handleLogout = () => {
    logout();
  }

  return (
    <div className={cx("wrapper")}>
      <Header sell={true} />
      <div>
        {/* <div className={cx('sidebar')}><Sidebar /></div> */}
        
        <div className={cx("content")}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
