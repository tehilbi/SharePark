
import React , {Component} from 'react';
import {AppRegistry,Text,View,TextInput} from 'react-native';
import {StackNavigator} from 'react-navigation';

import LoginPage from './app/LoginPage/LoginPage';
import ManagerProfile from './app/Profiles/ManagerProfile';
import empWithParking from './app/Profiles/empWithParking';
import empWithNoParking from './app/Profiles/empWithNoParking';
import ManagerPressParkingData from './app/Profiles/ManagerPressParkingData';
import ManagerPressAddUser from './app/Profiles/ManagerPressAddUser';
const Application=StackNavigator(
  {
    Home:/*{screen:ManagerProfile},*/{screen:LoginPage},
    ManagerProfile:{screen:ManagerProfile},
    empWithParking:{screen:empWithParking},
    empWithNoParking:{screen:empWithNoParking},
    ManagerPressAddUser:{screen:ManagerPressAddUser},
    ManagerPressParkingData:{screen:ManagerPressParkingData},
  },
  {
    navigationOptions:
    {
      header:false,
    }
  }    
);

export default class SharePark extends Component{
 
  render(){
    return(
          <Application/>
     
    );
  }

}
AppRegistry.registerComponent('SharePark',()=>SharePark);
