"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../misc/AppContext';
import Header from '../Header/Header';
import styles from './fishapp.module.css';
import { getFishUserData } from '@/app/(mainsite)/controllers/fishHelpers';
import AllFish from '../AllFish/AllFish';
import Footer from '../Footer/Footer';
import getFishData from '@/app/(mainsite)/controllers/getFishData';
import Loading from '../../misc/Loading/Loading';



export default function FishApp({currentState}: {currentState: string}){

    const {isAuthenticated, isLoading} = useKindeBrowserClient()
    const {setIsSyncing, changeFishIsCaught, mergedFishData, fishUserData} = useContext(AppContext)
    
    

    const [fishData, setFishData]= useState([])
    const [newFishData, setNewFishData]: [newFishData: fishType[], setNewFishData: any] = useState([])
    const [isAppLoading, setIsAppLoading] = useState(true)
    

    useEffect(()=>{
        if(!isLoading){
            if(isAuthenticated){
                setData() 
            }else{
                //@ts-ignore
                setNewFishData(getFishData(currentState))
                setIsAppLoading(false)
            }
        }

        async function setData(){
            
            if(mergedFishData != null){
                setNewFishData(mergedFishData[`${currentState}`])
                
                
            }else{
                setNewFishData(getFishData(currentState))
            }
            setIsAppLoading(false)
            
        }

    }, [isLoading, mergedFishData,fishUserData])

   
return (
 <div className={styles.fishApp}>
    {(isAppLoading) &&
    <Loading type='fish' />
    }
    {(!isAppLoading) && <>
        <Header state={currentState} fishData={newFishData} /> 
    <AllFish currentState={currentState} fishData={newFishData} />
    <Footer />
    </>}
 </div>
)};