import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,TouchableOpacity,ScrollView,Image} from 'react-native';
import{Icon,Button,Container,Header,Content,Right,Left}from 'native-base';



export default class ManagerProfile extends Component{
 
    button1() {
        console.log('I was pressed');
    }
  render(){
    
    return(
        <ScrollView >
        <Header style={styles.header} >
           <Text style={styles.title}>Manager Menu</Text>
        </Header>
            <View style={styles.contentContainerStyle}>
            
                <TouchableOpacity onPress={this.button1} style={styles.buttonContainer}>
                    <Image 
                        source={require('./emp.png')}
                        style={styles.ImageIconStyle} 
                        />
                    <Text textAlign='justify'>
                         add employee
                    </Text>
                </TouchableOpacity > 

                <TouchableOpacity onPress={this.button2} style={styles.buttonContainer}>
                    <Image 
                        source={require('./log-icon.png')}
                        style={styles.ImageIconStyle} 
                        />
                    <Text>
                     Event Log
                    </Text>
                </TouchableOpacity > 
                
                <TouchableOpacity onPress={this.button2} style={styles.buttonContainer}>
                    <Text>
                     Edit map
                    </Text>
                </TouchableOpacity > 
            </View>

            <View style={styles.contentContainerStyle}>
            
            <TouchableOpacity onPress={this.button1} style={styles.buttonContainer}>
                <Text>
                 Remove employee
                </Text>
            </TouchableOpacity > 

            <TouchableOpacity onPress={this.button2} style={styles.buttonContainer}>
                <Text>
                 Parking Data
                </Text>
            </TouchableOpacity > 
            
            <TouchableOpacity onPress={this.button2} style={styles.buttonContainer}>
                <Text>
                 LOG OUT
                </Text>
            </TouchableOpacity > 
             </View>
        </ScrollView>
    );
  }
}

const styles=StyleSheet.create(
    {
        buttonContainer:{
            left:10,
            right:10,
            flex:1,
            height:250,
            width:200,
            padding:20,
            backgroundColor:'white',//'#0099FF',
            borderWidth:0.25,
            borderColor:'black',
           // backgroundColor:'rgba(255,255,255,0.6)',
           position: 'relative',
           justifyContent: 'flex-end'
        },
        ImageIconStyle: {
            padding: 40,
            margin: 10,
            height: 25,
            width: 25,
            resizeMode : 'stretch',
          
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
            flexDirection:'row',
            flexWrap: 'wrap',
           
          //תalignItems:'center',
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


