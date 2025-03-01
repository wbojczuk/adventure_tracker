"use client"

import styles from './header.module.css';
import { AppContext } from '../../misc/AppContext';
import { useContext, useEffect } from 'react';
export default function Header(){
    const {userSettings, settingsLoading} = useContext(AppContext)
    
    useEffect(()=>{
        console.log(userSettings)
    }, [userSettings])
return (
 <header className={styles.header}>

   <div className={styles.leftContainer}>
    <h2>Hey There!</h2>
    <h3>Let's Explore</h3>
    {/* {(!settingsLoading) && <span>Based in {userSettings.homeState}</span>} */}
   </div>
 
    <img src='/img/headers/home-header.webp' alt='Image of outdoors' className='bg-img' />
    <div style={{backgroundColor: "rgba(255,255,255,.86)"}} className='shader'></div>
 </header>
)};