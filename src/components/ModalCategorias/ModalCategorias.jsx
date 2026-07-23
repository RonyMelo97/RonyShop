import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../hooks/GlobalContext'
import styles from './ModalCategorias.module.scss'
import categoriaIcon from '../../assets/icons/todas.svg'

const ModalCategorias = ({ openModal, setOpenModal }) => {
    const [categorias, setCategorias] = useState([])
    const global = useContext(GlobalContext)

    // Consumindo api que tem as catedorias, e colocando na variavel Categorias
    useEffect(() => {
        fetch("https://dummyjson.com/products/category-list")
            .then(response => response.json())
            .then(json => {
                setCategorias(json)
            })
    }, [])


    // Função que pega o valor da categoria clicada
    function handleCategoria(event) {
        global.setCategoria(event.target.innerText)
    }



    if (!openModal) return null

    return (
        <>
            <div className={styles.modalOverlay}></div>
            <div className={styles.modalCategorias}>

                <div className={styles.modalCategorias__header}>
                    <div>
                        <h2>Todas as categorias</h2>
                        <p>Encontre o que você precisa em todas as nossas categorias.</p>
                    </div>
                    <button onClick={() => setOpenModal(false)}>Fechar modal</button>

                    <div
                        onClick={global.closeModal}
                        className={styles.modal__close}
                    ></div>
                </div>

                <div className={styles.categorias__list}>

                    {categorias?.map((categoria, index) => {
                        return (
                            <button
                                key={index}
                                className={styles.categorias__item}
                                onClick={handleCategoria}
                            >
                                <img src={categoriaIcon} alt="" className={styles.categorias__icon} />
                                <span className={styles.categorias__nome}>{categoria}</span>
                                <span className={styles.categorias__quantidade}>50 produtos</span>
                            </button>
                        )

                    })}

                </div>

                <button className={styles.modalCategorias__more}>
                    Carregar mais categorias
                </button>
            </div>

        </>
    )
}

export default ModalCategorias
