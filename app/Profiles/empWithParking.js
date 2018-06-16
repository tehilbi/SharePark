import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,TouchableOpacity,} from 'react-native';


import HomeEmp from './HomeEmp';
import SettingsScreenEmpWithParking from './SettingsScreenEmpWithParking';


import {StackNavigator} from 'react-navigation';
import {DrawerNavigator} from 'react-navigation'

export default class empWithParking extends Component{
    constructor(props)
    {        
        super(props);
        this.state=
        {
            user:this.props.navigation.state.params.user
        }
    }
  render(){
    return(
       <AppEmpWithParking  user={user=this.state.user}/>   
    );
  }
}

const AppEmpWithParking=DrawerNavigator({
    Home:{
        screen:HomeEmp
    },
    Settings:{
        screen:props => <SettingsScreenEmpWithParking {...props}/* id={id}*/ user={user}  /> //im here
    },

})

AppRegistry.registerComponent('empWithParking',()=>empWithParking);


