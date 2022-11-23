import React from 'react';
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
    Alert,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Item, Input, Picker, Form } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DocumentPicker from "react-native-document-picker";
import ActionButton from 'react-native-action-button';
import Axios from 'axios'
import HeaderTop from "./Header";
import { open } from '../store';
import { Backdrop } from 'react-native-backdrop';
import i18n from '../i18n';


class ExamReport extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isChecked: false,
            students: [],
            createModal: false,
            result: [],
        }
    }

    componentDidMount() {
        this.getResult()
    }

    getResult = async () => {
        open.next(true)
        var exam_id = this.props.route.params.exam_id
        const response = await Axios.get(`https://staging.moqc.ae/api/results_view/${exam_id}`);
        if (response.status === 200) {
            console.log(response.data,exam_id)
            this.setState({ result: response.data })
            open.next(false)
        }
    }

    async updateResult() {
        var exam_id = this.props.route.params.exam_id
        var body = new FormData()
        body.append("id", exam_id)
        body.append("students", JSON.stringify(this.state.result))
        const response = await Axios.post(`https://staging.moqc.ae/api/results_update/${exam_id}`, body);
    }

    renderItem = ({ item }) => (
        <View
            style={{ borderBottomWidth: 1, borderBottomColor: '#D5D5D5',alignItems:"center", padding: 2, margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 2 }}>
                <Text>{item.first_name + ' ' + item.last_name}</Text>
            </View>
            {/* <Backdrop
                visible={open}
            >
                <View>
                    <ActivityIndicator />
                </View>
            </Backdrop> */}
            <View style={{ flex: 1 }}>
                <TextInput style={{ padding: 10, height: 40, borderWidth: 1, borderRadius: 10 }}
                    value={item.result}
                    onChangeText={(e) => {
                        item.result = e
                        this.setState({ result: this.state.result })
                    }}>
                </TextInput>
            </View>
        </View>

    );

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 10 }}>
                    <HeaderTop pagename={i18n.t("Report")} navigation={this.props.navigation} back={true} />

                    <ImageBackground
                        source={require('../assets/bg_img.png')}
                        style={{
                            flex: 10,
                        }}>

                        <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginVertical: 5, fontSize: 16 }}>{i18n.t('Exam ')}: {this.props.route.params.name}</Text>
                            <Text style={{ marginVertical: 5, fontSize: 16 }}>{i18n.t('Date')} : {this.props.route.params.date}</Text>
                        </View>

                        <View
                            style={{ borderBottomWidth: 1, borderBottomColor: '#D5D5D5', padding: 10, backgroundColor: '#D5D5D5', flexDirection: 'row',alignItems:"center", justifyContent: 'space-between' }}>
                            <View style={{ flex: 2,}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{i18n.t('Name')}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{i18n.t('Result')}</Text>
                            </View>
                        </View>
                        <FlatList
                            data={this.state.result}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                        />

                        <Pressable style={{ margin: 10, backgroundColor: '#579976', padding: 10, justifyContent: 'center', alignItems: 'center', width: '20%', borderWidth: 1, borderRadius: 10 }}
                            onPress={() => this.updateResult()}>
                            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 15 }} >{i18n.t('Save')}</Text>
                        </Pressable>

                    </ImageBackground>
                </View>
            </ScrollView>
        );
    }
}
export default ExamReport


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
        textAlign: 'left'
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
        margin: 10,
        width: '100%',
        height: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        padding: 10,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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