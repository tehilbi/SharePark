import React ,{Component} from 'react';
import {AppRegistry, Text,View,Image,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Parking4 extends Component{
  constructor(props){
       super(props);
       this.state={
        // parkingColor4:''
       }       
   }
  
  // availableParking(){
  //       this.setState({parkingColor4:'g'});
  // }

  // notAvailableParking(){
  //     this.setState({parkingColor4:'r'});
  // }

  // blueParking(){
  //   this.setState({parkingColor4:'b'});
  // }

  // componentWillMount(){
  //   if(this.props.parkingColor4==='g')
  //        this.availableParking();
  //   if(this.props.parkingColor4==='r')
  //        this.notAvailableParking();
  // }

   render(){
    if(this.props.parkingColor4=='orange'){
      return(
        <View>
          <Image source={require('./carOrange.png')}/>
          <Text style={styles.num}>4</Text>
        </View>
        )
    }else if(this.props.parkingColor4=='green'){
      return(
        <View>
          <Image source={require('./carGreen.png')}/>
          <Text style={styles.num}>4</Text>
        </View>
        )
    }else if(this.props.parkingColor4=='red'){
      return(
        <View>
          <Image source={require('./carRed.png')}/>
          <Text style={styles.num}>4</Text>
        </View>
        )
    }else if(this.props.parkingColor4=='blue'){
      return(
        <View  >
          <Image source={require('./carBlue.png')}/>
          <Text style={styles.num}>4</Text>
        </View>
        )
    }else if(this.props.parkingColor4=='grey'){
      return(
        <View  >
          <Image source={require('./carGrey.png')}/>
          <Text style={styles.num}>4</Text>
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

AppRegistry.registerComponent('Parking4',()=>Parking4);