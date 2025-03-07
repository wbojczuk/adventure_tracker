"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useEffect, useState, useContext } from 'react';
import Header from '../Header/Header';
import styles from './nationalparksapp.module.css';
import { getNationalParksUserData } from '@/app/(mainsite)/controllers/nationalParksHelpers';
import AllNationalParks from '../AllNationalParks/AllNationalParks';

import getNationalParksData from '@/app/(mainsite)/controllers/getNationalParksData';
import Loading from '../../misc/Loading/Loading';
import { AppContext } from '../../misc/AppContext';



export default function NationalParksApp(){
    const {isAuthenticated, isLoading} = useKindeBrowserClient()
    
    

    const [nationalParksData, setNationalParksData]= useState([])
    const [newNationalParksData, setNewNationalParksData]: [newNationalParksData: nationalParkType[], setNewNationalParksData: any] = useState([])
    const [isAppLoading, setIsAppLoading] = useState(true)
    const {setIsSyncing, changeFishIsCaught, mergedNationalParksData, nationalParksUserData} = useContext(AppContext)

    useEffect(()=>{
           if(!isLoading){
               if(isAuthenticated){
                   setData() 
               }else{
                   //@ts-ignore
                   setNewNationalParksData(getNationalParksData())
                   setIsAppLoading(false)
               }
           }
   
           async function setData(){
               
               if(mergedNationalParksData != null){
                   setNewNationalParksData(mergedNationalParksData)
                   
                   
               }else{
                setNewNationalParksData(getNationalParksData())
               }
               setIsAppLoading(false)
               
           }
   
       }, [isLoading, mergedNationalParksData,nationalParksUserData])

   
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