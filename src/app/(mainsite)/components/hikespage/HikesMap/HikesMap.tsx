"use client"
// @ts-ignore
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import L from 'leaflet';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import 'leaflet-defaulticon-compatibility';
import styles from './hikesmap.module.css';
import { useEffect, useRef, useState } from 'react';
import kmtomiles from '@/app/(mainsite)/controllers/kmtomiles';
import { hikeData } from '@/app/(mainsite)/data/hikeData';
import milesToMeters from '@/app/(mainsite)/controllers/milestometers';
import { filterHikes } from '@/app/(mainsite)/helpers/hikesmap';
import HikeDetails from '../HikeDetails/HikeDetails';
import { useContext } from 'react';
import { AppContext } from '../../misc/AppContext';
import Loading from '../../misc/Loading/Loading';
import Header from '../Header/Header';
import Banner from '../Banner/Banner';
import saveUserLatLong from '@/app/(mainsite)/controllers/userSettingsHelpers';
import "./rangeslider.css"
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';


export default function HikesMap(){
    //  ------------ STATES ------------
    // CONTEXT METHODS/PROPS
    const {setIsSyncing, userSettings, mergedHikeData, hikeUserData,setIsHikePaneVisible, setHikePaneData} = useContext(AppContext)
    const {isAuthenticated, isLoading} = useKindeBrowserClient()

    const [map, setMap]: [map: L.Map, setMap: any] = useState(null!)
    const [markers, setMarkers] = useState([])
    const [circle, setCircle]: [circle: L.Circle, setCircle: any] = useState(null!)
    
    const [startMarker, setStartMarker]: [startMarker: L.Marker, setStartMarker: any] = useState(null!)
    const [newHikeData, setNewHikeData]: [newHikeData: hikeType[], setNewHikeData:any] = useState(null!)
    const [filteredHikes, setFilteredHikes]: [filteredHikes: hikeType[], setFilteredHikes: any] = useState(newHikeData)
    const [isAppLoading, setIsAppLoading] = useState(true)

    const [latStart, setLatStart] = useState(34.2565)
    const[longStart, setLongStart] = useState(-85.1687)
    const [isHikedFilter, setIsHikedFilter]: [isHikedFilter: boolean, setIsHikedFilter: any] = useState(null!)
    const [distanceFilter, setDistanceFilter]: [distanceFilter: number, setDistanceFilter: any] = useState(-1)

    const [searchItems, setSearchItems] = useState([<></>])
    const [locationItems, setLocationItems] = useState([<></>])

    const [locationName, setLocationName] = useState("Type Location")
    const [currentDifficulty, setCurrentDifficulty] = useState([1,10])
    const [currentLength, setCurrentLength] = useState([0, 20])


    const searchTimer: any = useRef()
    const searchInputRef: any = useRef()


    

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
 const startLocIcon = new L.Icon({
  iconUrl: '/icons/startloc.png',
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
            if(!isLoading){
                if(isAuthenticated){
                    setData() 
                }else{
                    //@ts-ignore
                    setNewHikeData(hikeData)
                    setIsAppLoading(false)
                }
            }
    
            async function setData(){
                
                if(mergedHikeData != null){
                    setNewHikeData(mergedHikeData)
                    
                    
                }else{
                   setNewHikeData(hikeData)
                }
                setIsAppLoading(false)
                
            }
    
        }, [isLoading, mergedHikeData, hikeUserData])

        // SET USER SETTINGS HOOK
        useEffect(()=>{
            if(userSettings.startLat && userSettings.startLong){
                setLatStart(userSettings.startLat)
                setLongStart(userSettings.startLong)
            }
            if(userSettings.locName){
                setLocationName(userSettings.locName)
            }
        }, [userSettings])


    useEffect(()=>{
        if(newHikeData !== null && map === null){
            const mapTemp = L.map('map', {
        center: L.latLng(latStart, longStart),
        zoom: mapZoom,
        })

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(mapTemp);

        setMap(mapTemp)

        

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
        }
    }, [newHikeData])


    // MAP REFRESH/BUILD

    useEffect(()=>{
        if(filteredHikes !== null){
            if(markers.length > 0){
            markers.forEach((marker)=>{
                map.removeLayer(marker)
            })
        }
         if(map !== null){
            
            map.invalidateSize()

        

                if(startMarker === null){
                    const startMarkerTemp = L.marker([latStart, longStart], {icon: startLocIcon})
        startMarkerTemp.bindPopup("Start Location")
        startMarkerTemp.addTo(map)
        setStartMarker(startMarkerTemp)
                }



        // Add Hike Markers
        const markersTemp: any = []
        filteredHikes.forEach((hike, i)=>{
            const marker = L.marker([hike.lat, hike.long], {icon: (hike.isHiked) ? hikedIcon : notHikedIcon})
            markersTemp.push(marker)
            marker.addTo(map)
            .on('click', ()=>{
                setHikePaneData(hike)
                setIsHikePaneVisible(true)
            });
        })
        setMarkers(markersTemp)
         }
        }
        
    }, [filteredHikes, map])


    // FILTER UPDATER
    useEffect(()=>{
       if(map !== null){
        
            setFilteredHikes(filterHikes(map, circle, setCircle,startMarker, setStartMarker, newHikeData,
                {
                lat: latStart,
                long: longStart,
                distance: distanceFilter,
                isHiked: isHikedFilter,
                difficulty: currentDifficulty,
                length: currentLength
            }))

        }
    }, [isHikedFilter, distanceFilter, latStart, longStart, newHikeData, map, currentDifficulty, currentLength])


    // 


    // --------------- HELPERS --------------

    function setActiveFilter(evt: any){
        
    }

    function changeDistanceHandler(evt: any){
        if(evt.currentTarget.value){
            setDistanceFilter(evt.currentTarget.value)
        }else{
            setDistanceFilter(-1)
        }
    }

    async function saveUserLatLongSettings(data: any){
        setIsSyncing(true)
        await saveUserLatLong(data)
        setIsSyncing(false)
    }

    function getUserLocationHandler(){
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos)=>{
                // If Location Allowed
               setLatStart(pos.coords.latitude)
               setLongStart(pos.coords.longitude)
               saveUserLatLongSettings({startLat: pos.coords.latitude, startLong: pos.coords.longitude, locName: "Last Location"})
               setLocationName("Your Location")
            })
    }
}

function searchHandler(evt: any){
    const input = evt.currentTarget
    const val = evt.currentTarget.value
   if(val != ""){
     const regex = new RegExp(`${val}`, "gi")
    const newSearchItems = newHikeData.map((item, i)=>{
        if(regex.test(item.name)){
            return(
                <li key={i} onClick={()=>{
                setHikePaneData(item)
                setIsHikePaneVisible(true)
                setSearchItems([<></>])
                input.value = ""

            }}>{item.name}</li>
            )
        }
    }) 

    if(newSearchItems.length > 0){
        // @ts-ignore
        setSearchItems(newSearchItems!)
    }
   }else{
    setSearchItems([<></>])
   }
    
}



function typeLocationHandler(evt: any){
        const val = evt.currentTarget.value
    if(val == ""){
        setLocationItems([<></>])
        clearTimeout(searchTimer.current);
    }else{
         // FORCE REFRESH 1 SECOND AFTER LAST KEYPRESS
        clearTimeout(searchTimer.current);
        searchTimer.current = setTimeout(()=>{
            getGeoData(val);
        },500);
    }
    
}

function getGeoData(searchStr: string){
  
        fetch (`https://geocoding-api.open-meteo.com/v1/search?name=${searchStr}`)
        .then((res)=>res.json())
        .then((data)=>{parseGeoData(data);});

}

function parseGeoData(data: any){
    if(data.results){
        const newLocationItems = data.results.map((item: any, i: number)=>{
            return(
                <li key={i} onClick={()=>{
               setLatStart(item.latitude)
               setLongStart(item.longitude)
               saveUserLatLongSettings({startLat: item.latitude, startLong: item.longitude, locName: `${item.name}${(item.admin1) ? `, ${item.admin1}` : ""}`})
                setLocationName(`${item.name}${(item.admin1) ? `, ${item.admin1}` : ""}`)
                setLocationItems([<></>])
                searchInputRef.current.value = ""
            }}>{`${item.name}${(item.admin1) ? `, ${item.admin1}` : ""}`}</li>
            )
    }) 

    if(newLocationItems.length > 0){
        // @ts-ignore
        setLocationItems(newLocationItems!)
    }
    }else{
        setLocationItems([<></>])
    }
}

function getColor(difficulty: number): string{
     if(difficulty! < 4){
                // EASY
               return "#61c74f"
            }else if((difficulty! >= 4) && (difficulty! < 7)){
                // Medium
                return "#E6DC7D"
            }else if((difficulty! >= 7) && (difficulty! < 10)){
                // Hard
                return "#E65A5D"
            }else{
                // VERY HARD
                return "#632726"
            }
}

function difficultyHandler(val: [number, number]){
    setCurrentDifficulty(val)
    const elem = document.getElementById("range-slider")
    // @ts-ignore
    elem!.setAttribute("style", `--min-color: ${getColor(val[0])};--max-color: ${getColor(val[1])};`)
}

function lengthHandler(val: [number, number]){
    setCurrentLength(val)
}

return (
 <>
 {(isAppLoading) &&
     <Loading type='parks' />
     }
{(!isAppLoading) && <>
<Header filteredHikes={filteredHikes} />
<Banner />
 <div className={styles.hikesMap}>
    <div className={styles.filtersWrapper}>
        <button onClick={(()=>{setIsHikedFilter(null)})} className={`${styles.filter} ${styles.activeFilter}`}>All Hikes</button>
        <button onClick={(()=>{setIsHikedFilter(false)})} className={styles.filter}>Not Hiked</button>
        <button onClick={(()=>{setIsHikedFilter(true)})} className={styles.filter}>Hiked</button>
        
        <div className={styles.searchWrapper}>
            <input onInput={searchHandler} placeholder='Search'/>
            <ul>
                {searchItems}
            </ul>
        </div>
    </div>

    <div className="center">
        <div id="map" className={styles.map}>

        </div>
    </div>

    <div className={styles.distanceWrapper}>
        <div className={styles.distanceContainer}>

            <span>Showing hikes within </span> <input min={1} onInput={changeDistanceHandler} className={styles.distanceInput} type='number' placeholder='Any' /> <span> Miles of</span>

            <div className={styles.startLoc}>
                <div className={styles.searchLocWrapper}>
                    <input ref={searchInputRef} onInput={typeLocationHandler} className={styles.startLocInput} type="text" placeholder={locationName} />
                     <ul>
                        {locationItems}
                    </ul>
                </div>
                <button onClick={getUserLocationHandler} className={styles.getLoc}>Use Your Location</button>
            </div>
        </div>
    </div>

    <div className="center" style={{gap: "2rem"}}>
        <div className={styles.inputWrapper}>
            <label htmlFor="#range-slider">Difficulty</label>
            <RangeSlider onInput={difficultyHandler} id='range-slider' min={1} max={10} step={1} defaultValue={[1, 10]} />
            <span>{currentDifficulty[0] +  " - " + currentDifficulty[1]}</span>
        </div>

        <div className={styles.inputWrapper}>
            <label htmlFor="#range-slider">Length</label>
            <RangeSlider onInput={lengthHandler} id='range-sliderr' min={0} max={50} step={1} defaultValue={[0, 20]} />
            <span>{currentLength[0] +  " - " + currentLength[1]} Miles</span>
        </div>
    </div>

     <img src='/img/hikingmapbg.webp' alt='Image of mountain' className='bg-img' />
    <div className='shader' style={{backgroundColor: "rgba(255,255,255,.77)"}}></div>
 </div>
 <HikeDetails />
</>}
 </>
)}