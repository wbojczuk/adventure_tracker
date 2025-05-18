import clientPromise from "@/app/lib/mongodb"
import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import typeChecker from "@/app/lib/typechecker"

export async function GET(req: Request){
    const {getUser, isAuthenticated} = getKindeServerSession()
    const isAuth = await isAuthenticated()
    const user = await getUser()

    if(isAuth){
        try{
        const client = await clientPromise
        const db = client.db("adventure_tracker")

        const projectionStr = `usersettings`

        const results = await db.collection("users")
        .findOne({_id: user.id}, {projection: {[projectionStr]: 1, _id: 0} })


        return NextResponse.json(results)
    }catch(err){
        return NextResponse.json({error: err}, {status: 500})
    }
    }else{
         return NextResponse.json({})
    }
}