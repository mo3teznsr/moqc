
import React, { Component } from "react";
import { KeyboardAvoidingView, TouchableOpacity, View, Image, Text } from "react-native";
import { Button } from "react-native-paper";
import WebView from "react-native-webview";
import Axios from 'axios'
import i18n from "../i18n";
import axios from "axios";




export default class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            network: true,
            error:false
        }
       
    }
    componentDidMount(){
        this.getConnectionInfo()
    }

    async getConnectionInfo() {
         axios.get(`https://staging.moqc.ae/api/equran_list`).then(()=>{

         }).catch(()=>{
            console.log('network error 11')
            this.setState({network:false})
            
         })
        
    }

    render() {
        let WebViewRef;
        return (
            
            <View style={{flex: 1 }}>

                {this.state.network ?

                    <WebView ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)} source={{ uri: 'https://staging.moqc.ae/media/' }} 
                    allowsInlineMediaPlayback="true"
                    originWhitelist={["*"]}
                    useWebKit={true}
                    allowingReadAccessToURL="true" allowsBackForwardNavigationGestures="true"
                    onError={()=>{
                        this.setState({network:false})
                    }}  /> :

                    <View style={{flex:1, justifyContent:'center',alignItems:'center', alignContent:'center'}}>
                        <Image source={require('../assets/internet.png')} style={{height:200,marginBottom:20,width:165}} />
                        <Text>{i18n.t("You have no Internet Connection")}</Text>
                        <Button style={{backgroundColor:'#31314F', color:'#CB565D',marginTop:15}} onPress={() =>{
                            this.setState({network:true})
                            WebViewRef && WebViewRef.reload()}}><Text style={{color:'#CB565D'}}>{i18n.t('Retry')}</Text></Button>
                    </View>
                }

                {/* <View style={{position: 'absolute',  right: 20, bottom: 90,zIndex:10}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Landing")}>
                    <Image source={require('../assets/moqc.png')} style={{width:44,height:44,borderRadius:44,borderWidth:1,borderColor:"#e3e3e3"}} ></Image>
                </TouchableOpacity>
            </View> */}
            </View>

        )
    }
}