import React, { useEffect, useRef, useState } from 'react'
import "./filter.css"

export default function Filter(props:{setFilteredFish: any, displayFish: fishType[]}) {

    const [currentVal, setCurrentVal] = useState("")
    const inputRef: any = useRef()

    useEffect(()=>{
        const text = (currentVal).trim()
        if(text !== ""){
            const regEx = new RegExp(`${text}`, "i")
            const newFish = props.displayFish.filter((data)=>{
                return(regEx.test(data.name) == true)
                
            })

            props.setFilteredFish(newFish)
        }else{
            props.setFilteredFish(props.displayFish)
        }
    }, [props.displayFish, currentVal])


    function changeHandler(evt: any){
        setCurrentVal(evt.currentTarget.value)
    }

  return (
    <input id="filterInput" ref={inputRef} type="text" placeholder='Search' onInput={changeHandler} />
  )
}
