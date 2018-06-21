import React , {Component} from "react";
import{
    View,
    Text,
    StyleSheet,
    AppRegistry,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Navigator,
    TextInput
}from "react-native";

import {StackNavigator} from 'react-navigation';

import{Icon,Button,Container,Header,Content,Left,Title,Right}from 'native-base'
// import Parking1 from './Parking1';
import Parking from './Parking';
import TimePicker from 'react-native-simple-time-picker';
import Pickerise from '@rimiti/react-native-pickerise';


export default class SettingsScreenEmpWithParking extends Component{
    constructor(props)
    {        
        super(props);
        this.state={
            color:'orange',
            loaded:false,
            user:this.props.user,
            event:"",
            time:"",
            // selectedHours: 0,
            // selectedMinutes: 0
            item:'Select'
        };
    }
    
    async componentWillMount(){
        if(this.state.user.parkingNum=='1')
        await this.parking1();
        else if(this.state.user.parkingNum=='2')
            await this.parking2();
        else if(this.state.user.parkingNum=='3')
            await this.parking3();
        else if(this.state.user.parkingNum=='4')
            await this.parking4();

    }

    async parking1(){
        const res = await fetch('http://share-park-back-end.herokuapp.com/parkingSpots1',{
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
        const res = await fetch('http://share-park-back-end.herokuapp.com/parkingSpots2',{
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
        const res = await fetch('http://share-park-back-end.herokuapp.com/parkingSpots3',{
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
        const res = await fetch('http://share-park-back-end.herokuapp.com/parkingSpots4',{
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
        // const { selectedHours, selectedMinutes } = this.state;
        const items = [
			{ section: true, label: 'Please select time:' }, { label: '9:00' },{ label: '9:30' }, { label: '10:00' },{ label: '10:30' }, { label: '11:00' },{ label: '11:30' }, { label: '12:00' },{ label: '12:30' },
            { label: '13:00' },{ label: '13:30' },{ label: '14:00' },{ label: '14:30' },{ label: '15:00' },{ label: '15:30' },{ label: '16:00' },{ label: '16:30' },{ label: '17:00' },{ label: '17:30' },{ label: '18:00' },{ label: '18:30' },{ label: '19:00' },{ label: '19:30' },
            { label: '20:00' },{ label: '20:30' },{ label: '21:00' },{ label: '21:30' },{ label: '22:00' }
		];
     
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
                        <Pickerise style={styles.picker}
                        itemsContainerStyle={styles.itemsContainerStyle}
                        itemsChildStyle={styles.itemsChildStyle}
                        itemStyle={styles.itemStyle}
                        itemTextStyle={styles.itemTextStyle}
                        selectTextStyle={styles.selectTextStyle}
                        selectStyle={styles.selectStyle}
                        sectionStyle={styles.sectionStyle}
                        sectionTextStyle={styles.sectionTextStyle}
                        cancelStyle={styles.cancelStyle}
                        cancelTextStyle={styles.cancelTextStyle}
                        items={items}
                        initValue="Push me first"
                        cancelText="Cancel"
                        onChange={(item)=>this.setState({item:item.label})}
                       />

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
        this.setState({event:this.state.user.FirstName+" "+ this.state.user.LastName+" realesed his parking spot"});
        fetch('http://share-park-back-end.herokuapp.com/updateParkingSpot',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            // username:
            color:'green',
            parkingNum:this.state.user.parkingNum
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
                this.AddEvent();       
                this.editTime();      
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
        this.setState({
            event:this.state.user.FirstName+" "+ this.state.user.LastName+" blocked his parking spot"
        });
        fetch('http://share-park-back-end.herokuapp.com/updateParkingSpot',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                // username:
                color:'red',
                parkingNum:this.state.user.parkingNum
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
                    this.AddEvent();    
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
        this.setState({
            event:this.state.user.FirstName+" "+ this.state.user.LastName+" reseted his parking spot"
        });
        fetch('http://share-park-back-end.herokuapp.com/updateParkingSpot',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            // username:
            color:'orange',
            parkingNum:/*this.state.id*/this.state.user.parkingNum
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
                // this.TimePicker
                this.AddEvent();    
            }
            else
            {
                alert(res.message);
            }
        })
        .done();
    }
    SetCurrentDate()
    {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hour=new Date().getHours();
        var minute=new Date().getMinutes();
        this.setState({
            time:date + '-' + month + '-' + year+' '+hour+":"+minute
        });
    }

    async editTime()
    {
        if(this.state.item=='Select')
        {
            console.log("lllllllllllllllllllllllllllllllllllllll");
            this.setState({item:"22:00"});

        }
        await fetch('http://share-park-back-end.herokuapp.com/updateTime',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                // username:
             
                hour:this.state.item,
                parkingNum:this.state.user.parkingNum
            })
          })
            .then((response)=>response.json())
            .then((res)=>
            {
                if(res.success===true)
                {
                    
                }
                else
                {
                    alert(res.message);
                }
            })
            .done();    
    }

    AddEvent=()=>
    {
        this.SetCurrentDate();
      //לשנות אייפי
      fetch('http://share-park-back-end.herokuapp.com/AddEvent',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            event:this.state.event,
            time:this.state.time
        })
      })
        .then((response)=>response.json())
    
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
            padding:30,
            backgroundColor:'green',//'#0099FF',
            borderWidth:1,
            borderColor:'black',
            // right:-25
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
            padding:30,
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
            padding:30,
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
        },
        itemsContainerStyle: {
            borderRadius: 0,
            backgroundColor: 'green',
            marginBottom: 30,
            padding: 0,
        },
        itemsChildStyle: {
            paddingHorizontal: 0
        },
        itemStyle: {
            marginTop: 10,
            backgroundColor: '#919191',
            borderBottomColor: 'transparent',
        },
        itemTextStyle: {
            color: '#fff',
            fontSize: 18,
        },
        selectTextStyle: {
            color: 'white',
            fontSize: 20,
        },
        selectStyle: {
            borderWidth: 0,
            paddingTop: 21,
            paddingLeft: 0,
        },
        sectionStyle: {
            borderRadius: 0,
        },
        sectionTextStyle: {
            fontSize: 20,
            color: '#fff',
        },
        cancelStyle: {
            backgroundColor: '#22A7F0',
            paddingVertical: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
            borderRadius: 0,
        },
        cancelTextStyle: {
            color: "#FFF",
            fontSize: 18,
        },
        picker:{
            backgroundColor:'green',
            width:200
        }
    }
)

AppRegistry.registerComponent('SettingsScreenEmpWithParking',()=>SettingsScreenEmpWithParking);

