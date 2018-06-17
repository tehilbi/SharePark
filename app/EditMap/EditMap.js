import React, { Component } from 'react';
import { connect } from 'react-redux';
import {AppRegistry,Container, Header, Title, Content,Text,Button, Left, Right, Body,List, ListItem,Picker} from 'native-base';
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
            console.log("There was an error getting the parking spots");
        }
    }

    getTheData(callback) {
        var url = "http://share-park-back-end.herokuapp.com/FetchParkingSpots/";
        fetch(url).then(response => response.json())
            .then(json => callback(json))
            .catch(error => console.log(error));
    }

    renderRow(rowData, sectionId, rowId) {     
        return(
            <ListItem >
                <Body>
                    <View style={{flex: 1,flexDirection: 'row',  alignItems: 'stretch'}}>
                        <View>
                            <Text style={styles.row}>{rowData.id} </Text>
                        </View>
                        <View  >
                                <Picker 
                                    label="status"
                                    style={{ width: 200,
                                        height: 44,
                                        backgroundColor: '#FFF0E0',
                                        borderColor: 'blue',
                                        borderBottomWidth: 2,
                                        flex: 1}}
                                    selectedValue={this.state.PickerValueHolder}
                                    onValueChange={(itemValue,itemIndex) => this.setState({PickerValueHolder:itemValue})}
                                    >                 
                                    <Picker.Item label='Please select an option...' value='0' />          
                                    <Picker.Item label="Manager" value="1" />
                                    <Picker.Item label="Employee with parking spot" value="2"/>
                                    <Picker.Item label="Employee without parking spot" value="3"/>
                                </Picker>
                            </View>
                            <View   style={{flex: 1}}>
                                <Picker 
                                    label="status"
                                    style={{width:'20%'}}
                                    selectedValue={this.state.PickerValueHolder}
                                    onValueChange={(itemValue,itemIndex) => this.setState({PickerValueHolder:itemValue})}
                                    >                 
                                    <Picker.Item label='Please select an option...' value='0' />          
                                    <Picker.Item label="Manager" value="1" />
                                    <Picker.Item label="Employee with parking spot" value="2"/>
                                    <Picker.Item label="Employee without parking spot" value="3"/>
                                </Picker>
                            </View>
                        </View>
                </Body>
            </ListItem >
        );
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
                    <View style={{ flexDirection: 'row'}}>
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


