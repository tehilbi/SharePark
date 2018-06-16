import React , {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet,TouchableOpacity,ScrollView,Image,Navigator} from 'react-native';
import{Header}from 'native-base';

import {StackNavigator} from 'react-navigation';

var dataArray = [];
export default class ManagerProfile extends Component{
   
    constructor(props)
    { 
        super(props);
        this.state = {
        
           AvalibleGeneral:"",
           OcupiedGeneral:"",
           ReservedAvalibleParkingSpots:"",
           ReservedOcupiedParkingSpots:"",
           UnReservedAvalibleParkingSpots:"",
           UnReservedOcupiedParkingSpots:"",
           data:dataArray

        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        try {
            
            this.getTheData(function (json) {
                dataArray = json;
                console.log("dataArray: ");
                console.log(json[0].Ocupied_General);
            this.setState({
                data: dataArray,
                AvalibleGeneral:json[0].Avalible_General,
                OcupiedGeneral:json[0].Ocupied_General,
                ReservedAvalibleParkingSpots:json[0].Reserved_Avalible,
                ReservedOcupiedParkingSpots:json[0].Reserved_Ocupied,
                UnReservedAvalibleParkingSpots:json[0].UnReserved_Avalible,
                UnReservedOcupiedParkingSpots:json[0].UnReserved_Ocupied,
               
            })
        }.bind(this));
            
        } catch (error) {
            console.log("There was an error getting the data");
        }
       
    }

    getTheData(callback) {
        var url = "http://share-park-back-end.herokuapp.com/fetchParkingData/";
        fetch(url).then(response => response.json())
            .then(json => callback(json))
            .catch(error => console.log(error));
    }

    render()
    {
        return(  
            <ScrollView >
            <Header style={styles.header} >
            <Text style={styles.title}>Parking Data</Text>
            </Header>
                <View style={styles.contentContainerStyle}>

                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.textInside}> Avalible Parking Spots:{this.state.AvalibleGeneral}</Text>
                    </TouchableOpacity > 

                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.textInside}>Ocupied Parking Spots:{this.state.OcupiedGeneral}</Text>
                    </TouchableOpacity >
                    </View>
                <View style={styles.contentContainerStyle}>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.textInside}>Reserved Avalible Parking Spots:{this.state.ReservedAvalibleParkingSpots}</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.textInside}>Reserved Ocupied Parking Spots:{this.state.ReservedOcupiedParkingSpots}</Text>
                    </TouchableOpacity >
                    
                </View>

                <View style={styles.contentContainerStyle}>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.textInside}>UnReserved Avalible Parking Spots:{this.state.UnReservedAvalibleParkingSpots}</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.textInside}>UnReserved Ocupied Parking Spots:{this.state.UnReservedOcupiedParkingSpots}</Text>
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
          },
          textInside:{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize:20,

          }
        
    }
);
AppRegistry.registerComponent('ManagerProfile',()=>ManagerProfile);


