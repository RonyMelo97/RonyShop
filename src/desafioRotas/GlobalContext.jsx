import React, { createContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

// todas funções e variaveis feitas nesse arquivo, pode ser usada em qualquer lugar apenas adicionas global. antes por exemplo global.modal
export const GlobalContext = createContext();
export const GlobalStorage = ({ children }) => {
    const [carrinho, setCarrinho] = useState([])
    const [modal, setModal] = useState(false)
    const [categoria, setCategoria] = useState('beauty')
    // Fecha o modal
    function openModal() {
        setModal(true)
    }
    // Abri o modal
    function closeModal() {
        setModal(false)
    }

    return (
        <GlobalContext.Provider value={{
            carrinho,
            setCarrinho,
            modal,
            setModal,
            closeModal,
            openModal,
            categoria,
            setCategoria
        }}>
            {children}
        </GlobalContext.Provider>
    );
}