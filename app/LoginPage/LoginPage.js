import React , {Component} from 'react';
import {Platform,AppRegistry,Text,View,TextInput,Image,StyleSheet,ScrollView,Button,TouchableOpacity,AsyncStorage,} from 'react-native';
import {StackNavigator} from 'react-navigation';
import 'moment-timezone';


const ACCESS_TOKEN = 'access_token';

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm'
  
export default class LoginPage extends Component{
    constructor(props)
    {
        //note//test
        super(props);
        this.state={
            username:'',
            Password:'',
            permission:'',
            id:'',
            user:'',
            time:"",
            userToken:""
        }
    }
    async componentWillMount(){
        // console.log("componentWillMount");
        FCM.requestPermissions().then(()=>console.log('grantedddddddddddddddddddddddddddd')).catch(()=>console.log('noti'));
        FCM.deleteInstanceId()
        .then( () => {
        FCM.getFCMToken().then(token => { console.log(token);});//this.saveToken(token);
        })
        FCM.on(FCMEvent.RefreshToken, (token) =>{
            // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
            this.setState({userToken:token});
            console.log(token)
        });
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
          if (notif.fcm && notif.fcm.body) { // A new notification was received 
            FCM.presentLocalNotification({ 
            title:"You have a new message!", body: notif.fcm.body, big_text: notif.fcm.body, show_in_foreground: true }) 
          }
        });
      
    }
    componentDidMount(){
        FCM.getInitialNotification().then(notif => {
          console.log(notif)
        });
    }

    render(){
        return(
            <ScrollView >
                <Image 
                style={styles.myPic}
                source={require('./login.png')}
                />
                <View>
                    <Text 
                        style={styles.logo}>
                        Welcome to SharePark
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            underlineColorAndroid='transparent' 
                            style={styles.input}
                            onChangeText={(username)=>this.setState({username})}
                        // value={this.state.username}
                            placeholder='Username'>
                        </TextInput>

                        <TextInput
                            secureTextEntry={true} 
                            underlineColorAndroid='transparent' 
                            style={styles.input}
                            onChangeText={(Password)=>this.setState({Password})}
                        // value={this.state.Password}
                            placeholder='Password'>
                        </TextInput>
                    </View>
                    
                    <TouchableOpacity 
                        onPress={this.login}
                        style={styles.buttonContainer} >
                            <Text style={styles.buttonText}>
                            LOGIN
                            </Text>
                        </TouchableOpacity>             
                </View> 
            </ScrollView>   
        );
    }
    
    login=()=>
    {
        // console.log("in login");
        fetch('http://share-park-back-end.herokuapp.com/users',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            username:this.state.username,
            Password:this.state.Password  
            })
        })
        .then((response)=>response.json())
        .then((res)=>
        {
            if(res.success===true)
            {
                // console.log("in success :");
                // console.log(res);
                this.setState({id:res.user.id});
                this.setState({permission:res.user.PermissionId});
                this.setState({user:res.user});
                this.updateToken();
            }
        })
        .done();
    }
    async updateToken()
    {
        // console.log("token:")
        // console.log(this.state.userToken);
    
        fetch('http://share-park-back-end.herokuapp.com/updateToken',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                userToken:this.state.userToken,
                id:this.state.id
            })
        })
        .then((response)=>response.json())
        .then((res)=>
        {
            if(res.success===true)
            {
                AsyncStorage.setItem('user',res.user);
                this.storeToken();

                if(this.state.user.PermissionId==='1')
                {
                    // console.log("go to manager");
                    this.props.navigation.navigate('ManagerProfile',{ user:this.state.user});
                }
                else if(this.state.user.PermissionId==='2')
                {
                    this.props.navigation.navigate('empWithParking' ,{ /*id: this.state.id ,*/user:this.state.user});
                }  
                else if(this.state.user.PermissionId==='3')
                {
                    this.props.navigation.navigate('empWithNoParking',{ user:this.state.user});    
                }
                this.AddEvent();
            }
            else
            {
                alert(res.message);
            }
        })
        .done();
    }
    async storeToken(accessToken){
        // console.log("in storeToken");
        await AsyncStorage.setItem(ACCESS_TOKEN, this.state.userToken, (err)=> {
        if(err){
            console.log("an error");
            throw err;
        }
        // console.log("success to store ACCESS_TOKEN");
        }).catch((err)=> {
            console.log("error is: " + err);
        });
    }

    SetCurrentDate()
    {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hour=new Date().getHours();
        var minute=new Date().getMinutes();
        this.setState({
            time:date + '-' + month + '-' + year+' '+hour+":"+minute
        });
    }
  AddEvent=()=>
  {
      const { FirstName, LastName } = this.state.user;
      this.SetCurrentDate();
      fetch('http://share-park-back-end.herokuapp.com/AddEvent',{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
      },
      body: JSON.stringify({
         // event:`${FirstName} ${LastName} removed ${fname} ${lname} from the system.`,
          event:FirstName+" "+LastName+" logged in to the system.",
          time:this.state.time   
      })
    })
      .then((response)=>response.json())
      .done();
  }
}

var styles=StyleSheet.create({
    myPic:{
        margin:70,
        marginBottom:50,
        width:100,
        height: 70,
        flex: 1,
        alignSelf:'center',
        alignItems: 'center',
    },
    content:{
        alignItems: 'center'
    },
    container:{
        flex:1,
        backgroundColor:'white',
        padding: 70,
    },
    myText:{
        color:'red',
    },
    logo:{
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        textAlign:'center',
        alignSelf:'center',
        alignItems: 'center',
        fontFamily: 'Cochin',
        fontWeight: 'bold',
        color:'black'
    },
    inputContainer:{
        marginBottom:0,
        padding:20,
        paddingBottom:10,
        backgroundColor:'rgba(255,255,255,0.2)'},
    input:{
        fontSize: 16,
        height:40,
        padding:10,
        marginBottom:10,
        backgroundColor:'rgba(255,255,255,1)',
    },
    buttonText:{
        fontSize: 16,
        fontWeight:'bold',
        textAlign:'center',
    },
    buttonContainer:{
        alignSelf:'stretch',
        margin:20,
        padding:20,
        backgroundColor:'#0099FF',//'#0099FF',
        borderWidth:1,
        borderColor:'black',
       // backgroundColor:'rgba(255,255,255,0.6)',
    }
});
AppRegistry.registerComponent('LoginPage',()=>LoginPage);