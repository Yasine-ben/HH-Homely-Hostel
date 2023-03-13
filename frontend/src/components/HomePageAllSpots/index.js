import React from "react"
import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getAllSpots } from "../../store/spots"
import './HomePageAllSpots.css'
import {Link} from 'react-router-dom'

function HomePageAllSpots(){
    const spotsObj = useSelector(state => state.spots.all)
    let spots = []
    if(spotsObj){
        spots = Object.values(spotsObj)
    }
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpots())
        console.log(spots)
    },[dispatch])

    
    function handleClick(e){

    }

    return(
        <div className="all-spot-cards">
            {spots.map(spot => {
                return(
                <Link 
                    to="/"
                    className="spot-card" 
                    key={spot.name}
                    // onClick={handleClick()}
                >
                    <img className="spot-img" src={spot.previewImage}/>
                    <p className="city-state-p">{/* dont think i need this (check spot avg rating func in backend)*/}
                        {spot.city+","+spot.state}
                        <i className="fa-solid fa-star" >{spot.avgRating === 0 ? "New": spot.avgRating}</i>
                    </p> 
                    <p className="price-p">{`$${spot.price} night`}</p>
                    
                </Link> 
                )
            })}
           
        </div>
    )
}

export default HomePageAllSpots