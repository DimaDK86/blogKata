import { Layout } from 'antd';
import AuthLinks from './AuthLinks';
import UserMenu from './UserMenu';
import { useSelector } from 'react-redux';
import './Header.module.css';

const { Header: AntHeader } = Layout;

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <AntHeader className="header">
      <div className="logo">RealWorld Blog</div>
      {user ? <UserMenu user={user} /> : <AuthLinks />}
    </AntHeader>
  );
};

export default Header;