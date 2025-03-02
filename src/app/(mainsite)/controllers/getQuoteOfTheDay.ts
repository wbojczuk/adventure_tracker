export default async function getQuoteOfTheDay(){
    try{
        const fetchData = await fetch(`/api/getquoteoftheday`, {
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