import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Header, Title, Content,Text,Button, Left, Right, Body,List, ListItem,AppRegistry,BackHandler,ToastAndroid} from 'native-base';
import { View, ScrollView ,ListView,TouchableOpacity,Alert} from 'react-native';
import styles from './styles';
import Moment from 'react-moment';


var taskArray = [];

export default class EventLog extends Component{
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Id != r2.Id });
        this.state = {
            tasks: taskArray,
            dataSource: dataSource.cloneWithRows(taskArray),
            isLoading: true,          
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
            console.log("There was an error getting the events");
        }
    }

    getTheData(callback) {
        var url = "http://192.168.1.121:3000/fetchEvents/";
        fetch(url).then(response => response.json())
            .then(json => callback(json))
            .catch(error => console.log(error));
    }

    renderRow(rowData, sectionId, rowId) {   
        return (
            <ListItem >
                <Body>
                    <Text>{rowId}) {rowData.event}</Text>
                    <Text style={styles.taskDate}>{rowData.date}</Text>                  
                </Body>
            </ListItem >
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
                        <Text style={{...styles.title}}>Events</Text>   
                    </Left>
                </Header>
               
                <Content>
                    {currentView}
                </Content>      
            </Container>
        );
    }
}


//AppRegistry.registerComponent('test',()=>test);
