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
    Pressable,
    FlatList,
    Modal,
    Dimensions,
} from 'react-native';
import API from "../api/";
const Axios = require('axios');

import CheckBox from 'react-native-check-box'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Item, Input, Picker, Form } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CourseStudents from './CourseStudents';
import HeaderTop from './Header'
import { AsyncStorage } from 'react-native';
import i18n from '../i18n';

class ItStudentView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isChecked: false,
            studentDetail: [],
            createModal: false,
            classes: [],
            student_level: '',
            student_class: ''

        };
    }

    componentDidMount() {
        this.getStudentDetails()
        this.getClasses()
    }

    getClasses = async () => {
        let token = await AsyncStorage.getItem("@moqc:token")
        const response = await Axios.get(`https://staging.moqc.ae/api/classes`,
            {
                headers: { "token": token }
            });
        if (response.status === 200) {
            this.setState({ classes: response.data })
        }
    }

    getStudentDetails = async () => {
        var st_id = this.props.route.params.st_id
        let token = await AsyncStorage.getItem("@moqc:token")
        const response = await Axios.get(`https://staging.moqc.ae/api/students/${st_id}`,
            {
                headers: { "token": token }
            });
        if (response.status === 200) {
            console.log(response.data)
            this.setState({
                studentDetail: response.data, student_level: response.data.student_level,
                student_class: response.data.student_class
            })
        }
    }

    update = async () => {
        var st_id = this.props.route.params.st_id
        let token = await AsyncStorage.getItem("@moqc:token")
        let body = new FormData()
        body.append("microsoft_email", this.state.studentDetail.microsoft_email)
        body.append("student_email", this.state.studentDetail.student_email)
        body.append("password", this.state.studentDetail.password)
        body.append("student_level", this.state.studentDetail.student_level)
        body.append("student_class", this.state.studentDetail.student_class)
        const response = await Axios.post(`https://staging.moqc.ae/api/student_update/${st_id}`,
            body,
            {
                headers: { "token": token }
            });
        if (response.status === 200) {
            this.getStudentDetails()
        }
    }

    render() {

        var item = this.state.studentDetail
        return (
            <View style={{ flex: 10 }}>
                {/* <TouchableOpacity onPress={() => this.setState({ createModal: true })} style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Icon active size={20} name='add' type="MaterialIcons" style={{ fontSize: 20 }} />
                    <Text style={{ fontSize: 15 }}>Create New Course</Text>
                </TouchableOpacity> */}
                <ImageBackground
                    source={require('../assets/bg_img.png')}
                    style={{
                        flex: 10,
                    }}>
                    <HeaderTop pagename={"Student Details"} navigation={this.props.navigation} back={true} />

                    <View style={{ margin: 10 }}>
                        <View style={{ backgroundColor: '#ffff', borderRadius: 10, borderWidth: 1, borderColor: '#D5D5D5', padding: 10 }}>
                            <View style={{ backgroundColor: '#F7F8FA', borderRadius: 10, padding: 10 }}>
                                <View style={{ marginVertical: 5, flexDirection: 'row', alignItems: "center" }}>
                                    <Text style={{ width: '30%', fontWeight: 'bold' }}>{i18n.t('Student ID')} </Text>
                                    <Text style={{ padding: 10, height: 40, width: '70%' }}>{item.student_id}</Text>
                                </View>
                                <View style={{ marginVertical: 5, flexDirection: 'row', alignItems: "center" }}>
                                    <Text style={{ width: '30%', fontWeight: 'bold' }}>{i18n.t('Student Email')} : </Text>
                                    <TextInput style={{ padding: 10, height: 40, width: '70%', borderWidth: 1, borderRadius: 10 }}
                                        onChangeText={(e) => {
                                            var clas = this.state.studentDetail
                                            clas.student_email = e
                                            this.setState({ studentDetail: clas })
                                        }}>{item.student_email}</TextInput>
                                </View>
                                <View style={{ marginVertical: 5, flexDirection: 'row', alignItems: "center" }}>
                                    <Text style={{ width: '30%', fontWeight: 'bold' }}>{i18n.t('Microsoft Email')} : </Text>
                                    <TextInput style={{ padding: 10, height: 40, width: '70%', borderWidth: 1, borderRadius: 10 }}
                                        onChangeText={(e) => {
                                            var clas = this.state.studentDetail
                                            clas.microsoft_email = e
                                            this.setState({ studentDetail: clas })
                                        }}>{item.microsoft_email}</TextInput>
                                </View>
                                <View style={{ marginVertical: 5, flexDirection: 'row', alignItems: "center" }}>
                                    <Text style={{ width: '30%', fontWeight: 'bold' }}>{i18n.t('Student Password')} : </Text>
                                    <TextInput style={{ padding: 10, height: 40, width: '70%', borderWidth: 1, borderRadius: 10 }}
                                        onChangeText={(e) => {
                                            var clas = this.state.studentDetail
                                            clas.password = e
                                            this.setState({ studentDetail: clas })
                                        }}>{item.password}</TextInput>
                                </View>
                                <View style={{ marginVertical: 5, flexDirection: 'row', alignItems: "center" }}>
                                    <Text style={{ width: '30%', fontWeight: 'bold' }}>{i18n.t('Student Class')} : </Text>
                                    <View style={{ borderRadius: 10, padding: 10, borderWidth: 1, width: '70%' }}>
                                        <Picker
                                            placeholder="Select One"
                                            placeholderStyle={{ color: "#2874F0" }}
                                            style={{ height: 20 }}
                                            selectedValue={this.state.student_class}
                                            onValueChange={(itemValue, itemIndex) => {
                                                var clas = this.state.studentDetail
                                                clas.student_class = itemValue
                                                this.setState({ studentDetail: clas, student_class: itemValue })
                                            }}
                                        >
                                            {this.state.classes.map(item => {
                                                return <Picker.Item label={item.class_name} value={item.id} />
                                            })}

                                        </Picker>
                                    </View>
                                    {/* <TextInput style={{ padding: 10, height: 40, width: '70%', borderWidth: 1, borderRadius: 10 }}>{item.student_class}</TextInput> */}
                                </View>
                                <View style={{ marginVertical: 5, flexDirection: 'row', alignItems: "center" }}>
                                    <Text style={{ width: '30%', fontWeight: 'bold' }}>{i18n.t('Student Level')} : </Text>
                                    <View style={{ borderRadius: 10, padding: 10, borderWidth: 1, width: '70%' }}>
                                        <Picker
                                            placeholder="Select One"
                                            placeholderStyle={{ color: "#2874F0" }}
                                            style={{ height: 20 }}
                                            selectedValue={this.state.student_level}
                                            onValueChange={(itemValue, itemIndex) => {
                                                var clas = this.state.studentDetail
                                                clas.student_level = itemValue
                                                this.setState({ student_level: itemValue, studentDetail: clas, })
                                            }}
                                        >
                                            <Picker.Item label="Beginner" value="1" />
                                            <Picker.Item label="Excellent" value="2" />
                                            <Picker.Item label="Very Good" value="3" />
                                        </Picker>
                                    </View>
                                </View>

                                <Pressable onPress={() => this.update()} style={{ bottom: 0, alignSelf: 'flex-end' }}><Text style={{ fontWeight: 'bold', fontSize: 16, color: 'green' }}>{i18n.t('Update')}</Text></Pressable>
                            </View>
                        </View>
                    </View>

                </ImageBackground>
            </View>
        )
    }
}
export default ItStudentView

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    sectionWrapper: {
        padding: 20
    },
    heading: {
        borderWidth: 1,
        fontSize: 20,
        margin: 15,
        borderRadius: 10,
        borderColor: "#2b8634",
        textAlign: "center"
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
        height: "55%",
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