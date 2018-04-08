import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,TouchableOpacity,} from 'react-native';
import{Icon,Button,Container,Header,Content,Right}from 'native-base'


export default class ManagerProfile extends Component{
  render(){
    return(
        <Container >
        <Header style={styles.header} >
           <Text style={styles.title}>Manager Menu</Text>
        </Header>
            <Content style={styles.contentContainerStyle}>
            <TouchableOpacity >
                        
                    </TouchableOpacity > 
            </Content>
        </Container>
    );
  }
}

const styles=StyleSheet.create(
    {
        header:{
            backgroundColor:'#0099FF'
        },
        container:{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#2896d3'
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
         //   alignItems:'center',
          //  justifyContent:'center',
            backgroundColor:'white'
        }
        
    }
);
AppRegistry.registerComponent('ManagerProfile',()=>ManagerProfile);


