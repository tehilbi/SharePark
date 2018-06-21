import React ,{Component} from 'react';
import {AppRegistry, Text,View,Image,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Parking4 extends Component{
  constructor(props){
       super(props);
       this.state={
        // parkingColor4:''
        hour:'',
        minute:''
       }       
   }
   async componentWillMount(){
    await this.time();
   }
   async time(){
    const res = await fetch('http://share-park-back-end.herokuapp.com/timePicker4',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        }   
      })
    const result =await res.json()
    if(result.hour!=''&&result.hour!='0'&&result.hour!='23')
    {
      this.setState({hour:result.hour, minute: result.minute });
    }
    else{
      this.setState({hour:'22', minute:'00' });
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
          <Text style={styles.time}>{this.state.hour}:{this.state.minute}</Text>
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
    },
    time:{
      color:'white',
      padding:10
    }
  })

AppRegistry.registerComponent('Parking4',()=>Parking4);