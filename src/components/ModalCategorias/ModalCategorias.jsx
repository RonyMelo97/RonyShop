import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../hooks/GlobalContext'
import styles from './ModalCategorias.module.scss'
import categoriaIcon from '../../assets/icons/todas.svg'
import BeautyIcon from "../../assets/icons/beauty.svg";
import FragrancesIcon from "../../assets/icons/fragrances.svg";
import FurnitureIcon from "../../assets/icons/furniture.svg";
import GroceriesIcon from "../../assets/icons/groceries.svg";
import HomeDecorationIcon from "../../assets/icons/home-decoration.svg";
import KitchenAccessoriesIcon from "../../assets/icons/kitchen-accessories.svg";
import LaptopsIcon from "../../assets/icons/laptops.svg";
import MensShirtsIcon from "../../assets/icons/mens-shirts.svg";
import MensShoesIcon from "../../assets/icons/mens-shoes.svg";
import MensWatchesIcon from "../../assets/icons/mens-watches.svg";
import MobileAccessoriesIcon from "../../assets/icons/mobile-accessories.svg";
import MotorcycleIcon from "../../assets/icons/motorcycle.svg";
import SkinCareIcon from "../../assets/icons/skincare.svg";
import SmartphonesIcon from "../../assets/icons/smartphones.svg";
import SportsAccessoriesIcon from "../../assets/icons/sports-accessories.svg";
import SunglassesIcon from "../../assets/icons/sunglasses.svg";
import TabletsIcon from "../../assets/icons/tablets.svg";
import TopsIcon from "../../assets/icons/tops.svg";
import VehicleIcon from "../../assets/icons/vehicle.svg";
import WomensBagsIcon from "../../assets/icons/bags.svg";
import WomensDressesIcon from "../../assets/icons/womens-dresses.svg";
import WomensJewelleryIcon from "../../assets/icons/jewellery.svg";
import WomensShoesIcon from "../../assets/icons/womens-shoes.svg";
import WomensWatchesIcon from "../../assets/icons/womens-watches.svg";

const ModalCategorias = ({ openModal, setOpenModal }) => {
    const [categorias, setCategorias] = useState([])
    const [catVisiveis, setCatVisiveis] = useState(16)
    const global = useContext(GlobalContext)

    const categoryIcones = {
        beauty: BeautyIcon,
        fragrances: FragrancesIcon,
        furniture: FurnitureIcon,
        groceries: GroceriesIcon,
        "home-decoration": HomeDecorationIcon,
        "kitchen-accessories": KitchenAccessoriesIcon,
        laptops: LaptopsIcon,
        "mens-shirts": MensShirtsIcon,
        "mens-shoes": MensShoesIcon,
        "mens-watches": MensWatchesIcon,
        "mobile-accessories": MobileAccessoriesIcon,
        motorcycle: MotorcycleIcon,
        "skin-care": SkinCareIcon,
        smartphones: SmartphonesIcon,
        "sports-accessories": SportsAccessoriesIcon,
        sunglasses: SunglassesIcon,
        tablets: TabletsIcon,
        tops: TopsIcon,
        vehicle: VehicleIcon,
        "womens-bags": WomensBagsIcon,
        "womens-dresses": WomensDressesIcon,
        "womens-jewellery": WomensJewelleryIcon,
        "womens-shoes": WomensShoesIcon,
        "womens-watches": WomensWatchesIcon,
    };

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
        setOpenModal(false)

    }

    //Função do botão ver mais 
    function seeMore() {
        setCatVisiveis(catVisiveis + 4)
    }
    //função que fecha o modal 
    function closeModal(){
        setOpenModal(false)
        setCatVisiveis(16)
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


                    <div
                        onClick={closeModal}
                        className={styles.modal__close}
                    ></div>
                </div>

                <div className={styles.categorias__list}>

                    {categorias?.slice(0, catVisiveis).map((categoria, index) => {
                        return (
                            <button
                                key={index}
                                className={styles.categorias__item}
                                onClick={handleCategoria}
                            >
                                <img src={categoryIcones[categoria]} alt={categoria} className={styles.categorias__icon} />
                                <span className={styles.categorias__nome}>{categoria}</span>

                            </button>
                        )

                    })}

                </div>

                {catVisiveis < categorias.length &&
                    <button onClick={seeMore} className={styles.modalCategorias__more}>
                        Carregar mais categorias
                    </button>
                }


            </div>

        </>
    )
}

export default ModalCategorias
