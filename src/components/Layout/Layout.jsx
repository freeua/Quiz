import React, { useEffect } from "react";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";

import styles from "./Layout.module.css";
import { Footer } from "../Footer/Footer";

import { fetchUser, logOut } from "../../state/actions/user.action";
import Hero from "../Hero/Hero";
import Button from "../buttons/Button";
import logo from "../../static/images/logo.png";

// import Sidebar from "../Sidebar";

const Layout = ({
  pageTitle = "Sanofi Quiz",
  children,
  user,
  fetchUser,
  logOut,
  heroStyles,
  showHero,
  heroType,
  errorNotice,
  styleMain,
  XAxisPosition,
}) => {
  const history = useHistory();
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    if (localStorage.token && !user) {
      fetchUser();
    }
  }, [fetchUser, user]);

  const handleLogOut = () => () => {
    logOut();
    history.push("/login");
  };

  const isLogged = user && user.firstName;

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo} style={{ backgroundImage: `url(${logo})` }}></div>

      <div className={`${styles.container} ${isLogged ? styles.withMenu : ""}`}>
        {/* {isLogged && <Sidebar handleLogOut={handleLogOut} />} */}
        <div className={styles.liverContainer}>
          <div className={styles.window}>
            <div className={styles.content}>
              {isLogged && <p className={styles.user}>Welcome Back {user.firstName}</p>}
              <main style={styleMain} className={styles.main}>
                {children}
              </main>
            </div>
          </div>
          <div className={styles.wrapperHero}>
            {showHero && (
              <Hero
                style={heroStyles}
                type={heroType}
                XAxisPosition={XAxisPosition}
                error={errorNotice || null}
              />
            )}
          </div>
        </div>
        {isLogged && (
          <p className={styles.logout}>
            <Button text="log out" onClick={handleLogOut()} />
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user.data,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
