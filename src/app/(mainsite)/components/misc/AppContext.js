"use client"
import React, { Component } from "react";
import { getUserSettings } from "../../controllers/userSettingsHelpers";
import saveFishUserData, { getFishUserData } from "../../controllers/fishHelpers";
import getFishData from "../../controllers/getFishData";
import { Hubballi } from "next/font/google";
// @ts-ignore
const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    // collections: [],
    // userSettings: {
    //   homeState: ""
    // },
    
    isSyncing: false,
    settingsLoading: true,
    fishUserData: null,
    mergedFishData: null
  };
  componentDidMount() {

  }

  

  setIsSyncing = (syncing) => {
   
    this.setState({ isSyncing: syncing });
  }

  mergeFishData = (state, fishUserData)=>{
    const localData = getFishData(state).sort((a, b) => a.id - b.id)

    const userData = fishUserData.sort((a, b) => a.id - b.id)

    const mergedData = localData.map((dataObj, i)=>{
      let retVal
      if(dataObj.id == userData[i].id){
        retVal = {...dataObj, ...userData[i]}
      }
      return retVal
    })
  return mergedData
}

changeFishIsCaught = async (state, id)=>{
  this.setIsSyncing(true)

  const newData = ( this.state.fishUserData != null) ? this.state.fishUserData[`${state}`] : getFishData(state).map((data) => {return({isCaught: data.isCaught, id: data.id})})
  const newUserData = {...this.state.fishUserData}
  newUserData[`${state}`] = newData

  const newMergedData = ( this.state.mergedFishData != null) ? this.state.mergedFishData : {[`${state}`]: getFishData(state)}

  

  newData.forEach((data, i)=>{
    if(data.id == id){
      data.isCaught = !data.isCaught
    }
  })
  
  newMergedData[`${state}`] = this.mergeFishData(state, newData)
  
  this.setState({fishUserData: newUserData})
  this.setState({mergedFishData: newMergedData})
  await saveFishUserData(state, newData)
  this.setIsSyncing(false)
}


  initUserData = async () =>{

    // INIT FISH
    
    const tempFishData = await getFishUserData()
    
    if(tempFishData && tempFishData.hasOwnProperty("fish")){

      this.setState({fishUserData: tempFishData.fish})

      

      const fishStates = Object.getOwnPropertyNames(tempFishData.fish);

      const mergedData = {}
      fishStates.forEach((state)=>{
        mergedData[`${state}`] = this.mergeFishData(state, tempFishData.fish[`${state}`])
      })

      this.setState({mergedFishData: mergedData})
    }

    // END INIT FISH
    
  }


  
  // setUserSettings = async () =>{

  //   // cache
  //   let cachedUserSettings = {}
  //   if(localStorage.getItem("userSettingsCache")){
  //     cachedUserSettings = JSON.parse(localStorage.getItem("userSettingsCache"))
  //     this.setState({ userSettings: cachedUserSettings });
  //     this.setState({settingsLoading: false})
  //   }

  //   // online query
  //   const onlineUserSettings = await getUserSettings()

  //   if(onlineUserSettings.usersettings.homeState){
  //     this.setState({ userSettings: {homeState: onlineUserSettings.usersettings.homeState} });
  //   }else{
  //     this.setState({ userSettings: {homeState: "GA"} });
  //   }
  //   this.setState({settingsLoading: false})

  //   // update local cache store

  //   localStorage.setItem("userSettingsCache",JSON.stringify(onlineUserSettings.usersettings))

  // }

// @ts-ignore
  render() {
    return (
      <AppContext.Provider
              value={{
          ...this.state,
         setIsSyncing: this.setIsSyncing,
         initUserData: this.initUserData,
         changeFishIsCaught: this.changeFishIsCaught
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
const AppConsumer = AppContext.Consumer;
export { AppConsumer, AppContext };
export default AppProvider;