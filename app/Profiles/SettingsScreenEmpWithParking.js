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
            color:'orange',
            loaded:false,
            id:this.props.id
        }
    }

    async componentWillMount(){
        if(this.state.id=='1')
        await this.parking1();
        else if(this.state.id=='2')
            await this.parking2();
        else if(this.state.id=='3')
            await this.parking3();
        else if(this.state.id=='4')
            await this.parking4();

    }

    async parking1(){
        const res = await fetch('http://172.20.4.64:3000/parkingSpots1',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            }   
          })
        const result =await res.json()
        this.setState({color:result.color, loaded: true });
    }

    async parking2(){
        const res = await fetch('http://172.20.4.64:3000/parkingSpots2',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            }   
          })
        const result =await res.json()
        this.setState({color:result.color, loaded: true });
    }

    async parking3(){
        const res = await fetch('http://172.20.4.64:3000/parkingSpots3',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            }   
          })
        const result =await res.json()
        this.setState({color:result.color, loaded: true });
    }

    async parking4(){
        const res = await fetch('http://172.20.4.64:3000/parkingSpots4',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            }   
          })
        const result =await res.json()
        this.setState({color:result.color, loaded: true });
    }

    render(){
        // console.log("1111111111111111111111111111111111111111111111111111111");
        // console.log(this.props.id);
        // console.log(this.props.navigation.state.params.id);
        if (this.state.loaded==false) {
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
                    <Parking parkingColor={color=this.state.color}/>  

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
        fetch('http://172.20.4.64:3000/updateParkingSpot',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            // username:
            color:'green',
            id:this.state.id
        })
      })
        .then((response)=>response.json())
        .then((res)=>
        {
            if(res.success===true)
            {
                // this.setState({color:'green'});
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
        fetch('http://172.20.4.64:3000/updateParkingSpot',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                // username:
                color:'red',
                id:this.state.id
            })
          })
            .then((response)=>response.json())
            .then((res)=>
            {
                if(res.success===true)
                {
                    // this.setState({color:'red'});
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
        fetch('http://172.20.4.64:3000/updateParkingSpot',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            // username:
            color:'orange',
            id:this.state.id
        })
      })
        .then((response)=>response.json())
        .then((res)=>
        {
            if(res.success===true)
            {
                // this.setState({color:'orange'});
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

