interface faqType{
    question: string,
    answer: string
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