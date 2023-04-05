/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React ,{useEffect,useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,Alert,TouchableOpacity,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useNetInfo} from '@react-native-community/netinfo';
import NetInfo, {NetInfoState} from "@react-native-community/netinfo";

function App(): JSX.Element {
  const [status, setStatus] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

const netInfo = useNetInfo();

  const checkConnection = () => {
    if (netInfo.isConnected && netInfo.isInternetReachable) {
            setStatus(true);
      Alert.alert('You are online!');
      console.log("----online info----", netInfo.isConnected);
      console.log("----online info----", netInfo.isInternetReachable);
    } else {
      setStatus(false);
      Alert.alert('You are offline!');
      console.log("----ofline info----", netInfo.isConnected);
      console.log("----ofline info----", netInfo.isInternetReachable);
    }
};
  
    useEffect(() => {
       const removeNetInfoSubscription = NetInfo.addEventListener((state: NetInfoState) => {
          const offline = !(state.isConnected && state.isInternetReachable)
          console.log(offline)
          setIsOffline(offline)
        })
            return () => removeNetInfoSubscription()
    // checkConnection();
},[]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flexDirection:'row',marginTop:100,marginLeft:100,}}>
        <Text style={{fontSize:30}}>Connection</Text>
        {!isOffline ?
          <TouchableOpacity style={styles.online}></TouchableOpacity>
          :
          <TouchableOpacity style={styles.offline}></TouchableOpacity>
        }
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  online: {
    backgroundColor: 'green',
    borderRadius: 50,
    height: 50,
    width:50,marginLeft:30
  },
   offline: {
    backgroundColor: 'red',
     borderRadius: 50,
     height: 50,
    width:50,marginLeft:30
  }
});

export default App;
