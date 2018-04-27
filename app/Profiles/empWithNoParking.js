import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,TouchableOpacity,} from 'react-native';


import HomeEmpWithNoParking from './HomeEmpWithNoParking';
import SettingsScreenEmpWithNoParking from './SettingsScreenEmpWithNoParking';

import {DrawerNavigator} from 'react-navigation'

export default class empWithNoParking extends Component{
  render(){
    return(
       <AppEmpWithNoParking/> 
    );
  }
}

const AppEmpWithNoParking=DrawerNavigator({
    Home:{
        screen:HomeEmpWithNoParking
    },
    Settings:{
        screen:SettingsScreenEmpWithNoParking
    }
})

AppRegistry.registerComponent('empWithNoParking',()=>empWithNoParking);


