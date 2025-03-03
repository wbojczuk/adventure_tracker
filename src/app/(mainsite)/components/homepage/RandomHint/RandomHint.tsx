"use client"

import { useEffect, useState } from 'react';
import styles from './randomhint.module.css';
import getRandomHint from '@/app/(mainsite)/controllers/getRandomHint';

export default function RandomHint(){

    const randomHintS = getRandomHint()

    const [randomHint, setRandomHint] = useState("")
    useEffect(()=>{
        setRandomHint(randomHintS)
    }, [])

return (
 <div className={styles.quoteOfTheDay}>
    <h4>Helpul Hint:</h4>
    <p>{randomHint}</p>
 </div>
)};