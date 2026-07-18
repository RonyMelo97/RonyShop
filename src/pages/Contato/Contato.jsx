import React from 'react'
import Head from '../../components/Head/Head'
import ContatoImg from '../../assets/images/contato.jpg'
import styles from './Contato.module.scss'

const Contato = () => {
    return (
        <section className={`${styles.container} animeLeft`}>
            <Head title="Contato" />

            <div className={styles.hero}>
                <div className={styles.hero__avatar}>
                    <img src={ContatoImg} alt="Rony Melo" />
                </div>
                <div className={styles.hero__text}>
                    <span className={styles.hero__label}>Desenvolvedor Front-End</span>
                    <h1>Rony Melo</h1>
                    <p>Apaixonado por interfaces modernas e experiências de usuário. Atualmente focado em React, consumo de APIs e componentização.</p>
                    <div className={styles.hero__links}>
                        <a href="https://github.com/RonyMelo97" target="_blank" rel="noreferrer" className={styles.hero__btn}>
                            <span>&#128188;</span> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/rony-melo-14856bba/" target="_blank" rel="noreferrer" className={`${styles.hero__btn} ${styles['hero__btn--blue']}`}>
                            <span>&#128101;</span> LinkedIn
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.grid}>

                <div className={styles.card}>
                    <h3 className={styles.card__title}>Informações de contato</h3>
                    <ul className={styles.card__list}>
                        <li>
                            <span className={styles.card__icon}>✉</span>
                            <a href="mailto:Ronymelo15@gmail.com">Ronymelo15@gmail.com</a>
                        </li>
                        <li>
                            <span className={styles.card__icon}>📞</span>
                            <span>(11) 96813-1457</span>
                        </li>
                        <li>
                            <span className={styles.card__icon}>📍</span>
                            <span>São Paulo, SP — Brasil</span>
                        </li>
                        <li>
                            <span className={styles.card__icon}>🔗</span>
                            <a href="https://github.com/RonyMelo97" target="_blank" rel="noreferrer">github.com/RonyMelo97</a>
                        </li>
                    </ul>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.card__title}>Tecnologias</h3>
                    <div className={styles.tags}>
                        <span>React</span>
                        <span>JavaScript</span>
                        <span>HTML5</span>
                        <span>CSS3 / SCSS</span>
                        <span>React Router</span>
                        <span>Context API</span>
                        <span>REST APIs</span>
                        <span>Git</span>
                    </div>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.card__title}>Sobre este projeto</h3>
                    <p className={styles.card__desc}>
                        E-commerce desenvolvido com React consumindo a API pública DummyJSON. Funcionalidades implementadas: listagem e filtragem de produtos por categoria, página de produto com galeria de imagens, abas de descrição e avaliações, carrinho com controle de quantidade e desconto, e navegação com React Router.
                    </p>
                </div>

            </div>
        </section>
    )
}

export default Contato
