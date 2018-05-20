import React , {Component} from "react";
import{
    View,
    Text,
    StyleSheet,
    AppRegistry
}from "react-native";

import{Icon,Button,Container,Header,Content,Left,Right,Title}from 'native-base'

export default class SettingsScreenEmpWithNoParking extends Component{
    render(){
        return(
            <Container style={styles.container}>
            <Header style={styles.header}> 
                <Left>
                    <Icon name="menu"  onPress={()=>
                    this.props.navigation.navigate('DrawerOpen')}/>
                </Left>
                <Title style={styles.settingText}>Settings</Title>
                <Right>
                    <Icon name="information-circle"/>
                </Right>
            </Header>         
               
                <Content >
                    
                </Content>        
        </Container>        
        );
    }
}



const styles=StyleSheet.create(
    {
        header:{
            backgroundColor:'#0099FF',
        }, 
        container:{
            flex: 1,
            backgroundColor:'black'
        },
        settingText:{
            fontSize:20,
            fontWeight:'bold',
            textShadowColor:'black',
            textShadowOffset:{width:1,height:1},
            textAlign: 'center', alignSelf: 'center', fontWeight: 'normal'
        }
    }
)

AppRegistry.registerComponent('SettingsScreenEmpWithNoParking',()=>SettingsScreenEmpWithNoParking);

