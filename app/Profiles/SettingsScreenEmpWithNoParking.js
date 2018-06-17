import React , {Component} from "react";
import{
    View,
    Text,
    StyleSheet,
    AppRegistry,
    Image
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
                    <Icon name="settings"/>
                </Right>
            </Header>         
<<<<<<< HEAD
            <Image style={styles.set} source={require('./settings.png')}/>     
            <Text style={styles.nav}>
                Settings will be available soon
            </Text>      
=======
                <Content >
                </Content>        
>>>>>>> 97005cbb65c841912d227dbd67bf2c1f0005f5a0
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
        set:{
            textAlign: 'center', alignSelf: 'center', fontWeight: 'normal'
        },
        nav:{
            flex: 1,
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
    }
)

AppRegistry.registerComponent('SettingsScreenEmpWithNoParking',()=>SettingsScreenEmpWithNoParking);

