import React , {Component} from "react";
import{
    View,
    Text,
    StyleSheet,
    AppRegistry,
    Image
}from "react-native";

import{Icon,Button,Container,Header,Content,Left,Right,Title}from 'native-base'

export default class Navigation extends Component{
    render(){
        return(
            <Container style={styles.container}>
            <Header style={styles.header}> 
                <Left>
                    <Icon name="menu"  onPress={()=>
                    this.props.navigation.navigate('DrawerOpen')}/>
                </Left>
                <Title style={styles.settingText}>Navigation</Title>
                <Right>
                    <Icon name="navigate"/>
                </Right>
            </Header>         
                <Content >
                <Image source={require('./navigate.png')}/>  
                </Content>    
            <Text style={styles.nav}>
                Navigation will be available soon
            </Text>    
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
        },
        nav:{
            // flex: 1,
            fontSize: 20,
            justifyContent: 'center',
            textAlign:'center',
            alignSelf:'center',
            alignItems: 'center',
            fontFamily: 'Cochin',
            fontWeight: 'bold',
            color:'white',
            // margin:10,
            padding:100
        }
    })

AppRegistry.registerComponent('Navigation',()=>Navigation);

