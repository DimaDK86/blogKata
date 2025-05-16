import { Auth } from "./AuthBlock/Auth";
import style from "./Header.module.css";
import { Link } from "react-router";
import { LoggedBlock } from "./LoggedBlock/LoggedBlock";
import { useSelector } from "react-redux";

export const Header = () => {
  const token = useSelector((state) =>
    state.auth.user ? state.auth.user.token : null,
  );
  return (
    <>
      <div className={style.header}>
        <nav className={style.header__navbar}>
          <Link className={style.link__logo} to="/posts">
            RealWorld Blog
          </Link>
          {token ? <LoggedBlock /> : <Auth />}
        </nav>
      </div>
    </>
  );
};
