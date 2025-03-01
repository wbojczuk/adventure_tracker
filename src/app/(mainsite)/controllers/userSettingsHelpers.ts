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

export {getUserSettings}