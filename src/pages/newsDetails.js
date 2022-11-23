import React, { useLayoutEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    I18nManager,
    SafeAreaView,
    ImageBackground,
    Image,
    Dimensions,
    Modal,
    Pressable,
    PermissionsAndroid
} from 'react-native';
import { withTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import { AsyncStorage } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Item, Input } from 'native-base';
import GetLocation from 'react-native-get-location'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height
import DropShadow from "react-native-drop-shadow";
import Footer from "./Footer";
import HeaderTop from "./Header";
import API from "../api";
import Axios from 'axios'
import DocumentPicker from "react-native-document-picker";
import RNFetchBlob from 'rn-fetch-blob'
import i18n from '../i18n';
import { decode } from 'decode-html';
import WebView from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import { ActivityIndicator } from 'react-native-paper';


class newsDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Details: [],
            language: '',
            showSpinner: true
        };
        this.getLanguage()
    }

    componentDidMount() {
        this.news();
    }
    async getLanguage() {
        let language = await AsyncStorage.getItem("@moqc:language")
        await this.setState({ language: language })
    }

    news = async () => {
        this.setState({ showSpinner: true })
        var id = this.props.route.params.id
        let token = await AsyncStorage.getItem("@moqc:token")
        const response = await Axios.get(`https://staging.moqc.ae/api/media/${id}`,
            {
                headers: { "token": token }
            });

        if (response.status === 200) {
            this.setState({ showSpinner: false, Details: response.data })
        }
    }


    render() {
        var item = this.state.studentDetail
        const source = {
            html: this.state.language == 'en' ? this.state.Details.description_english : this.state.Details.description_arabic
        };

        return (
            <Container>
                <ScrollView style={{ flex: 1 }}>

                    <ImageBackground
                        source={require('../assets/bg_img.png')}
                        style={{
                            flex: 10
                        }}>
                        <HeaderTop pagename={i18n.t('NEWS')} navigation={this.props.navigation} back={true} />

                        {this.state.showSpinner ? <ActivityIndicator size="large" color='green' /> :
                            <View style={{ margin: 20 }}>
                                <Image style={{ height: 200, width: '100%', borderRadius: 20 }} source={{ uri: `https://staging.moqc.ae${this.state.Details.image_path}` }} />
                                <Text style={{ fontSize: 10, color: '#D04454', textAlign: 'right', margin: 10 }}>{i18n.t('Published on')} : {this.state.Details.published_date}</Text>
                                <Text style={styles.heading}>{this.state.language == 'en' ? this.state.Details.title_english : this.state.Details.title_arabic}</Text>

                                <RenderHtml
                                    source={source}
                                />
                            </View>}


                    </ImageBackground>

                    {/* <Footer location={"profile"} navigation={this.props.navigation}/> */}
                </ScrollView>
            </Container>
        )
    }
}

export default withTranslation()(newsDetails)

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    sectionWrapper: {
        padding: 20
    },
    heading: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
        color: '#31314F',
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    regularText: {
        textAlign: 'left'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput: {
        textAlign: I18nManager.isRTL
            ? 'right'
            : 'left'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modalView: {
        marginHorizontal: 10,
        width: 350,
        height: 220,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});