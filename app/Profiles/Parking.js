import React ,{Component} from 'react';
import {AppRegistry, Text,View,Image,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Parking extends Component{
  constructor(props){
       super(props);
       this.state={
         parkingColor:''
       }       
   }

   render(){
        if(this.props.parkingColor=='orange'){
        return(
            <View>
            <Image source={require('./carOrange.png')}/>
            </View>
            )
        }else if(this.props.parkingColor=='green'){
        return(
            <View>
            <Image source={require('./carGreen.png')}/>
            </View>
            )
        }else if(this.props.parkingColor=='red'){
        return(
            <View>
            <Image source={require('./carRed.png')}/>
            </View>
            )
        }else if(this.props.parkingColor=='blue'){
        return(
            <View  >
            <Image source={require('./carBlue.png')}/>
            </View>
            )
        }else if(this.props.parkingColor=='grey'){
        return(
            <View  >
            <Image source={require('./carGrey.png')}/>
            </View>
            )
        }
  }
}

AppRegistry.registerComponent('Parking',()=>Parking);