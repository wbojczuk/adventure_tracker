"use client"

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { AppContext } from '../../misc/AppContext';
import { useContext } from "react"
import React, { useEffect, useRef, useState } from 'react'
import "./allnationalparks.css"
import {saveNationalParksUserData} from "../../../controllers/nationalParksHelpers"
import Filter from '../Filter/Filter'

export default function AllNationalParks(props: {nationalParksData: nationalParkType[], setNationalParksData: any}) {
  const [displayNationalParks, setDisplayNationalParks] = useState(props.nationalParksData)
  const [filteredNationalParks, setFilteredNationalParks] = useState(props.nationalParksData)
  const [selectedFilter, setSelectedFilter] = useState(1)
  const {isAuthenticated} = useKindeBrowserClient()
  const {setIsSyncing, changeNationalParkIsVisited} = useContext(AppContext)
  


  const nationalParksCards = filteredNationalParks.map((data: nationalParkType, i: number)=>{
    return(
      <div className="nationalpark-card" key={i}>

        {(data.isVisited) && <svg className={`status-icon complete`} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M14 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8M4.93 5.82A8.01 8.01 0 0 0 2 12a8 8 0 0 0 8 8c.64 0 1.27-.08 1.88-.23c-1.76-.39-3.38-1.27-4.71-2.48A6 6 0 0 1 4 12c0-.3.03-.59.07-.89C4.03 10.74 4 10.37 4 10c0-1.44.32-2.87.93-4.18m13.16.26L19.5 7.5L13 14l-3.79-3.79l1.42-1.42L13 11.17"></path></svg>}
        {(!data.isVisited) && <svg className={`status-icon incomplete`} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M14 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8m0 2c3.32 0 6 2.69 6 6c0 3.32-2.68 6-6 6a6 6 0 0 1-6-6a6 6 0 0 1 6-6M4.93 5.82A8.01 8.01 0 0 0 2 12a8 8 0 0 0 8 8c.64 0 1.27-.08 1.88-.23c-1.76-.39-3.38-1.27-4.71-2.48A6 6 0 0 1 4 12c0-.3.03-.59.07-.89C4.03 10.74 4 10.37 4 10c0-1.44.32-2.87.93-4.18"></path></svg>}
        
        <img src={data.logo} alt={data.name} className="nationalpark-img" />
        
        <button onClick={()=>{
          changeIsVisited(data.id)
        }} className="changestatus">Mark As {(data.isVisited) ? "Unvisited" : "Visited"}</button>
      </div>
    )
  })


  // HELPERS
   function changeIsVisited(id: number){
    if(isAuthenticated){
      changeNationalParkIsVisited(id)
    }else{
      alert("Please Log In/Sign Up To Save Data")
    }
    
  }

  

  useEffect(()=>{
    if(selectedFilter == 0){
      setDisplayNationalParks(props.nationalParksData)

    }else if(selectedFilter == 1){
      setDisplayNationalParks((old)=>{
        return props.nationalParksData.filter((data)=>{
          return (!data.isVisited == true)
        })
      })

    }else if(selectedFilter == 2){
      setDisplayNationalParks((old)=>{
              return props.nationalParksData.filter((data)=>{
                return (data.isVisited == true)
              })
            })
    }
  }, [selectedFilter, props.nationalParksData])
  

  return (
    <section id="allNationalParks">
        <h1>National Parks</h1>

        <div id="filterWrapper">
        <div onClick={()=>{setSelectedFilter(1)}} className={`filter ${(selectedFilter == 1) ? "active" : ""}`}>Unvisited</div>
        <div onClick={()=>{setSelectedFilter(2)}} className={`filter ${(selectedFilter == 2) ? "active" : ""}`}>Visited</div>
          <div onClick={()=>{setSelectedFilter(0)}} className={`filter ${(selectedFilter == 0) ? "active" : ""}`}>All</div>

          <Filter setFilteredNationalParks={setFilteredNationalParks} displayNationalParks={displayNationalParks} />
          
          
        </div>

        <div id="allNationalParksWrapper">
          {nationalParksCards}
        </div>
    </section>
  )
}
