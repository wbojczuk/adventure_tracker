"use client"
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import styles from './fishapp.module.css';
import getFishData from '@/app/(mainsite)/controllers/getFishData';
import AllFish from '../AllFish/AllFish';
import Footer from '../Footer/Footer';

export default function FishApp(){

    const [fishData, setFishData]= useState(getFishData())
    const [isLoading, setIsLoading] = useState(!(fishData.length > 1))

    useEffect(()=>{
        setIsLoading(!(fishData.length > 1))
    }, [fishData])

   
return (
 <div className={styles.fishApp}>
    {(!isLoading) && <>
        <Header fishData={fishData} /> 
    <AllFish setFishData={setFishData} fishData={fishData} />
    <Footer />
    </>}
 </div>
)};