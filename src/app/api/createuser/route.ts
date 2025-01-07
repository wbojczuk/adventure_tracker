import clientPromise from "@/app/lib/mongodb"
import { NextResponse } from "next/server"
import {ObjectId} from "mongodb"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function POST(){

    const {getUser} = getKindeServerSession()
    const user = await getUser()

        try{
            const client = await clientPromise
            const db = client.db("adventure_tracker")
            
            await db.collection("users").updateOne(
            {_id: user.id},
            {$set: 
                {fish : {}}
            })
            return NextResponse.json({data: "Success"}, {status: 200})
        }catch(err){
            return NextResponse.json({error: err}, {status: 500})
        }

    
}