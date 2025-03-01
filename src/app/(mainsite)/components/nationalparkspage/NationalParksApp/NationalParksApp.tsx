"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import styles from './nationalparksapp.module.css';
import { getNationalParksUserData } from '@/app/(mainsite)/controllers/nationalParksHelpers';
import AllNationalParks from '../AllNationalParks/AllNationalParks';

import getNationalParksData from '@/app/(mainsite)/controllers/getNationalParksData';
import Loading from '../../misc/Loading/Loading';



export default function NationalParksApp(){
    const {isAuthenticated, isLoading} = useKindeBrowserClient()
    
    

    const [nationalParksData, setNationalParksData]= useState([])
    const [newNationalParksData, setNewNationalParksData]: [newNationalParksData: nationalParkType[], setNewNationalParksData: any] = useState([])
    const [isAppLoading, setIsAppLoading] = useState(true)

    useEffect(()=>{
        if(!isLoading){
            if(isAuthenticated){
                mergeData() 
            }else{
                //@ts-ignore
                setNewNationalParksData(getNationalParksData())
                setIsAppLoading(false)
            }
        }

        async function mergeData(){
            const userData = await getNationalParksUserData();
            if(userData.nationalparks && userData.nationalparks.length > 0){
                let newData: nationalParkType[] = []
            getNationalParksData().forEach((data, i)=>{
                const newObj = data;
                data.isVisited = userData.nationalparks[i].isVisited
                newData.push(newObj)
            })
            setNewNationalParksData(newData)
            }else{
                setNewNationalParksData(getNationalParksData())
            }
            
            
            setIsAppLoading(false)
        }

    }, [isLoading])

   
return (
 <div className={styles.fishApp}>
    {(isAppLoading) &&
    <Loading type='parks' />
    }
    {(!isAppLoading) && <>
        <Header nationalParksData={newNationalParksData} /> 
    <AllNationalParks setNationalParksData={setNewNationalParksData} nationalParksData={newNationalParksData} />
    </>}
 </div>
)};