import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'



const ProdutoDescricao = () => {
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
        fetchProduto(`https://dummyjson.com/products/${params.id}`)
    }, [params]);


    const location = useLocation()


    if (error) return <p>{error}</p>
    if (dados === null) return null;
    return (
        <p>
            {dados.description}
        </p>
    )
}

export default ProdutoDescricao