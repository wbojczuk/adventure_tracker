async function getAdventureUserData(state?: string){
    
    try{
        const fetchData = await fetch(`/api/adventureuserdata`, {
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
