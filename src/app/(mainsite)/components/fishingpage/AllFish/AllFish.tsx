import React, { useEffect, useRef, useState } from 'react'
import "./allfish.css"
import saveFishData from '@/app/(mainsite)/controllers/saveFishData'
import Filter from '../Filter/Filter'

export default function AllFish(props: {fishData: fishType[], setFishData: any}) {
  const [displayFish, setDisplayFish] = useState(props.fishData)
  const [filteredFish, setFilteredFish] = useState(props.fishData)
  const [selectedFilter, setSelectedFilter] = useState(1)


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
    props.fishData.forEach((fish: fishType, i: number)=>{
      if(fish.id == id){
        const newFishData = [...props.fishData]
        newFishData[i].isCaught = !newFishData[i].isCaught
        saveFishData(newFishData, props.setFishData)
      }
    })
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
