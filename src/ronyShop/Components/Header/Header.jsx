import React, { useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import styles from './Header.module.scss'
import Carrinho from '../Carrinho/Carrinho'


const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>Rony<span>Shop</span></Link>
        <nav className={styles.menu}>
          <NavLink to="/" className={styles.menuItem} end> Produtos </NavLink>
          <NavLink to="/contato" className={styles.menuItem} activeClassName={styles.active}> Contato </NavLink>
          <Carrinho />
        </nav>
      </div>
    </header>
  )
}

export default Header