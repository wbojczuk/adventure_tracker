"use client"
import React, { Component } from "react";
// @ts-ignore
const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    // collections: [],
   isSyncing: false
  };
  componentDidMount() {
    
  }

  

  setIsSyncing = (syncing) => {
   
    this.setState({ isSyncing: syncing });
  }
// @ts-ignore
  render() {
    return (
      <AppContext.Provider
              value={{
          ...this.state,
         setIsSyncing: this.setIsSyncing
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