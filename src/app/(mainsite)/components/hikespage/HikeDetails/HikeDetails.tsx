"use client"
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../misc/AppContext';
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css/effect-coverflow';
import styles from './hikedetails.module.css';
import gsap from 'gsap';
import { hikeData } from '@/app/(mainsite)/data/hikeData';

export default function HikeDetails(){

    interface hikePaneTypes{
        isHikePaneVisible: boolean,
        hikePaneData: hikeType,
        setIsHikePaneVisible: any
    }

    const {isHikePaneVisible, hikePaneData, setIsHikePaneVisible}: hikePaneTypes = useContext(AppContext)
    const [difficultyClass, setDifficultyClass] = useState(styles.easy)
    const [shaderStyles, setShaderStyles] = useState({})
    const [wrapperStyles, setWrapperStyles] = useState({})
    const [paneStyles, setPaneStyles] = useState({})


    const swiperRef: any = useRef()
    const paneRef: any = useRef()
    const shaderRef: any = useRef()

  const slideElems = [...hikePaneData.photos, ...hikePaneData.photos, ...hikePaneData.photos].map((imgSrc, i)=>{
    return(
      <SwiperSlide key={i} className="center swiper-no-swiping">
        <img src={imgSrc} alt="Hike Image" className={styles.img} />
      </SwiperSlide>
    )
  })

    




    // OPEN/CLOSE HOOKS

    useEffect(()=>{
        if(isHikePaneVisible){
            // OPEN


        }else{
            // CLOSE


        }
    }, [isHikePaneVisible])


    // UPDATE HOOKS

    useEffect(()=>{
        if(hikePaneData.difficulty! < 4){
                // EASY
                setDifficultyClass(styles.easy)
            }else if((hikePaneData.difficulty! >= 4) && (hikePaneData.difficulty! < 7)){
                // Medium
                setDifficultyClass(styles.medium)
            }else if((hikePaneData.difficulty! >= 7) && (hikePaneData.difficulty! < 10)){
                // Hard
                setDifficultyClass(styles.hard)
            }else if((hikePaneData.difficulty! == 10)){
                // VERY HARD
                setDifficultyClass(styles.veryHard)
            }
    }, [hikePaneData])


    function copyAddress(evt: any){
        const elem = evt.currentTarget
        if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(hikePaneData.address);
        elem.textContent = "Copied!"
        setTimeout(()=>{
             elem.textContent = "Copy Address";
        }, 2000)
    }
    }

    useEffect(()=>{
        
        if(isHikePaneVisible){
            openPane()
        }
            
            
    }, [isHikePaneVisible])

   function openPane(){
    paneRef.current.scrollTo(0,0)
    document.querySelector("body")!.style.overflowY = "hidden";
      setWrapperStyles({
        visibility: "visible"
      })
      setShaderStyles({
        opacity: 1
      })
      setPaneStyles({
        transform: "translateX(0)"
      })
      
    
    
  }

   function closePane(){
    if(isHikePaneVisible){
      document.querySelector("body")!.style.overflowY = "scroll";
      setPaneStyles({
        transform: "translateX(200%)"
      })
      setShaderStyles({
        opacity: 0
      })
      shaderRef.current.ontransitionend = ()=>{
        setWrapperStyles({
          visibility: "hidden"
        })
        setIsHikePaneVisible(false)
        shaderRef.current.ontransitionend = null;
      }
      
    }
    
  }

  function closePaneHandler(){
    
  }


    function changeHiked(){

    }


return (
 <div className={styles.hikeDetailsWrapper} style={wrapperStyles}>
    <div className={styles.hikeDetails} style={paneStyles} ref={paneRef}>
        <h3 className={styles.name}>{hikePaneData.name}</h3>

        <div className={styles.carouselWrapper}>
          <Swiper
          className={styles.swiper}
          loopAdditionalSlides={1}
          ref={swiperRef}
          modules={[Autoplay]}
          slidesPerView={3}
          autoplay={{delay: 4000}}
          breakpoints={{
            0: {
              slidesPerView: "auto"
            },
            649: {
              slidesPerView: 3,
            },
            990: {
              slidesPerView: 4,
            }
           }}
          centeredSlides
          loop
          initialSlide={2}
        //   coverflowEffect={{
        //     rotate: 50,
        //     stretch: 0,
        //     depth: 200,
        //     modifier: 1,
        //     slideShadows: false,
        //   }}
          >
            {slideElems}
          </Swiper>
           <div className={`${styles.buttonWrapper}`}>
            <div onClick={()=>{swiperRef.current.swiper.slidePrev()}} className={styles.button}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path stroke-linejoin="round" d="M16 12H8m0 0l3-3m-3 3l3 3"/><path d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"/></g></svg>
            </div>
            
            <div onClick={()=>{swiperRef.current.swiper.slideNext()}} className={styles.button}>
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path stroke-linejoin="round" d="M8 12h8m0 0l-3-3m3 3l-3 3"/><path d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"/></g></svg>
            </div>
    </div>

        </div>

        <div className={styles.container}>

            <div className={styles.linkWrapper}>
                <a onClick={copyAddress} className={styles.link}>Copy Address</a>
                <a href={hikePaneData.googleMapUrl} target='_blank' className={styles.link}>Open In Google Maps</a>
                {(hikePaneData.gpx) && <a href={hikePaneData.gpx} target='_blank' className={styles.link}>Download Hike GPX</a>}
            </div>

            <div className={`${styles.bullet} ${styles.hikedWrapper}`}>
                <p className={(hikePaneData.isHiked) ? styles.isHiked : styles.notHiked }>{(hikePaneData.isHiked) ? "Is Hiked" : "Not Hiked"}</p>

                <button className={styles.markHiked}>{(hikePaneData.isHiked) ? "Mark as Not Hiked" : "Mark as Hiked"}</button>
            </div>

            <div className={`${styles.bullet} ${styles.difficultyWrapper}`}>
                <p>Difficulty: {<span className={difficultyClass}>{hikePaneData.difficulty}/10</span>}</p>
            </div>

            <div className={`${styles.bullet} ${styles.lengthWrapper}`}>
                <p>Length: {hikePaneData.length} Miles</p>
            </div>

            {(hikePaneData.desc) &&
            <div className={styles.descWrapper}>
                <h4 className={styles.descTitle}>About The Hike:</h4>
                <p>{hikePaneData.desc}</p>
            </div>
            }
        </div>
<button className={styles.close} onClick={closePane}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg></button>
    </div>
    <div ref={shaderRef} className={`shader ${styles.shader}`} style={shaderStyles}></div>
    
 </div>
)};