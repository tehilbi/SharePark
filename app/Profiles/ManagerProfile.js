import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,TouchableOpacity,ScrollView,Image,Navigator} from 'react-native';
import{Header}from 'native-base';

import {StackNavigator} from 'react-navigation';
let user;
export default class ManagerProfile extends Component{
   
    constructor(props)
    { 
        super(props);
        this.state={
            user:this.props.navigation.state.params.user
        }
    }
    render()
    {
        return(  
            <ScrollView >
            <Header style={styles.header} >
            <Text style={styles.title}>Manager Menu</Text>
            </Header>
                <View style={styles.contentContainerStyle}>
                
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddUser',{user:this.state.user})}
                     style={styles.buttonContainer}>
                        <Image source={require('./add_user.png')}style={styles.ImageIconStyle}/>
                        <Text textAlign='justify'> add user</Text>
                    </TouchableOpacity > 

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EventLog')} style={styles.buttonContainer}>
                        <Image source={require('./log-icon.png')}style={styles.ImageIconStyle}/>
                        <Text>
                        Event Log
                        </Text>
                    </TouchableOpacity > 
                    
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditMap')} style={styles.buttonContainer}>
                    <Image source={require('./map_icon.png')}style={styles.ImageIconStyle} />
                        <Text>
                        Edit map
                        </Text>
                    </TouchableOpacity > 
                </View>

                <View style={styles.contentContainerStyle}>
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('RemoveUser',{user:this.state.user})} style={styles.buttonContainer}>
                <Image source={require('./remove_user.png')}style={styles.ImageIconStyle}  />
                    <Text>
                    Remove user
                    </Text>
                </TouchableOpacity > 

                <TouchableOpacity onPress={() => this.props.navigation.navigate('ParkingData')} style={styles.buttonContainer}>
                <Image source={require('./data_icon.png')}style={styles.ImageIconStyle}  />
                    <Text>
                    Parking Data
                    </Text>
                </TouchableOpacity > 
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('LogOut')} style={styles.buttonContainer}>
                <Image source={require('./logout.png')}style={styles.ImageIconStyle}  />
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
            padding: 20,
            margin: 20,
            height: 70,
            width: 20,
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


