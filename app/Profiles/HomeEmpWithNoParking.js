import React , {Component} from "react";
import{
    View,
    Text,
    StyleSheet,
    AppRegistry,
}from "react-native";

import{Icon,Button,Container,Header,Content,Right}from 'native-base'
//import Icon from 'react-native-vector-icons/Ionicons';

export default class HomeEmpWithNoParking extends Component{
    render(){
        return(
            <Container >
            <Header style={styles.header}>
                <Right>
                    <Icon name="menu" onPress={()=>
                    this.props.navigation.navigate('DrawerOpen')}/>
                </Right>
            </Header>
                <Content contentContainerStyle={{
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Text>HomeScreen</Text>
                </Content>
            </Container>
        );
    }
}


const styles=StyleSheet.create(
    {
        header:{
            backgroundColor:'#0099FF'
        }
    }
)
 AppRegistry.registerComponent('HomeEmpWithNoParking',()=>HomeEmpWithNoParking);
