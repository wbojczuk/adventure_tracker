

async function getNationalParksUserData(){
    
    try{
        const fetchData = await fetch(`/api/nationalparks`, {
            method: "GET",
            cache: "no-store"
        })

        const results = await fetchData.json()
        return results
    
    }catch(err){
        console.error(err)
        return Promise.reject()
    }
}

export default async function saveNationalParksUserData(data: nationalParkType[]){
    try{
        await fetch(`/api/nationalparks`, {
            method:"PUT",
            body: JSON.stringify(data)
        })
        return Promise.resolve()
    }catch(err){
        console.error(err)
        return Promise.reject(err)
    }
}



export {getNationalParksUserData, saveNationalParksUserData}