import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../hooks/GlobalContext'
import styles from './Categorias.module.scss'


const Categorias = ({ setOpenModal }) => {
    const [categorias, setCategorias] = useState([])
    const [categoria, setCategoria] = useState([])
    const global = useContext(GlobalContext)



    // Consumindo api que tem as catedorias, e colocando na variavel Categorias
    useEffect(() => {
        fetch("https://dummyjson.com/products/category-list")
            .then(response => response.json())
            .then(json => {
                setCategorias(json)
            })
    }, [])

    // Consumindo a api na parte de especifica de cada categoriaia

    useEffect(() => {
        fetch(`https://dummyjson.com/products/category/smartphones`)
            .then(response => response.json())
            .then(json => {
                setCategoria(json)
            })
    }, [])

    

    // Função que pega o valor da categoria clicada
    function handleCategoria(event) {
        global.setCategoria(event.target.innerText)
    }

    return (
        <>
            <section className={styles.categorias}>

                <div className={styles.categorias__header}>
                    <h2>Categorias</h2>

                    <p>
                        Escolha uma categoria para filtrar os produtos.
                    </p>
                    <button onClick={() => setOpenModal(true)}>Ver todas</button>

                </div>


                <div className={styles.categorias__list}>

                    <button
                        className={styles.categorias__item}
                        onClick={() => global.setCategoria("Todos")}
                    >
                        todos
                    </button>

                    {categorias?.slice(0, 6).map((categoria, index) => {

                        return (
                            <button
                                key={index}
                                className={styles.categorias__item}
                                onClick={handleCategoria}
                            >

                                {categoria}
                            </button>
                        )

                    })}

                </div>
            </section>
        </>

    )
}

export default Categorias