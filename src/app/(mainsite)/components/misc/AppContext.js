"use client"
import React, { Component } from "react";
import { getUserSettings } from "../../controllers/userSettingsHelpers";
import { getFishUserData } from "../../controllers/fishHelpers";
// @ts-ignore
const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    // collections: [],
    isSyncing: false,
    userSettings: {
      homeState: ""
    },
    settingsLoading: true,
    userFishData: []
  };
  componentDidMount() {
    // this.setUserSettings()
  }

  

  setIsSyncing = (syncing) => {
   
    this.setState({ isSyncing: syncing });
  }


  initUserData = async () =>{
    
    const data = await getFishUserData()
    console.log(data)
  }

  setFishData =  (data) =>{
    this.setState({ fishData: data });
  }
  
  setUserSettings = async () =>{

    // cache
    let cachedUserSettings = {}
    if(localStorage.getItem("userSettingsCache")){
      cachedUserSettings = JSON.parse(localStorage.getItem("userSettingsCache"))
      this.setState({ userSettings: cachedUserSettings });
      this.setState({settingsLoading: false})
    }

    // online query
    const onlineUserSettings = await getUserSettings()

    if(onlineUserSettings.usersettings.homeState){
      this.setState({ userSettings: {homeState: onlineUserSettings.usersettings.homeState} });
    }else{
      this.setState({ userSettings: {homeState: "GA"} });
    }
    this.setState({settingsLoading: false})

    // update local cache store

    localStorage.setItem("userSettingsCache",JSON.stringify(onlineUserSettings.usersettings))

  }

// @ts-ignore
  render() {
    return (
      <AppContext.Provider
              value={{
          ...this.state,
         setIsSyncing: this.setIsSyncing,
         initUserData: this.initUserData
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