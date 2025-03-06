import clientPromise from "@/app/lib/mongodb"
import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import typeChecker from "@/app/lib/typechecker"

export async function GET(req: Request, {params}: {params: { state: string}}){
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    

    try{
        const client = await clientPromise
        const db = client.db("adventure_tracker")
        console.log("HEY")

        const projectionStr = `fish.${params.state}`

        const results = await db.collection("users")
        .findOne({_id: user.id}, {projection: {[projectionStr]: 1, _id: 0} })


        return NextResponse.json(results)
    }catch(err){
        return NextResponse.json({error: err}, {status: 500})
    }
}

export async function PUT(req: Request, {params}: {params: { state: string}}){

    const {getUser} = getKindeServerSession()
    const user = await getUser()
    const routeStr = `fish.${params.state}`

    const fishTemplate = 
       [
        {
            "id": "number",
            "isCaught": "boolean"
        }
       ]

       const updatedFishData = await req.json()
    
    if(typeChecker(updatedFishData, fishTemplate)){
        
        try{
            const client = await clientPromise
            const db = client.db("adventure_tracker")
            
            await db.collection("users").updateOne(
            {_id: user.id},
            {$set: {[routeStr]: updatedFishData}},
        {upsert: true})
            return NextResponse.json({data: "Success"}, {status: 200})
        }catch(err){
            return NextResponse.json({error: err}, {status: 500})
        }
    }else{
        return NextResponse.json({error: "Bad Data Recieved"}, {status: 520})
    }

    
}