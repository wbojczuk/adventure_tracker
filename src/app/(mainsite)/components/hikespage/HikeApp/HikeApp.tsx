"use client"

import { useEffect, useState } from "react"




export default function HikeApp(props: {children: any}){

   // ENSURE COMPONENT USES CLIENT
   const [children, setChildren] = useState(<></>)

   useEffect(()=>{
      setChildren(props.children)
   }, [])
    
return (
 <>
    {children}
 </>
)};