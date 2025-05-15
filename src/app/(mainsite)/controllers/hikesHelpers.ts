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

// interface filterSettingsType{
//     lat: number,
//     long: number,
//     distance?: number,
//     state?: string
// }

// function filterHikes(map: L.Map, data: hikeType[], newSettings: filterSettingsType){
//     let defaultSettings: filterSettingsType = {
//         distance: -1,
//         state: "undefined",
//         lat: 0,
//         long: 0
//     }

//      const settings = {...defaultSettings, ...newSettings}

//     let newData = hikeData
     
//      function getDistance(map: any, lat1: number, long1: number, lat2: number, long2: number){
//             return Math.round(kmtomiles(map.distance( L.latLng(lat1, long1),  L.latLng(lat2, long2)) / 1000))
//     }

//     if(settings.distance! != -1){
//      newData = newData.filter((data, i)=>{
//         return (getDistance(map, settings.lat, settings.long, data.lat, data.long) <= settings.distance!)
//     })
//     }

//     if(settings.state != "undefined"){
//        newData = newData.filter((data)=>{
//             return (data.state.trim().toLowerCase() == settings.state!.trim().toLowerCase())
//         })
        
//     }
//     return newData
// }



export {getHikesUserData, saveHikesUserData}