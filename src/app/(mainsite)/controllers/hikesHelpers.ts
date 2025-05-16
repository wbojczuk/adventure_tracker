import L from "leaflet"
import kmtomiles from "./kmtomiles"
import { hikeData } from "../data/hikeData"

async function getHikesUserData(){
    
    try{
        const fetchData = await fetch(`/api/hikes`, {
            method: "GET",
            cache: "no-store"
        })

        const results = await fetchData.json()
        return results
    
    }catch(err){
        console.error(err)
        return Promise.reject()
    }
}

export default async function saveHikesUserData(data: hikeType[]){
    try{
        await fetch(`/api/hikes`, {
            method:"PUT",
            body: JSON.stringify(data)
        })
        return Promise.resolve()
    }catch(err){
        console.error(err)
        return Promise.reject(err)
    }
}

export {getHikesUserData, saveHikesUserData}