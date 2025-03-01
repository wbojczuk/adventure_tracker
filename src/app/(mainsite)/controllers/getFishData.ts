import { gaFishData } from "../data/fishData"

export default function getFishData(state: string):fishType[]{
    let fishData: fishType[] = []!
    console.log(state)
    const newState = state.trim().toUpperCase()
    
    switch (newState){

        case "GA":
            fishData = gaFishData
        break;

        default: fishData = [ {
            name: "No Fish Found",
            isCaught: false,
            imgSrc: "/img/syncing.svg",
            id: 9999999999
        },]
    }

        
    return fishData
}