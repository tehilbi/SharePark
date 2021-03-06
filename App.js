
import React , {Component} from 'react';

import {Platform,AppRegistry,Text,View,TextInput,BackHandler,ToastAndroid} from 'react-native';
import {StackNavigator} from 'react-navigation';

import AuthLoadingScreen from './app/AuthLoadingScreen/AuthLoadingScreen';
// import type { RemoteMessage } from 'react-native-firebase';
console.disableYellowBox = true;
import LoginPage from './app/LoginPage/LoginPage';
import ManagerProfile from './app/Profiles/ManagerProfile';
import empWithParking from './app/Profiles/empWithParking';
import empWithNoParking from './app/Profiles/empWithNoParking';
import AddUser from './app/AddUser/AddUser';
import EventLog from './app/EventLog/EventLog';
import LogOut from './app/LogOut/LogOut';
import ParkingData from './app/ParkingData/ParkingData';
import RemoveUser from './app/RemoveUser/RemoveUser';
import EditMap from './app/EditMap/EditMap';
import SettingsScreenEmpWithParking from './app/Profiles/SettingsScreenEmpWithParking';

const Application=StackNavigator(
  {
    AuthLoadingScreen:{screen:AuthLoadingScreen},
    LoginPage:{screen:LoginPage},
    ManagerProfile:{screen:ManagerProfile},
    empWithParking:{screen:empWithParking},
    empWithNoParking:{screen:empWithNoParking},
    AddUser:{screen:AddUser},
    EventLog:{screen:EventLog},
    LogOut:{screen:LogOut},
    ParkingData:{screen:ParkingData},
    RemoveUser:{screen:RemoveUser},
    EditMap:{screen:EditMap},
    SettingsScreenEmpWithParking:{screen:SettingsScreenEmpWithParking},
  },
  {
    navigationOptions:
    {
      header:false,
    }
  },
  {
    initialRouteName: 'AuthLoadingScreen',
  }   
);

export default class SharePark extends Component{
  // componentDidMount() {
  //       BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  //     }
    
    // componentWillUnmount() {
    //       BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    //   }
    
    //   handleBackButton() {
    //       ToastAndroid.show('Can not press the button!! for logout you have to go to setting page', ToastAndroid.SHORT);
    //       return true;
    //   }

  render(){
    return(
          <Application/>  
    );
  }
}
AppRegistry.registerComponent('SharePark',()=>SharePark);
