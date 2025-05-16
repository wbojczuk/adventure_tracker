import L from "leaflet"
import kmtomiles from "../controllers/kmtomiles"
import milesToMeters from "../controllers/milestometers"

// 
// ------------ SCRIPT IS LOADED IN CLIENT, HAS ACCESS TO CLIENT OBJECTS ------------
// 



// ------------ Start Filter Hikes ------------

interface filterSettingsType{
    lat: number,
    long: number,
    distance?: number,
    state?: string,
    isHiked?: boolean,
    
}

function filterHikes(map: L.Map, circle: L.Circle, setCircle:any, startMarker: L.Marker, setStartMarker: any, data: hikeType[], newSettings: filterSettingsType){
    let defaultSettings: filterSettingsType = {
        distance: -1,
        state: "undefined",
        lat: 0,
        long: 0,
        isHiked: null!,

    }

    const startLocIcon = new L.Icon({
      iconUrl: '/icons/startloc.png',
      shadowUrl: '/icons/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    

     const settings = {...defaultSettings, ...newSettings}

    let newData = data



    if(startMarker.getLatLng() !== L.latLng(settings.lat, settings.long)){
        map.removeLayer(startMarker)
        const startMarkerTemp = L.marker([settings.lat, settings.long], {icon: startLocIcon})
        startMarkerTemp.bindPopup("Start Location")
        startMarkerTemp.addTo(map)
        setStartMarker(startMarkerTemp)
    }
     
     function getDistance(map: any, lat1: number, long1: number, lat2: number, long2: number){
            return Math.round(kmtomiles(map.distance( L.latLng(lat1, long1),  L.latLng(lat2, long2)) / 1000))
    }

    if(settings.isHiked !== null){
        newData = newData.filter((data, i)=>{
        return (data.isHiked == settings.isHiked)
    })
    }

    if(settings.distance! != -1){
     newData = newData.filter((data, i)=>{
        return (getDistance(map, settings.lat, settings.long, data.lat, data.long) <= settings.distance!)
    })


    // Draw Circle
    if(circle !== null){
        map.removeLayer(circle)
    }
    const newCircle = L.circle([settings.lat, settings.long], {radius: milesToMeters(settings.distance!), fill: false, color: "var(--primary-hiking)"})

    setCircle(newCircle)
    newCircle.addTo(map)

    }else{
      if(circle !== null){
        map.removeLayer(circle)
        }  
    }


    if(settings.state != "undefined"){
       newData = newData.filter((data)=>{
            return (data.state.trim().toLowerCase() == settings.state!.trim().toLowerCase())
        })
        
    }
    return newData
}

// ------------ End Filter Hikes ------------


export {filterHikes}