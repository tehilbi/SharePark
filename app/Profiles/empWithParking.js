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
        this.state={
            // id:this.props.navigation.state.params.id
        }
    }
  render(){
    //   console.log()
    return(
       <AppEmpWithParking/> 
    //    id={id=this.state.id}/> 
    );
  }
}
// screen: (props) => <MyNotificationsScreen {...props.navigation.state.params} propName={val1} />

const AppEmpWithParking=DrawerNavigator({
    Home:{
        screen:HomeEmp
    },
    Settings:{
        screen:SettingsScreenEmpWithParking
        // (props)=><SettingsScreenEmpWithParking{...props.navigation.state.params} id={id}/>
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


