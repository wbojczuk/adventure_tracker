

async function getUserSettings(){
    try{
        const fetchData = await fetch(`/api/usersettings`, {
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

export default async function saveUserLatLong(data: {startLat: number, startLong: number, locName: string}){
    try{
        await fetch(`/api/usersettings/startloc`, {
            method:"PUT",
            body: JSON.stringify(data)
        })
        return Promise.resolve()
    }catch(err){
        console.error(err)
        return Promise.reject(err)
    }
}

export {getUserSettings}