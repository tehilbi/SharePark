import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,TouchableOpacity,} from 'react-native';


import HomeEmp from './HomeEmp';
import SettingsScreenEmpWithNoParking from './SettingsScreenEmpWithNoParking';
import Navigation from './Navigation';
import Gamification from './Gamification';
import Logout from '../LogOut/LogOut';

import {StackNavigator} from 'react-navigation';
import {DrawerNavigator} from 'react-navigation'

export default class empWithNoParking extends Component{
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
       <AppEmpWithNoParking  /*id={id=this.state.id}*/ user={user=this.state.user}/> 
    );
  }
}
const AppEmpWithNoParking=DrawerNavigator({
    Home:{
        screen:props => <HomeEmp {...props}/* id={id}*/ user={user}  /> //im here
    },
    Settings:{
        screen:SettingsScreenEmpWithNoParking
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
});

AppRegistry.registerComponent('empWithNoParking',()=>empWithNoParking);

