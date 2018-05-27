
import React , {Component} from 'react';
import {Platform,AppRegistry,Text,View,TextInput} from 'react-native';
import {StackNavigator} from 'react-navigation';

import LoginPage from './app/LoginPage/LoginPage';
import ManagerProfile from './app/Profiles/ManagerProfile';
import empWithParking from './app/Profiles/empWithParking';
import empWithNoParking from './app/Profiles/empWithNoParking';
import AddUser from './app/AddUser/AddUser';
import EventLog from './app/EventLog/EventLog';
import LogOut from './app/LogOut/LogOut';
import ParkingData from './app/ParkingData/ParkingData';
import RemoveUser from './app/RemoveUser/RemoveUser';
import EditMap from './app/EditMap/EditMap';
import test from './app/test';

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm'
// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS

// FCM.on(FCMEvent.Notification, async (notif) => {
//   // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
//   if(notif.local_notification){
//       //this is a local notification
//       console.log("local notification");
//   }
//   if(notif.opened_from_tray){
//       //iOS: app is open/resumed because user clicked banner
//       //Android: app is open/resumed because user clicked banner or tapped app icon
//       console.log("opened_from_tray");
//   }
//   // await someAsyncCall();

//   if(Platform.OS ==='ios'){
//     //optional
//     //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application.
//     //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
//     //notif._notificationType is available for iOS platfrom
//     switch(notif._notificationType){
//       case NotificationType.Remote:
//         notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
//         break;
//       case NotificationType.NotificationResponse:
//         notif.finish();
//         break;
//       case NotificationType.WillPresent:
//         notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
//         break;
//     }
//   }
// });
// FCM.on(FCMEvent.RefreshToken,(token)=>{
//   console.log(token)
// });

const Application=StackNavigator(
  {
    Home:/*{screen:ManagerProfile},*/{screen:LoginPage},
    ManagerProfile:{screen:ManagerProfile},
    empWithParking:{screen:empWithParking},
    empWithNoParking:{screen:empWithNoParking},
    AddUser:{screen:AddUser},
    EventLog:{screen:EventLog},
    LogOut:{screen:LogOut},
    ParkingData:{screen:ParkingData},
    RemoveUser:{screen:RemoveUser},
    EditMap:{screen:EditMap},
    test:{screen:test},

  },
  {
    navigationOptions:
    {
      header:false,
    }
  }    
);

export default class SharePark extends Component{
//   componentDidMount(){
//     FCM.requestPermissions().then(()=>console.log('grantedddddddddddddddddddddddddddddddddddddddd')).catch(()=>console.log('noti'));

//     FCM.getFCMToken().then(token => { console.log(token); });
//     this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
//     //
//     });

//     FCM.getInitialNotification().then(notif => {
//       console.log(notif)
//   });
// }
  render(){
    return(
          <Application/>
     
    );
  }

}
AppRegistry.registerComponent('SharePark',()=>SharePark);
