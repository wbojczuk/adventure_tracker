
import AdventureApp from "@/app/(mainsite)/components/adventurepage/AdventureApp/AdventureApp"
import type { Metadata } from "next"

export const metadata: Metadata = {
	  title: `Adventure | ${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`,
	  description: `Adventure | ${process.env.NEXT_PUBLIC_WEBSITE_DESC}`,
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

export default function AdventurePage({params}: {params: {id: string}}){
	 return(
	 	 <>
			<AdventureApp adventureId={params.id} />
	 	 </>
	 )
}