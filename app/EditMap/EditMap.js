import React, { Component } from 'react';
import { connect } from 'react-redux';
import {AppRegistry,Container, Header, Title, Content,Text,Button, Left, Right, Body,List, ListItem,Picker,Item} from 'native-base';
import { View, ScrollView ,ListView,TouchableOpacity,Alert,StyleSheet} from 'react-native';
import 'moment-timezone';

var taskArray = [];

export default class EditMap extends Component{
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Id != r2.Id });
            this.state = {
            tasks: taskArray,
            dataSource: dataSource.cloneWithRows(taskArray),
            isLoading: true,
            user:this.props.navigation.state.params.user,
            event:"",
            PickerValueHolder :'',  
            status:'yy'

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
                isLoading: false,
                task:''
            })
        }.bind(this));         
        } catch (error) {
            console.log("There was an error getting the parking spots");
        }
    }

    getTheData(callback) {
        var url = "http://192.168.1.121:3000/FetchParkingSpots/";
        fetch(url).then(response => response.json())
            .then(json => callback(json))
            .catch(error => console.log(error));
    }

    onValueChange(key,value){
        console.log("onValueChange");
        console.log(key+':'+value);
        // tasks[rowData.id].status=this.rowData.status;
        // this.setState({tasks[rowData.id].status:this.rowData.status});
    }
    renderRow(rowData, sectionId, rowId){    
        console.log(this.state.tasks[rowData.id]);
        return(
            <ListItem >
                <Body>
                    <View style={{flexDirection: 'row',alignItems:'center'}}>
                        <View style={{flex: 1}}>
                            <Text /*style={styles.row}*/>{rowData.id} </Text>          
                        </View>
                            <View style={{flex: 1}}>
                                <Picker
                                    style={styles.picker}
                                    mode="dropdown"
                                    itemStyle={styles.itemStyle} 
                                    selectedValue={this.state.tasks[0].status}
                                    onValueChange={status =>{this.setState({tasks})}}> 
                                    <Picker.Item label="Reserved" value="1"/>
                                    <Picker.Item label="Unreserved" value="2"/> 
                                </Picker>
                            </View>
                            <View style={{flex:1}}>
                                <Picker
                                    style={styles.picker}
                                    mode="dropdown"
                                    itemStyle={styles.itemStyle}
                                    selectedValue={this.state.tasks[0].color}
                                    onValueChange={color =>{this.setState({tasks})}}>                 
                                    <Picker.Item label="Orange" value="1"/>
                                    <Picker.Item label="Red" value="2"/>
                                    <Picker.Item label="Green" value="3"/>
                                    <Picker.Item label="Blue" value="3"/>
                                </Picker>
                            </View>
                        </View>
                    </Body>
                </ListItem>
            );
            console.log(this.state);
        }
    render(){
        let currentView = <View />;
        if (this.state.isLoading)
        {
            currentView = <View />;
        } 
        else 
        {
            currentView = <ListView style={styles.taskListView}
            dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}
            enableEmptySections={true}
            />;
        }
        return(
            <Container style={styles.container}>
                <Header style={styles.header} >
                    <Text style={styles.title}>Edit Map</Text>
                </Header>
                <Content>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex: 1}}>
                            <Left>
                                <Text>Parking Spot</Text> 
                            </Left>
                        </View>
                        <View style={{flex: 1}}>
                            <Right>
                                <Text>Status</Text>    
                            </Right>
                        </View>
                        <View style={{flex: 1}}>
                            <Right>
                                <Text>current color</Text>    
                            </Right>
                        </View>
                    </View>
                    {currentView}
                </Content>
            </Container>
                );
            }
        }
const styles=StyleSheet.create({
    itemStyle: {
        fontSize: 15,
        height: 75,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
      },
    picker: {
        width: 128
      },
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
        //alignItems:'center',
        //  justifyContent:'center',
        backgroundColor:'white'
    }, 
    taskListView: {
        paddingBottom: 100,
        flex:1,
    },
    container: {
        flex: 1,
    },
    row:{
        alignSelf:'center',
        aspectRatio:10,
        justifyContent:'center'
    }
    
});
// AppRegistry.registerComponent('EditMap',()=>EditMap);


