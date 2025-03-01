"use client"
import "./header.css"
import RandomFish from '../RandomFish/RandomFish'
import getStateName from "@/app/(mainsite)/controllers/getStateName"

export default function Header(props: {fishData: fishType[], state: string}) {
  const stateName = getStateName(props.state)
  return (
    <header className={"header"}>

        <h1>All Freshwater Fish Of {stateName} Catch Tracker</h1>

        <div className="center">
            <RandomFish fishData={props.fishData} />
        </div>
    
        <img src='/img/headers/fish-header.webp' alt='Image of Fish' className='bg-img' />
        <div className='shader'></div>
    </header>
  )
}
