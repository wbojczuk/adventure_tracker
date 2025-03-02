import clientPromise from "@/app/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET(req: Request){

    try{
        const client = await clientPromise
        const db = client.db("adventure_tracker")


        const cachedResults = await db.collection("daily")
        .findOne({name: "quote"}, {projection: {_id: 0} })

        const todaysDate = new Date()
        const cachedDate = new Date(parseInt(cachedResults.date))

        let response = cachedResults

        // CHECK IF UPDATE
        if( (todaysDate.getFullYear() > cachedDate.getFullYear()) || (todaysDate.getMonth() > cachedDate.getMonth()) || ( (todaysDate.getMonth() >= cachedDate.getMonth()) && (todaysDate.getDate() > cachedDate.getDate()) )){
            
            const fetchData = await fetch("http://api.quotable.io/random", {
            cache: "no-store"})
            const data = await fetchData.json()

            const newQuote = data.content
            response.quote = newQuote

            await db.collection("daily").updateOne(
                {name: "quote"},
                {$set: {
                    quote: newQuote,
                    date: todaysDate.getTime()
                }})
        }


        return NextResponse.json(response)
    }catch(err){
        return NextResponse.json({error: err}, {status: 500})
    }
}