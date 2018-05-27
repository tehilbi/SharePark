import React ,{Component} from 'react';
import {AppRegistry, Text,View,Image,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Parking2 extends Component{
  constructor(props){
       super(props);
       this.state={
        // parkingColor2:''
       }       
   }
  
  // availableParking(){
  //       this.setState({parkingColor2:'g'});
  // }

  // notAvailableParking(){
  //     this.setState({parkingColor2:'r'});
  // }

  // blueParking(){
  //   this.setState({parkingColor2:'b'});
  // }

  // componentWillMount(){
  //   if(this.props.parkingColor2==='g')
  //        this.availableParking();
  //   if(this.props.parkingColor2==='r')
  //        this.notAvailableParking();
  // }

   render(){
    if(this.props.parkingColor2=='orange'){
      return(
        <View>
          <Image source={require('./carOrange.png')}/>
          <Text style={styles.num}>2</Text>
        </View>
        )
    }else if(this.props.parkingColor2=='green'){
      return(
        <View>
          <Image source={require('./carGreen.png')}/>
          <Text style={styles.num}>2</Text>
        </View>
        )
    }else if(this.props.parkingColor2=='red'){
      return(
        <View>
          <Image source={require('./carRed.png')}/>
          <Text style={styles.num}>2</Text>
        </View>
        )
    }else if(this.props.parkingColor2=='blue'){
      return(
        <View  >
          <Image source={require('./carBlue.png')}/>
          <Text style={styles.num}>2</Text>
        </View>
        )
    }else if(this.props.parkingColor2=='grey'){
      return(
        <View  >
          <Image source={require('./carGrey.png')}/>
          <Text style={styles.num}>2</Text>
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

AppRegistry.registerComponent('Parking2',()=>Parking2);