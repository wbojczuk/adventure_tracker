import './globals.css'
import type { Metadata } from 'next'
import "react-multi-carousel/lib/styles.css";
import AppProvider from "./(mainsite)/components/misc/AppContext"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Bungee } from 'next/font/google'
import Footer from './(mainsite)/components/misc/Footer/Footer';
import Navbar from './(mainsite)/components/misc/Navbar/Navbar';
import Script from 'next/script';

// BUTTON STYLES - .main-button
import "./(mainsite)/components/styling_sheets/links/mainlink.css"
import { AuthProvider } from './(mainsite)/components/AuthProvider/AuthProvider';


const primaryFont = Bungee({ subsets: ['latin'], weight: ["400"], display: "swap", variable: "--primary-font" })

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`,
  description: `${process.env.NEXT_PUBLIC_WEBSITE_DESC}`,

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
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
    <AppProvider>
    <html lang="en">
      <body className={`${primaryFont.variable}`}>

      {(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID != "0000000") && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}
      </Script></>}

        

          <Navbar />

          {children}


        {/* <Footer /> */}
        
        </body>
    </html>
    </AppProvider>
    </AuthProvider>
  )
}
