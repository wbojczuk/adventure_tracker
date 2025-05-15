"use client"
// @ts-ignore
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import L from 'leaflet';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import 'leaflet-defaulticon-compatibility';
import styles from './hikesmap.module.css';
import { useEffect, useState } from 'react';
import kmtomiles from '@/app/(mainsite)/controllers/kmtomiles';
import { hikeData } from '@/app/(mainsite)/data/hikeData';
import milesToMeters from '@/app/(mainsite)/controllers/milestometers';


export default function HikesMap(){
    let [map, setMap]: [map: L.Map, setMap: any] = useState(null!)
    let [markers, setMarkers] = useState([])
    let [circle, setCircle]: [circle: L.Circle, setCircle: any] = useState(null!)


 const isOnMobile = window.matchMedia('(max-width: 649px)').matches;
let mapZoom = 6
 

// STATES
const [filteredHikes, setFilteredHikes]: [filteredHikes: hikeType[], setFilteredHikes: any] = useState(hikeData)




 

 const hikedIcon = new L.Icon({
  iconUrl: '/icons/hikedloc.png',
  shadowUrl: '/icons/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const notHikedIcon = new L.Icon({
  iconUrl: '/icons/nothikedloc.png',
  shadowUrl: '/icons/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

    // MAP INIT


    useEffect(()=>{
        setMap(L.map('map', {
        center: L.latLng(33.247875, -83.441162),
        zoom: mapZoom,
        }))
    }, [])


    // MAP REFRESH/BUILD

    useEffect(()=>{
        if(markers.length > 0){
            markers.forEach((marker)=>{
                map.removeLayer(marker)
            })
        }
         if(map !== null){
            
            map.invalidateSize()

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(map);


        // Add Hike Markers
        const markersTemp: any = []
        filteredHikes.forEach((hike, i)=>{
            console.log(i)
            const marker = L.marker([hike.lat, hike.long], {icon: (hike.isHiked) ? hikedIcon : notHikedIcon})
            markersTemp.push(marker)
            marker.addTo(map).bindPopup(`${hike.name}<br>Difficulty: ${hike.difficulty}/10<br>Length: ${hike.length} Miles<br><a href="/hike/${hike.id}">More Info</a>`)
        })
        setMarkers(markersTemp)
         }
        
    }, [filteredHikes, map])


    // --------------- HELPERS ---------------

    function getDistance(map: any, lat1: number, long1: number, lat2: number, long2: number){
        return Math.round(kmtomiles(map.distance( L.latLng(lat1, long1),  L.latLng(lat2, long2)) / 1000))
    }

    
interface filterSettingsType{
    lat: number,
    long: number,
    distance?: number,
    state?: string
}

// ------------ Start Filter Hikes ------------

function filterHikes(map: L.Map, data: hikeType[], newSettings: filterSettingsType){
    let defaultSettings: filterSettingsType = {
        distance: -1,
        state: "undefined",
        lat: 0,
        long: 0
    }

     const settings = {...defaultSettings, ...newSettings}

    let newData = hikeData
     
     function getDistance(map: any, lat1: number, long1: number, lat2: number, long2: number){
            return Math.round(kmtomiles(map.distance( L.latLng(lat1, long1),  L.latLng(lat2, long2)) / 1000))
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

    }

    if(settings.state != "undefined"){
       newData = newData.filter((data)=>{
            return (data.state.trim().toLowerCase() == settings.state!.trim().toLowerCase())
        })
        
    }
    return newData
}

// ------------ End Filter Hikes ------------



function changeFilter(){
      setFilteredHikes(filterHikes(map, hikeData, {long: -85.1687, lat: 34.2565, distance: 100}))
    }

return (
 <>
 <div onClick={changeFilter}>PRESS TO CHANGE FILTER</div>
 <div className={styles.hikesMap}>
    <div className="center">
        <div id="map" className={styles.map}>

        </div>
    </div>

     <img src='/img/hikingmapbg.webp' alt='Image of mountain' className='bg-img' />
    <div className='shader' style={{backgroundColor: "rgba(255,255,255,.77)"}}></div>
 </div>
 </>
)};