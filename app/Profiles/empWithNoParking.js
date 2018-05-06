import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,TouchableOpacity,} from 'react-native';


import HomeEmp from './HomeEmp';
import SettingsScreenEmpWithNoParking from './SettingsScreenEmpWithNoParking';

import {StackNavigator} from 'react-navigation';
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
        screen:HomeEmp 
    },
    Settings:{
        screen:SettingsScreenEmpWithNoParking
    }
});

//<AppEmpWithNoParking screenProps={this.state}/>

AppRegistry.registerComponent('empWithNoParking',()=>empWithNoParking);


