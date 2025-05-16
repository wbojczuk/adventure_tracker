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
import { filterHikes } from '@/app/(mainsite)/helpers/hikesmap';


export default function HikesMap(){
    //  ------------ STATES ------------
    const [map, setMap]: [map: L.Map, setMap: any] = useState(null!)
    const [markers, setMarkers] = useState([])
    const [circle, setCircle]: [circle: L.Circle, setCircle: any] = useState(null!)
    const [filteredHikes, setFilteredHikes]: [filteredHikes: hikeType[], setFilteredHikes: any] = useState(hikeData)

    const [isHikedFilter, setIsHikedFilter]: [isHikedFilter: boolean, setIsHikedFilter: any] = useState(null!)
    const [distanceFilter, setDistanceFilter]: [distanceFilter: number, setDistanceFilter: any] = useState(-1)


    const isOnMobile = window.matchMedia('(max-width: 649px)').matches;
    let mapZoom = 6
 






 

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

        document.querySelectorAll(`.${styles.filter}`).forEach((elem)=>{
            elem.addEventListener("click", (evt: any)=>{
                document.querySelectorAll(`.${styles.filter}`).forEach((elem)=>{
                if(evt.currentTarget == elem){
                    elem.classList.add(styles.activeFilter)
                }else{
                    elem.classList.remove(styles.activeFilter)
                }

                })
        })
        })
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


    // FILTER UPDATER
    useEffect(()=>{
       if(map !== null){
         setFilteredHikes(filterHikes(map, circle, setCircle, hikeData,
            {
            long: -85.1687,
            lat: 34.2565,
            distance: distanceFilter,
            isHiked: isHikedFilter}))
       }
    }, [isHikedFilter])


    // 


    // --------------- HELPERS --------------

    function setActiveFilter(evt: any){
        
    }
    


function changeFilter(){
      setIsHikedFilter(()=>!isHikedFilter)
    }

return (
 <>
 <div className={styles.hikesMap}>
    <div className={styles.filtersWrapper}>
        <button onClick={(()=>{setIsHikedFilter(null)})} className={styles.filter}>All Hikes</button>
        <button onClick={(()=>{setIsHikedFilter(false)})} className={styles.filter}>Not Hikes</button>
        <button onClick={(()=>{setIsHikedFilter(true)})} className={styles.filter}>Is Hiked</button>
    </div>
    <div className="center">
        <div id="map" className={styles.map}>

        </div>
    </div>

     <img src='/img/hikingmapbg.webp' alt='Image of mountain' className='bg-img' />
    <div className='shader' style={{backgroundColor: "rgba(255,255,255,.77)"}}></div>
 </div>
 </>
)};