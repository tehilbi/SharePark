import React , {Component} from "react";
import{
    View,
    Text,
    StyleSheet,
    AppRegistry,
    Image,
    TouchableOpacity, 
    Alert,
    AsyncStorage,
}from "react-native";

import {StackNavigator} from 'react-navigation';
import{Icon,Button,Container,Header,Content,Left,Right,Body,Title}from 'native-base'

import Parking1 from './Parking1';
import Parking2 from './Parking2';
import Parking3 from './Parking3';
import Parking4 from './Parking4';

export default class HomeEmpWithNoParking extends Component{
    constructor(props)
    {
        //note
        super(props);
        this.state={
            parkingNum:'1',
            color:''
        }
    }
    // _onPressButton() {
    //     Alert.alert('You tapped the button!')
    //   }

    render(){
        //console.log(this.parking);

        return(
            <Container style={styles.container}>
                <Header style={styles.header}> 
                    <Left>
                        <Icon name="menu"  onPress={()=>
                        this.props.navigation.navigate('DrawerOpen')}/>
                    </Left>
                    <Body >
                        <Title style={styles.mapText}>Parking Map</Title>
                    </Body>
                </Header>         
                    <Content contentContainerStyle={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        top: 40,
                        borderWidth:2,
                        borderColor:'grey'
                    }}>
                        <Parking1/>
                        <Image source={require('./lines.png')}/>
                        <Parking2/>
                        <Image source={require('./lines.png')}/>
                        <Parking3/>
                        <Image source={require('./lines.png')}/>
                        <Parking4/>
                    </Content>       
                    <TouchableOpacity onPress={this.parking}>
                        <View style={styles.button}>
                             <Text style={styles.buttonText}>TouchableOpacity</Text>
                        </View>
                    </TouchableOpacity>   
            </Container>         
        );
    }

parking=()=>
{

   //Alert.alert("jhgd");
    //לשנות אייפי
    fetch('http://192.168.1.62:3000/parkingSpots',{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
      },
      body: JSON.stringify({
        parkingNum:this.state.parkingNum,
      })
    })
      .then((response)=>response.json())
      .then((res)=>
      {              

          if(res.success==true)
          {
           // alert(res.message);
              AsyncStorage.setItem('color',res.color);
              //console.log(res.color);
              if(res.color==='g')
                     Parking1.method;
              else if(res.color==='r')
                    alert("rrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
              else if(res.color==='o')
                    alert("000000000000000000000000000");
          }
          else
          {
              alert(res.message);
          }
      })
      .done();
  }
}
const styles=StyleSheet.create(
    {
        header:{
            backgroundColor:'#0099FF',
        }, 
        container:{
            flex: 1,
            backgroundColor:'black'
        },
        mapText:{
            fontSize:20,
            fontWeight:'bold',
            textShadowColor:'black',
            textShadowOffset:{width:1,height:1},
        },
        cars:{
            flexDirection:'row',
            justifyContent:'space-between',
            top: 40,
            borderWidth:2,
            borderColor:'grey'
          
        },
        button:{
            alignSelf: 'center',
            bottom:0
        },
        button: {
            marginBottom: 30,
            width: 260,
            alignItems: 'center',
            backgroundColor: '#2196F3'
          },
          buttonText: {
            padding: 20,
            color: 'white'
          }
    });
 AppRegistry.registerComponent('HomeEmpWithNoParking',()=>HomeEmpWithNoParking);

  