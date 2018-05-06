import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,TouchableOpacity,} from 'react-native';


import HomeEmp from './HomeEmp';
import SettingsScreenEmpWithParking from './SettingsScreenEmpWithParking';


import {StackNavigator} from 'react-navigation';
import {DrawerNavigator} from 'react-navigation'

export default class empWithParking extends Component{
  render(){
    return(
       <AppEmpWithParking/> 
    );
  }
}

const AppEmpWithParking=DrawerNavigator({
    Home:{
        screen:HomeEmp
    },
    Settings:{
        screen:SettingsScreenEmpWithParking
    }
})

// const styles=StyleSheet.create(
//     {
//         container:{
//             flex:1,
//             alignItems:'center',
//             justifyContent:'center',
//             backgroundColor:'#0099FF'
//         },
//         text:{
//             color:'#fff'
//         }
//     }
// );

AppRegistry.registerComponent('empWithParking',()=>empWithParking);


