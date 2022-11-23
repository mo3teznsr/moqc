import React, {Component} from "react";
import {withTranslation} from 'react-i18next';

import {StyleSheet, ImageBackground, Image, I18nManager, View, TouchableOpacity,Dimensions, Alert} from 'react-native'
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Text,
    Body,
    Left,
    Right,
    Item,
    Input,
    Form,
    Footer,
    FooterTab,
    Picker
} from "native-base";
import { AsyncStorage } from 'react-native';
import DropShadow from "react-native-drop-shadow";
import FooterBottom from "./Footer";
import { auto } from "async";
import ImagePicker from "react-native-customized-image-picker";
import API from "../api/";
import { TextInput } from "react-native-gesture-handler";
var FormData = require('form-data');
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import Sound from 'react-native-sound';
import Social from "../../src1/pages/components/social";

class Signup6 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rtl: false,
            gender: 0,
            user: 0,
            user_img: require("../assets/select_picture_m.png"),
            selected_img: null,
            image_base64: null,
            form: [],
            currentTime: 0.0,
            recording: false,
            paused: false,
            stoppedRecording: false,
            finished: false,
            audioPath: AudioUtils.DocumentDirectoryPath + '/sound.aac',
            hasPermission: undefined,
            base64_voice: null,
        };
    }

    openCamera = async() => {
      ImagePicker.launchCamera({
          width: 300,
          height: 300,
          includeBase64: true,
      }, (response) => {
          console.log('Response = ', response);
    
          this.setState({
              selected_img: image[0].path,
              image_base64: image[0].data,
          })
          
        });
  }
  selectImage = async() => {
      ImagePicker.openPicker({
          width: 300,
          height: 300,
         
          includeBase64: true,

      }).then(image => {
          this.setState({
              selected_img: image[0].path,
              image_base64: image[0].data,
          })
        });
  }

    prepareRecordingPath(audioPath){
        AudioRecorder.prepareRecordingAtPath(audioPath, {
          SampleRate: 22050,
          Channels: 1,
          AudioQuality: "Low",
          AudioEncoding: "aac",
          AudioEncodingBitRate: 32000,
          IncludeBase64: true
        });
      }
    approveNext = async () => {
        if(this.state.base64_voice == null ){
            Alert.alert(
                "Error",
                "Please record a message or Select a file to upload first to proceed",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );

              return;
        }

        if(this.state.currentTime < 10 == null ){
            Alert.alert(
                "Error",
                "Recording should be atleast 10 seconds",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );

              return;
        }
        
        let reg_token = await AsyncStorage.getItem("@moqc:reg_token");
        const formData = new FormData();
        formData.append('registration_token', JSON.parse(reg_token));
        formData.append('voice_clip', this.state.image_base64);
 

        API.signup(formData)
        .then(async (resp) => {
          this.setState({show_spinner: false})
          console.log(resp)

          if (resp == "success"){
            const formData2 = new FormData();
            formData2.append('registration_token', JSON.parse(reg_token));
            formData2.append('confirm', 'confirm');
     
    
            API.signup(formData2)
            .then(async (resp) => {
              this.setState({show_spinner: false})
              console.log(resp)
    
              if (resp){
                  
                Alert.alert(
                    "Success",
                    "Student is registered. Please wait for the departments to approve.",
                    [
                      { text: "OK", onPress: () =>{
                        this
                        .props
                        .navigation
                        .navigate("Login")}  }
                    ],
                    { cancelable: false }
                  );
                
                }else{
                const { navigate } = this.props.navigation;
                Alert.alert(
                  "Error",
                  "There's an Error in Backend.",
                  [
                    { text: "OK", onPress: () =>{console.log("Error")}  }
                  ],
                  { cancelable: false }
                );
              }
            })
            .catch(err => {
              console.log(err)
              alert(err)
            });
            
            // this.props.navigation.navigate("Signup4")
          }else{
            const { navigate } = this.props.navigation;
            Alert.alert(
              "Error",
              "There's an Error in Backend.",
              [
                { text: "OK", onPress: () =>{console.log("Error")}  }
              ],
              { cancelable: false }
            );
          }
        })
        .catch(err => {
          console.log(err)
          alert(err)
        });

    }
  
    componentDidMount = async () => {
        let gender = await AsyncStorage.getItem("@moqc:gender");
        this.setState({gender})
        if(gender == 2){
            this.setState({
                user_img: require("../assets/select_picture_f.png"),
                
            })
        }
        if (I18nManager.isRTL === true) {
            this.setState({rtl: true})
        } else {
            this.setState({rtl: false})
        }
        AudioRecorder.requestAuthorization().then((isAuthorised) => {
            this.setState({ hasPermission: isAuthorised });
    
            if (!isAuthorised) return;
    
            this.prepareRecordingPath(this.state.audioPath);
    
            AudioRecorder.onProgress = (data) => {
              this.setState({currentTime: Math.floor(data.currentTime)});
            };
    
            AudioRecorder.onFinished = (data) => {
              // Android callback comes in the form of a promise instead.
              console.log(data)
              this.setState({
                base64_voice:data.base64
              })
              if (Platform.OS === 'ios') {
                this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
              }
            };
          });


    }




    _renderButton(title, onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;
  
        return (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={style}>
              {title}
            </Text>
          </TouchableOpacity>
        );
      }
  
      _renderPauseButton(onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;
        var title = this.state.paused ? "RESUME" : "PAUSE";
        return (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={style}>
              {title}
            </Text>
          </TouchableOpacity>
        );
      }
  
      async _pause() {
        if (!this.state.recording) {
          console.warn('Can\'t pause, not recording!');
          return;
        }
  
        try {
          const filePath = await AudioRecorder.pauseRecording();
          this.setState({paused: true});
        } catch (error) {
          console.error(error);
        }
      }
  
      async _resume() {
        if (!this.state.paused) {
          console.warn('Can\'t resume, not paused!');
          return;
        }
  
        try {
          await AudioRecorder.resumeRecording();
          this.setState({paused: false});
        } catch (error) {
          console.error(error);
        }
      }
  
       _stop = async ()  => {
        if (!this.state.recording) {
          console.warn('Can\'t stop, not recording!');
          return;
        }
  
        this.setState({stoppedRecording: true, recording: false, paused: false});
  
        try {
          const filePath = await AudioRecorder.stopRecording();
  
          if (Platform.OS === 'android') {
            this._finishRecording(true, filePath);
          }
          return filePath;
        } catch (error) {
          console.error(error);
        }
      }
  
      _play = async () =>  {
        if (this.state.recording) {
          await this._stop();
        }
  
        // These timeouts are a hacky workaround for some issues with react-native-sound.
        // See https://github.com/zmxv/react-native-sound/issues/89.
        setTimeout(() => {
          var sound = new Sound(this.state.audioPath, '', (error) => {
            if (error) {
              console.log('failed to load the sound', error);
            }
          });
  
          setTimeout(() => {
            sound.play((success) => {
              if (success) {
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
          }, 100);
        }, 100);
      }

      
      resetAll = async () =>  {
        this.setState({
            recording: false,
            base64_voice: null,
            currentTime: 0.0
        })
      }
       _record = async () =>{
        if (this.state.recording) {
          console.warn('Already recording!');
          return;
        }
  
        if (!this.state.hasPermission) {
          console.warn('Can\'t record, no permission granted!');
          return;
        }
  
        if(this.state.stoppedRecording){
          this.prepareRecordingPath(this.state.audioPath);
        }
  
        this.setState({recording: true, paused: false});
  
        try {
          const filePath = await AudioRecorder.startRecording();
        } catch (error) {
          console.error(error);
        }
      }
  
      _finishRecording(didSucceed, filePath, fileSize) {
        this.setState({ finished: didSucceed });
        console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
      }
  


    render() {
        const {t, i18n} = this.props;
        console.log(this.state.gender)
        return (
            <Container
                style={{
                display: 'flex',
                flex: 10,
                direction: this.state.rtl
                    ? 'rtl'
                    : 'ltr'
            }}>
                <ImageBackground
                    style={{
                    width: '100%',
                    height: '100%',
                    flex: 10
                }}>
                    <Header
                        style={{
                        backgroundColor: '#31314f',
                        borderBottomColor:'#31314f',
                    }}>
                        <Left>
                            {/* <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name="arrow-back"/>
                            </Button> */}
                        </Left>
                        <Body>
                            <Title
                                style={{
                                color: 'white'
                            }}>Members</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <View
                    style={{
                        backgroundColor: '#31314f',
                        flex:0.1,
                    }}
                    >
                         <View
                            style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Image
                                style={{
                                height: 150,
                                width: 150,
                                marginTop: 100
                            }}
                                source={require('../assets/round.png')}/>

                            <Text style={{marginTop:5,fontWeight:"bold"}}>Step 6/6</Text>

                        </View>
                    
                    </View>

                
                <Content style={{marginTop:130}}>
                    <View style={{
                        height:2,
                        backgroundColor:"lightgrey",
                        marginLeft:15,
                        marginRight:15,
                        marginTop:20,
                        marginBottom:-20
                    }}>

                    </View>
                    <View style={{flex:0.2,display:"flex",flexDirection:"row",justifyContent:"space-evenly",}}>
                        <View style={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                            <Button onPress={() => this.props.navigation.navigate("Signup")} style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#dee1ed"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold",color:"#97a6cd"}}>1</Text>
                            </Button>
                            <Text style={{fontSize:8,marginTop:3}}>
                                Gender
                            </Text>

                        </View>
                        <View style={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                            <Button  onPress={() => this.props.navigation.navigate("Signup2")} style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#dee1ed"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold",color:"#97a6cd"}}>2</Text>
                            </Button>
                            <Text style={{fontSize:8,marginTop:3}}>
                                User
                            </Text>

                        </View>
                        <View style={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                            <Button onPress={() => this.props.navigation.navigate("Signup3")} style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#dee1ed"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold",color:"#97a6cd"}}>3</Text>
                            </Button>
                            <Text style={{fontSize:8,marginTop:3}}>
                                Picture
                            </Text>
                        </View>
                        
                        <View style={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#dee1ed"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold",color:"#97a6cd"}}>4</Text>
                            </Button>
                            <Text style={{fontSize:8,marginTop:3}}>
                                Informations
                            </Text>
                        </View>
                        
                        <View style={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#dee1ed"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold",color:"#97a6cd"}}>5</Text>
                            </Button>
                            <Text style={{fontSize:8,marginTop:3}}>
                                Documents
                            </Text>
                        </View>
                        
                        <View style={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#313145"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold"}}>6</Text>
                            </Button>
                            <Text style={{fontSize:8,marginTop:3}}>
                                Voice Record
                            </Text>
                        </View>
                        
                    </View>
                    <View style={{
                        flex:1,
                        justifyContent:"center",
                        alignContent:"center",
                        alignItems:"center"
                    }}>
                    </View>
                    <View style={{flex:10,flexDirection:"column",}}>
                        <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center",alignContent:"center",alignSelf:"center",padding:20}}>
                            <Text style={{fontWeight:"bold"}}>
                                Voice Clip
                            </Text>
                            {
                                this.state.selected_img == null ?

                                    <Image
                                            style={{
                                            height: 150,
                                            width: 150,
                                            marginTop: 20
                                        }}
                                            source={require('../assets/voice_clip.png')}/>

                                    : 
                                    <Image
                                        source={{uri : this.state.selected_img }}
                                        style={{
                                        height: 150,
                                        width:150,
                                        resizeMode:"contain",
                                        borderRadius:10,
                                        marginTop:20
                                     }}/>

                            }
                            
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                        {
                                this.state.recording ?
                                    <Text>
                                        Recording Started: {this.state.currentTime}s
                                    </Text>:
                                    null
                        }
                        </View>
                        {
                            this.state.currentTime > 10 && this.state.recording == false ? 
                            <Text style={{justifyContent:"center",alignItems:"center",alignContent:'center',flexDirection:"row",padding:10,textAlign:"center"}}>
                                {this.state.currentTime}s recorded and ready to upload. To hear click 
                                <TouchableOpacity  onPress={()=>this._play()}>
                                    <Text style={{marginBottom:-12.5,marginLeft:13,color:"blue"}}>
                                        here
                                    </Text>
                                </TouchableOpacity>
                                
                                
                                . To reset click 
                                <TouchableOpacity onPress={()=>this.resetAll()} >
                                    <Text style={{marginBottom:-12.5,marginLeft:13,color:"blue"}}>
                                        here
                                    </Text>
                                </TouchableOpacity>
                            </Text>
                            :
                                <View style={{flexDirection:"row",justifyContent:"center",alignContent:"center",alignItems:"center"}}>

                                {
                                    this.state.recording ?
                                    <TouchableOpacity onPress={()=>this._stop()}>
                                        <Image
                                            style={{
                                            height: 50,
                                            width: 50,
                                            marginTop: 10,
                                            backgroundColor: "red" 
                                        }}
                                            source={require('../assets/attach-doc.png')}/>
                                    </TouchableOpacity>

                                    : 

                                    <TouchableOpacity onPress={() => this._record()}>
                                        <Image
                                            style={{
                                            height: 50,
                                            width: 50,
                                            marginTop: 10,
                                        }}
                                            source={require('../assets/attach-doc.png')}/>
                                    </TouchableOpacity>



                                }

                                <TouchableOpacity onPress={(e)=>this.openCamera(e)}>
                                <Image
                                        style={{
                                        height: 50,
                                        width: 50,
                                        marginTop: 10,
                                        marginLeft:5,
                                        marginRight:10
                                    }}
                                        source={require('../assets/camera-doc.png')}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={(e)=>this.resetImage(e)}>
                                <Image
                                        style={{
                                        height: 50,
                                        width: 50,
                                        marginTop: 10
                                    }}
                                        source={require('../assets/trash-doc.png')}/>
                                </TouchableOpacity>


                                </View>



                        }
                        

                         
                    </View>
                    <View style={{flex:1,justifyContent:"center",alignContent:"center",alignItems:"center",marginRight:10,marginLeft:10,marginTop:10}}>
                        
                    </View>
                    <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignContent:"center",marginTop:30}}>
                        <Button onPress={() => this.approveNext(this.props)} style={{width:250,borderRadius:30,justifyContent:"center",alignContent:"center",backgroundColor:"#31314f"}}>
                            <Text>
                                Complete Registeration 
                            </Text>
                            <Icon type="AntDesign" name="caretright" style={{fontSize:10}}/>
                        </Button>

                    </View>
                </Content>
                <Social/>

                </ImageBackground>

                {/* <FooterBottom {...this.props}/> */}
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#2b608a",
    },
    controls: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    progressText: {
      paddingTop: 50,
      fontSize: 50,
      color: "#fff"
    },
    button: {
      padding: 20
    },
    disabledButtonText: {
      color: '#eee'
    },
    buttonText: {
      fontSize: 20,
      color: "#fff"
    },
    activeButtonText: {
      fontSize: 20,
      color: "#B81F00"
    }

  });
export default withTranslation()(Signup6);