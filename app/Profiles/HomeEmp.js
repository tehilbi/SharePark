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
    ActivityIndicator
}from "react-native";

import {StackNavigator} from 'react-navigation';
import{IconToggle,Icon,Button,Container,Header,Content,Left,Right,Center,Body,Title}from 'native-base'
// import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm'

import Parking1 from './Parking1';
import Parking2 from './Parking2';
import Parking3 from './Parking3';
import Parking4 from './Parking4';

// FCM.on(FCMEvent.Notification, async (notif) => {
//     // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
//     if(notif.local_notification){
//         //this is a local notification
//         console.log("local notification");
//     }
//     if(notif.opened_from_tray){
//         //iOS: app is open/resumed because user clicked banner
//         //Android: app is open/resumed because user clicked banner or tapped app icon
//         console.log("opened_from_trayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
//     }
//     // await someAsyncCall();
  
//     if(Platform.OS ==='ios'){
//       //optional
//       //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application.
//       //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
//       //notif._notificationType is available for iOS platfrom
//       switch(notif._notificationType){
//         case NotificationType.Remote:
//           notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
//           break;
//         case NotificationType.NotificationResponse:
//           notif.finish();
//           break;
//         case NotificationType.WillPresent:
//           notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
//           break;
//       }
//     }
//   });
//   FCM.on(FCMEvent.RefreshToken,(token)=>{
//     console.log(token)
//   });
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
        const res = await fetch('http://192.168.1.11:3000/parkingSpots1',{
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
        const res = await fetch('http://192.168.1.11:3000/parkingSpots2',{
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
        const res = await fetch('http://192.168.1.11:3000/parkingSpots3',{
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
        const res = await fetch('http://192.168.1.11:3000/parkingSpots4',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
          })
        const result =await res.json()
        this.setState({color4:result.color, loaded4: true });
    }

    // componentDidMount(){
    //     FCM.requestPermissions().then(()=>console.log('grantedddddddddddddddddddddddddddddddddddddddd')).catch(()=>console.log('noti'));
    
    //     FCM.getFCMToken().then(token => { console.log(token); });
    //     this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
    //     //
    //     });
    
    //     FCM.getInitialNotification().then(notif => {
    //       console.log(notif)
    //   });
    // }
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
                    <TouchableOpacity onPress={this.test} style={styles.button} >
                        <Text 
                            style={styles.logo}>
                            SharePark
                        </Text>
                    </TouchableOpacity> 
            </Container>         
        );     
    }

    test=()=>
    {
        console.log("333333333333333333333333333333333333333333333333333");

        fetch('http://192.168.1.11:3000/noti',{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            }
            }
        );
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

  