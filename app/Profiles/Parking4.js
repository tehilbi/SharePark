import React ,{Component} from 'react';
import {AppRegistry, Text,View,Image,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Parking4 extends Component{
  constructor(props){
       super(props);
       this.state={
        hour:'',
        minute:''
       }       
   }
   async componentWillMount(){
    await this.time();
   }
   async time(){
    const res = await fetch('http://192.168.1.121:3000/timePicker3',{
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