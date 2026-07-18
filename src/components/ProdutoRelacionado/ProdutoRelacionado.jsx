import React, { useEffect, useState } from 'react'
import styles from './Produto.Relacionado.module.scss'
import { useParams, Link } from 'react-router-dom'

const ProdutoRelacionado = ({ categoria }) => {

    const [dados, setDados] = useState(null)
    const [loading, setLoading] = useState(false)
    const params = useParams();
    //Consumindo api no edpoint, de categorias, categoria é um props, que vai ser usado em outra pagina na renderização dos produtos relacionados
    useEffect(() => {
        setLoading(true)
        fetch(`https://dummyjson.com/products/category/${categoria}`)
            .then(response => response.json())
            .then(json => {
                setDados(json)
                setLoading(false)
            })
    }, [])

    if (dados === null) return null
    return (
        <section className={styles.product__related}>
            <h2>Produtos relacionados</h2>
            <div className={styles.product__relatedGrid}>
                {dados?.products.slice(0, 8).map((produto, idex) => {
                    const produtoDesconto = produto.price * (produto.discountPercentage / 100)
                    const produtoTotal = produto.price - produtoDesconto

                    return (
                        <article key={produto.id} className={styles.product__card}>
                            <Link to={`../produto/${produto.id}`}>
                                <img src={produto.thumbnail} alt={produto.title} />
                                <h3>{produto.title}</h3>
                                <p className={styles.product__price}>R$ {produto.price.toFixed(2)}</p>
                                <p className={styles.product__descount}>R$ {produtoTotal.toFixed(2)} <span>{produto.discountPercentage.toFixed(0)}% Off Frete grátis</span></p>
                            </Link>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}

export default ProdutoRelacionado