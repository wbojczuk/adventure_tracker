"use client"

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { AppContext } from '../../misc/AppContext';
import { useContext } from "react"
import React, { useEffect, useRef, useState } from 'react'
import "./allfish.css"
import {saveFishUserData} from "@/app/(mainsite)/controllers/fishHelpers"
import Filter from '../Filter/Filter'

export default function AllFish(props: {fishData: fishType[], setFishData: any, currentState: string}) {
  const [displayFish, setDisplayFish] = useState(props.fishData)
  const [filteredFish, setFilteredFish] = useState(props.fishData)
  const [selectedFilter, setSelectedFilter] = useState(1)
  const {isAuthenticated} = useKindeBrowserClient()
  const {setIsSyncing} = useContext(AppContext)
  


  const fishCards = filteredFish.map((data: fishType, i: number)=>{
    return(
      <div className="fish-card" key={i}>

        {(data.isCaught) && <svg className={`status-icon complete`} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M14 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8M4.93 5.82A8.01 8.01 0 0 0 2 12a8 8 0 0 0 8 8c.64 0 1.27-.08 1.88-.23c-1.76-.39-3.38-1.27-4.71-2.48A6 6 0 0 1 4 12c0-.3.03-.59.07-.89C4.03 10.74 4 10.37 4 10c0-1.44.32-2.87.93-4.18m13.16.26L19.5 7.5L13 14l-3.79-3.79l1.42-1.42L13 11.17"></path></svg>}
        {(!data.isCaught) && <svg className={`status-icon incomplete`} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M14 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8m0 2c3.32 0 6 2.69 6 6c0 3.32-2.68 6-6 6a6 6 0 0 1-6-6a6 6 0 0 1 6-6M4.93 5.82A8.01 8.01 0 0 0 2 12a8 8 0 0 0 8 8c.64 0 1.27-.08 1.88-.23c-1.76-.39-3.38-1.27-4.71-2.48A6 6 0 0 1 4 12c0-.3.03-.59.07-.89C4.03 10.74 4 10.37 4 10c0-1.44.32-2.87.93-4.18"></path></svg>}
        
        <img src={data.imgSrc} aria-hidden className="fish-img" />
        <h3>{data.name}</h3>
        
       {(data.id !== 9999999999) && <button onClick={()=>{
          changeIsCaught(data.id)
        }} className="changestatus">Mark As {(data.isCaught) ? "Incomplete" : "Completed"}</button>}
      </div>
    )
  })


  // HELPERS
   function changeIsCaught(id: number){
    if(isAuthenticated){
      props.fishData.forEach((fish: fishType, i: number)=>{
        if(fish.id == id){
          const newFishData = [...props.fishData]
          newFishData[i].isCaught = !newFishData[i].isCaught
          const saveData = newFishData.map((data, i)=>{
            return {
              id: data.id,
              isCaught: data.isCaught
            }
          })
          props.setFishData(newFishData)
          setIt(saveData)
        }
      })
    }else{
      alert("Please Log In/Sign Up To Save Data")
    }

    async function setIt(saveData: any){
      setIsSyncing(true)
      await  saveFishUserData(props.currentState, saveData)
      setIsSyncing(false)
    }
    
  }

  

  useEffect(()=>{
    if(selectedFilter == 0){
      setDisplayFish(props.fishData)

    }else if(selectedFilter == 1){
      setDisplayFish((old)=>{
        return props.fishData.filter((data)=>{
          return (!data.isCaught == true)
        })
      })

    }else if(selectedFilter == 2){
      setDisplayFish((old)=>{
              return props.fishData.filter((data)=>{
                return (data.isCaught == true)
              })
            })
    }
  }, [selectedFilter, props.fishData])
  

  return (
    <section id="allFish">
        <h1>Fish</h1>

        <div id="filterWrapper">
        <div onClick={()=>{setSelectedFilter(1)}} className={`filter ${(selectedFilter == 1) ? "active" : ""}`}>To-Catch</div>
        <div onClick={()=>{setSelectedFilter(2)}} className={`filter ${(selectedFilter == 2) ? "active" : ""}`}>Completed</div>
          <div onClick={()=>{setSelectedFilter(0)}} className={`filter ${(selectedFilter == 0) ? "active" : ""}`}>All Fish</div>

          <Filter setFilteredFish={setFilteredFish} displayFish={displayFish} />
          
          
        </div>

        <div id="allFishWrapper">
          {fishCards}
        </div>
    </section>
  )
}
