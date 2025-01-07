"use client"
import dynamic from 'next/dynamic';
import React, { useRef, useState } from 'react'
import "./randomfish.css"
import anim from "./dice.json"

import gsap from 'gsap'

export default function RandomFish(props: {fishData: fishType[]}) {

  const Lottie = dynamic(() => import('react-lottie-player/dist/LottiePlayerLight'), { ssr: false });

  const animationRef: any = useRef()
  const animationRef2: any = useRef()
  const cardRef: any = useRef()

  const [playAnim, setPlayAnim] = useState(false)
  const [goTo, setGoTo] = useState(0)
  const [currentCard, setCurrentCard]: [fishType, any] = useState(props.fishData[0])

  function getRandomFish():fishType{
    const eligibleFish = props.fishData.filter((data)=>{
      return (!data.isCaught)
    })
    const randomIndex = Math.floor(Math.random() * eligibleFish.length)
    return (eligibleFish.length > 0) ? eligibleFish[randomIndex] : props.fishData[0]
  }

  function showAnimation(){
    cardRef.current.ontransitionend = null
    animationRef2.current.ontransitionend = null
    animationRef.current.style.opacity = 1
    animationRef2.current.style.opacity = 1
    animationRef2.current.style.display = "initial"
    animationRef.current.style.pointerEvents = "all"
    //@ts-ignore
    setGoTo(undefined)
    setPlayAnim(true)
    setCurrentCard(getRandomFish())
  }

  function showCard(){
    animationRef2.current.ontransitionend = ()=>{
      animationRef2.current.style.display = "none"
      setGoTo(0)
      cardRef.current.style.display = "initial"
      gsap.fromTo(cardRef.current, {
        opacity: 0,
        scale: 0,
      },{
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "bounce.out"
      })

    }
    animationRef2.current.style.opacity = 0

  }

  function closeAnim(){
    cardRef.current.ontransitionend = ()=>{
      cardRef.current.style.display = "none";
      animationRef.current.style.pointerEvents = "none"
      animationRef.current.style.opacity = 0
    }
    cardRef.current.style.opacity = 0;
  }

  return (
    <>
    <button onClick={()=>{showAnimation()}} id="randomFish">Pick Random Fish <span className="icon">🎣</span></button>

    <div ref={animationRef} id="animationWrapper">
    <div ref={animationRef2} id="animation">
    {(typeof document !== undefined) && <Lottie
        animationData={anim}
        play={playAnim}
        loop={false}
        goTo={goTo}
        onComplete={()=>{
          setPlayAnim(false)
          showCard()
        }}
        ></Lottie>}
    </div>
    <div ref={cardRef} className="fish-card" id="chanceCard">
        {/* <img className="status-icon" src={(currentCard.isCaught) ? "/img/complete.svg" : "/img/incomplete.svg"}/> */}
        <img src={currentCard.imgSrc} aria-hidden className="fish-img" />
        <h3>{currentCard.name}</h3>
        <button onClick={closeAnim} className="changestatus">Close</button>
      </div>
</div>
</>
  )
}
