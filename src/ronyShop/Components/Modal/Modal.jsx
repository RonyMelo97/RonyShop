import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Modal.module.scss'
import { GlobalContext } from '../../GlobalContext'
import { useLocation } from 'react-router-dom'

const Modal = () => {

    const [loading, setLoading] = useState(false)
    const [dados, setDados] = useState(null)
    const [amount, setAmount] = useState(1)
    const [valorTotal, setValorTotal] = useState(0)
    const global = useContext(GlobalContext)
    const location = useLocation()
    const modalRef = useRef(null)

    // Calcula o preço total do carrinho com descontos etc **FOOTER DO CARRINHO
    const totais = global.carrinho.reduce((acumulador, produto) => {
        const subtotal = produto.price * produto.quantidade;
        const desconto = subtotal * (produto.discountPercentage / 100);
        const totalProduto = subtotal - desconto;

        acumulador.total = acumulador.total + subtotal
        acumulador.totalComDesconto = acumulador.totalComDesconto + totalProduto
        return acumulador;
    }, {
        total: 0,
        totalComDesconto: 0
    })


    // Adiciona a quantidade de produtos no carrinho e trabalha ja os preços conforme a quantidade, validade se a quantidade nao é maior que o estoque
    function addPrice(id) {
        const newCarrinho = global.carrinho.map((produto) => {
            if (produto.id === id) {
                if (produto.quantidade >= produto.stock) {
                    alert(`Esse produto so tem ${produto.stock} unidades em estoque`)
                    return {
                        ...produto,
                        quantidade: produto.quantidade

                    }
                }
            }
            if (produto.id === id) {
                return {
                    ...produto,
                    quantidade: produto.quantidade + 1,
                    total: produto.quantidade * produto.price,
                }
            }
            return produto
        })
        global.setCarrinho(newCarrinho)
    }

    // Remove a quantidade de produtos no carrinho e trabalha ja os preços conforme a quantidade, avisa se a quantidade for maior que o estoque
    function removePrice(id) {
        const newCarrinho = global.carrinho.map((produto) => {
            if (produto.id === id) {
                if (produto.quantidade > 1) {
                    return {
                        ...produto,
                        quantidade: produto.quantidade - 1,
                        total: produto.price * produto.quantidade
                    }
                } else {
                    alert('Para remover o produto click na lixeira')
                }
            }
            return produto
        })
        global.setCarrinho(newCarrinho)
    }

    // Remove o item do carrinho
    function remove(id) {
        const newCarrinho = global.carrinho.filter(produto => produto.id !== id)
        global.setCarrinho(newCarrinho)
    }

    // Fecha o modal quando eu clicar fora dele
    useEffect(() => {
        document.addEventListener('mousedown', handleModal);

        return () => {
            document.removeEventListener('mousedown', handleModal);
        };
    }, []);

    function handleModal(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            global.closeModal();
        }
    }

    // Fecha o modal quando a pagina muda
    useEffect(() => {
        global.closeModal(false)
    }, [location])

    if (global.modal)
        return (
            <>
                <div className={styles.modalOverlay}></div>
                <section ref={modalRef} className={`${styles.modal} modalAnime`}>
                    <div className={styles.modal__header}>
                        <h2>Meu carrinho</h2>

                        <div
                            onClick={global.closeModal}
                            className={styles.modal__close}
                        >
                            <span>×</span>
                        </div>
                    </div>

                    <div className={styles.modal__box}>
                        {global.carrinho.map((produto) => {
                            //Esse Calcula o valor de cada produto, com desconto e sem desconto
                            const produtoSubtotal = produto.quantidade * produto.price
                            const produtoDesconto = produtoSubtotal * (produto.discountPercentage / 100)
                            const produtoTotal = produtoSubtotal - produtoDesconto

                            return (
                                <div
                                    key={produto.id}
                                    className={styles.modal__content}
                                >
                                    <div className={styles.modal__image}>
                                        <img
                                            src={produto.thumbnail}
                                            alt={produto.title}
                                        />
                                    </div>

                                    <div className={styles.modal__info}>
                                        <h3>{produto.title}</h3>

                                        <p className={styles.modal__priceOld}>
                                            R$ {(produto.price * produto.quantidade).toFixed(2)}
                                        </p>

                                        <p className={styles.modal__price}>
                                            {produtoTotal.toFixed(2)}

                                        </p>

                                        <span className={styles.modal__discount}>
                                            {produto.discountPercentage.toFixed(0)}% OFF
                                        </span>
                                    </div>

                                    <div className={styles.modal__actions}>
                                        <div className={styles.modal__amount}>
                                            <button onClick={() => removePrice(produto.id)}>
                                                -
                                            </button>

                                            <p>{produto.quantidade}</p>

                                            <button onClick={() => addPrice(produto.id)}>
                                                +
                                            </button>
                                        </div>

                                        <button
                                            className={styles.modal__trash}
                                            onClick={() => remove(produto.id)}
                                        >
                                            🗑
                                        </button>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    <div className={styles.modal__footer}>
                        <div className={styles.modal__resume}>
                            <div>
                                <span>Subtotal</span>
                                <strong>R$ {totais.total.toFixed(2)}</strong>
                            </div>

                            <div>
                                <span>Frete</span>
                                <strong>Grátis</strong>
                            </div>
                        </div>

                        <div className={styles.modal__total}>
                            <span>Total</span>
                            <strong>R$ {totais.totalComDesconto.toFixed(2)}</strong>
                        </div>

                        <button className={styles.modal__checkout}>
                            Finalizar compra
                        </button>
                    </div>
                </section>
            </>
        )
}

export default Modal