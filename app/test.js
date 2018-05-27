/*import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Header, Title, Content, Text,
    Button, Icon, Left, Right, Body, Badge,
    List, ListItem,AppRegistry, CheckBox
} from 'native-base';
import { Animated,View, ListView,TouchableOpacity,FlatList,Alert } from 'react-native';
import styles from './styles';
import Swipeout from 'react-native-swipeout';
*/

import React, {
	Component,
} from 'react';
import {
	AppRegistry,
	Dimensions,
	ListView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View
} from 'react-native';

import {
    Container, Header, Title, Content, Text,
    Button, Icon, Left, Right, Body, Badge,
    List, ListItem,AppRegistry, CheckBox
} from 'native-base';

var taskArray = [];
var EmpsDelete=[];

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import styles from './styles';

class test extends Component {

	constructor(props) {
		super(props);
		this.state = {
            tasks: taskArray,
            dataSource: dataSource.cloneWithRows(taskArray),
            isLoading: true,
            editMode:false,
            Delete:[],
			listType: 'FlatList',
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
            console.log("There was an error getting the tasks");
        }
    }

    getTheData(callback) {
        var url = "http://192.168.1.9:3000/Employees/";
        fetch(url).then(response => response.json())
            .then(json => callback(json))
            .catch(error => console.log(error));
    }

	closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}

	deleteRow(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		const newData = [...this.state.dataSource];
		const prevIndex = this.state.dataSource.findIndex(item => item.key === rowKey);
		newData.splice(prevIndex, 1);
		this.setState({dataSource: newData});
	}

	deleteSectionRow(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		var [section, row] = rowKey.split('.');
		const newData = [...this.state.sectionListData];
		const prevIndex = this.state.sectionListData[section].data.findIndex(item => item.key === rowKey);
		newData[section].data.splice(prevIndex, 1);
		this.setState({sectionListData: newData});
	}

	onRowDidOpen = (rowKey, rowMap) => {
		console.log('This row opened', rowKey);
		setTimeout(() => {
			this.closeRow(rowMap, rowKey);
		}, 2000);
	}

	render() {
        let currentView = <View />;
        if (this.state.isLoading)
        {
            currentView = <View />;
        } 
        else 
        {
            currentView = <SwipeListView style={styles.taskListView}
            dataSource={this.state.dataSource} 
            renderRow={ data => (
                <TouchableHighlight
                    onPress={ _ => console.log('You touched me') }
                    style={styles.rowFront}
                    underlayColor={'#AAA'}
                >          
                </TouchableHighlight>
            )}
            renderHiddenRow={ (data, secId, rowId, rowMap) => (
                <View style={styles.rowBack}>
                    <Text>Left</Text>
                    <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, `${secId}${rowId}`) }>
                        <Text style={styles.backTextWhite}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, `${secId}${rowId}`) }>
                        <Text style={styles.backTextWhite}>Delete</Text>
                    </TouchableOpacity>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-150}
        />
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

                    </Container>

                    	
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	standalone: {
		marginTop: 30,
		marginBottom: 30,
	},
	standaloneRowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		justifyContent: 'center',
		height: 50,
	},
	standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: '#8BC645',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15
	},
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
	controls: {
		alignItems: 'center',
		marginBottom: 30
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5
	},
	switch: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 10,
		width: Dimensions.get('window').width / 4,
	}
});

export default test;

