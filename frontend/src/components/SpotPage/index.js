import React from "react"
import { useParams } from "react-router-dom"

function SpotPage(){
    const {spotId} = useParams()
    
    

    return(
        <h1>spot #{spotId}</h1>
    )
}

export default SpotPage