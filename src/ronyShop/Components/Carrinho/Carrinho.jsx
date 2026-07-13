import React, { Children, useContext, useState } from 'react'
import carrinhoIcon from '../../images/carrinho.png'
import styles from './Carrinho.module.scss'
import { GlobalContext } from '../../GlobalContext'

const Carrinho = () => {
    const global = useContext(GlobalContext)
    // Função do click que abri o modal
    function openModal(){
        global.setModal(true)
    }
    // O carrinho so aparece se a quantidade de itens dele for maior que 0
    if(global.carrinho.length > 0)
    return (
        <section className='animeLeft'>
            <div onClick={openModal} className={styles.carrinho}>
                <img src={carrinhoIcon} alt="Carrinho" />
                <span>{global.carrinho.length}</span>
            </div>
        </section>
    )
}

export default Carrinho