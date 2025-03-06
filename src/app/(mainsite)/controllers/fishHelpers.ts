

async function getFishUserData(state?: string){
    
    try{
        const fetchData = await fetch(`/api/fish${(state != undefined) ? `/${state}` : ""}`, {
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

export default async function saveFishUserData(state: string, data: fishData[]){
    try{
        await fetch(`/api/fish/${state}`, {
            method:"PUT",
            body: JSON.stringify(data)
        })
        return Promise.resolve()
    }catch(err){
        console.error(err)
        return Promise.reject(err)
    }
}



export {getFishUserData, saveFishUserData}