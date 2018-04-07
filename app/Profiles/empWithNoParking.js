import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,TouchableOpacity,} from 'react-native';


export default class empWithNoParking extends Component{
  render(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
            Welcome to the emp with no parking Profile
            </Text>
        </View>   
    );
  }
}

const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#2896d3'
        },
        text:{
            color:'#fff'
        }
    }
);
AppRegistry.registerComponent('empWithNoParking',()=>empWithNoParking);


