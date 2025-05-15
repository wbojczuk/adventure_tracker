"use client"
import "./header.css"
import styles from "./header.module.css"


export default function Header() {

  return (
    <header className={`header ${styles.header}`}>

        <h1>USA <svg xmlns="http://www.w3.org/2000/svg" width="1235" height="650" viewBox="0 0 7410 3900">
<path d="M0,0h7410v3900H0" fill="#b31942"/>
<path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#FFF" strokeWidth="300"/>
<path d="M0,0h2964v2100H0" fill="#0a3161"/>
<g fill="#FFF">
<g id="s18">
<g id="s9">
<g id="s5">
<g id="s4">
<path id="s" d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"/>
<use xlinkHref="#s" y="420"/>
<use xlinkHref="#s" y="840"/>
<use xlinkHref="#s" y="1260"/>
</g>
<use xlinkHref="#s" y="1680"/>
</g>
<use xlinkHref="#s4" x="247" y="210"/>
</g>
<use xlinkHref="#s9" x="494"/>
</g>
<use xlinkHref="#s18" x="988"/>
<use xlinkHref="#s9" x="1976"/>
<use xlinkHref="#s5" x="2470"/>
</g>
</svg> <br />Hikes</h1>

        <div className="center">

        </div>
    
        <img src='/img/headers/hikes-header.webp' alt='Image of Fish' className='bg-img' />
        <div className='shader'></div>
    </header>
  )
}
