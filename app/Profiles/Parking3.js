import React ,{Component} from 'react';
import {AppRegistry, Text,View,Image,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Parking3 extends Component{
  constructor(props){
       super(props);
       this.state={
        // parkingColor3:''
        hour:'',
        minute:''
       }       
   }
   async componentWillMount(){
    await this.time();
   }
   async time(){
    const res = await fetch('http://share-park-back-end.herokuapp.com/timePicker3',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        }   
      })
    const result =await res.json()
    if(result.hour!='')
    {
      this.setState({hour:result.hour, minute: result.minute });
    }
    else{
      this.setState({hour:'22', minute:'00' });
    }
}
  // availableParking(){
  //       this.setState({parkingColor3:'g'});
  // }

  // notAvailableParking(){
  //     this.setState({parkingColor3:'r'});
  // }

  // blueParking(){
  //   this.setState({parkingColor3:'b'});
  // }

  // componentWillMount(){
  //   if(this.props.parkingColor3==='g')
  //        this.availableParking();
  //   if(this.props.parkingColor3==='r')
  //        this.notAvailableParking();
  // }

   render(){
    if(this.props.parkingColor3=='orange'){
      return(
        <View>
          <Image source={require('./carOrange.png')}/>
          <Text style={styles.num}>3</Text>
        </View>
        )
    }else if(this.props.parkingColor3=='green'){
      return(
        <View>
          <Image source={require('./carGreen.png')}/>
          <Text style={styles.num}>3</Text>
          <Text style={styles.time}>{this.state.hour}:{this.state.minute}</Text>
        </View>
        )
    }else if(this.props.parkingColor3=='red'){
      return(
        <View>
          <Image source={require('./carRed.png')}/>
          <Text style={styles.num}>3</Text>
        </View>
        )
    }else if(this.props.parkingColor3=='blue'){
      return(
        <View  >
          <Image source={require('./carBlue.png')}/>
          <Text style={styles.num}>3</Text>
        </View>
        )
    }else if(this.props.parkingColor3=='grey'){
      return(
        <View  >
          <Image source={require('./carGrey.png')}/>
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
    },
    time:{
      color:'white',
      padding:10
    }
  })

AppRegistry.registerComponent('Parking3',()=>Parking3);