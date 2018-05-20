import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,TouchableOpacity,ScrollView,Image} from 'react-native';
import{Icon,Button,Container,Header,Content,Right,Left}from 'native-base';


export default class EditMap extends Component{
 
    render()
    {
        return(
            <ScrollView >
            <Header style={styles.header} >
            <Text style={styles.title}>EditMap</Text>
            </Header>
                <View style={styles.contentContainerStyle}>
                
                   
                        <Text textAlign='justify'>
                        EditMap
                        </Text>
                    

                </View>
            </ScrollView>
    );
  }
}

const styles=StyleSheet.create(
    {
        header:{
            backgroundColor:'#0099FF'
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
      
        
    }
);
AppRegistry.registerComponent('EditMap',()=>EditMap);


