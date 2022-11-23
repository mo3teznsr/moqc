import React, { Component } from "react";
import { withTranslation } from 'react-i18next';

import { StyleSheet, ImageBackground, Image, I18nManager, View, TouchableOpacity, Alert } from 'react-native'
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
} from "native-base";
import  AsyncStorage  from 'react-native';
import DropShadow from "react-native-drop-shadow";
import FooterBottom from "./Footer";
import { auto } from "async";

import API from "../api/";
import Social from "../../src1/pages/components/social";
var FormData = require('form-data');



class Signup2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rtl: false,
            gender: 0,
            user: 0,
            user_img: require("../assets/select_picture_m.png"),
            selected_img: null,
            image_base64: null,

        };
    }

    selectImage = async () => {
      /*  ImagePicker.openPicker({
            width: 300,
            height: 300,

            includeBase64: true,

        }).then(image => {
            this.setState({
                selected_img: image[0].path,
                image_base64: image[0].data,
            }).catch(e => console.log(e))
        });
        */
    }
    componentDidMount = async () => {
        let gender = await AsyncStorage.getItem("@moqc:gender");
        this.setState({ gender })
        if (gender == 2) {
            this.setState({
                user_img: require("../assets/select_picture_f.png"),

            })
        }
        if (I18nManager.isRTL === true) {
            this.setState({ rtl: true })
        } else {
            this.setState({ rtl: false })
        }
    }
    saveUser = async (props) => {
        if (this.state.image_base64 == null) {
            Alert.alert(
                "Select Profile Pic",
                "Please Select Profile Picture",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

            return;
        }
        let reg_token = await AsyncStorage.getItem("@moqc:reg_token");
        const formData = new FormData();
        formData.append('registration_token', JSON.parse(reg_token));
        formData.append('profile_pic', this.state.image_base64);

        API.signup(formData)
            .then(async (resp) => {
                this.setState({ show_spinner: false })
                console.log(resp)

                if (resp == "success") {
                    this.props.navigation.navigate("Signup4")
                } else {
                    const { navigate } = this.props.navigation;
                    Alert.alert(
                        "Error",
                        "There's an Error in Backend.",
                        [
                            { text: "OK", onPress: () => { console.log("Error") } }
                        ],
                        { cancelable: false }
                    );
                }
            })
            .catch(err => {
                console.log(err)
                alert(err)
            });

        await AsyncStorage.setItem('@moqc:gender', JSON.stringify(this.state.gender));
        console.log("saved");
        let gender = await AsyncStorage.getItem("@moqc:gender");
        console.log(gender);
        console.log("Fetched")


    }

    render() {
        const { t, i18n } = this.props;
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
                            borderBottomColor: '#31314f',
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
                        <Right />
                    </Header>
                    <View
                        style={{
                            backgroundColor: '#31314f',
                            flex: 0.1,
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
                                source={require('../assets/round.png')} />

                            <Text style={{ marginTop: 5, fontWeight: "bold" }}>Step 3/6</Text>

                        </View>

                    </View>


                    <Content style={{ marginTop: 130 }}>
                        <View style={{
                            height: 2,
                            backgroundColor: "lightgrey",
                            marginLeft: 15,
                            marginRight: 15,
                            marginTop: 20,
                            marginBottom: -20
                        }}>

                        </View>
                        <View style={{ flex: 0.2, display: "flex", flexDirection: "row", justifyContent: "space-evenly", }}>
                            <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                <Button onPress={() => this.props.navigation.navigate("Signup")} style={{ width: 40, height: 40, textAlign: "center", borderRadius: 100, backgroundColor: "#dee1ed" }}>
                                    <Text style={{ textAlign: "center", fontWeight: "bold", color: "#97a6cd" }}>1</Text>
                                </Button>
                                <Text style={{ fontSize: 8, marginTop: 3 }}>
                                    Gender
                                </Text>

                            </View>
                            <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                <Button onPress={() => this.props.navigation.navigate("Signup2")} style={{ width: 40, height: 40, textAlign: "center", borderRadius: 100, backgroundColor: "#dee1ed" }}>
                                    <Text style={{ textAlign: "center", fontWeight: "bold", color: "#97a6cd" }}>2</Text>
                                </Button>
                                <Text style={{ fontSize: 8, marginTop: 3 }}>
                                    User
                                </Text>

                            </View>
                            <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                <Button style={{ width: 40, height: 40, textAlign: "center", borderRadius: 100, backgroundColor: "#313145" }}>
                                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>3</Text>
                                </Button>
                                <Text style={{ fontSize: 8, marginTop: 3 }}>
                                    Picture
                                </Text>
                            </View>

                            <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                <Button style={{ width: 40, height: 40, textAlign: "center", borderRadius: 100, backgroundColor: "#dee1ed" }}>
                                    <Text style={{ textAlign: "center", fontWeight: "bold", color: "#97a6cd" }}>4</Text>
                                </Button>
                                <Text style={{ fontSize: 8, marginTop: 3 }}>
                                    Informations
                                </Text>
                            </View>

                            <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                <Button style={{ width: 40, height: 40, textAlign: "center", borderRadius: 100, backgroundColor: "#dee1ed" }}>
                                    <Text style={{ textAlign: "center", fontWeight: "bold", color: "#97a6cd" }}>5</Text>
                                </Button>
                                <Text style={{ fontSize: 8, marginTop: 3 }}>
                                    Documents
                                </Text>
                            </View>

                            <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                <Button style={{ width: 40, height: 40, textAlign: "center", borderRadius: 100, backgroundColor: "#dee1ed" }}>
                                    <Text style={{ textAlign: "center", fontWeight: "bold", color: "#97a6cd" }}>6</Text>
                                </Button>
                                <Text style={{ fontSize: 8, marginTop: 3 }}>
                                    Voice Record
                                </Text>
                            </View>

                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center"
                        }}>
                        </View>
                        <View style={{ flex: 10, flexDirection: "row", justifyContent: "center", alignItems: "center", alignSelf: "center", }}>
                            <TouchableOpacity onPress={(e) => this.selectImage()}>
                                {
                                    this.state.selected_img === null ?

                                        (
                                            <Image
                                                source={this.state.selected_img === null ? this.state.user_img : this.state.selected_img}
                                                style={{
                                                    height: 250,
                                                    width: 200,
                                                    marginRight: 15,
                                                    marginLeft: 15,
                                                    resizeMode: "contain"
                                                }} />
                                        )

                                        :

                                        (
                                            <Image
                                                source={{ uri: this.state.selected_img }}
                                                style={{
                                                    height: 170,
                                                    width: 170,
                                                    marginRight: 15,
                                                    marginLeft: 15,
                                                    resizeMode: "contain",
                                                    borderRadius: 100,
                                                    marginTop: 40
                                                }} />
                                        )
                                }

                            </TouchableOpacity>

                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center", marginRight: 10, marginLeft: 10, marginTop: 10 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                                Upload your image here
                            </Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignContent: "center", marginTop: 30 }}>
                            <Button onPress={() => this.saveUser(this.props)} style={{ width: 120, borderRadius: 30, justifyContent: "center", alignContent: "center", backgroundColor: "#31314f" }}>
                                <Text>
                                    Next
                                </Text>
                                <Icon type="AntDesign" name="caretright" style={{ fontSize: 10 }} />
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

export default withTranslation()(Signup2);