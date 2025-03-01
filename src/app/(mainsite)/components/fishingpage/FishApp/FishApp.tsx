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



export default function FishApp(){
    const {isAuthenticated, isLoading} = useKindeBrowserClient()
    
    

    const [fishData, setFishData]= useState([])
    const [newFishData, setNewFishData]: [newFishData: fishType[], setNewFishData: any] = useState([])
    const [isAppLoading, setIsAppLoading] = useState(true)
    const [currentState, setCurrentState] = useState("ga")

    useEffect(()=>{
        if(!isLoading){
            if(isAuthenticated){
                mergeData() 
            }else{
                //@ts-ignore
                setNewFishData(getFishData())
                setIsAppLoading(false)
            }
        }

        async function mergeData(){
            const userData = await getFishUserData(currentState);
            let newData: fishType[] = []
            getFishData().forEach((data, i)=>{
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
        <Header fishData={newFishData} /> 
    <AllFish currentState={currentState} setFishData={setNewFishData} fishData={newFishData} />
    <Footer />
    </>}
 </div>
)};