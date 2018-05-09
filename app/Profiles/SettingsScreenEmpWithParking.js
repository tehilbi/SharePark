import React , {Component} from "react";
import{
    View,
    Text,
    StyleSheet,
    AppRegistry,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator
}from "react-native";

import{Icon,Button,Container,Header,Content,Left,Title,Right}from 'native-base'
// import Parking1 from './Parking1';
import Parking from './Parking';

export default class SettingsScreenEmpWithParking extends Component{
    constructor(props)
    {        
        super(props);
        this.state={
            color1:'orange',
            loaded1:false,
            // id:''
        }
    }

    async componentWillMount(){
        await this.parking1();
    }

    async parking1(){
        const res = await fetch('http://172.20.4.94:3000/parkingSpots1',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            }   
          })
        const result =await res.json()
        this.setState({color1:result.color, loaded1: true });
    }

    render(){
        // console.log("1111111111111111111111111111111111111111111111111111111");
        // console.log(this.props.id);
        // console.log(this.props.navigation.state.params.id);
        if (this.state.loaded1==false) {
            return(
                <ActivityIndicator style={{padding: 300}} size="large" color="#C71585" />
            );
         }
        return(
            <Container style={styles.container}>
                <Header style={styles.header}> 
                    <Left>
                        <Icon name="menu"  onPress={()=>
                        this.props.navigation.navigate('DrawerOpen')}/>
                    </Left>
                    <Title style={styles.settingText}>Release/Block Parking</Title>
                    <Right>
                        <Icon name="refresh" onPress={() => {this.componentWillMount()}}/>
                    </Right>
                </Header>       
                    
                <Content contentContainerStyle={{
                    // flexDirection:'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top:40
                }}>
                    <Parking parkingColor={color1=this.state.color1}/>  

                    <TouchableOpacity onPress={this.release} 
                        style={styles.buttonGreen} >
                        <Text style={styles.buttonGreenText}>
                            Release My Parking Spot
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.reset} 
                        style={styles.buttonOrange} >
                        <Text style={styles.buttonOrangeText}>
                            Reset My Parking Spot
                        </Text>
                  </TouchableOpacity>
                  
                    <TouchableOpacity onPress={this.block} 
                        style={styles.buttonRed} >
                        <Text style={styles.buttonRedText}>
                          Block My Parking Spot
                        </Text>
                    </TouchableOpacity> 
                </Content>                
            </Container>        
        );
    }

    release=()=>
    {
        fetch('http://172.20.4.94:3000/updateParkingSpot',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            // username:
            color:'green',
            id:'1'
        })
      })
        .then((response)=>response.json())
        .then((res)=>
        {
            if(res.success===true)
            {
                this.setState({color:'green'});
                this.componentWillMount();
                alert("Update successful");
            }
            else
            {
                alert(res.message);
            }
        })
        .done();
    }

   
    block=()=>
    {
        fetch('http://172.20.4.94:3000/updateParkingSpot',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                // username:
                color:'red',
                id:'1'
            })
          })
            .then((response)=>response.json())
            .then((res)=>
            {
                if(res.success===true)
                {
                    this.setState({color:'red'});
                    this.componentWillMount();
                    alert("Update successful");
                }
                else
                {
                    alert(res.message);
                }
            })
            .done();
        }
    
    reset=()=>
    {
        fetch('http://172.20.4.94:3000/updateParkingSpot',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            // username:
            color:'orange',
            id:'1'
        })
      })
        .then((response)=>response.json())
        .then((res)=>
        {
            if(res.success===true)
            {
                this.setState({color:'orange'});
                this.componentWillMount();
                alert("Update successful");
            }
            else
            {
                alert(res.message);
            }
        })
        .done();
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
        buttonGreen:{
            alignSelf:'stretch',
            margin:30,
            padding:40,
            backgroundColor:'green',//'#0099FF',
            borderWidth:1,
            borderColor:'black',
            // top:30
           // backgroundColor:'rgba(255,255,255,0.6)',
        },
        buttonGreenText:{
            fontSize: 16,
            fontWeight:'bold',
            textAlign:'center',
        },
        buttonRed:{
            alignSelf:'stretch',
            margin:30,
            padding:40,
            backgroundColor:'red',//'#0099FF',
            borderWidth:1,
            borderColor:'black',
            // top:30
           // backgroundColor:'rgba(255,255,255,0.6)',
        },
        buttonRedText:{
            fontSize: 16,
            fontWeight:'bold',
            textAlign:'center',
        },
        buttonOrange:{
            alignSelf:'stretch',
            margin:30,
            padding:40,
            backgroundColor:'orange',//'#0099FF',
            borderWidth:1,
            borderColor:'black',
            // top:30
           // backgroundColor:'rgba(255,255,255,0.6)',
        },
        buttonOrangeText:{
            fontSize: 16,
            fontWeight:'bold',
            textAlign:'center',
        }
    }
)

AppRegistry.registerComponent('SettingsScreenEmpWithParking',()=>SettingsScreenEmpWithParking);

