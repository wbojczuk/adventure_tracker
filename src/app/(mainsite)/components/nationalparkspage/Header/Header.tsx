"use client"
import "./header.css"
import RandomNationalPark from "../RandomNationalPark/RandomNationalPark"

export default function Header(props: {nationalParksData: nationalParkType[]}) {
  return (
    <header className={"national-park-header"}>

        <h1>All National Parks Tracker</h1>

        <div className="center">
           <RandomNationalPark nationalParkData={props.nationalParksData} />
        </div>
    
        <img src='./img/headers/national-park-header.webp' alt='Image of National Park' className='bg-img' />
        <div className='shader'></div>
    </header>
  )
}
