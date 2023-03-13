import { csrfFetch } from "./csrf";



//type
const get_all_spots = 'spots/getSpots'
//const get_spots = 'spots/getSpot'



//action creators
const Spots = (data) => {
    return{
        type: get_all_spots,
        data
    }
}



//thunks
export const getAllSpots = () => async (dispatch) => {
    const res = await fetch('api/spots')

    if(res.ok){
        const data = await res.json()
        dispatch(Spots(data))
    }
}



//reducers
const initialState = {all : {},one : {}}

export const SpotsReducer = (state = initialState,action) => {
    let newState;
    let all;
    let one;
    switch (action.type){
        case get_all_spots:
            const allSpots = {...state}
            all = {}
            action.data.Spots.forEach(spot => [
                all[spot.id] = spot
            ])
            allSpots.all = all
            return allSpots

        // case clear_state:
        //     newState={...state}
        //     one={...action.data}
        //     newState.one=one
        //     return newState
        
        default:
            return state
    }
    

}