import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import{Icon,Button,Container,Header,Content,Right}from 'native-base';
import AwesomeButton from 'react-native-awesome-button';



export default class ManagerProfile extends Component{
    updateIndex()
    {
    }

    handleButtonPress() {
        console.log('I was pressed');
    }
  render(){
    const buttons = ['Hello', 'World', 'Buttons']
    return(
        <Container >
        <Header style={styles.header} >
           <Text style={styles.title}>Manager Menu</Text>
        </Header>
        <View style={styles.container1}>
        <AwesomeButton
          states={{
            default: {
              backgroundStyle: {
                backgroundColor: 'red',
                minHeight: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30
              },
              onPress: this.handleButtonPress
            }
          }}
        />
      </View>
            <Content style={styles.contentContainerStyle}>
                <TouchableOpacity onPress={this.login} style={styles.buttonContainer}>
                    <Text>
                     LOGIN
                    </Text>
                </TouchableOpacity > 
            </Content>
        </Container>
    );
  }
}

const styles=StyleSheet.create(
    {
        buttonContainer:{
            alignSelf:'auto',
            margin:20,
            padding:20,
            backgroundColor:'white',//'#0099FF',
            borderWidth:1.5,
            borderColor:'black',
           // backgroundColor:'rgba(255,255,255,0.6)',
    
    
        },
        header:{
            backgroundColor:'#0099FF'
        },
        container:{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            //backgroundColor:'#2896d3'
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
        },
        container1: {
            flex: 1,
            flexDirection: 'column',
            margin: 30,
            marginTop: 560
          }
        
    }
);
AppRegistry.registerComponent('ManagerProfile',()=>ManagerProfile);


