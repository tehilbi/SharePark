
import React , {Component} from 'react';

import {Platform,AppRegistry,Text,View,TextInput} from 'react-native';
import {StackNavigator} from 'react-navigation';

import AuthLoadingScreen from './app/AuthLoadingScreen/AuthLoadingScreen';
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

  render(){
    return(
          <Application/>  
    );
  }
}
AppRegistry.registerComponent('SharePark',()=>SharePark);
