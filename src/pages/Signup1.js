import React, {Component} from "react";
import {withTranslation} from 'react-i18next';
import axios from "axios";
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
    Toast
} from "native-base";
import ROOT from 'native-base'
import { AsyncStorage } from 'react-native';
import DropShadow from "react-native-drop-shadow";
import FooterBottom from "./Footer";
import { auto } from "async";
import API from "../api/";
import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Success from "./components/success";
import Social from "../../src1/pages/components/social";
var FormData = require('form-data');

class Signup1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rtl: false,
            gender: 0,
            first_name:"",
            nationality:230,
            dob:"1985-01-01",
            day:'',
            month:'',
            year:"",
            qualification_id:"",
            voice_clip:null,
            passport:null,
            passport_expiry:'',
            contact_number:"",
            country:230,
            email:"",
            job_id:"",
            location_id:"",
            memorized:0,
            course:"",
            active_step:0,
            categories:[],
            emirates_id:null,
            id_expiration:'',
            qalifications:[],
            jobs:[],
            countries:[],
            locations:[],
            qualifications:[],
            courses:[],
            course_id:"",
           
        };
    }


    
 steps=[
    {name_en:"Gender",name_ar:"النوع"},
    {name_en:"Profile",name_ar:"الملف الشحصي"},
    {name_en:"Files",name_ar:"الملفات"},
 ]
    componentDidMount = async() => {
        

        axios.get("https://staging.moqc.ae/api/qualifications")
        .then(res=>{
            this.setState({qualifications: res.data})
        })
        .catch(e=>console.log(e))

        axios.get("https://staging.moqc.ae/api/get_jobs")
        .then(res=>{
            this.setState({jobs: res.data})
        })
        .catch(e=>console.log(e))

        axios.get("https://staging.moqc.ae/api/get_locations")
        .then(res=>{
            this.setState({locations: res.data})
        })
        .catch(e=>console.log(e))
        axios.get("https://staging.moqc.ae/api/courses")
        .then(res=>{
            this.setState({courses: res.data})
        })
        .catch(e=>console.log(e))
        axios.get("https://staging.moqc.ae/api/countries")
        .then(res=>{
            console.log('countries')
            this.setState({countries: res.data})
        })
        .catch(e=>console.log(e))
    }
    saveGender = async (props) =>{
        if(this.state.gender == 0){
            Alert.alert(
                "Select Gender",
                "Please Select Gender to proceed",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );

              return;
              
              
        }
        await AsyncStorage.setItem('@moqc:gender', JSON.stringify(this.state.gender));

        const formData = new FormData();
        formData.append('gender', this.state.gender);

        API.signup(formData)
        .then(async (resp) => {
          this.setState({show_spinner: false})
          console.log(resp.registration_token)
          await AsyncStorage.setItem('@moqc:reg_token', JSON.stringify(resp.registration_token));

          if (resp.registration_token){
            this.props.navigation.navigate("Signup2")
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
        

        

        // this.props.navigation.navigate("Signup2")


    }

     step(val){
        switch(val){
            case 0: 
            return  <Step1 data={this.state} update={(data)=>this.setState(data)} />;
            
            case 1:
            return <Step2 data={this.state} update={(data)=>this.setState(data)}  />;
            case 2:
            return <Step3 data={this.state} update={(data)=>this.setState(data)}  />;
            case 3:
            return <Success />
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
                        
                            <Title
                                style={{
                                    marginTop:10,
                                color: '#8f7c7b',textAlign:"center"
                            }}>{t('Registeration')}</Title>
                       
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
                                
                           {this.state.active_step<3? <Text style={{marginTop:5,fontWeight:"bold"}}>{t('Step')} {this.state.active_step+1}/3</Text>:<Text></Text>}

                        </View>
                    
                    </View>

                
                <Content style={{marginTop:130,paddingHorizontal:10}}>
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
                        {this.state.active_step<3? this.steps.map((item,index)=>{
                            return ( <View key={index}>
                                <Button onPress={()=>this.setState({active_step:index})}
                                 style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:this.state.active_step==index?"#313145":"#dee1ed"}}>
                                    <Text style={{textAlign:"center",fontWeight:"bold"}}>{index+1}</Text>
                                </Button>
    
                            </View>)
                        }):<View></View>}
                        {/* <View>
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#313145"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold"}}>1</Text>
                            </Button>

                        </View>
                        <View>
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#dee1ed"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold",color:"#97a6cd"}}>2</Text>
                            </Button>

                        </View>
                        <View>
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#dee1ed"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold",color:"#97a6cd"}}>3</Text>
                            </Button>

                        </View>
                        
                        <View>
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#dee1ed"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold",color:"#97a6cd"}}>4</Text>
                            </Button>

                        </View>
                        
                        <View>
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#dee1ed"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold",color:"#97a6cd"}}>5</Text>
                            </Button>

                        </View>
                        
                        <View>
                            <Button style={{width:40,height:40,textAlign:"center",borderRadius:100,backgroundColor:"#dee1ed"}}>
                                <Text style={{textAlign:"center",fontWeight:"bold",color:"#97a6cd"}}>6</Text>
                            </Button>

                        </View> */}
                        
                    </View>
               {this.step(this.state.active_step)}
                        {/* <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignContent:"center",marginTop:5,marginBottom:5}}>
                            <Button onPress={() => this.setState({active_step:1})} style={{width:120,borderRadius:30,justifyContent:"center",alignContent:"center",backgroundColor:"#31314f"}}>
                                <Text>
                                    Next 
                                </Text>
                                <Icon type="AntDesign" name="caretright" style={{fontSize:10}}/>
                            </Button>

                        </View> */}
               
                <Social/>
                </Content>
                </ImageBackground>

                {/* <FooterBottom {...this.props}/> */}
            </Container>
        );
    }
}

export default withTranslation()(Signup1);