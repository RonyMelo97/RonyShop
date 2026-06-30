import React, { useContext, useEffect, useState } from 'react'
import { useParams, NavLink, Outlet } from 'react-router-dom'
import styles from './Produto.module.scss'
import Head from '../Head/Head'
import imgLoading from '../images/icon-loading.gif'
import { GlobalContext } from '../GlobalContext'
import Carrinho from '../Components/Carrinho/Carrinho'
import ProdutoRelacionado from '../Components/ProdutoRelacionado/ProdutoRelacionado'

const Produto = ({ imageIndex }) => {
    const [dados, setDados] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [amount, setAmount] = useState(1)
    const [galeria, setGaleria] = useState(0)
    const params = useParams();
    const global = useContext(GlobalContext)


    const produtoDesconto = dados?.price * (dados?.discountPercentage / 100)
    const produtoTotal = dados?.price - produtoDesconto


    // Adicona a quantidade de produtos, e valida se a quantidade adicionar nao passa da quantidade em estoque
    function addPrice() {
        if (amount >= dados.stock) {
            alert(`Esse produto so tem ${dados.stock} unidades em estoque`)
            return (setAmount(amount))

        }
        setAmount(amount => amount + 1)
    }

    //Remove a quantidade de produtos e nao deixa remover a ponto de ficar 0
    function removePrice() {
        if (amount > 1)
            setAmount(amount => amount - 1)
    }

    //Adicona o produto no carrinho, e manda todas as informações do produto adicionado ao carrinho
    function addCarrinho() {
        const found = global.carrinho.find((produto) => produto.id === dados.id);
        dados.quantidade = amount
        setDados({
            ...dados,
            quantidade: 1,
            total: 0

        })
        let newCarrinho = [...global.carrinho, dados]

        if (global.carrinho.length === 0) {
            global.setCarrinho(newCarrinho)
        }

        if (!found) {
            global.setCarrinho(newCarrinho)
        }
        setAmount(1)
    }

    // Vai a troca da thumb da galeria do produto
    function handleGaleria(index) {
        let newGaleria = index
        setGaleria(newGaleria)
    }

    // Faz o fetch na api, usando o useParams, para pegar o id do produto
    useEffect(() => {
        async function fetchProduto(url) {
            try {
                setLoading(true);
                const response = await fetch(url);
                const json = await response.json();
                setDados(json);
            } catch (erro) {
                setError('Um erro ocorreu')
            } finally {
                setLoading(false)
            }
        }
        fetchProduto(`https://dummyjson.com/products/${params.id}`)
    }, [params.id]);




    if (loading) return <div className={styles.product}><div className={styles.product__loading}></div></div>
    if (error) return <p>{error}</p>
    if (dados === null) return null;
    return (
        <>
            <section className={`${styles.product} q`}>
                <Head title={dados.title} />
                <div className={styles.product__content}>
                    <div className={styles.product__gallery}>
                        <div className={styles.product__thumbs}>
                            {dados.images.map((imagem, index) => (
                                <img key={index} onClick={() => handleGaleria(index)} src={imagem} alt={dados.title} />
                            ))}
                        </div>
                        <div className={styles.product__img}>
                            <img src={dados.images[galeria]} alt={dados.title} />
                        </div>
                    </div>

                    <div className={styles.product__info}>
                        <h1>{dados.title}</h1>
                        <span className={styles.product__category}>
                            Categoria: {dados.category} / Marca: {dados.brand}
                        </span>

                        <h2 className={styles.product__rating}>
                            ★ {dados.rating} <span>({dados.reviews.length} avaliações)</span>
                        </h2>


                        <p className={styles.product__price}>
                            <span className={styles.product__priceDescount}>
                                R$ {dados.price}
                            </span>
                            R$ {produtoTotal.toFixed(2)}
                        </p>



                        <p className={styles.product__installments}>
                            ou 12x de R$ {(dados.price / 12).toFixed(2)}  sem juros
                        </p>

                        <p className={styles.product__description}>
                            {dados.description}
                        </p>


                        <div className={styles.product__quantity}>
                            <span>Quantidade:</span>

                            <div className={styles.product__amount}>
                                <button onClick={removePrice}>-</button>
                                <p>{amount}</p>
                                <button onClick={addPrice}>+</button>
                            </div>
                        </div>

                        <button
                            className={styles.product__button}
                            onClick={addCarrinho}
                        >
                            Adicionar ao carrinho
                        </button>
                    </div>
                </div>

                <nav className={styles.product__tabs}>
                    <NavLink
                        to=""
                        end
                        className={styles.product__tab} activeClassName={styles.product__tabActive} >
                        Descrição
                    </NavLink>
                    <NavLink
                        to="avaliacoes"
                        className={styles.product__tab} activeClassName={styles.product__tabActive} >
                        Avaliações
                    </NavLink>
                </nav>

                <section className={styles.product__tabsContent}>
                    <Outlet />
                </section>



                <ProdutoRelacionado categoria={dados.category} />
            </section>

        </>

    )
}

export default Produto