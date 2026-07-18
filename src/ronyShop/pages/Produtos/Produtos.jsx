import React, { useContext, useEffect, useState } from 'react'
import styles from './Produtos.module.scss'
import { Link } from 'react-router-dom'
import Head from '../../Components/Head/Head'
import { GlobalContext } from '../../hooks/GlobalContext'
import Categorias from '../../Components/Catedorias/Categorias'
import Search from '../../Components/Search/Search'

const Produtos = () => {
  const [dados, setDados] = useState()
  const [loading, setLoading] = useState(false)
  const global = useContext(GlobalContext)
  const [search, setSearch] = useState('')
  const [visible, setVisible] = useState(30)


  //Faz um filtro procura se existe algum produto pelo title com o valor digitado na pesquisa, e joga esse valor na variavel 
  const produtosFiltrados = dados?.products?.filter((produto) =>
    produto.title.toLowerCase().includes(search.toLowerCase())
  );

  //Aqui estou usando o slice, para falar quantos produtos vao ser exibidos, começando com 30
  const produtosVisiveis = produtosFiltrados?.slice(0, visible)

  //Limpa a barra de pesquisa quando trocamos a categoria e coloca pra ser visualizado apenas 30
  useEffect(() => {
    setSearch('')
    setVisible(30)
  }, [global.categoria])

  //quando a buscar for realizado, colocamos denovo a quantidade de produtos visualizados em 30
  useEffect(() => {
    setVisible(30)
  }, [search])



  // Da um Fetch na api e tras todos os produtos
  useEffect(() => {
    let urlApi = 'Todos'
    if (global.categoria === 'Todos') {
      urlApi = 'https://dummyjson.com/products?limit=194'
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

          <input
            type="text"
            value={search}
            placeholder='Pesquisar'
            onChange={(event) => setSearch(event.target.value)}
          />

          {produtosVisiveis?.map((produto) => {
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
        {dados?.products?.length > 30 && <button className={styles.products__more} onClick={() => setVisible((prev) => prev + 30)}>Carregar mais</button>}
      </section >
    </>
  )
}

export default React.memo(Produtos)