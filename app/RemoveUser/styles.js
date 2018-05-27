const React = require('react-native');

const { StyleSheet } = React;

export default {
    container: {
        flex: 1,
    },
    header:{
        backgroundColor:'#0099FF'
    },
    projectTitle: {
        paddingTop: 11,
        paddingLeft: 10
    },
    taskListView: {
        paddingBottom: 100
    },
    taskTitle: {
        color: '#797979',
        marginLeft: 0,
        marginBottom: 6
    },
    taskDate: {
        color: '#B2B2B2',
        fontSize: 12,
        marginTop: 2
    },
    taskEffort: {
        
        flexDirection: 'column',
       
    },
    checkbox: {
        marginRight: 10
    },
    FlatListItem:{
        color:'white',
        padding:10,
        fontSize:16,
    },
    controlStyles: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingTop: 4,
        height: 40
    },
    
    title:{
        flex:1,
        alignItems:'flex-start',
        color:'white',
        alignSelf:'flex-start',
        padding: 20,
        fontSize: 15,
        fontWeight: 'bold'
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
};