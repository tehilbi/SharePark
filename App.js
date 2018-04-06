/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/*
import React, { Component } from 'react';

import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

/* const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
}); */
/*
export default class App extends Component {
  state= {
    Welcome:'Welcome to SharePark',
    Findpark:'Find Me Parking'
  }

  /* placeNameChangeHandler=val=>{
    this.setState({
      Welcome:val
    });
  }; */
/*
  render() {
    console.log("For test")
    return (
      <View style={styles.container}>
        <Text style={styles.Welcome}>
          {this.state.Welcome}
        </Text>
        <View style={styles.inputContainer}>  
           <TouchableOpacity

              style={{height:220,backgroundColor:'black',justifyContent:'center',width:'100%'}}>
              <Text style={styles.Findpark}>
              {this.state.Findpark}
              </Text>
           </TouchableOpacity>
        </View>
      </View>
    );
  }
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputContainer:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center"
  },
  Welcome:{
     fontSize: 50,
     textAlign: 'center',
     margin: 10,
     fontWeight: 'bold',
     color:'blue'
  },
  Findpark:{
     fontSize: 20,
     textAlign: 'center',
     margin: 10,
     fontWeight: 'bold',
     color:'white'
   },
  /* instructions: {
    textAlign: 'center',yuliaaa
    color: '#333333',
    marginBottom: 5,
  }, */
//});

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

export default class yuliaApp extends Component{
 
  render(){
    return(
          <Application/>
     
    );
  }

}
AppRegistry.registerComponent('yuliaApp',()=>yuliaApp);
