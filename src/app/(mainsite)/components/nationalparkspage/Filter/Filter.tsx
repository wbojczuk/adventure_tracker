import React, { useEffect, useRef, useState } from 'react'
import "./filter.css"

export default function Filter(props:{setFilteredNationalParks: any, displayNationalParks: nationalParkType[]}) {

    const [currentVal, setCurrentVal] = useState("")
    const inputRef: any = useRef()

    useEffect(()=>{
        const text = (currentVal).trim()
        if(text !== ""){
            const regEx = new RegExp(`${text}`, "i")
            const newData = props.displayNationalParks.filter((data)=>{
                return(regEx.test(data.name) == true)
                
            })

            props.setFilteredNationalParks(newData)
        }else{
            props.setFilteredNationalParks(props.displayNationalParks)
        }
    }, [props.displayNationalParks, currentVal])


    function changeHandler(evt: any){
        setCurrentVal(evt.currentTarget.value)
    }

  return (
    <input id="filterInput" ref={inputRef} type="text" placeholder='Search' onInput={changeHandler} />
  )
}
