import React, { useState } from 'react'

const Search = (props) => {
    const produtos = [
        'maça',
        'uva',
        'banana',
        'abacaxi'
    ]

    const [search, setSearch] = useState('')
    const produtosFiltrados = props.produtos.filter((produto) =>
        produto.toLowerCase().includes(search.toLowerCase())
    );



    return (
        <div>
            <input
                type="text"
                value={search}
                placeholder='Pesquisar'
                onChange={(event) => setSearch(event.target.value)}
            />
            <ul>
                {produtosFiltrados.map((produto) => (
                    <li key={produto}>{produto}</li>
                ))}
            </ul>
        </div>
    )
}

export default Search