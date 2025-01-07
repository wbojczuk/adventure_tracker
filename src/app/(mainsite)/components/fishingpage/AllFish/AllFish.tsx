"use client"

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

import React, { useEffect, useRef, useState } from 'react'
import "./allfish.css"
import {saveFishUserData} from "@/app/(mainsite)/controllers/fishHelpers"
import Filter from '../Filter/Filter'

export default function AllFish(props: {fishData: fishType[], setFishData: any, currentState: string}) {
  const [displayFish, setDisplayFish] = useState(props.fishData)
  const [filteredFish, setFilteredFish] = useState(props.fishData)
  const [selectedFilter, setSelectedFilter] = useState(1)
  const {isAuthenticated} = useKindeBrowserClient()


  const fishCards = filteredFish.map((data: fishType)=>{
    return(
      <div className="fish-card">
        <img className="status-icon" src={(data.isCaught) ? "./img/complete.svg" : "./img/incomplete.svg"}/>
        <img src={data.imgSrc} aria-hidden className="fish-img" />
        <h3>{data.name}</h3>
        
        <button onClick={()=>{
          changeIsCaught(data.id)
        }} className="changestatus">Mark As {(data.isCaught) ? "Incomplete" : "Completed"}</button>
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
          saveFishUserData(props.currentState, saveData)
        }
      })
    }else{
      alert("Please Log In/Sign Up To Save Data")
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
