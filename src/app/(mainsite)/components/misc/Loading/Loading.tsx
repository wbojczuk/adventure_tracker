"use client"

import "./loading.css"

import dynamic from "next/dynamic";

import fishAnim from "./anim/fish.json"
import { useEffect, useRef, useState } from 'react';

interface loadingProps{
  type: string
}



export default function Loading(props: loadingProps) {
  const Lottie = dynamic(() => import('react-lottie-player/dist/LottiePlayerLight'), { ssr: false });
    const wrapperElem: any = useRef();

    let loadingAnim

    switch(props.type){
      case "fish":
        loadingAnim = fishAnim
      break;

      default:
        loadingAnim = fishAnim
    }

  return (
    <>
   <div
    ref={wrapperElem}
    style={{display: "inline-flex"}}
    id="messageSuccess">
        <div id="messageSuccessWrapper">
            <Lottie
            animationData={loadingAnim}
            play={true}
            loop={true}
            ></Lottie>
        </div>
    </div>
    </>
  )
}
