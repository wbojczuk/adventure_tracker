"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { ReactComponentElement, useContext, useEffect } from 'react';
import styles from './app.module.css';
import { AppContext } from '../AppContext';

export default function App(props: {children: any}){
    const {isAuthenticated, isLoading} = useKindeBrowserClient()
    const {initUserData} = useContext(AppContext)

    useEffect(()=>{
        if(isAuthenticated){
            initUserData()
        }
    }, [isAuthenticated, isLoading])
    
return (
 <>
    {props.children}
 </>
)};