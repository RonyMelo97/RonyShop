import React, { useContext, useEffect, useState } from 'react'
import styles from './Produtos.module.scss'
import { Link } from 'react-router-dom'
import Head from '../Head/Head'
import { GlobalContext } from '../GlobalContext'
import Categorias from '../Components/Catedorias/Categorias'

const Produtos = () => {
  const [dados, setDados] = useState()
  const [loading, setLoading] = useState(false)
  const global = useContext(GlobalContext)


  // Da um Fetech na api e tras todos os produtos
  useEffect(() => {
    let urlApi = 'Todos'
    if (global.categoria === 'Todos') {
      urlApi = 'https://dummyjson.com/products'
    } else {
      urlApi = `https://dummyjson.com/products/category/${global.categoria}`
    }

    setLoading(true)
    fetch(urlApi)
      .then(response => response.json())
      .then(json => {
        setDados(json)
        setLoading(false)
      })
  }, [global.categoria])
  if (dados === null) return null
  return (
    <>
      <Head title="Produtos" />
      <section className={`${styles.products} animeLeft`}>

        <h1>Produtos</h1>
        <Categorias />
        <div className={styles["products__content--loading"]}>
          {dados?.products?.slice(0, 1).map((produto) => {
            if (loading) return (
              <div className={styles.products__loading}></div>
            )
          })}
        </div>
        <div className={styles.products__content}>


          {dados?.products?.map((produto) => {
            //Esse Calcula o valor de cada produto, com desconto e sem desconto

            const produtoDesconto = produto.price * (produto.discountPercentage / 100)
            const produtoTotal = produto.price - produtoDesconto

            return (
              < div className={styles.products__card} key={produto.id} >
                <Link className={styles.products__link} to={`produto/${produto.id}`}>
                  <img className={styles.products__img} src={produto.thumbnail} alt={produto.title} />
                  <h2 className={styles.products__title} >{produto.title}</h2>
                  <p className={styles.products__price}>R$ {produto.price}</p>
                  <p className={styles.products__descount}>R$ {produtoTotal.toFixed(2)} <span>{produto.discountPercentage.toFixed(0)}% Off Frete grátis</span></p>

                </Link>
              </div>
            )
          })}
        </div>
      </section >
    </>
  )
}

export default Produtos