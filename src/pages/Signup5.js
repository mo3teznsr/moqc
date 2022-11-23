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
import Social from "../../src1/pages/components/social";
var FormData = require('form-data');
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height


class Signup5 extends Component {
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
            
        };
    }
    approveNext = async () => {
        if(this.state.image_base64 == null || this.state.selected_img == null ){
            Alert.alert(
                "Error",
                "Enter Select an Image to proceed",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );

              return;
        }
        
        let reg_token = await AsyncStorage.getItem("@moqc:reg_token");
        const formData = new FormData();
        formData.append('registration_token', JSON.parse(reg_token));
        formData.append('passport', this.state.image_base64);
        formData.append('emiratesId', this.state.image_base64);
 

        API.signup(formData)
        .then(async (resp) => {
          this.setState({show_spinner: false})
          console.log(resp)

          if (resp == "sucess"){
            this.props.navigation.navigate("Signup6")
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
    resetImage = async() => {
        this.setState({
            selected_img:null,
            image_base64:null
        })
    }
    getRegForm = () => {
        API.getForm()
        .then(async (resp) => {
            console.log(resp)
          this.setState({show_spinner: false,form: resp})
        })
        .catch(err => {
          console.log(err)
          alert(err)
        });
    }
    componentDidMount = async () => {
        let gender = await AsyncStorage.getItem("@moqc:gender");
        this.getRegForm();
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

                            <Text style={{marginTop:5,fontWeight:"bold"}}>Step 5/6</Text>

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
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#313145"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold",color:"#dee1ed"}}>5</Text>
                            </Button>
                            <Text style={{fontSize:8,marginTop:3}}>
                                Documents
                            </Text>
                        </View>
                        
                        <View style={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#dee1ed"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold",color:"#97a6cd"}}>6</Text>
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
                                Passport
                            </Text>
                            {
                                this.state.selected_img == null ?

                                    <Image
                                            style={{
                                            height: 150,
                                            width: 150,
                                            marginTop: 20
                                        }}
                                            source={require('../assets/documents.png')}/>

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
                        <View style={{ flexDirection:"row",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                        <TouchableOpacity onPress={()=>this.selectImage()}>
                            <Image
                                    style={{
                                    resizeMode:"contain",
                                    width: 50,
                                   
                                }}
                                    source={require('../assets/attach-doc.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openCamera()}>
                            <Image
                                    style={{
                                    resizeMode:"contain",
                                    width: 50,
                                   marginHorizontal:5
                                }}
                                    source={require('../assets/camera-doc.png')}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.resetImage()}>
                            <Image
                                    style={{
                                   resizeMode:"contain",
                                    width: 50,
                                    
                                }}
                                    source={require('../assets/trash-doc.png')}/>
                        </TouchableOpacity>

                        
                        </View>

                         
                    </View>
                    <View style={{flex:1,justifyContent:"center",alignContent:"center",alignItems:"center",marginRight:10,marginLeft:10,marginTop:10}}>
                        
                    </View>
                    <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignContent:"center",marginTop:30}}>
                        <Button onPress={() => this.approveNext(this.props)} style={{width:120,borderRadius:30,justifyContent:"center",alignContent:"center",backgroundColor:"#31314f"}}>
                            <Text>
                                Next 
                            </Text>
                            <Icon type="AntDesign" name="caretright" style={{fontSize:10}}/>
                        </Button>

                    </View>
                
                <Social/>
                </Content>
                </ImageBackground>

                {/* <FooterBottom {...this.props}/> */}
            </Container>
        );
    }
}

export default withTranslation()(Signup5);