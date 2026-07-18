import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Produtos from './ronyShop/pages/Produtos/Produtos'
import Contato from './ronyShop/pages/Contato/Contato'
import Header from './ronyShop/Components/Header/Header'
import NaoEncontrada from './ronyShop/pages/NaoEncontrada/NaoEncontrada'
import Produto from './ronyShop/pages/Produto/Produto'
import Footer from './ronyShop/Components/Footer/Footer'
import Modal from './ronyShop/Components/Modal/Modal'
import { GlobalStorage } from './ronyShop/hooks/GlobalContext'
import ProdutoDescricao from './ronyShop/Components/ProdutoDescricao/ProdutoDescricao'
import ProdutoAvaliacoes from './ronyShop/Components/ProdutoAvaliacoes/ProdutoAvaliacoes'

const App = () => {
    return (
        <GlobalStorage>
            <BrowserRouter>
                <Header />
                <Modal />
                <Routes>
                    <Route path='/' element={<Produtos />} />
                    <Route path='produto/:id' element={<Produto />} >
                        <Route index element={<ProdutoDescricao />} />
                        <Route path='avaliacoes' element={<ProdutoAvaliacoes />} />
                    </Route>
                    <Route path='/contato' element={<Contato />} />
                    <Route path='*' element={<NaoEncontrada />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </GlobalStorage>
    )
}

export default App
