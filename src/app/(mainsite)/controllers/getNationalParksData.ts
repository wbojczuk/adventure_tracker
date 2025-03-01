export default function getNationalParksData():nationalParkType[]{
    let nationalParksData: nationalParkType[] = []!

    nationalParksData = [
        {
            name: "Acadia National Park",
            state: "ME",
            logo: "/img/national_parks/acadia.webp",
            isVisited: false,
            id: 0
        },
        {
            name: "National Park of American Samoa",
            state: "AS",
            logo: "/img/national_parks/american_samoa.webp",
            isVisited: false,
            id: 1
        },
        {
            name: "Arches National Park",
            state: "UT",
            logo: "/img/national_parks/arches.webp",
            isVisited: false,
            id: 2
        },
        {
            name: "Badlands National Park",
            state: "SD",
            logo: "/img/national_parks/badlands.webp",
            isVisited: false,
            id: 3
        },
        {
            name: "Big Bend National Park",
            state: "TX",
            logo: "/img/national_parks/big_bend.webp",
            isVisited: false,
            id: 4
        },
        {
            name: "Biscayne National Park",
            state: "FL",
            logo: "/img/national_parks/biscayne.webp",
            isVisited: false,
            id: 5
        },
        {
            name: "Black Canyon of the Gunnison National Park",
            state: "CO",
            logo: "/img/national_parks/black_canyon.webp",
            isVisited: false,
            id: 6
        },
        {
            name: "Bryce Canyon National Park",
            state: "UT",
            logo: "/img/national_parks/bryce_canyon.webp",
            isVisited: false,
            id: 7
        },
        {
            name: "Canyonlands National Park",
            state: "UT",
            logo: "/img/national_parks/canyonlands.webp",
            isVisited: false,
            id: 8
        },
        {
            name: "Capitol Reef National Park",
            state: "UT",
            logo: "/img/national_parks/capitol_reef.webp",
            isVisited: false,
            id: 9
        },
        {
            name: "Carlsbad Caverns National Park",
            state: "NM",
            logo: "/img/national_parks/carlsbad_caverns.webp",
            isVisited: false,
            id: 10
        },
        {
            name: "Channel Islands National Park",
            state: "CA",
            logo: "/img/national_parks/channel_islands.webp",
            isVisited: false,
            id: 11
        },
        {
            name: "Congaree National Park",
            state: "SC",
            logo: "/img/national_parks/congaree.webp",
            isVisited: false,
            id: 12
        },
        {
            name: "Crater Lake National Park",
            state: "OR",
            logo: "/img/national_parks/crater_lake.webp",
            isVisited: false,
            id: 13
        },
        {
            name: "Cuyahoga Valley National Park",
            state: "OH",
            logo: "/img/national_parks/cuyahoga_valley.webp",
            isVisited: false,
            id: 14
        },
        {
            name: "Death Valley National Park",
            state: "NV",
            logo: "/img/national_parks/death_valley.webp",
            isVisited: false,
            id: 15
        },
        {
            name: "Denali National Park",
            state: "AK",
            logo: "/img/national_parks/denali.webp",
            isVisited: false,
            id: 16
        },
        {
            name: "Dry Tortugas National Park",
            state: "FL",
            logo: "/img/national_parks/dry_tortugas.webp",
            isVisited: false,
            id: 17
        },
        {
            name: "Everglades National Park",
            state: "FL",
            logo: "/img/national_parks/everglades.webp",
            isVisited: false,
            id: 18
        },
        {
            name: "Gates of the Arctic National Park",
            state: "AK",
            logo: "/img/national_parks/gates_of_the_arctic.webp",
            isVisited: false,
            id: 19
        },
        {
            name: "Gateway Arch National Park",
            state: "MO",
            logo: "/img/national_parks/gateway_arch.webp",
            isVisited: false,
            id: 20
        },
        {
            name: "Glacier Bay National Park",
            state: "AK",
            logo: "/img/national_parks/glacier_bay.webp",
            isVisited: false,
            id: 21
        },
        {
            name: "Glacier National Park",
            state: "MT",
            logo: "/img/national_parks/glacier.webp",
            isVisited: false,
            id: 22
        },
        {
            name: "Grand Canyon National Park",
            state: "AZ",
            logo: "/img/national_parks/grand_canyon.webp",
            isVisited: false,
            id: 23
        },
        {
            name: "Grand Teton National Park",
            state: "WY",
            logo: "/img/national_parks/grand_teton.webp",
            isVisited: false,
            id: 24
        },
        {
            name: "Great Basin National Park",
            state: "NV",
            logo: "/img/national_parks/great_basin.webp",
            isVisited: false,
            id: 25
        },
        {
            name: "Great Sand Dunes National Park",
            state: "CO",
            logo: "/img/national_parks/great_sand_dunes.webp",
            isVisited: false,
            id: 26
        },
        {
            name: "Great Smoky Mountains National Park",
            state: "TN",
            logo: "/img/national_parks/great_smoky.webp",
            isVisited: false,
            id: 27
        },
        {
            name: "Guadalupe Mountains National Park",
            state: "TX",
            logo: "/img/national_parks/guadalupe.webp",
            isVisited: false,
            id: 28
        },
        {
            name: "Haleakala National Park",
            state: "HI",
            logo: "/img/national_parks/haleakala.webp",
            isVisited: false,
            id: 29
        },
        {
            name: "Hawaii Volcanoes National Park",
            state: "HI",
            logo: "/img/national_parks/hawaii_volcanoes.webp",
            isVisited: false,
            id: 30
        },
        {
            name: "Hot Springs National Park",
            state: "AR",
            logo: "/img/national_parks/hot_springs.webp",
            isVisited: false,
            id: 31
        },
        {
            name: "Indiana Dunes National Park",
            state: "IN",
            logo: "/img/national_parks/indiana_dunes.webp",
            isVisited: false,
            id: 32
        },
        {
            name: "Isle Royale National Park",
            state: "MI",
            logo: "/img/national_parks/isle_royale.webp",
            isVisited: false,
            id: 33
        },
        {
            name: "Joshua Tree National Park",
            state: "CA",
            logo: "/img/national_parks/joshua_tree.webp",
            isVisited: false,
            id: 34
        },
        {
            name: "Katmai National Park",
            state: "AK",
            logo: "/img/national_parks/katmai.webp",
            isVisited: false,
            id: 35
        },
        {
            name: "Kenai Fjords National Park",
            state: "AK",
            logo: "/img/national_parks/kenai_fjords.webp",
            isVisited: false,
            id: 36
        },
        {
            name: "Kings Canyon National Park",
            state: "CA",
            logo: "/img/national_parks/kings_canyon.webp",
            isVisited: false,
            id: 37
        },
        {
            name: "Kobuk Valley National Park",
            state: "AK",
            logo: "/img/national_parks/kobuk_valley.webp",
            isVisited: false,
            id: 38
        },
        {
            name: "Lake Clark National Park",
            state: "AK",
            logo: "/img/national_parks/lake_clark.webp",
            isVisited: false,
            id: 39
        },
        {
            name: "Lassen Volcanic National Park",
            state: "CA",
            logo: "/img/national_parks/lassen_volcanic.webp",
            isVisited: false,
            id: 40
        },
        {
            name: "Mammoth Cave National Park",
            state: "KY",
            logo: "/img/national_parks/mammoth_cave.webp",
            isVisited: false,
            id: 41
        },
        {
            name: "Mesa Verde National Park",
            state: "CO",
            logo: "/img/national_parks/mesa_verde.webp",
            isVisited: false,
            id: 42
        },
        {
            name: "Mount Rainier National Park",
            state: "WA",
            logo: "/img/national_parks/mount_rainier.webp",
            isVisited: false,
            id: 43
        },
        {
            name: "New River Gorge National Park",
            state: "WV",
            logo: "/img/national_parks/new_river_gorge.webp",
            isVisited: false,
            id: 44
        },
        {
            name: "North Cascades National Park",
            state: "WA",
            logo: "/img/national_parks/north_cascades.webp",
            isVisited: false,
            id: 45
        },
        {
            name: "Olympic National Park",
            state: "WA",
            logo: "/img/national_parks/olympic.webp",
            isVisited: false,
            id: 46
        },
        {
            name: "Petrified Forest National Park",
            state: "AZ",
            logo: "/img/national_parks/petrified_forest.webp",
            isVisited: false,
            id: 47
        },
        {
            name: "Pinnacles National Park",
            state: "CA",
            logo: "/img/national_parks/pinnacles.webp",
            isVisited: false,
            id: 48
        },
        {
            name: "Redwood National Park",
            state: "CA",
            logo: "/img/national_parks/redwood.webp",
            isVisited: false,
            id: 49
        },
        {
            name: "Rocky Mountain National Park",
            state: "CO",
            logo: "/img/national_parks/rocky_mountains.webp",
            isVisited: false,
            id: 50
        },
        {
            name: "Saguaro National Park",
            state: "AZ",
            logo: "/img/national_parks/saguaro.webp",
            isVisited: false,
            id: 51
        },
        {
            name: "Sequoia National Park",
            state: "CA",
            logo: "/img/national_parks/sequoia.webp",
            isVisited: false,
            id: 52
        },
        {
            name: "Shenandoah National Park",
            state: "VA",
            logo: "/img/national_parks/shenandoah.webp",
            isVisited: false,
            id: 53
        },
        {
            name: "Theodore Roosevelt National Park",
            state: "ND",
            logo: "/img/national_parks/theodore_roosevelt.webp",
            isVisited: false,
            id: 54
        },
        {
            name: "Virgin Islands National Park",
            state: "VI",
            logo: "/img/national_parks/virgin_islands.webp",
            isVisited: false,
            id: 55
        },
        {
            name: "Voyageurs National Park",
            state: "MN",
            logo: "/img/national_parks/voyageurs.webp",
            isVisited: false,
            id: 56
        },
        {
            name: "White Sands National Park",
            state: "NM",
            logo: "/img/national_parks/white_sands.webp",
            isVisited: false,
            id: 57
        },
        {
            name: "Wind Cave National Park",
            state: "SD",
            logo: "/img/national_parks/wind_cave.webp",
            isVisited: false,
            id: 58
        },
        {
            name: "Wrangell-St. Elias National Park",
            state: "AK",
            logo: "/img/national_parks/wrangell-st.elias.webp",
            isVisited: false,
            id: 59
        },
        {
            name: "Yellowstone National Park",
            state: "WY",
            logo: "/img/national_parks/yellowstone.webp",
            isVisited: false,
            id: 60
        },
        {
            name: "Yosemite National Park",
            state: "CA",
            logo: "/img/national_parks/yosemite.webp",
            isVisited: false,
            id: 61
        },
        {
            name: "Zion National Park",
            state: "UT",
            logo: "/img/national_parks/zion.webp",
            isVisited: false,
            id: 62
        },

    ]
    
        
    return nationalParksData
}