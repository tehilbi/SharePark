import React , {Component} from 'react';
import {AppRegistry,Text,View,TextInput,Image,StyleSheet,ScrollView,Button,TouchableOpacity,AsyncStorage,} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class LoginPage extends Component{
    constructor(props)
    {
        //note
        super(props);
        this.state={
            username:'',
            Password:'',
            permission:'',
            id:''
        }
    }

    //check if the user loged in priviously or not
    componentDidMount(){
        this._loadInitialState().done();
    }

    _loadInitialState=async()=>{
        var value=await AsyncStorage.getItem('user') ;
        if(value!==null)
        {
            switch(this.state.permission){
                case '1':this.props.navigation.navigate('ManagerProfile');
                break;
                case '2':{this.props.navigation.navigate('empWithParking');}
                break;
                case '3':this.props.navigation.navigate('empWithNoParking');
                break;
            }
        }
    }
 
  render(){
   
    return(
        <ScrollView >
            <Image 
            
            style={styles.myPic}
            source={require('./Login.png')}
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
                    </TouchableOpacity > 
                   
            </View> 
        </ScrollView>   
    );
  }

  login=()=>
  {
      //לשנות אייפי
      fetch('http://192.168.1.9:3000/users',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            username:this.state.username,
            Password:this.state.Password,
         
        })
      })
        .then((response)=>response.json())
        .then((res)=>
        {
            if(res.success===true)
            {
                AsyncStorage.setItem('user',res.user);
                this.state.permission=res.user;
                this.state.id=res.id;
                
                if(res.user==='1')
                    this.props.navigation.navigate('ManagerProfile');
                else if(res.user==='2')
                     this.props.navigation.navigate('empWithParking' ,{ id: this.state.id });  
                else if(res.user==='3')
                    this.props.navigation.navigate('empWithNoParking');    
            }
            else
            {
                alert(res.message);
            }
        })
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