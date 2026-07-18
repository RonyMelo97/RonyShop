import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Produtos from '../pages/Produtos/Produtos'
import Contato from '../pages/Contato/Contato'
import Header from '../components/Header/Header'
import NaoEncontrada from '../pages/NaoEncontrada/NaoEncontrada'
import Produto from '../pages/Produto/Produto'
import Footer from '../components/Footer/Footer'
import Modal from '../components/Modal/Modal'
import { GlobalStorage } from '../hooks/GlobalContext'
import ProdutoDescricao from '../components/ProdutoDescricao/ProdutoDescricao'
import ProdutoAvaliacoes from '../components/ProdutoAvaliacoes/ProdutoAvaliacoes'

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
