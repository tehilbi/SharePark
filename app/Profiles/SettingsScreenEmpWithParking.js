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
    ToastAndroid
}from "react-native";
import 'moment-timezone';
import{Icon,Button,Container,Header,Content,Left,Title,Right}from 'native-base'
// import Parking1 from './Parking1';
import Parking from './Parking';

let c;
export default class SettingsScreenEmpWithParking extends Component{
    constructor(props)
    {        
        super(props);
        this.state={
            color:'orange',
            loaded:false,
            user:this.props.user,
            event:"",
            time:""
        }
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

    change_state(c){
        if(c=='1')
        {
            this.setState({event:this.state.user.FirstName+" "+ this.state.user.LastName+" realesed his parking spot"});
        }
        if(c=='2')
        {
            this.setState({
                event:this.state.user.FirstName+" "+ this.state.user.LastName+" blocked his parking spot"
            });
        }
        if(c=='3')
        {
            this.setState({
                event:this.state.user.FirstName+" "+ this.state.user.LastName+" reseted his parking spot"
            });
        }
    }

    release=()=>
    {
        this.change_state('1');
        fetch('http://share-park-back-end.herokuapp.com/updateParkingSpot',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            color:'green',
            parkingNum:this.state.user.parkingNum
        })
      })
        .then((response)=>response.json())
        .then((res)=>
        {
            if(res.success===true)
            {
                this.componentWillMount();
                this.AddEvent();
                ToastAndroid.show('Update successful', ToastAndroid.SHORT);
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
        this.change_state('2');
        fetch('http://share-park-back-end.herokuapp.com/updateParkingSpot',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                color:'red',
                parkingNum:this.state.user.parkingNum
            })
          })
            .then((response)=>response.json())
            .then((res)=>
            {
                if(res.success===true)
                {
                    this.componentWillMount();
                    this.AddEvent(); 
                    ToastAndroid.show('Update successful', ToastAndroid.SHORT);
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
        this.change_state('3');
        fetch('http://share-park-back-end.herokuapp.com/updateParkingSpot',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            color:'orange',
            parkingNum:/*this.state.id*/this.state.user.parkingNum
        })
      })
        .then((response)=>response.json())
        .then((res)=>
        {
            if(res.success===true)
            {
                this.componentWillMount();
                this.AddEvent();    
                ToastAndroid.show('Update successful', ToastAndroid.SHORT);
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
    AddEvent=()=>
    {
        this.SetCurrentDate();
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

