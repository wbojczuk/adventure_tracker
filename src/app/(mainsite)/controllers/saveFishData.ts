export default function saveFishData(data: fishType[], setData: any){
    localStorage.setItem("fishData", JSON.stringify(data))

    setData(data)
}