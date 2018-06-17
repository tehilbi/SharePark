import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,TouchableOpacity,ScrollView,Image,AsyncStorage,BackHandler} from 'react-native';
import{Icon,Button,Container,Header,Content,Right,Left}from 'native-base';

const ACCESS_TOKEN = 'access_token';

export default class LogOut extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            user:this.props.user
        };
    }

    componentDidMount()
    {
        this.removeToken();
    }

    async removeToken(){
        try{
            await AsyncStorage.removeItem(ACCESS_TOKEN);
            await this.logoutToken();            
        }
        catch(error){
            console.log("something is wrong in removeToken!");
            console.log(error);
        }
        this.exit_function();
    }

    async logoutToken(){
        await fetch('http://share-park-back-end.herokuapp.com/updateTokenLogout',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            id:/*this.state.id*/this.state.user.id
        })
      })
     

    }
    
    
    exit_function = () => {
        BackHandler.exitApp();
     }
    render()
    {
        
        return(
            <ScrollView >
                <View style={styles.contentContainerStyle}>
                        <Text textAlign='justify'>
                        GOODBEY!    
                        </Text>
                </View>
            </ScrollView>
    );
  }
}

const styles=StyleSheet.create(
    {
        header:{
            backgroundColor:'#0099FF'
        },

        title:{
            flex:1,
            alignItems:'center',
          //  justifyContent:'center',
            color:'white',
            alignSelf:'center',
            padding: 110,
            fontSize: 15,
            fontWeight: 'bold'
        },
        contentContainerStyle:{
            flex:1,
            flexDirection:'row',
            flexWrap: 'wrap',
           
          //תalignItems:'center',
          //  justifyContent:'center',
            backgroundColor:'white'
        },
      
        
    }
);
AppRegistry.registerComponent('LogOut',()=>LogOut);


