import React ,{Component} from 'react';
import {AppRegistry, Text,View,Image,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Parking3 extends Component{
  constructor(){
       super();
       this.state={
         parkingSate:'o'
      }
   }
  
   availableParking(){
        this.setState({parkingSate:'g'});
  }

  notAvailableParking(){
      this.setState({parkingSate:'r'});
  }

  //  componentWillMount(){
  //        this.availableParking();
  // }

   render(){
    if(this.state.parkingSate=='o'){
      return(
        <View>
          <Image source={require('./carOrange.png')}/>
          <Text style={styles.num}>3</Text>
        </View>
        )
    }else if(this.state.parkingSate=='g'){
      return(
        <View  style={{ borderWidth:1,borderColor:'grey'}}>
          <Image source={require('./carGreen.png')}/>
          <Text style={styles.num}>3</Text>
        </View>
        )
    }else if(this.state.parkingSate=='r'){
      return(
        <View  style={{ borderWidth:1,borderColor:'grey'}}>
          <Image source={require('./carRed.png')}/>
          <Text style={styles.num}>3</Text>
        </View>
        )
    }
  }
}

const styles=StyleSheet.create(
  {
    num:{
      color:'white',
      padding:20
    }
  })

AppRegistry.registerComponent('Parking3',()=>Parking3);