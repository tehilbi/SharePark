
import React , {Component} from 'react';
import {AppRegistry,Text,View,TextInput} from 'react-native';
import {StackNavigator} from 'react-navigation';

import LoginPage from './app/LoginPage/LoginPage';
import Profile from './app/Profile/Profile';

const Application=StackNavigator(
  {
    Home:{screen:LoginPage},
    Profile:{screen:Profile}
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
//AppRegistry.registerComponent('yuliaApp',()=>yuliaApp);
