import clientPromise from "@/app/lib/mongodb"
import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import typeChecker from "@/app/lib/typechecker"

export async function PUT(req: Request){

    const {getUser} = getKindeServerSession()
    const user = await getUser()
    const routeStr = `usersettings`

    const latLongTemplate = 
        {
            "startLat": "number",
            "startLong": "number",
            "locName": "string"
        }

       const newStartLatLong = await req.json()
    
    if(typeChecker(newStartLatLong, latLongTemplate)){
        
        try{
            const client = await clientPromise
            const db = client.db("adventure_tracker")
            
            await db.collection("users").updateOne(
            {_id: user.id},
            {$set: {[routeStr]: newStartLatLong}})
            return NextResponse.json({data: "Success"}, {status: 200})
        }catch(err){
            return NextResponse.json({error: err}, {status: 500})
        }
    }else{
        return NextResponse.json({error: "Bad Data Recieved"}, {status: 520})
    }

    
}