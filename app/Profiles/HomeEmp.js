import React , {Component} from "react";
import{
    Platform,
    View,
    Text,
    StyleSheet,
    AppRegistry,
    Image,
    TouchableOpacity, 
    Alert,
    AsyncStorage,
    ActivityIndicator,
    BackHandler,
    ToastAndroid
}from "react-native";

import {StackNavigator} from 'react-navigation';
import{IconToggle,Icon,Button,Container,Header,Content,Left,Right,Center,Body,Title}from 'native-base'
import Pickerise from '@rimiti/react-native-pickerise';

import Parking1 from './Parking1';
import Parking2 from './Parking2';
import Parking3 from './Parking3';
import Parking4 from './Parking4';

const timer = require('react-native-timer');

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
              loaded4:false,
              user:this.props.user,
              item:'Select',
              showMsg: false

            //   flag:'0'
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

      }
     
      componentWillUnmount() {
          BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
          timer.clearTimeout(this);
      }
    
      handleBackButton() {
          ToastAndroid.show('Can not press the button!! for logout you have to go to setting page', ToastAndroid.SHORT);
          return true;
      }

   
    async componentWillMount() {
        //   componentDidMount() {
        console.log('Modal Mounts!')
        setTimeout(() => {
        console.log('Open')
        this.componentWillMount()
        }, 20000)


        await this.parking1();
        await this.parking2();
        await this.parking3();
        await this.parking4();
    }

    async parking1(){
            const res = await fetch('http://share-park-back-end.herokuapp.com/parkingSpots1',{
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
        const res = await fetch('http://share-park-back-end.herokuapp.com/parkingSpots2',{
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
        const res = await fetch('http://share-park-back-end.herokuapp.com/parkingSpots3',{
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
        const res = await fetch('http://share-park-back-end.herokuapp.com/parkingSpots4',{
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
        const items = [
			{ section: true, label: 'Please select time:' }, { label: '9:00' },{ label: '9:30' }, { label: '10:00' },{ label: '10:30' }, { label: '11:00' },{ label: '11:30' }, { label: '12:00' },{ label: '12:30' },
            { label: '13:00' },{ label: '13:30' },{ label: '14:00' },{ label: '14:30' },{ label: '15:00' },{ label: '15:30' },{ label: '16:00' },{ label: '16:30' },{ label: '17:00' },{ label: '17:30' },{ label: '18:00' },{ label: '18:30' },{ label: '19:00' },{ label: '19:30' },
            { label: '20:00' },{ label: '20:30' },{ label: '21:00' },{ label: '21:30' },{ label: '22:00' }
		];
     
     
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
                    <TouchableOpacity onPress={this.reqParkingSpot}>
                        <Image
                        style={styles.button}
                        source={require('./BUTTON.png')}
                        />
                    </TouchableOpacity>
                    <Pickerise style={styles.picker}
                        itemsContainerStyle={styles.itemsContainerStyle}
                        itemsChildStyle={styles.itemsChildStyle}
                        itemStyle={styles.itemStyle}
                        itemTextStyle={styles.itemTextStyle}
                        selectTextStyle={styles.selectTextStyle}
                        selectStyle={styles.selectStyle}
                        sectionStyle={styles.sectionStyle}
                        sectionTextStyle={styles.sectionTextStyle}
                        cancelStyle={styles.cancelStyle}
                        cancelTextStyle={styles.cancelTextStyle}
                        items={items}
                        initValue="Push me first"
                        cancelText="Cancel"
                        onChange={(item)=>this.setState({item:item.label})}
                       />
            </Container>     
                
        );     
    }
    reqParkingSpot=()=>
    {
        console.log("pppppppppppppppppppppppppppppp");
        console.log(this.state.item);
        if(this.state.item=="Select")
        {
            alert('Please select time first!!');
        }    
        else if(this.state.color1==='green')
        {
            alert('Park in parking Spot number 1!!');
        }
        else if(this.state.color2==='green')
        {
            alert('Park in parking Spot number 2!!');
        }
        else if(this.state.color3==='green')
        {
            alert('Park in parking Spot number 3!!');
        }
        else if(this.state.color4==='green')
        {
            alert('Park in parking Spot number 4!!');
        }
        else if(this.state.user.parkingNum==='1'&&this.state.color1=='orange')
        {
            alert('Your parking spot number 1 is available!!');
        }
        else if(this.state.user.parkingNum==='2'&&this.state.color2=='orange')
        {
            alert('Your parking spot number 2 is available!!');
        }
        else if(this.state.user.parkingNum==='3'&&this.state.color3=='orange')
        {
            alert('Your parking spot number 3 is available!!');
        }
        else if(this.state.user.parkingNum==='4'&&this.state.color4=='orange')
        {
            alert('Your parking spot number 4 is available!!');
        }
        else
        {
            alert('We are looking for parking for you:) Please try again in few minutes');
            this.notificationReq();
        }
    }

    notificationReq=()=>
    {
        fetch('http://share-park-back-end.herokuapp.com/noti',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
            })
          })
            .then((response)=>response.json())
            .then((res)=>
            {
                if(res.success===false)
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
            textAlign: 'center', alignSelf: 'center', fontWeight: 'normal'
        },
        button:{
            alignSelf:'stretch',
            margin:10,
            padding:20,
            //backgroundColor:'green',//'#0099FF',
            borderWidth:1,
            borderColor:'black',
            // height: 200,
            // width: 200,
            
            alignSelf:'center',
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
        },
        itemsContainerStyle: {
            borderRadius: 0,
            backgroundColor: 'green',
            marginBottom: 30,
            padding: 0,
        },
        itemsChildStyle: {
            paddingHorizontal: 0
        },
        itemStyle: {
            marginTop: 10,
            backgroundColor: '#919191',
            borderBottomColor: 'transparent',
        },
        itemTextStyle: {
            color: '#fff',
            fontSize: 18,
        },
        selectTextStyle: {
            color: 'white',
            fontSize: 20,
        },
        selectStyle: {
            borderWidth: 0,
            paddingTop: 21,
            paddingLeft: 0,
        },
        sectionStyle: {
            borderRadius: 0,
        },
        sectionTextStyle: {
            fontSize: 20,
            color: '#fff',
        },
        cancelStyle: {
            backgroundColor: '#22A7F0',
            paddingVertical: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
            borderRadius: 0,
        },
        cancelTextStyle: {
            color: "#FFF",
            fontSize: 18,
        },
        picker:{
            backgroundColor: '#0099FF',
        }
    });

 AppRegistry.registerComponent('HomeEmp',()=>HomeEmp);

  