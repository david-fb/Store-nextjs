import { useContext } from 'react';
import Menu from '@components/Menu';
import MyOrder from '@containers/MyOrder';
import AppContext from '@context/AppContext';
import styles from '@styles/Header.module.scss';
import Nav from './Nav';
import NavMobile from './NavMobile';

const Header = () => {
  const { state } = useContext(AppContext);

  return (
    <>
      <header className={styles.Header}>
        <NavMobile />
        <Nav />
        {state.menuIsOpen && <Menu />}
        {state.orderIsOpen && <MyOrder />}
      </header>
    </>
  );
};

export default Header;
