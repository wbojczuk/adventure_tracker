export default function getFishData():fishType[]{
    let fishData: fishType[] = []!
    if(!(localStorage.getItem("fishData") == null)){
        fishData = JSON.parse(localStorage.getItem("fishData")!)
    }else{
        fishData = [
            
            {
                name: "Largemouth Bass",
                isCaught: false,
                imgSrc: "./img/fish/lb.webp",
                id: 0
            },
            {
                name: "Altamaha Bass",
                isCaught: false,
                imgSrc: "./img/fish/alt.webp",
                id: 1
            },
            {
                name: "Bartram's Bass",
                isCaught: false,
                imgSrc: "./img/fish/bart.webp",
                id: 2
            },
            {
                name: "Chattahoochee Bass",
                isCaught: false,
                imgSrc: "./img/fish/chat.webp",
                id: 3
            },
            {
                name: "Redeye Bass",
                isCaught: false,
                imgSrc: "./img/fish/redeye.webp",
                id: 4
            },
            {
                name: "Smallmouth Bass",
                isCaught: false,
                imgSrc: "./img/fish/small.webp",
                id: 5
            },
            {
                name: "Spotted Bass",
                isCaught: false,
                imgSrc: "./img/fish/spotted.webp",
                id: 6
            },
            {
                name: "Alabama Bass",
                isCaught: false,
                imgSrc: "./img/fish/alabama.webp",
                id: 7
            },
            {
                name: "Suwannee Bass",
                isCaught: false,
                imgSrc: "./img/fish/suw.webp",
                id: 8
            },
            {
                name: "Tallapoosa Bass",
                isCaught: false,
                imgSrc: "./img/fish/tal.webp",
                id: 9
            },
            {
                name: "Shoal Bass",
                isCaught: false,
                imgSrc: "./img/fish/shoal.webp",
                id: 10
            },
            {
                name: "White Bass",
                isCaught: false,
                imgSrc: "./img/fish/wb.webp",
                id: 12
            },
            {
                name: "Striped Bass",
                isCaught: false,
                imgSrc: "./img/fish/striped.webp",
                id: 13
            },
            {
                name: "Hybrid Bass",
                isCaught: false,
                imgSrc: "./img/fish/hybrid.webp",
                id: 14
            },
            {
                name: "Chain Pickerel",
                isCaught: false,
                imgSrc: "./img/fish/chain.webp",
                id: 15
            },
            {
                name: "Brown Bullhead",
                isCaught: false,
                imgSrc: "./img/fish/bbull.webp",
                id: 16
            },
            {
                name: "Yellow Bullhead",
                isCaught: false,
                imgSrc: "./img/fish/ybull.webp",
                id: 17
            },
            {
                name: "Flathead Catfish",
                isCaught: false,
                imgSrc: "./img/fish/flat.webp",
                id: 18
            },
            {
                name: "Channel Catfish",
                isCaught: false,
                imgSrc: "./img/fish/channel.webp",
                id: 19
            },
            {
                name: "Redfin Pickerel",
                isCaught: false,
                imgSrc: "./img/fish/redfin.webp",
                id: 20
            },
            {
                name: "White Catfish",
                isCaught: false,
                imgSrc: "./img/fish/wc.webp",
                id: 21
            },
            {
                name: "Blue Catfish",
                isCaught: false,
                imgSrc: "./img/fish/blue.webp",
                id: 22
            },
            {
                name: "White Crappie",
                isCaught: false,
                imgSrc: "./img/fish/wcrap.webp",
                id: 23
            },
            {
                name: "Black Crappie",
                isCaught: false,
                imgSrc: "./img/fish/bcrap.webp",
                id: 24
            },
            {
                name: "Flier",
                isCaught: false,
                imgSrc: "./img/fish/flier.webp",
                id: 25
            },
            {
                name: "Bluegill",
                isCaught: false,
                imgSrc: "./img/fish/bluegill.webp",
                id: 26
            },
            {
                name: "Longear Sunfish",
                isCaught: false,
                imgSrc: "./img/fish/longear.webp",
                id: 27
            },
            {
                name: "Redbreast Sunfish",
                isCaught: false,
                imgSrc: "./img/fish/redbreast.webp",
                id: 28
            },
            {
                name: "Redear Sunfish",
                isCaught: false,
                imgSrc: "./img/fish/redear.webp",
                id: 29
            },
            {
                name: "Warmouth",
                isCaught: false,
                imgSrc: "./img/fish/war.webp",
                id: 30
            },
            {
                name: "Green Sunfish",
                isCaught: false,
                imgSrc: "./img/fish/green.webp",
                id: 31
            },
            {
                name: "Spotted Sunfish",
                isCaught: false,
                imgSrc: "./img/fish/spottedsun.webp",
                id: 32
            },
            {
                name: "American Shad",
                isCaught: false,
                imgSrc: "./img/fish/as.webp",
                id: 33
            },
            {
                name: "Hickory Shad",
                isCaught: false,
                imgSrc: "./img/fish/hs.webp",
                id: 34
            },
            {
                name: "Striped Mullet",
                isCaught: false,
                imgSrc: "./img/fish/mull.webp",
                id: 35
            },
            {
                name: "Longnose Gar",
                isCaught: false,
                imgSrc: "./img/fish/long.webp",
                id: 36
            },
            {
                name: "Bowfin",
                isCaught: false,
                imgSrc: "./img/fish/bow.webp",
                id: 37
            },
            {
                name: "Common Carp",
                isCaught: false,
                imgSrc: "./img/fish/cc.webp",
                id: 38
            },
            {
                name: "Smallmouth Buffalo",
                isCaught: false,
                imgSrc: "./img/fish/sb.webp",
                id: 39
            },
            {
                name: "Freshwater Drum",
                isCaught: false,
                imgSrc: "./img/fish/fd.webp",
                id: 40
            },
            {
                name: "Yellow Perch",
                isCaught: false,
                imgSrc: "./img/fish/yp.webp",
                id: 41
            },
            {
                name: "Walleye",
                isCaught: false,
                imgSrc: "./img/fish/wall.webp",
                id: 42
            },
            {
                name: "Rainbow Trout",
                isCaught: false,
                imgSrc: "./img/fish/rt.webp",
                id: 43
            },
            {
                name: "Brook Trout",
                isCaught: false,
                imgSrc: "./img/fish/bt.webp",
                id: 44
            },
            {
                name: "Brown Trout",
                isCaught: false,
                imgSrc: "./img/fish/brt.webp",
                id: 45
            },
            {
                name: "Rock Bass",
                isCaught: false,
                imgSrc: "./img/fish/rock.webp",
                id: 46
            },
            {
                name: "Alligator gar",
                isCaught: false,
                imgSrc: "./img/fish/ag.webp",
                id: 47
            },
            {
                name: "Spotted Gar",
                isCaught: false,
                imgSrc: "./img/fish/sg.webp",
                id: 48
            },

            
        ]
    }
    return fishData
}