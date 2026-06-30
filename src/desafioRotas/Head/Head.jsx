import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Head = (props) => {
    //Mexe no title de todas as paginas, 
    useEffect(() => {
        document.title = `Loja - `+ props.title;
    },[props])
    return (
        <></>
    )
}

export default Head