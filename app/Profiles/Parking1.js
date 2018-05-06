import React ,{Component} from 'react';
import {AppRegistry, Text,View,Image,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Parking1 extends Component{
  constructor(props){
       super(props);
       this.state={
        // parkingColor1:''
       }       
   }
  
  // availableParking(){
  //       this.setState({parkingColor1:'g'});
  // }

  // notAvailableParking(){
  //     this.setState({parkingColor1:'r'});
  // }

  // blueParking(){
  //   this.setState({parkingColor1:'b'});
  // }

  // componentWillMount(){
  //   if(this.props.parkingColor1==='g')
  //        this.availableParking();
  //   if(this.props.parkingColor1==='r')
  //        this.notAvailableParking();
  // }

   render(){
    if(this.props.parkingColor1=='orange'){
      return(
        <View>
          <Image source={require('./carOrange.png')}/>
          <Text style={styles.num}>1</Text>
        </View>
        )
    }else if(this.props.parkingColor1=='green'){
      return(
        <View>
          <Image source={require('./carGreen.png')}/>
          <Text style={styles.num}>1</Text>
        </View>
        )
    }else if(this.props.parkingColor1=='red'){
      return(
        <View>
          <Image source={require('./carRed.png')}/>
          <Text style={styles.num}>1</Text>
        </View>
        )
    }else if(this.props.parkingColor1=='blue'){
      return(
        <View  >
          <Image source={require('./carBlue.png')}/>
          <Text style={styles.num}>1</Text>
        </View>
        )
    }else if(this.props.parkingColor1=='grey'){
      return(
        <View  >
          <Image source={require('./carGrey.png')}/>
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