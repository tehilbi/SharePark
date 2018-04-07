import React , {Component} from "react";
import{
    View,
    Text,
    StyleSheet,
    AppRegistry
}from "react-native";

import{Icon,Button,Container,Header,Content,Right}from 'native-base'

export default class SettingsScreenEmpWithNoParking extends Component{
    render(){
        return(
            <Container>
            <Header>
                <Right>
                    <Icon name='menu' onPress={()=>
                    this.props.navigation.navigate('DrawerOpen')}/>
                </Right>
            </Header>
                <Content contentContainerStyle={{
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Text>SettingsScreenEmpWithNoParking</Text>
                </Content>
            </Container>
        );
    }
}

AppRegistry.registerComponent('SettingsScreenEmpWithNoParking',()=>SettingsScreenEmpWithNoParking);

