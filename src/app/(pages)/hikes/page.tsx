import Banner from "@/app/(mainsite)/components/hikespage/Banner/Banner"
import Header from "@/app/(mainsite)/components/hikespage/Header/Header"
import HikeApp from "@/app/(mainsite)/components/hikespage/HikeApp/HikeApp"
import HikesMap from "@/app/(mainsite)/components/hikespage/HikesMap/HikesMap"
import type { Metadata } from "next"

export const metadata: Metadata = {
	  title: `Hikes | ${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`,
	  description: `Hikes | ${process.env.NEXT_PUBLIC_WEBSITE_DESC}`,
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

export default function HikesPage(){
	 return(
	 	 <>
			<HikeApp children={<><HikesMap /></>} />
	 	 </>
	 )
}