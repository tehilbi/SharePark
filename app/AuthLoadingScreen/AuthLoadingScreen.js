import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,ScrollView,Button,TouchableOpacity,AsyncStorage,ActivityIndicator,StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
import 'moment-timezone';

var token;
const ACCESS_TOKEN = 'access_token';

export default class AuthLoadingScreen extends Component {
    constructor() {
      super();
      this.state={
        user:'',
        time:"",
        }
    }
  
    componentDidMount(){
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    async _bootstrapAsync(){
        console.log("_bootstrapAsync");
        try{
            await this.getToken();  
        }catch(error)
        {
            console.log("something is wrong in _bootstrapAsync: "+ error);
        }
    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
    async getToken(){
        console.log("getToken");
        try{
            token =  await AsyncStorage.getItem(ACCESS_TOKEN);    
            console.log("token is: "+token);
            if(token!==null)
            {
                this.getPermission(); 
            }
            else{
                this.props.navigation.navigate('LoginPage');
            }
        }
        catch(error)
        {
            console.log("something is wrong in getToken: ");
            console.log(error);
        }
    }
     getPermission()
    {
        fetch('http://share-park-back-end.herokuapp.com/FetchToken',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            userToken:token
        })
      })
        .then((response)=>response.json())
        .then((res)=>
        {
            if(res.success===true)
            {
                this.setState({
                    user:res.user
                  });
                if(this.state.user.PermissionId!=null)
                {
                    this.AddEvent();
                    if(this.state.user.PermissionId==='1')
                        this.props.navigation.navigate('ManagerProfile',{user:this.state.user});
                    else if(this.state.user.PermissionId==='2')
                        this.props.navigation.navigate('empWithParking' ,{user:this.state.user});  
                    else if(this.state.user.PermissionId==='3')
                        this.props.navigation.navigate('empWithNoParking');
                    else
                        alert("There no permission in the DB!");
                }
                else{
                    alert("No permission in DB");
                    }   
            }
            else
            {
                alert("error in get user details from db");
                console.log(res.message);
            }
        })
        .done();
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
            event:FirstName+" "+LastName+" turn on the app.",
            time:this.state.time   
        })
      })
        .done();
    }   
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });