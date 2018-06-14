import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,ScrollView,Button,TouchableOpacity,AsyncStorage,ActivityIndicator,StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
var token;
const ACCESS_TOKEN = 'access_token';
export default class AuthLoadingScreen extends Component {
    constructor() {
      super();

      this.state={
        user:'',
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
            console.log("error in _bootstrapAsync: "+ error);
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
                console.log("inside else")
                console.log("this = ")
                console.log(this)
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
        console.log("getPermission");
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
                console.log("res = ");
                console.log(res.user);
                this.setState({
                    user:res.user
                  });
                console.log("this.state.user = ");
                console.log(this.state.user);
                if(this.state.user.PermissionId!=null)
                {
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
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });