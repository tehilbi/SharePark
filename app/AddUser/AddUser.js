import React , {Component} from 'react';
import {Picker,Select,AppRegistry,Text,View,TextInput,Image,StyleSheet,ScrollView,ActivityIndicator,Button,TouchableOpacity,AsyncStorage,Alert} from 'react-native';
import{Header}from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';

export default class AddUser extends Component{
 
    constructor(props)
    {
        //note
        super(props);
       
        this.state={
            username:'',
            Password:'',
            permission:'',
            FirstName:'',
            LastName:'',
            Ocupation:'',
            PickerValueHolder : '',  
            isLoading: true,
            
        }
        
    }
    componentDidMount() {
        //return fetch('https://share-park-back-end.herokuapp.com/FetchOcupations/')
        return fetch('http://192.168.1.118:3000/FetchOcupations/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
              dataSource: responseJson
            }, function() {
              // In this block you can do something with new state.
            });
          })
          .catch((error) => {
            console.log(error);
          });
    }

   
  
    onValueChange(key,value){
        console.log(key+':'+value);
        
        this.setState({Ocupation:value});
    }

  render(){
   
    if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
      let data = [{
        value: 'Manager',
      }, {
        value: 'Employee with parking spot',
      }, {
        value: 'Employee without parking spot',
      }];
   
    return(
        <ScrollView > 
            <Header style={styles.header} >
            <Text style={styles.title}>Add User</Text>
            </Header> 
            <View>
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

                      <TextInput 
                        underlineColorAndroid='transparent' 
                        style={styles.input}
                        onChangeText={(FirstName)=>this.setState({FirstName})}
                       // value={this.state.Password}
                        placeholder='FirstName'>
                    </TextInput>

                      <TextInput 
                        underlineColorAndroid='transparent' 
                        style={styles.input}
                        onChangeText={(LastName)=>this.setState({LastName})}
                       // value={this.state.Password}
                        placeholder='LastName'>
                    </TextInput>
                    <Picker
                        label=''
                        selectedValue={this.state.Ocupation}
                        onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} 
                        mode="dropdown">

                        { this.state.dataSource.map((item, key)=>(
                        <Picker.Item label={item.Ocupation} value={item.Ocupation} key={key} />)
                        )}
                        </Picker>

                    <Dropdown
                        label='Permission'
                        data={data}
                        onChangeText={(Permission)=>this.setState({Permission})}
                    />
                </View>
                
                <TouchableOpacity 
                    onPress={this.Modify}
                    style={styles.buttonContainer} >
                        <Text style={styles.buttonText}>
                        Add User
                        </Text>
                    </TouchableOpacity >   
            </View> 
        </ScrollView>   
    );
  }
  Modify()
  {
    if(this.state.Ocupation=='Lecturer')
    {
        this.setState({
            Ocupation:'1'
        });
    }
    else if(this.state.Ocupation=='President')
    {
        this.setState({
            Ocupation:'2'
        });
    }
       

    if(this.state.permission=='Manager')
    {
        this.setState({
            permission:'1'
        });
    }
       
    else if(this.state.permission=='Employee with parking spot')
    {
        this.setState({
            permission:'2'
        });
    }
       
    else if(this.state.permission=='Employee without parking spot')
    {
        this.setState({
            permission:'3'
        });
    }
    this.AddUser();

  }

  AddUser=()=>
  {
      //לשנות אייפי
      fetch('http://192.168.1.118:3000/AddEmployee',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            username:this.state.username,
            Password:this.state.Password,
            permission:this.state.permission,
            FirstName:this.state.FirstName,
            LastName:this.state.LastName,
            Ocupation:this.state.Ocupation,
         
        })
      })
        .then((response)=>response.json())
        .then((res)=>
        {
            if(res.success===true)
            {
                //alert(FirstName+' '+LastName+' is added to the system!')     
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
    header:{
        backgroundColor:'#0099FF'
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
    title:{
        flex:1,
        alignItems:'center',
        color:'white',
        alignSelf:'center',
        padding: 110,
        fontSize: 15,
        fontWeight: 'bold'
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


AppRegistry.registerComponent('AddUser',()=>AddUser);


