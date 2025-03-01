"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import styles from './fishapp.module.css';
import { getFishUserData } from '@/app/(mainsite)/controllers/fishHelpers';
import AllFish from '../AllFish/AllFish';
import Footer from '../Footer/Footer';
import getFishData from '@/app/(mainsite)/controllers/getFishData';
import Loading from '../../misc/Loading/Loading';



export default function FishApp({currentState}: {currentState: string}){

    const {isAuthenticated, isLoading} = useKindeBrowserClient()
    
    

    const [fishData, setFishData]= useState([])
    const [newFishData, setNewFishData]: [newFishData: fishType[], setNewFishData: any] = useState([])
    const [isAppLoading, setIsAppLoading] = useState(true)
    

    useEffect(()=>{
        if(!isLoading){
            if(isAuthenticated){
                mergeData() 
            }else{
                //@ts-ignore
                setNewFishData(getFishData(currentState))
                setIsAppLoading(false)
            }
        }

        async function mergeData(){
            
            const userData = await getFishUserData(currentState);
            let newData: fishType[] = []
            getFishData(currentState).forEach((data, i)=>{
                const newObj = data;
                if(userData && userData.hasOwnProperty("fish") && userData.fish.hasOwnProperty(currentState)){
                    data.isCaught = userData.fish[currentState][i].isCaught
                }
                newData.push(newObj)
            })
            
            setNewFishData(newData)
            setIsAppLoading(false)
        }

    }, [isLoading])

   
return (
 <div className={styles.fishApp}>
    {(isAppLoading) &&
    <Loading type='fish' />
    }
    {(!isAppLoading) && <>
        <Header state={currentState} fishData={newFishData} /> 
    <AllFish currentState={currentState} setFishData={setNewFishData} fishData={newFishData} />
    <Footer />
    </>}
 </div>
)};