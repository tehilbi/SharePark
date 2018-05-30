import React , {Component} from 'react';
import {Picker,Select,AppRegistry,Text,View,TextInput,Image,StyleSheet,ScrollView,ActivityIndicator,Button,TouchableOpacity,AsyncStorage,Alert,ListView,} from 'react-native';
import{Header}from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
var OcupationArray = [];
import {StackNavigator} from 'react-navigation';
import 'moment-timezone';

const dateToFormat = '1976-04-19T12:59-0500';
export default class AddUser extends Component{
 
    constructor(props)
    {
        //note
        super(props);
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Id != r2.Id });
        this.state={
            username:'yulia',
            Password:'234',
            permission:'',
            FirstName:'yu',
            LastName:'lia',
            Ocupation:'',
            PickerValueHolder : '',  
            isLoading: true,
            Ocupations: OcupationArray,
            dataSource: dataSource.cloneWithRows(OcupationArray),
            event:"",
            time:""
        }
        
    }

    //return fetch('https://share-park-back-end.herokuapp.com/FetchOcupations/')
      
    

    componentDidMount() {
        this.getOcupationList();
    }

    async getOcupationList() {
        try {
            this.getTheData(function (json) {
            OcupationArray = json;    
            this.setState({
                Ocupations: OcupationArray,
                dataSource: this.state.dataSource.cloneWithRows(OcupationArray),
                isLoading: false
            })
        }.bind(this));
            
        } catch (error) {
            console.log("There was an error getting the ocupations");
        }
    }

    getTheData(callback) {
        var url = "http://192.168.43.56:3000/FetchOcupations/";
        fetch(url).then(response => response.json())
            .then(json => callback(json))
            .catch(error => console.log(error));
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
                            label="Permission"
                            style={{width:'100%'}}
                            selectedValue={this.state.permission}
                            onValueChange={(itemValue,itemIndex) => this.setState({permission:itemValue})}
                            >                 
                            <Picker.Item label='Please select an option...' value='0' />          
                            <Picker.Item label="Manager" value="1" />
                            <Picker.Item label="Employee with parking spot" value="2"/>
                            <Picker.Item label="Employee without parking spot" value="3"/>
                    </Picker>

                    <Picker
                            label="Ocipation"
                            style={{width:'100%'}}
                            selectedValue={this.state.Ocupation}
                            onValueChange={(itemValue,itemIndex) => this.setState({Ocupation:itemValue})}
                            >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item label="Lecturer" value="1" />
                            <Picker.Item label="President" value="2"/>                          
                    </Picker>
                </View>
                
                <TouchableOpacity 
                    onPress={this.AddUser}
                    style={styles.buttonContainer} >
                        <Text style={styles.buttonText}>
                        Add User
                        </Text>
                    </TouchableOpacity >   
            </View> 
        </ScrollView>   
    );
  }
  


  AddUser=()=>
  {
      //לשנות אייפי
      fetch('http://192.168.43.56:3000/AddEmployee',{
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
                alert(this.state.FirstName+' '+this.state.LastName+' is added to the system!');  
                this.props.navigation.navigate('ManagerProfile');   
            }
            else
            {
                alert(res.message);
            }
        })
        .done();
        this.AddEvent();
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
        this.SetCurrentDate();   
      //לשנות אייפי
      fetch('http://192.168.43.56:3000/AddEvent',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            event:"New user added to the system: "+this.state.FirstName+" "+this.state.LastName+ " successfully",
            time:this.state.time
        })
      })
        .then((response)=>response.json())
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


