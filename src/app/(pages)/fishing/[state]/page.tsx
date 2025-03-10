import FishApp from "@/app/(mainsite)/components/fishingpage/FishApp/FishApp"
import type { Metadata } from "next"

export const metadata: Metadata = {
	  title: `Fishing | ${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`,
	  description: `Fishing | ${process.env.NEXT_PUBLIC_WEBSITE_DESC}`,
openGraph: {
title: `${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`,
description: `${process.env.NEXT_PUBLIC_WEBSITE_DESC}`,
type: "website",
images: [
{
url: `${process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE_LINK}`,
width: 1280,
height: 720,
}
]
},
twitter: {
card: 'summary_large_image',
title: `${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`,
description: `${process.env.NEXT_PUBLIC_WEBSITE_DESC}`,
 images: [`${process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE_LINK}`]
}
}

export default function FishingPage({params}: {params: {state: string}}){
	 return(
	 	 <>
			<FishApp currentState={params.state} />
	 	 </>
	 )
}