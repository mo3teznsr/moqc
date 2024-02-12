import React, { Component } from "react";
import { withTranslation } from 'react-i18next';

import { Pressable, StyleSheet, ImageBackground, Image, I18nManager, View, TouchableOpacity, Dimensions, Alert } from 'react-native'
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
import DateTimePicker from 'react-native-date-picker';
import Social from "./components/social";


class Signup4 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rtl: false,
            gender: 0,
            user: 0,
            user_img: require("../assets/select_picture_m.png"),
            selected_img: null,
            image_base64: null,
            countries: [],
            country: null,
            first_name: "",
            last_name: "",
            dob: new Date(),
            age: "",
            nationality: "",
            email: "",
            contact_phone: "",
            formattedDate: "Date of Birth",
            openDate: false


        };
    }
    approveNext = async () => {
        if (this.state.first_name == "") {
            Alert.alert(
                "Enter First Name",
                "Please Enter First name",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

            return;
        }
        if (this.state.last_name == "") {
            Alert.alert(
                "Enter Last Name",
                "Please Enter Last name",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

            return;
        }

        if (this.state.dob == "") {
            Alert.alert(
                "Enter Date of Birth",
                "Please Select Date of Birth",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return;
        }

        if (this.state.age == "") {
            Alert.alert(
                "Enter Age",
                "Please Enter Age",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

            return;
        }
        if (this.state.email == "") {
            Alert.alert(
                "Enter Email",
                "Please Enter Email"
                [
                { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

            return;
        }
        if (this.state.nationality == "") {
            Alert.alert(
                "Enter Nationality",
                "Please Enter Nationality",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

            return;
        }

        if (this.state.contact_phone == "") {
            Alert.alert(
                "Enter Contact",
                "Please Enter Number",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

            return;
        }
        let reg_token = await AsyncStorage.getItem("@moqc:reg_token");
        const formData = new FormData();
        formData.append('registration_token', JSON.parse(reg_token));
        formData.append('first_name', this.state.first_name);
        formData.append('last_name', this.state.last_name);
        formData.append('dob', this.state.formattedDate);
        formData.append('age', this.state.age);
        formData.append('nationality', this.state.nationality);
        formData.append('email', this.state.email);
        formData.append('country', this.state.country);
        formData.append('contact_phone', this.state.contact_phone);

        API.signup(formData)
            .then(async (resp) => {
                this.setState({ show_spinner: false })
                console.log("emailresp",resp)

                if (resp == "Stage 4 Done") {
                    this.props.navigation.navigate("Signup5")
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

    }
    selectImage = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true,

        }).then(image => {
            this.setState({
                selected_img: image[0].path,
                image_base64: image[0].data,
            })
        });
    }
    getCountries = () => {
        API.country()
            .then(async (resp) => {
                this.setState({ show_spinner: false, countries: resp })
            })
            .catch(err => {
                console.log(err)
                alert(err)
            });
    }
    componentDidMount = async () => {
        let gender = await AsyncStorage.getItem("@moqc:gender");
        this.getCountries();
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

    formatDate(date) {
        var d = new Date(date);
        d = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        this.setState({ formattedDate: d })
    }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.formatDate(selectedDate)
        this.setState({ dob: currentDate, openDate: false })
    };


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

                            <Text style={{ marginTop: 5, fontWeight: "bold" }}>Step 4/6</Text>

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
                                <Button onPress={() => this.props.navigation.navigate("Signup3")} style={{ width: 40, height: 40, textAlign: "center", borderRadius: 100, backgroundColor: "#dee1ed" }}>
                                    <Text style={{ textAlign: "center", fontWeight: "bold", color: "#97a6cd" }}>3</Text>
                                </Button>
                                <Text style={{ fontSize: 8, marginTop: 3 }}>
                                    Picture
                                </Text>
                            </View>

                            <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                <Button style={{ width: 40, height: 40, textAlign: "center", borderRadius: 100, backgroundColor: "#313145" }}>
                                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>4</Text>
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
                        <View style={{ flex: 10, flexDirection: "column", }}>
                            <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start", alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    First Name
                                </Text>
                                <Item style={{ borderBottomWidth: 0 }}>
                                    <Input
                                        style={{
                                            borderRadius: 0,
                                            backgroundColor: "#EEEFF4",

                                            marginTop: 5,
                                            borderBottomWidth: 0,
                                            padding: 15,
                                            width: width - 50,
                                            textAlign: this.state.rtl
                                                ? 'right'
                                                : 'left'
                                        }}
                                        value={this.state.first_name}
                                        onChangeText={(first_name) => this.setState({ first_name })}
                                        placeholder="First Name" />
                                </Item>
                            </View>
                            <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start", alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    Last Name
                                </Text>
                                <Item style={{ borderBottomWidth: 0 }}>
                                    <Input
                                        style={{
                                            borderRadius: 0,
                                            backgroundColor: "#EEEFF4",
                                            marginTop: 5,
                                            borderBottomWidth: 0,
                                            padding: 10,
                                            width: width - 50,
                                            textAlign: this.state.rtl
                                                ? 'right'
                                                : 'left'
                                        }}
                                        value={this.state.last_name}
                                        onChangeText={(last_name) => this.setState({ last_name })}
                                        placeholder="Last Name" />
                                </Item>
                            </View>
                            <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start", alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    Email
                                </Text>
                                <Item style={{ borderBottomWidth: 0 }}>
                                    <Input
                                        style={{
                                            borderRadius: 0,
                                            backgroundColor: "#EEEFF4",
                                            marginTop: 5,
                                            borderBottomWidth: 0,
                                            padding: 10,
                                            width: width - 50,
                                            textAlign: this.state.rtl
                                                ? 'right'
                                                : 'left'
                                        }}
                                        value={this.state.email}
                                        onChangeText={(email) => this.setState({ email })}
                                        placeholder="Email" />
                                </Item>
                            </View>
                            <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start", alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    Nationality
                                </Text>
                                <Item style={{ borderBottomWidth: 0 }}>
                                    <Input
                                        style={{
                                            borderRadius: 0,
                                            backgroundColor: "#EEEFF4",
                                            marginTop: 5,
                                            borderBottomWidth: 0,
                                            padding: 10,
                                            width: width - 50,
                                            textAlign: this.state.rtl
                                                ? 'right'
                                                : 'left'
                                        }}
                                        value={this.state.nationality}
                                        onChangeText={(nationality) => this.setState({ nationality })}
                                        placeholder="Nationality" />
                                </Item>
                            </View>
                            <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start", alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    Phone
                                </Text>
                                <Item style={{ borderBottomWidth: 0 }}>
                                    <Input
                                        keyboardType={"number-pad"}
                                        style={{
                                            borderRadius: 0,
                                            backgroundColor: "#EEEFF4",
                                            marginTop: 5,
                                            borderBottomWidth: 0,
                                            padding: 10,
                                            width: width - 50,
                                            textAlign: this.state.rtl
                                                ? 'right'
                                                : 'left'
                                        }}
                                        value={this.state.contact_phone}
                                        onChangeText={(contact_phone) => this.setState({ contact_phone })}
                                        placeholder="Phone" />
                                </Item>
                            </View>
                            {/* <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start", alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    Date of Birth
                                </Text>
                                <Item style={{ borderBottomWidth: 0 }}>
                                    <Input

                                        style={{
                                            borderRadius: 0,
                                            backgroundColor: "#EEEFF4",
                                            marginTop: 5,
                                            borderBottomWidth: 0,
                                            padding: 10,
                                            width: width - 50,
                                            textAlign: this.state.rtl
                                                ? 'right'
                                                : 'left'
                                        }}
                                        value={this.state.dob}
                                        onChangeText={(dob) => this.setState({ dob })}
                                        placeholder="Date of birth" />
                                </Item>
                            </View> */}

                            <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start", alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 5 }}>
                                <Pressable onPress={() => this.setState({ openDate: true })}>
                                    <Text style={{fontWeight:'bold'}}>Date of Birth</Text>
                                </Pressable>

                                {this.state.openDate && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={new Date(this.state.dob)}
                                        mode='date'
                                        is24Hour={true}
                                        display="default"
                                        onChange={this.onChange}
                                    />
                                )}
                                <Pressable onPress={() => this.setState({ openDate: true })}>
                                    <Text style={{
                                        borderRadius: 0,
                                        backgroundColor: "#EEEFF4",
                                        marginTop: 5,
                                        borderBottomWidth: 0,
                                        padding: 10,
                                        width: width - 50,
                                        textAlign: this.state.rtl
                                            ? 'right'
                                            : 'left'
                                    }}
                                    >{this.state.formattedDate}</Text>
                                </Pressable>
                            </View>
                            <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start", alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    Age
                                </Text>
                                <Item style={{ borderBottomWidth: 0 }}>
                                    <Input

                                        keyboardType={"number-pad"}
                                        style={{
                                            borderRadius: 0,
                                            backgroundColor: "#EEEFF4",
                                            marginTop: 5,
                                            borderBottomWidth: 0,
                                            padding: 10,
                                            width: width - 50,
                                            textAlign: this.state.rtl
                                                ? 'right'
                                                : 'left'
                                        }}
                                        value={this.state.age}
                                        onChangeText={(age) => this.setState({ age })}
                                        placeholder="Age" />
                                </Item>
                            </View>
                            {/* <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start", alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    Country
                                </Text>
                                <Item style={{ borderBottomWidth: 0 }}>
                                    <Picker
                                        mode="dropdown"
                                        placeholder="Select One"
                                        style={{
                                            borderRadius: 0,
                                            backgroundColor: "#EEEFF4",
                                            marginTop: 5,
                                            borderBottomWidth: 0,
                                            width: width - 50,
                                        }}
                                        placeholderStyle={{
                                            borderRadius: 30,
                                            marginTop: 5,
                                            borderBottomWidth: 0,
                                            width: width - 50,
                                        }}
                                        note={false}
                                        selectedValue={this.state.country}
                                        onValueChange={(s) => this.setState({ country: s })}
                                    >
                                        {
                                            this.state.countries.map((m) => {
                                                return (
                                                    <Picker.Item label={m.country_name} value={m.id} />

                                                )
                                            })
                                        }
                                    </Picker>
                                </Item>
                            </View> */}

                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center", marginRight: 10, marginLeft: 10, marginTop: 10 }}>

                        </View>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignContent: "center", marginTop: 30 }}>
                            <Button onPress={() => this.approveNext(this.props)} style={{ width: 120, borderRadius: 30, justifyContent: "center", alignContent: "center", backgroundColor: "#31314f" }}>
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

export default withTranslation()(Signup4);