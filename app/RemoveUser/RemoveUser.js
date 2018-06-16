import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Header, Title, Content,Text,Button, Left, Right, Body,List, ListItem} from 'native-base';
import { Animated,View, ScrollView ,ListView,TouchableOpacity,Alert,ToastAndroid} from 'react-native';
import Swipeout from 'react-native-swipeout';
import styles from './styles';
import 'moment-timezone';

var taskArray = [];

export default class RemoveUser extends Component{
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Id != r2.Id });
        this.state = {
            tasks: taskArray,
            dataSource: dataSource.cloneWithRows(taskArray),
            isLoading: true,
            activeRowKey:null,
            fname:'',
            lname:'',
            time:"",
            user:this.props.navigation.state.params.user,
        };
    }

    componentDidMount() {
        this.getTaskList();
    }

    async getTaskList() {
        try {
            this.getTheData(function (json) {
            taskArray = json;    
            this.setState({
                tasks: taskArray,
                dataSource: this.state.dataSource.cloneWithRows(taskArray),
                isLoading: false
            })
        }.bind(this));
            
        } catch (error) {
            console.log("There was an error getting the employees");
        }
    }

    getTheData(callback) {
        var url = "http://share-park-back-end.herokuapp.com/Employees/";
        fetch(url).then(response => response.json())
            .then(json => callback(json))
            .catch(error => console.log(error));
    }

	_deleteRow(rowId) {
         // the list is updated with the new task array
         this.state.tasks.splice(rowId, 1);
         this.setState({
           dataSource: this.state.dataSource.cloneWithRows(this.state.tasks)
         })         
        }
	
    

    renderRow(rowData, sectionId, rowId) {     
        const SwipeSettings={
            autoClose:true,
            onClose:(sectionId,rowId,direction)=>{
               /* if(this.state.activeRowKey!=null){
                    this.setState({activeRowKey:null});
            }*/

            },
            onOpen:(sectionId,rowId,direction)=>{               
              this.setState({activeRowKey:rowData.id});
            },
            right:[
                {
                     onPress:()=>{
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete?',
                            [
                                {text:'No',onPress:()=>console.log('Cancel Pressed'),style:'cancel'},
                                {text:'Yes',onPress:()=>{
                                    this.setState({
                                        fname:rowData.FirstName,
                                        lname:rowData.LastName
                                    });
                                    this._deleteRow(rowId);
                                    this.DeleteEmployee();    
                                }},
                            ],
                            {cancelable:true}
                        );
                    },
                    text:'Delete',type:'delete'
                },
                {
                    onPress:()=>{
                    },
                    text:'Edit',type:'edit'
                }
            ],
            rowId:this.props.index,
            sectionId:1
        }      
        return (
            <ListItem >
                <Body>
                    <Swipeout {...SwipeSettings}>
                        <Text>{rowData.FirstName} {rowData.LastName}</Text>
                        <Text style={styles.taskDate}>Ocupation:{rowData.OcupationId}</Text>
                    </Swipeout>
                </Body>
            </ListItem >
        );
    }
    render() {
        let currentView = <View />;
        if (this.state.isLoading)
        {
            currentView = <View />;
        } 
        else 
        {
            currentView = <ListView style={styles.taskListView}
                dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}
                enableEmptySections={true}/>;
        }
        return (
            <Container style={{...styles.container}}>
                <Header style={{...styles.header}}>
                    <Left>
                        <Text style={{...styles.title}}>Users</Text>   
                    </Left>
                </Header>           
                <Content>
                    {currentView}
                </Content>
                    <View >
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('AddUser',{user:this.state.user})}
                        style={{...styles.buttonContainer}} >
                            <Text style={{...styles.buttonText}}>Add User</Text>
                        </TouchableOpacity >
                    </View>
            </Container>
        );
    }
    DeleteEmployee=()=>
    {
        fetch('http://share-park-back-end.herokuapp.com/RemoveEmployee',{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emp : this.state.activeRowKey
            })
        
            }).then((response) => response.json())
            .then((responseJson) => {

            if(responseJson.success===true)
            {
                //ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
                this.AddEvent();     
            }
            else
            {
                ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
            }  
            }).catch((error) => {
                console.error(error);
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
        const { fname, lname } = this.state;
        this.SetCurrentDate();
        fetch('http://share-park-back-end.herokuapp.com/AddEvent',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
           // event:`${FirstName} ${LastName} removed ${fname} ${lname} from the system.`,
            event:FirstName+" "+LastName+" removed "+fname+" "+lname+" from the system.",
            time:this.state.time   
        })
      })
        .then((response)=>response.json())
        .then((res)=>
        {
            if(res.success===true)
            {
                ToastAndroid.show(this.state.fname+" "+this.state.lname+" removed from the system successfully.", ToastAndroid.SHORT);
            }
            else
            {
                ToastAndroid.show(res.message, ToastAndroid.SHORT);
            }
        })
        .done();
    }   
}


//  AppRegistry.registerComponent('RemoveUser',()=>RemoveUser);
