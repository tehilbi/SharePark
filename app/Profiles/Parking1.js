import React ,{Component} from 'react';
import {AppRegistry, Text,View,Image,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Parking1 extends Component{
  constructor(){
       super();
       //console.log('color');
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
  // blueParking(){
  //   this.setState({parkingSate:'b'});
  // }
  componentWillMount(color){
    this.notAvailableParking();
  }
  //   console.log(color);
  //   if(color=='g')
  //        this.notAvailableParking();
  //   else
  //       this.availableParking();
  // }

   render(){
     //let view=(<View></View>
    if(this.state.parkingSate=='o'){
      return(
        <View>
          <Image source={require('./carOrange.png')}/>
          <Text style={styles.num}>1</Text>
        </View>
        )
    }else if(this.state.parkingSate=='g'){
      return(
        <View>
          <Image source={require('./carGreen.png')}/>
          <Text style={styles.num}>1</Text>
        </View>
        )
    }else if(this.state.parkingSate=='r'){
      return(
        <View>
          <Image source={require('./carRed.png')}/>
          <Text style={styles.num}>1</Text>
        </View>
        )
    }else if(this.state.parkingSate=='b'){
      return(
        <View  >
          <Image source={require('./carBlue.png')}/>
          <Text style={styles.num}>1</Text>
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

AppRegistry.registerComponent('Parking1',()=>Parking1);