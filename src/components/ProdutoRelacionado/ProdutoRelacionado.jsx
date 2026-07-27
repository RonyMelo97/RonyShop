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
            <h2 className={styles.product__subtitle}>Produtos relacionados</h2>
            <div className={styles.product__relatedGrid}>
                {dados?.products.slice(0, 8).map((produto, idex) => {
                    const produtoDesconto = produto.price * (produto.discountPercentage / 100)
                    const produtoTotal = produto.price - produtoDesconto
                    const produtoJuros = produtoTotal / 12

                    return (
                        <article key={produto.id} className={styles.product__card}>
                            <Link className={styles.product__link} to={`../produto/${produto.id}`}>
                                <img className={styles.product__img} src={produto.thumbnail} alt={produto.title} />
                                <h3 className={styles.product__title}>{produto.title}</h3>
                                <h2 className={styles.product__rating}>
                                    ★ {produto.rating}
                                </h2>
                                <p className={styles.product__descount}>R$ {produtoTotal.toFixed(2)}
                                    <span className={styles.product__price}>R$ {produto.price}</span>
                                </p>

                                <span className={styles.product__fees}>12x de R$ {produtoJuros.toFixed(2)}</span>
                                <span className={styles.product__freeShipping}>Frete grátis</span>

                                <span className={styles.product__freeShipping2}>-{produto.discountPercentage.toFixed(0)}%</span>
                            </Link>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}

export default ProdutoRelacionado