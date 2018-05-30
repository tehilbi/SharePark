import React , {Component} from 'react';
import {Picker,Select,AppRegistry,Text,View,TextInput,Image,StyleSheet,ScrollView,ActivityIndicator,Button,TouchableOpacity,AsyncStorage,Alert,ListView,} from 'react-native';
import{Header}from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
var OcupationArray = [];
import {StackNavigator} from 'react-navigation';

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
        var url = "http://192.168.1.38:3000/FetchOcupations/";
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
      let data = 
      [
        {
            value: 'Manager',
            key:'1'
        }, 
        {
            value: 'Employee with parking spot',
            key:'1'
        },
        {
            value: 'Employee without parking spot',
            key:'1'
        }
    ];

      let data2 = 
      [
        {
            value: 'Lecturer',
            key:'1'
        }, 
        {
            value: 'President',
            key:'2'
        },
       
    ];

    //   let ocupations = this.state.ocupations;
    //     let optionItems = ocupations.map((Ocupation) =>
    //             <option key={Ocupation.Ocupation}>{Ocupation.Ocupation}</option>
    //         );
   
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
                            style={{width:'80%'}}
                            selectedValue={this.state.permission}
                            onValueChange={(itemValue,itemIndex) => this.setState({permission:itemValue})}
                            >                           
                            <Picker.Item label="Manager" value="1" />
                            <Picker.Item label="Employee with parking spot" value="2"/>
                            <Picker.Item label="Employee without parking spot" value="3"/>
                    </Picker>

                    <Picker
                            style={{width:'80%'}}
                            selectedValue={this.state.Ocupation}
                            onValueChange={(itemValue,itemIndex) => this.setState({Ocupation:itemValue})}
                            >
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
      fetch('http://192.168.1.38:3000/AddEmployee',{
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


