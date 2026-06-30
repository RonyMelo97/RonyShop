import React, { useContext } from 'react'
import styles from './Footer.module.scss'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'
const Footer = () => {
  
  const global = useContext(GlobalContext)

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>

        <div className={styles.footer__column}>
          <div className={styles.footer__logo}>
            <span className={styles.footer__logoBox}>
              <span>R</span><span>S</span>
            </span>
            <span className={styles.footer__logoName}>Rony<span>Shop</span></span>
          </div>

          <p>
            Projeto desenvolvido em React consumindo a API
            DummyJSON para demonstrar habilidades em Front-End.
          </p>

          <div className={styles.footer__social}>
            <a href="https://github.com/RonyMelo97" target='_blank'>GitHub</a>
            <a href="https://www.linkedin.com/in/rony-melo-14856bba/">LinkedIn</a>
          </div>
        </div>

        <div className={styles.footer__column}>
          <h3>Navegação</h3>

          <ul>
            <li><Link to="/">Produtos</Link></li>
            <li><Link to="/contato">Contato</Link></li>
            <li><a onClick={global.openModal}>Carrinho</a></li>
          </ul>
        </div>

        <div className={styles.footer__column}>
          <h3>Tecnologias</h3>

          <ul>
            <li>React</li>
            <li>React Router</li>
            <li>Context API</li>
            <li>CSS Modules</li>
            <li>Fetch API</li>
          </ul>
        </div>

        <div className={styles.footer__column}>
          <h3>Sobre</h3>

          <p>
            Aplicação criada para estudos de React,
            gerenciamento de estado, consumo de APIs REST e
            componentização.
          </p>
        </div>

      </div>

      <div className={styles.footer__bottom}>
        <p>
          © 2026 MeuPortfólio. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer