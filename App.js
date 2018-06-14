
import React , {Component} from 'react';

import {Platform,AppRegistry,Text,View,TextInput} from 'react-native';
import {StackNavigator} from 'react-navigation';
<<<<<<< HEAD

import AuthLoadingScreen from './app/AuthLoadingScreen/AuthLoadingScreen';
=======
// import type { RemoteMessage } from 'react-native-firebase';
console.disableYellowBox = true;
>>>>>>> ff1cc1d0640e1ca9f8de60642276db181eb68970
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
<<<<<<< HEAD
=======
import test2 from './app/test2';
>>>>>>> ff1cc1d0640e1ca9f8de60642276db181eb68970

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
  },
  {
    navigationOptions:
    {
      header:false,
    }
  },
  // {
  //   initialRouteName: 'AuthLoadingScreen',
  // }   
);

export default class SharePark extends Component{
<<<<<<< HEAD

  render(){
    return(
          <Application/>  
=======
 
  render(){
    return(
          <Application/>
>>>>>>> ff1cc1d0640e1ca9f8de60642276db181eb68970
    );
  }
}
AppRegistry.registerComponent('SharePark',()=>SharePark);
