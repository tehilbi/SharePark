import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,TouchableOpacity,} from 'react-native';


import HomeEmp from './HomeEmp';
import SettingsScreenEmpWithParking from './SettingsScreenEmpWithParking';
import Navigation from './Navigation';
import Gamification from './Gamification';
import Logout from '../LogOut/LogOut';

import {StackNavigator} from 'react-navigation';
import {DrawerNavigator} from 'react-navigation'

export default class empWithParking extends Component{
    constructor(props)
    {        
        super(props);
        this.state=
        {
           // id:this.props.navigation.state.params.id,
            user:this.props.navigation.state.params.user
        }
    }
  render(){
    
    return(
       <AppEmpWithParking /*id={id=this.state.id}*/ user={user=this.state.user}/>   
      
    );
  }
}
// screen: (props) => <MyNotificationsScreen {...props.navigation.state.params} propName={val1} />

const AppEmpWithParking=DrawerNavigator({
    Home:{
        screen:HomeEmp
    },
    Settings:{
        screen:props => <SettingsScreenEmpWithParking {...props}/* id={id}*/ user={user}  /> //im here
        //props => <StaticWebView {...props} url="...." /> 
    },
    Navigation:{
        screen:Navigation
    },
    Gamification:{
        screen:Gamification
    },
    Logout:{
        screen:props=><Logout {...props} user={user}/>
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


