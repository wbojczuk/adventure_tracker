"use client"
import dynamic from 'next/dynamic';
import React, { useRef, useState } from 'react'
import "./randomhike.css"
import anim from "./dice.json"
import { AppContext } from '../../misc/AppContext';
import { useContext } from 'react';
import gsap from 'gsap'

export default function RandomHike(props: {filteredHikes: hikeType[]}) {

  const {setHikePaneData, setIsHikePaneVisible} = useContext(AppContext)

  const Lottie = dynamic(() => import('react-lottie-player/dist/LottiePlayerLight'), { ssr: false });

  const animationRef: any = useRef()
  const animationRef2: any = useRef()
  const cardRef: any = useRef()

  const [playAnim, setPlayAnim] = useState(false)
  const [goTo, setGoTo] = useState(0)

  function getRandomHike(){
  
    const randomIndex = Math.floor(Math.random() * props.filteredHikes.length)
    const newHikeData = (props.filteredHikes.length > 0) ? props.filteredHikes[randomIndex] : props.filteredHikes[0]

    setHikePaneData(newHikeData)
    setIsHikePaneVisible(true)

  }

  function showAnimation(){
    animationRef2.current.ontransitionend = null
    animationRef.current.style.opacity = 1
    animationRef2.current.style.opacity = 1
    animationRef2.current.style.display = "initial"
    animationRef.current.style.pointerEvents = "all"
    //@ts-ignore
    setGoTo(undefined)
    setPlayAnim(true)
  }

  function closeAnim(){
      animationRef.current.style.pointerEvents = "none"
      animationRef.current.style.opacity = 0

  }



  return (
    <>
    <button onClick={()=>{showAnimation()}} id="randomHike">Pick Random Hike <span className="icon">🥾</span></button>

    <div ref={animationRef} id="animationWrapper1">
    <div ref={animationRef2} id="animation1">
    {(typeof document !== undefined) && <Lottie
        animationData={anim}
        play={playAnim}
        loop={false}
        goTo={goTo}
        onComplete={()=>{
          closeAnim()
          setPlayAnim(false)
          getRandomHike()
        }}
        ></Lottie>}
    </div>
</div>
</>
  )
}
