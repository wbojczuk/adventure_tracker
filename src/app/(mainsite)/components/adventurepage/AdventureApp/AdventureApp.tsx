"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../misc/AppContext';

import styles from './adventureapp.module.css';
import Loading from '../../misc/Loading/Loading';



export default function AdventureApp({adventureId}: {adventureId: string}){

    const {isAuthenticated, isLoading} = useKindeBrowserClient()
    const {setIsSyncing, changeFishIsCaught} = useContext(AppContext)
    const [isAuth, setIsAuth]: [isAuth: boolean, setIsAuth: any] = useState(null!);
    
    

    const [isAppLoading, setIsAppLoading] = useState(true)
    

    useEffect(()=>{
        if(!isLoading){
            if(isAuthenticated){
                setData()
                setIsAuth(true)
            }else{
                setIsAuth(false)
                setIsAppLoading(false)
            }
        }

        async function setData(){
            
            setIsAppLoading(false)
            
        }

    }, [isLoading])

   
return (
 <div className={styles.fishApp}>
    {(isAppLoading) &&
    <Loading type='adventure' />
    }

    {(!isAppLoading) && <>



        {(!isAuth) && <>
            <h1 className={styles.notAuth}>Log In To View</h1>
        </>}
    </>}
 </div>
)};