"use client"
import "./header.css"

export default function Header(props: {nationalParksData: nationalParkType[]}) {
  return (
    <header className={"national-park-header"}>

        <h1>All National Parks Tracker</h1>

        <div className="center">
            {/* <RandomFish fishData={props.fishData} /> */}
        </div>
    
        <img src='./img/national-park-header.webp' alt='Image of National Park' className='bg-img' />
        <div className='shader'></div>
    </header>
  )
}
