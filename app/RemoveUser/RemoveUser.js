import React , {Component} from 'react';
import {CheckBox,AppRegistry,StyleSheet,Text,View, ScrollView,TouchableOpacity,ListView,TouchableHighlight} from 'react-native';
import{Header}from 'native-base';

export default class RemoveUser extends Component{
    constructor()
    {
        super();
        const ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state=
        {
            empsDataSource:ds,
            checkedBoxCheck: false,
            selectedItems:[],
        }
        this.pressRow=this.pressRow.bind(this);
        this.renderRow=this.renderRow.bind(this);
    }

    componentDidMount()
    {
        this.fetchEmps();
    }

    fetchEmps()
    {
        fetch('http://192.168.1.102:3000/Employees/')
            .then((response)=>response.json())
            .then((response)=>{          
                this.setState({
                        empsDataSource:this.state.empsDataSource.cloneWithRows(response)
                    });  
            })  
    }
    pressRow(rowId)
    {
        console.log('Row '+rowId+' Pressed..');  
      
           
    }

    onItemSelect(row){
        this.setState({
            selectedItems: [{row}],
            checkedBoxCheck: true,
        });
        let myitem = this.state.selectedItems.concat({row});
        console.log(myitem);
    }
    h(rowId)
    {
        this.setState({
            checkedBoxCheck:!this.state.checkedBoxCheck
        })
        
    }
      
    renderRow(emp,sectionId,rowId,highlightRow)
    {  
        return(
           
            <TouchableHighlight onPress={()=>
                {
                    this.pressRow(rowId);
                    highlightRow(sectionId,rowId)
                }}>
                <View style={styles.row}>
                <CheckBox 
                   value={this.state.checkedBoxCheck}
                    onChange={() => this.h(rowId)}
            />
                    <Text style={styles.text}>{emp.EmpId}) {emp.FirstName} {emp.LastName}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    render(){
        return(

            <ScrollView>
               
            <Header style={styles.header} >
            <Text style={styles.title}>RemoveUser</Text>
            </Header>
                <View style={styles.contentContainerStyle}>
                   <ListView
                    dataSource={this.state.empsDataSource}
                    renderRow={this.renderRow}
                    />
                </View>
                <TouchableOpacity 
                        onPress={this.DeleteEmployee}
                        style={styles.buttonContainer} >
                        <Text style={styles.buttonText}>
                            Delete Employee
                        </Text>
                    </TouchableOpacity >
            </ScrollView>
    );
  }


  DeleteEmployee=()=>
{
    //לשנות אייפי
        fetch('http://172.20.4.65:3000/RemoveEmployee/',{
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            empId : this.state.empId
          })
        
          }).then((response) => response.json())
          .then((responseJson) => {
        
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
        
          }).catch((error) => {
             console.error(error);
          });
  }
} 

var styles=StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'center',
        padding:12,
        backgroundColor:'#f6f6f6',
        marginBottom:3
    },
    text:{
        flex:1,
    },
    
    content:{
        alignItems: 'center'
    },
    header:{
        backgroundColor:'#0099FF'
    },
    container:{
        flex:1,
        backgroundColor:'white',
        padding: 70,
    },
    
    buttonText:{
        fontSize: 16,
        fontWeight:'bold',
        textAlign:'center',
    },
    buttonContainer:{
        //alignSelf:'stretch',
        margin:20,
        padding:20,
        backgroundColor:'#0099FF',//'#0099FF',
        borderWidth:1,
        borderColor:'black',
       // backgroundColor:'rgba(255,255,255,0.6)',
    },
    header:{
        backgroundColor:'#0099FF'
    },

    title:{
        flex:1,
        alignItems:'center',
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
        backgroundColor:'white'
    },
  
});
AppRegistry.registerComponent('RemoveUser',()=>RemoveUser);


