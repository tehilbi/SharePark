import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Header, Title, Content, Text,
    Button, Icon, Left, Right, Body, Badge,
    List, ListItem,AppRegistry, CheckBox
} from 'native-base';
import { Animated,View, ListView,TouchableOpacity } from 'react-native';
import styles from './styles';

var taskArray = [];
var EmpsDelete=[];

export default class test extends Component{
    constructor(props) {
        super(props);

        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Id != r2.Id });
        this.state = {
            tasks: taskArray,
            dataSource: dataSource.cloneWithRows(taskArray),
            isLoading: true,
            editMode:false,
            Delete:[],
            controlHeight: new Animated.Value(0),
            controlOpacity: new Animated.Value(0),
            controlWidth: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.getTaskList();
    }

    findTaskIndex(taskId) {
        let { tasks } = this.state;
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id == taskId) {
                return i;
            }
        }
        return -1;
    }

    async getTaskList() {
        try {
            this.getTheData(function (json) {
            taskArray = json;    
            
            taskArray=taskArray.map((data)=>{
                var o=Object.assign({},data);
                o.isChecked=false;
                return o;
            });

            this.setState({
                tasks: taskArray,
                dataSource: this.state.dataSource.cloneWithRows(taskArray),
                isLoading: false
            })
        }.bind(this));
            
        } catch (error) {
            console.log("There was an error getting the tasks");
        }
    }

    getTheData(callback) {
        var url = "http://192.168.1.9:3000/Employees/";
        fetch(url).then(response => response.json())
            .then(json => callback(json))
            .catch(error => console.log(error));
    }

    toggleEditMode() {
        if(!this.state.editMode)
        {
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(this.state.controlOpacity, { toValue: 1, duration: 300 }),
                    Animated.timing(this.state.controlHeight, { toValue: 100, duration: 300}),
                    Animated.timing(this.state.controlWidth, { toValue: 20, duration: 300})
                ])
            ]).start();
        }
        else
        {
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(this.state.controlOpacity, { toValue: 0, duration: 300 }),
                    Animated.timing(this.state.controlHeight, { toValue: 0, duration: 300}),
                    Animated.timing(this.state.controlWidth, { toValue: 0, duration: 300})
                ])
            ]).start();
        }
        this.setState({
            editMode: !this.state.editMode
        });
        console.log("edit mode: "+this.state.editMode);
    }

    toggleCheckForTask(taskId) {
        var foundIndex = taskId;


        // the ischecked value will be set for that task in the tasks array
        var newTasks = this.state.tasks;
        newTasks[foundIndex].isChecked = !newTasks[foundIndex].isChecked;
        
        //to delete
        var newDelete=[];
        var k=0;
        for (var i = 0; i < 4; i++) {
            if(this.state.tasks[i].isChecked==true)
            {
                newDelete[k]=this.state.tasks[i].id;
                console.log('newDelete is ', newDelete[k]);
                k++;
            }
                
        }

        // the list is updated with the new task array
        var newDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Id != r2.Id });

        this.setState({
            tasks: newTasks,
            dataSource: newDataSource.cloneWithRows(newTasks),
            Delete:newDelete
        });
        for (var i = 0; i < 4; i++) {
                console.log('tasks is ', this.state.Delete[i]);
        }

    }

    renderRow(rowData, sectionId, rowId) {
        return (
            <ListItem>
                 <Animated.View style={{opacity: this.state.controlOpacity, 
                    width: this.state.controlWidth}}>
                    <CheckBox delete={rowData.isDelete} checked={rowData.isChecked} onPress={() => this.toggleCheckForTask(rowId)} />
                    </Animated.View>
                <Body>
                    <Text>{rowData.FirstName} {rowData.LastName}</Text>
                    <View>
                        <Text style={styles.taskDate}>Ocupation:{rowData.OcupationId}</Text>
                    </View>
                </Body>
                <Animated.View style={{ opacity: this.state.controlOpacity, 
                    height: 20}}>
                <Right>
                    <TouchableOpacity small  style={styles.taskEffort}><Text>Edit</Text></TouchableOpacity>
                </Right>
                </Animated.View>
            </ListItem>
        );
    }

    render() {
        let currentView = <View />;
        if (this.state.isLoading)
         {
            currentView = <View />;
        } else {
            currentView = <ListView style={styles.taskListView}
                dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}
                enableEmptySections={true}
            />;
        }

        return (
            <Container style={{...styles.container}}>
                <Header style={{...styles.header}}>
                    <Left>
                        <Text style={{...styles.title}}>Users</Text>   
                    </Left>
                    <Right>
                        <TouchableOpacity onPress={() => this.toggleEditMode()} transparent ><Text>Options</Text></TouchableOpacity>
                    </Right>
                </Header>
               
                <Content>
                    {currentView}
                </Content>
                    <Animated.View style={{ opacity: this.state.controlOpacity, 
                    height: this.state.controlHeight}}>
                        <TouchableOpacity 
                        onPress={this.DeleteEmployee}
                        style={{...styles.buttonContainer}} >
                            <Text style={{...styles.buttonText}}>
                            Delete Employee
                            </Text>
                        </TouchableOpacity >
                    </Animated.View>
            </Container>
        );
    }
    DeleteEmployee=()=>
    {
    //לשנות אייפי
        fetch('http://192.168.1.9:3000/RemoveEmployee',{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tasks : Delete
            })
        
            }).then((response) => response.json())
            .then((responseJson) => {
        
            // Showing response message coming from server after inserting records.
            alert(responseJson);
        
            }).catch((error) => {
                console.error(error);
            });
      }
}


//AppRegistry.registerComponent('test',()=>test);
