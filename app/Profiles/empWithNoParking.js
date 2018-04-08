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

// const styles=StyleSheet.create(
//     {
//         container:{
//             flex:1,
//             alignItems:'center',
//             justifyContent:'center',
//             backgroundColor:'#606060'
//         },
//         text:{
//             color:'#606060'
//         }
//     }
// );

AppRegistry.registerComponent('empWithNoParking',()=>empWithNoParking);


