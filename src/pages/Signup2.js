import React, {Component} from "react";
import {withTranslation} from 'react-i18next';

import {StyleSheet, ImageBackground, Image, I18nManager, View, TouchableOpacity, Alert} from 'react-native'
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
import Social from "./components/social";
class Signup2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rtl: false,
            gender: 0,
            user: 0,
            user_img: require("../assets/user_m.png"),
            student_img: require("../assets/student_m.png"),
            line1: require('../assets/yellow_line.png'),
            line2: require('../assets/blue_line.png'),
        };
    }

    componentDidMount = async () => {
        let gender = await AsyncStorage.getItem("@moqc:gender");
        this.setState({gender})
        if(gender == 2){
            this.setState({
                user_img: require("../assets/user_f.png"),
                student_img: require("../assets/student_f.png"),
                line1: require('../assets/red_line.png'),

            })
        }
        let user = await AsyncStorage.getItem("@moqc:user");
        if(user !== null){
            
            this.setState({user:user})
        }
        if (I18nManager.isRTL === true) {
            this.setState({rtl: true})
        } else {
            this.setState({rtl: false})
        }
    }
    saveUser = async (props) =>{
        if(this.state.user == 0){
            Alert.alert(
                "Select User",
                "Please Select User to proceed",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );

              return;
              
              
        }
        await AsyncStorage.setItem('@moqc:user', JSON.stringify(this.state.user));
       
        this.props.navigation.navigate("Signup3")



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

                            <Text style={{marginTop:5,fontWeight:"bold"}}>Step 2/6</Text>

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
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#313145"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold"}}>2</Text>
                            </Button>
                            <Text style={{fontSize:8,marginTop:3}}>
                                User
                            </Text>

                        </View>
                        <View style={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#dee1ed"}}>
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
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,color:"#97a6cd",backgroundColor:"#dee1ed"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold",color:"#97a6cd"}}>5</Text>
                            </Button>
                            <Text style={{fontSize:8,marginTop:3}}>
                                Documents
                            </Text>
                        </View>
                        
                        <View style={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,color:"#97a6cd",backgroundColor:"#dee1ed"}}>
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
                        <Text style={{fontSize:16,marginTop:5,marginBottom:5}}>
                            Which one are you?
                        </Text>
                    </View>
                    <View style={{flex:10,flexDirection:"row",justifyContent:"center",}}>
                        <TouchableOpacity onPress={() => this.setState({user:1})}>
                            <Image
                                onPress={() => this.setState({user:1})}
                                source={this.state.user_img}
                                style={{
                                height: 220,
                               width:150,
                                marginRight:10,
                                resizeMode:"contain"
                            }}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({user:2})}>
                            <Image
                                onPress={() => this.setState({user:2})}
                                source={this.state.student_img}
                                style={{
                                height: 220,
                                marginRight:10,
                               width:150,
                                resizeMode:"contain"
                            }}/>

                        </TouchableOpacity>
                            
                    </View>
                    <View style={{flex:10,flexDirection:"row",justifyContent:"center",alignItems:"center",alignSelf:"center",}}>
                            <Image
                                source={this.state.line1}
                                style={{
                                height: this.state.user == 1 ? 10 : 0,
                                width:150,
                                marginRight: 10,
                                
                                resizeMode:"contain"
                            }}/>
                            
                            <Image
                                source={this.state.line2}
                                style={{
                                height: this.state.user == 2 ? 10 : 0,
                                width:150,
                                marginRight: 10,
                                
                                resizeMode:"contain"
                            }}/>


                    </View>
                    <View style={{flex:1,justifyContent:"center",alignContent:"center",alignItems:"center",paddingHorizontal:50,marginTop:10}}>
                        <Text style={{fontWeight:"bold",fontSize:10,}}>
                            If you are willing to become a MOQC Student kindly select Student
                        </Text>
                        <Text style={{fontWeight:"bold",fontSize:10}}>
                            In Case you are a Visitor kindly select MOQC User to proceed with registeration
                        </Text>
                    </View>
                    <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignContent:"center",marginTop:10}}>
                        <Button onPress={() => this.saveUser(this.props)} style={{width:120,borderRadius:30,justifyContent:"center",alignContent:"center",backgroundColor:"#31314f"}}>
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

export default withTranslation()(Signup2);