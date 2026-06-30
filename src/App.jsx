import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Produtos from './desafioRotas/Produtos/Produtos'
import Contato from './desafioRotas/Contato/Contato'
import Header from './desafioRotas/Header/Header'
import NaoEncontrada from './desafioRotas/NaoEncontrada'
import Produto from './desafioRotas/Produto/Produto'
import Footer from './desafioRotas/Footer/Footer'
import Modal from './desafioRotas/Components/Modal/Modal'
import { GlobalStorage } from './desafioRotas/GlobalContext'
import ProdutoDescricao from './desafioRotas/Components/ProdutoDescricao/ProdutoDescricao'
import ProdutoAvaliacoes from './desafioRotas/Components/ProdutoAvaliacoes/ProdutoAvaliacoes'

const App = () => {
    return (
        <GlobalStorage>
            <BrowserRouter>
                <Header />
                <Modal />
                <Routes>
                    <Route path='/' element={<Produtos />} />
                    <Route path='produto/:id' element={<Produto />} >
                        <Route path='/' element={<ProdutoDescricao />} />
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
