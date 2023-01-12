
import * as React from 'react';
import {  ImageBackground, SafeAreaView,   } from 'react-native';
//LogBox.ignoreAllLogs();//Ignore all log notifications
import Navigation from './src/navigation/Navigation'

import 'react-native-reanimated';

function App() {


    return (
  

    
        //    <KeyboardAvoidingView
        //         behavior={Platform.OS === "ios" ? "padding" : "height"}
        //         style={{ flex: 1 }}
        //     >
         <SafeAreaView style={{flex:1}}>
                <ImageBackground style={{ flex: 1, }} source={require('./src/assets/customer_d.png')} >

               
                    <Navigation >
                    
                        </Navigation>

                </ImageBackground>
                </SafeAreaView>

            // </KeyboardAvoidingView>
            
    
          
            );
}

export default App;
