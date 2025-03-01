"use client"

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./loading.css"

import { useRef } from 'react';

interface loadingProps{
  type: string
}



export default function Loading(props: loadingProps) {
    const wrapperElem: any = useRef();

    let loadingAnim

    switch(props.type){
      case "fish":
        loadingAnim = "/loading/fish.lottie"
      break;

      case "parks":
        loadingAnim = "/loading/parks.lottie"
      break;

      default:
        loadingAnim =  "/loading/fish.lottie"
    }

  return (
    <>
   <div
    ref={wrapperElem}
    style={{display: "inline-flex"}}
    id="messageSuccess">
        <div id="messageSuccessWrapper">
           <DotLottieReact autoplay loop src={loadingAnim}></DotLottieReact>
        </div>
    </div>
    </>
  )
}
