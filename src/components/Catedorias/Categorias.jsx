import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../hooks/GlobalContext'
import styles from './Categorias.module.scss'
import CategoriaIcon from '../../assets/icons/todas.svg'
import BeautyIcon from "../../assets/icons/beauty.svg";
import FragrancesIcon from "../../assets/icons/fragrances.svg";
import FurnitureIcon from "../../assets/icons/furniture.svg";
import GroceriesIcon from "../../assets/icons/groceries.svg";
import HomeDecorationIcon from "../../assets/icons/home-decoration.svg";
import KitchenAccessoriesIcon from "../../assets/icons/kitchen-accessories.svg";


const Categorias = ({ setOpenModal }) => {
    const [categorias, setCategorias] = useState([])
    const [categoria, setCategoria] = useState([])
    const global = useContext(GlobalContext)

    const categoryIcones = {
        todos: CategoriaIcon,
        beauty: BeautyIcon,
        fragrances: FragrancesIcon,
        furniture: FurnitureIcon,
        groceries: GroceriesIcon,
        "home-decoration": HomeDecorationIcon,
        "kitchen-accessories": KitchenAccessoriesIcon,
    };


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
                    <button onClick={() => setOpenModal(true)}>Ver todas <span>›</span></button>

                </div>


                <div className={styles.categorias__list}>

                    <button
                        className={`${styles.categorias__item} ${
                                    global.categoria === "Todos"
                                    ? styles.categorias__item__active
                                    : ""
                                
                                }`}
                        onClick={() => global.setCategoria("Todos")}
                    >
                        <img src={categoryIcones.todos} alt={categoria} className={styles.categorias__icon} />
                        todos
                    </button>

                    {categorias?.slice(0, 6).map((categoria, index) => {

                        return (

                            <p

                                key={index}
                                className={`${styles.categorias__item} ${
                                    global.categoria === categoria
                                    ? styles.categorias__item__active
                                    : ""
                                
                                }`}
                                onClick={handleCategoria}
                            >
                                <img src={categoryIcones[categoria]} alt={categoria} className={styles.categorias__icon} />

                                {categoria}
                            </p>
                        )

                    })}

                </div>
            </section>
        </>

    )
}

export default Categorias