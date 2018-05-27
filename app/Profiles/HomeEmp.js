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
    ActivityIndicator
}from "react-native";

import {StackNavigator} from 'react-navigation';
import{IconToggle,Icon,Button,Container,Header,Content,Left,Right,Center,Body,Title}from 'native-base'

import Parking1 from './Parking1';
import Parking2 from './Parking2';
import Parking3 from './Parking3';
import Parking4 from './Parking4';

export default class HomeEmp extends Component{
    constructor(props)
    {        
        super(props);
        this.state={
              color1:'orange',
              color2:'orange',
              color3:'orange',
              color4:'orange',
              loaded1:false,
              loaded2:false,
              loaded3:false,
              loaded4:false
        }
    }

    async componentWillMount(){
        await this.parking1();
        await this.parking2();
        await this.parking3();
        await this.parking4();
    }

    async parking1(){
        const res = await fetch('http://192.168.1.38:3000/parkingSpots1',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            }   
          })
        const result =await res.json()
        this.setState({color1:result.color, loaded1: true });
    }

    async parking2(){
        const res = await fetch('http://192.168.1.38:3000/parkingSpots2',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },   
          })
        const result =await res.json()
        this.setState({color2:result.color, loaded2: true });
    }

    async parking3(){
        const res = await fetch('http://192.168.1.38:3000/parkingSpots3',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
          })
        const result =await res.json()
        this.setState({color3:result.color, loaded3: true });
    }

    async parking4(){
        const res = await fetch('http://192.168.1.38:3000/parkingSpots4',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
          })
        const result =await res.json()
        this.setState({color4:result.color, loaded4: true });
    }

    render(){
        if (this.state.loaded1==false|| this.state.loaded2==false || this.state.loaded3==false || this.state.loaded4==false) {
            return(
                <ActivityIndicator style={{padding: 300}} size="large" color="#C71585" />

            );
         }
        return(
            <Container style={styles.container}>
                <Header style={styles.header}> 
                    <Left>
                        <Icon name="menu"  onPress={()=>
                        this.props.navigation.navigate('DrawerOpen')}/>
                    </Left>
                    <Title style={styles.mapText}>Parking Map</Title>
                    <Right>
                        <Icon name="refresh" onPress={() => {this.componentWillMount()}}/>
                    </Right>
                </Header>         
                   
                    <Content contentContainerStyle={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        top: 40,
                        borderWidth:2,
                        borderColor:'grey'
                    }}>
                        <Parking1 parkingColor1={color1=this.state.color1}/>
                        <Image source={require('./lines.png')}/>
                        <Parking2 parkingColor2={color2=this.state.color2}/>
                        <Image source={require('./lines.png')}/>
                        <Parking3 parkingColor3={color3=this.state.color3}/>
                        <Image source={require('./lines.png')}/>
                        <Parking4 parkingColor4={color4=this.state.color4}/>
                    </Content>      
                    <TouchableOpacity style={styles.button} >
                        <Text 
                            style={styles.logo}>
                            SharePark
                        </Text>
                    </TouchableOpacity> 
            </Container>         
        );     
    }
}

// test=()=>{
//      this.props.navigation.navigate('empWithNoParking');
// }

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
            textAlign: 'center', alignSelf: 'center', fontWeight: 'normal'
        },
        button:{
            alignSelf:'stretch',
            margin:20,
            padding:20,
            backgroundColor:'green',//'#0099FF',
            borderWidth:1,
            borderColor:'black',
            // height: 200,
            // width: 200,
            // // borderRadius: 200,
            // backgroundColor:'green',//'#0099FF',
            // alignSelf:'center',
            // alignItems: 'center',
            // marginBottom:30,
            // borderColor:'white'

            // alignSelf:'stretch',
            // margin:30,
            // padding:40,
            // backgroundColor:'green',//'#0099FF',
            // borderWidth:1,
            // borderColor:'black',
        },
        logo:{
            // flex: 1,
            fontSize: 20,
            marginBottom:10,
            justifyContent: 'center',
            textAlign:'center',
            alignSelf:'center',
            alignItems: 'center',
            fontFamily: 'Cochin',
            fontWeight: 'bold',
            color:'black'
        }
    });

 AppRegistry.registerComponent('HomeEmp',()=>HomeEmp);

  