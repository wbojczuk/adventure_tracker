"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import styles from './fishapp.module.css';
import { getFishUserData } from '@/app/(mainsite)/controllers/fishHelpers';
import AllFish from '../AllFish/AllFish';
import Footer from '../Footer/Footer';
import getFishData from '@/app/(mainsite)/controllers/getFishData';

export default function FishApp(){
    const {isAuthenticated} = useKindeBrowserClient()

    const [fishData, setFishData]= useState([])
    const [newFishData, setNewFishData]= useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentState, setCurrentState] = useState("ga")

    useEffect(()=>{
        if(isAuthenticated){
            mergeData() 
        }else{
            //@ts-ignore
            setNewFishData(getFishData())
            setIsLoading(false)
        }

        async function mergeData(){
            const userData = await getFishUserData(currentState);
            let newData: fishType[] = []
            getFishData().forEach((data, i)=>{
                const newObj = data;
                data.isCaught = userData.fish[currentState][i].isCaught
                newData.push(newObj)
            })
            
            setNewFishData(newData)
            setIsLoading(false)
            console.log(newData)
        }

    }, [isAuthenticated])

   
return (
 <div className={styles.fishApp}>
    {(!isLoading) && <>
        <Header fishData={newFishData} /> 
    <AllFish currentState={currentState} setFishData={setNewFishData} fishData={newFishData} />
    <Footer />
    </>}
 </div>
)};