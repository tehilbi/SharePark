
import React , {Component} from 'react';
import {AppRegistry,Text,View,TextInput} from 'react-native';
import {StackNavigator} from 'react-navigation';

import LoginPage from './app/LoginPage/LoginPage';
import ManagerProfile from './app/Profiles/ManagerProfile';
import empWithParking from './app/Profiles/empWithParking';
import empWithNoParking from './app/Profiles/empWithNoParking';


const Application=StackNavigator(
  {
    Home:{screen:ManagerProfile},/*{screen:LoginPage},*/
    ManagerProfile:{screen:ManagerProfile},
    empWithParking:{screen:empWithParking},
    empWithNoParking:{screen:empWithNoParking},
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
