"use client"

import { useEffect, useState } from 'react';
import styles from './quoteoftheday.module.css';
import getQuoteOfTheDay from '@/app/(mainsite)/controllers/getQuoteOfTheDay';

export default function QuoteOfTheDay(){

const [quote, setQuote] = useState("Loading Wisdom...")

useEffect(()=>{
    getQuote()
    async function getQuote(){
        // 

        const data = await getQuoteOfTheDay()
        setQuote(data.quote)
    }
}, [])

return (
 <div className={styles.quoteOfTheDay}>
    <h4>Quote of the Day</h4>
    <p>{quote}</p>
 </div>
)};