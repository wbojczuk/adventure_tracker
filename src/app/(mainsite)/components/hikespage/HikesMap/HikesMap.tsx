"use client"
// @ts-ignore
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import L from 'leaflet';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import 'leaflet-defaulticon-compatibility';
import styles from './hikesmap.module.css';
import { useEffect } from 'react';
import kmtomiles from '@/app/(mainsite)/controllers/kmtomiles';
import { hikeData } from '@/app/(mainsite)/data/hikeData';

export default function HikesMap(){
 const isOnMobile = window.matchMedia('(max-width: 649px)').matches;
let mapZoom = 8
if(isOnMobile){
    mapZoom = 6
}

 
let hikedIcon
 hikedIcon = new L.Icon({
  iconUrl: '/icons/hikedloc.png',
  shadowUrl: '/icons/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let notHikedIcon
notHikedIcon = new L.Icon({
  iconUrl: '/icons/nothikedloc.png',
  shadowUrl: '/icons/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

    // MAP INIT
    useEffect(()=>{

        const map = L.map('map', {
        center: L.latLng(33.247875, -83.441162),
        zoom: mapZoom,
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(map);


        // Add Hike Markers
        hikeData.forEach((hike, i)=>{
            L.marker([hike.lat, hike.long], {icon: (hike.isHiked) ? hikedIcon : notHikedIcon}).addTo(map).bindPopup(`${hike.name}<br>Difficulty: ${hike.difficulty}/10<br>Length: ${hike.length} Miles<br><a href="/hike/${hike.id}">More Info</a>`)
        })

        
    }, [])


    // --------------- HELPERS ---------------

    function getDistance(map: any, lat1: number, long1: number, lat2: number, long2: number){
        return Math.round(kmtomiles(map.distance( L.latLng(lat1, long1),  L.latLng(lat2, long2)) / 1000))
    }



return (
 <div className={styles.hikesMap}>
    <div className="center">
        <div id="map" className={styles.map}>

        </div>
    </div>
 </div>
)};