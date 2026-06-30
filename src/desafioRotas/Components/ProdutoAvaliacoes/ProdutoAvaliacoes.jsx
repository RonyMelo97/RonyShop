import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styles from './ProdutoAvaliacoes.module.scss'

const ProdutoAvaliacoes = () => {
    //Trata a url, e deixa apenas o id do produto
    const location = useLocation()
    const newPagina = location.pathname.replace('/produto/', '')
    const pagina = newPagina.replace('/avaliacoes', '')


    const [loading, setLoading] = useState(false)
    const [dados, setDados] = useState(null)
    const [error, setError] = useState(null)
    const params = useParams();

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
        fetchProduto(`https://dummyjson.com/products/${pagina}`)
    }, [params]);


    if (error) return <p>{error}</p>
    if (dados === null) return null;
    return (
        <section className={styles.reviews}>

            <div className={styles.reviews__header}>
                <h2>Avaliações dos clientes</h2>
                <p>Veja o que nossos clientes estão dizendo.</p>
                <p>({dados.reviews.length} Avaliações)</p>
            </div>

            <div className={styles.reviews__content}>
                {dados?.reviews?.map((comentario) => {



                    
                    const primeiroNome = comentario.reviewerName.split('')[0];
                    const sobreNome = comentario.reviewerName.split('')[1];

                    const data = comentario.date.replace("T09:41:02.053Z", "")
                    const newData = data.replaceAll("-", "/")

                    return (
                        <article className={styles.reviews__card}>
                            <div className={styles.reviews__top}>
                                <div className={styles.reviews__avatar}>
                                    {primeiroNome}{sobreNome}
                                </div>
                                <div>
                                    <h3>{comentario.reviewerName}</h3>
                                    <div className={styles.reviews__stars}>
                                        <span className={`${styles.reviews__star} ${comentario.rating >= 1 ? styles['reviews__star--filled'] : ''}`}>★</span>
                                        <span className={`${styles.reviews__star} ${comentario.rating >= 2 ? styles['reviews__star--filled'] : ''}`}>★</span>
                                        <span className={`${styles.reviews__star} ${comentario.rating >= 3 ? styles['reviews__star--filled'] : ''}`}>★</span>
                                        <span className={`${styles.reviews__star} ${comentario.rating >= 4 ? styles['reviews__star--filled'] : ''}`}>★</span>
                                        <span className={`${styles.reviews__star} ${comentario.rating >= 5 ? styles['reviews__star--filled'] : ''}`}>★</span>
                                    </div>
                                </div>
                            </div>
                            <p className={styles.reviews__date}>
                                Publicado em {newData}
                                {/*  18 de Junho de 2026 */}
                            </p>
                            <p className={styles.reviews__text}>
                                {comentario.comment}<br />
                            </p>
                        </article>
                    )
                })}
            </div>

        </section>
    )
}

export default ProdutoAvaliacoes