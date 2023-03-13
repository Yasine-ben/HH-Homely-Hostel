import React from "react"
import { Link } from "react-router-dom"



async function dogPicFetch(){
    try{
        const doggieRes = await fetch('https://dog.ceo/api/breeds/image/random')
        
        if(!doggieRes.ok){
            throw new Error(`Failed to fetch posts: ${doggieRes.status}`)
        }
        return doggieRes.json()
    }catch(e){
        console.log('error->', e )
    }
}    

 function PageNotFound(){
    const pic = dogPicFetch()
    console.log(pic)
    
    
    return(
        
        <>
            <div className="page-card">
                <h1>Whoops!</h1>
                <h3>404 Page Not Found</h3>
                <img src={} alt="cute dogo pic" />
                <h2>Looks like this page went on vacation</h2>
                <h4>Try our <Link to='/'>homepage</Link> instead.</h4>
            </div>
        </>
    )
}

export default PageNotFound