

interface hikeType{
    length: number,
    difficulty?: number
    long: number,
    lat: number,
    name: string,
    desc?: string,
    isHiked: boolean,
    id: number,
    state: string
}




interface userSettingsType{
    homeState: string
}

interface nationalParkType{
    name: string
    state: string
    isVisited: boolean
    logo: string,
    id: number
}

interface adventureType{
    id: any,
    name: string,
    tasks: any[],
    information: string,
    difficulty: number,
    category: string // fishing, hiking, national_parks, etc
}

interface fishData{
    isCaught: boolean,
    id: number
}

interface fishType{
    isCaught: boolean,
    imgSrc: string,
    name: string,
    id: number
}

interface teamMemberType{
    imgSrc: string,
    description: string,
    role: string,
    name: string
}

interface linkProps{
    href: string,
    target: string,
    className: string,
    style: any,
    isLocal: boolean
}

interface reviewType{
    title: string,
    desc: string,
    name: string,
    role: string
}


interface multiPartFormSection{
    elements: any,
    title: string,
    subtitle?: string
}

interface servicesModuleType{
    services: serviceType[]
}

interface serviceType{
    icon: any,
    title: string,
    description: string,
    backgroundImageUrl: string,
    url?: string
}

interface faqType{
    question: string,
    answer: string
}