import React, {Component, useState} from "react";
import { AsyncStorage, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ShowMenu } from "../../store";
import i18n from '../../i18n';
import HomeIcon from "../../assets/home_a.png"
import DashIcon from "../../assets/dash_a.png"
import ProfileIcon from "../../assets/profile_a.png"
import QiblaIcon from "../../assets/qiblah_a.png"
import SocialMedia from "../../assets/sm_f.png"
import RadioIcon from "../../assets/radio_f.png"
import NewsIcon from "../../assets/news.png"
import SettingsIcon from "../../assets/setting.png"
import QuranIcon from "../../assets/sm_a.png"
import PlayIcon from "../../assets/play.png"
import Teacher from "../../assets/teacher_dash.png"
import Customer from "../../assets/pp_f.png"
import ITIcon from "../../assets/it_dash.png"
import LogoutIcon from "../../assets/logout.png"
import LogoImg from "../../assets/logo.png"
import { Icon } from "native-base";

import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { TouchableHighlight } from "react-native-gesture-handler";
import Social from "./social";

const SideMenu=(props)=>{
    var [show,setShow]=React.useState(false)
    var [user,setUser]=React.useState(null)
    const [access,setAccess]=React.useState(null)
    const [showDash,setShowDash]=React.useState(false)
    const [showMedia,setShowMedia]=React.useState(false)
    const [is_student,setStudent]=React.useState(false)
    const navigation = useNavigation();
    const links=[
        {name_ar:"من نحن",name_en:"About us",link:"general_director"},
        {name_ar:"المنهج الدراسي لختم القرآن الكريم",name_en:"Memorization Levels",link:"memorization_level"},
        {name_ar:"المنهج الدراسي للقراءات العشر",name_en:"Post Quran Study",link:"post_quran"},
        {name_ar:"القران الإلكتروني",name_en:"E-QURAN",link:"website/equran"},
        {name_ar:"المكتبة القرآنية",name_en:"QURAN LIBRARY",link:"website/library"},
        {name_ar:"اتصل بنا",name_en:"Contact us",link:"contact_us"},
        
]
    const getUser=async()=>{
        let token = await AsyncStorage.getItem("@moqc:token")
        let is_student = await AsyncStorage.getItem("is_student")
        setStudent(is_student)
        let userAccess = await AsyncStorage.getItem("@moqc:page_access");
       // access = JSON.parse(access);
        setAccess(JSON.parse(userAccess))
        console.log("current",i18n.language)
     //   console.log(access)
        
        if (token) {
            if (is_student == 0) {
                axios.post(`https://staging.moqc.ae/api/profile`, '',
                {
                    headers: { "token": token }
                }).then(res=>{
                    setUser(res.data)       
                    console.log('userdata',res.data)
                }).catch(e=>{
                    console.log('error',e)
                })
            }
            else {
                axios.get(`https://staging.moqc.ae/api/student_profile`, '',
                {
                    headers: { "token": token }
                }).then(res=>{
    
                    setUser(res.data)
                    console.log('userdata',res.data)
                }).catch(e=>{
                    console.log('error',e)
                })
            }
        }
         
            
        
       }
       React.useEffect(()=>{
        getUser()
       // console.log("useraccess", access)
    ShowMenu.subscribe(value=>{
        setShow(value)
    })
       },[])

     

       const logout=async() =>{
        ShowMenu.next(false)
        navigation.navigate("Landing")
        await AsyncStorage.clear()
    }

    const go=(link)=>
    {
        ShowMenu.next(false)
        navigation.navigate(link)
    }

    const web=(link,url)=>
    {
        ShowMenu.next(false)
        navigation.navigate(link,{link: url})
    }


    return  <View  style={{position:"absolute",zIndex:show?100:-100,flexDirection:"row",width:"100%",top:0,left:0,backgroundColor:"#fff0",flex:1,height:"100%"}}>
        <View style={{flex:4,backgroundColor:"#fff"}}>

       
        <ScrollView  >
        
   <View style={{width:"100%",height:200,backgroundColor:"#31314f",justifyContent:"center",alignItems:"center"}}>
   <Image source={require('../../assets/pp_f.png') } style={{width:100,height:100}} /> 
   <Text style={{fontWeight:"bold",color:"#fff",marginVertical:15,fontSize:18}}>{user?user.first_name:''} </Text>
   </View>
 
<View style={{padding:10}}>
<TouchableOpacity onPress={()=>is_student == 0?navigation.navigate("Home"):navigation.navigate("HomeStudent", { class_id: 1 })}>  
    <View style={styles.menuButton}>
        <Image source={HomeIcon} style={styles.menuButtonIcon} />
        <Text style={styles.menuButtonLabel}> {i18n.t("Home")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>go("Compass")}>  
    <View style={styles.menuButton}>
        <Image source={QiblaIcon} style={styles.menuButtonIcon} />
        <Text style={styles.menuButtonLabel}> {i18n.t("Quibla")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View>
</TouchableOpacity>

{links.map((item,key)=><TouchableOpacity onPress={()=>web("Web",item.link)}>  
    <View style={styles.menuButton}>
        <Image source={LogoImg} style={styles.menuButtonIcon} />
        <Text style={styles.menuButtonLabel}> {item['name_'+i18n.language]} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View>
</TouchableOpacity>)}

    <View style={styles.menuButton}>
        <Image source={ProfileIcon} style={styles.menuButtonIcon} />
        <Text style={styles.menuButtonLabel}> {i18n.t("Profile")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View>

     {access? <View style={styles.menuButton}>
     <Pressable style={styles.menuButton} onPress={()=>{setShowDash(!showDash)}}>
        <Image source={DashIcon} style={styles.menuButtonIcon} />
        <Text style={styles.menuButtonLabel}> {i18n.t("Dashboard")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
        </Pressable>
    </View> :<Text></Text>}
    {showDash?<View style={{borderRadius:10,borderWidth:.5,borderColor:"#161616" ,margin:5,padding:5}}>
    { access.students != "none"? <TouchableOpacity style={styles.item}
                                                onPress={() => navigation.navigate("Support")}><View style={styles.menuButton}>
        <Image source={Customer} style={{width:40,height:40,borderRadius:40}}  />
        <Text style={styles.menuButtonLabel}> {i18n.t("Customer Service")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View></TouchableOpacity>:null}
   {access.classes != "none" || access.student_approved != "none" ?   <TouchableOpacity style={styles.item}
                                                onPress={() => navigation.navigate("Teacher")}><View style={styles.menuButton}>
        <Image source={Teacher} style={{width:40,height:40,borderRadius:40}}  />
        <Text style={styles.menuButtonLabel}> {i18n.t("Teacher Dashboard")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View></TouchableOpacity>:null}
    {  access.students_registered_new != "none" || this.state.students_registered != "none" ?<TouchableOpacity style={styles.item}
                                                onPress={() => navigation.navigate("IT")}><View style={styles.menuButton}>
        <Image source={ITIcon} style={{width:40,height:40,borderRadius:40}}  />
        <Text style={styles.menuButtonLabel}> {i18n.t("IT Dashboard")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View></TouchableOpacity>:null}
    </View>:null} 
    <TouchableOpacity onPress={()=>setShowMedia(!showMedia)} >
    <View style={styles.menuButton}>
        <Image source={QuranIcon} style={styles.menuButtonIcon} />
        <Text style={styles.menuButtonLabel}> {i18n.t("Media")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View></TouchableOpacity>

    {showMedia?<View style={{borderRadius:10,borderWidth:.5,borderColor:"#161616" ,margin:5,padding:5}}>
    <TouchableOpacity style={styles.item}
                                                onPress={() => navigation.navigate("Media")}><View style={styles.menuButton}>
        <Image source={SocialMedia} style={{width:30,height:30,borderRadius:30}}  />
        <Text style={styles.menuButtonLabel}> {i18n.t("Social Media")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View></TouchableOpacity>
    <TouchableOpacity style={styles.item}
                                                onPress={() => navigation.navigate("Radio")}><View style={styles.menuButton}>
        <Image source={RadioIcon} style={{width:30,height:30,borderRadius:30}}  />
        <Text style={styles.menuButtonLabel}> {i18n.t("Radio")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View></TouchableOpacity>
    <TouchableOpacity style={styles.item}
                                                onPress={() => navigation.navigate("MediaCards")}><View style={styles.menuButton}>
        <Image source={SocialMedia} style={{width:30,height:30,borderRadius:30}}  />
        <Text style={styles.menuButtonLabel}> {i18n.t("Social Media Card")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View></TouchableOpacity>
    <TouchableOpacity style={styles.item}
                                                onPress={() => navigation.navigate("E-Quran")}><View style={styles.menuButton}>
        <Image source={NewsIcon} style={{width:30,height:30,borderRadius:30}}  />
        <Text style={styles.menuButtonLabel}> {i18n.t("E-Quran")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View></TouchableOpacity>

    <TouchableOpacity style={styles.item}
                                                onPress={() => navigation.navigate("MediaCards")}><View style={styles.menuButton}>
        <Image source={SocialMedia} style={{width:30,height:30,borderRadius:30}}  />
        <Text style={styles.menuButtonLabel}> {i18n.t("Social Media Card")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View></TouchableOpacity>
    {/* <TouchableOpacity style={styles.item}
                                                onPress={() => navigation.navigate("IT")}><View style={styles.menuButton}>
        <Image source={RadioIcon} style={{width:30,height:30,borderRadius:30}}  />
        <Text style={styles.menuButtonLabel}> {i18n.t("Remembrances")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View></TouchableOpacity> */}
    </View>:null}
    <TouchableOpacity onPress={()=>go("Landing")}>  
    <View style={styles.menuButton}>
        <Image source={SettingsIcon} style={{width:30,marginHorizontal:22,height:30}} />
        <Text style={styles.menuButtonLabel}> {i18n.t("Settings")} </Text>
        <Icon  active size={20} name={i18n.language=='en'? 'chevron-right':'chevron-left'} type="MaterialIcons" style={styles.playIcon} />
    </View>
    </TouchableOpacity>
</View>

<View style={{marginTop:95}}>
    <Social style={{width:"100%"}} />
    {user?<TouchableOpacity onPress={()=>logout()}>
<View 
 style={{...styles.menuButton,justifyContent:"center"}}>
        <Image source={LogoutIcon} style={{width:30,marginHorizontal:22,height:30}} />
        <Text style={styles.menuButtonLabel}> {i18n.t("Logout")} </Text>
       
    </View>
    </TouchableOpacity>:null}
</View>
</ScrollView>
</View>
<TouchableHighlight style={{flex:1}} onPress={()=>{
    console.log("ok")
ShowMenu.next(false)
}}>
<View style={{flex:1,width:50,backgroundColor:"#8888"}}>

    <View style={{flex:1}}></View>

</View>
</TouchableHighlight>
<View>

</View>
    </View>
}

const styles = StyleSheet.create({
    menuButtonLabel:{fontSize:16,color:"#31314f", marginHorizontal:5,
    fontWeight:"bold",marginVertical:15},
    menuButton:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center"
    },
    menuButtonIcon:{
        width:45,
        height:45,
        marginHorizontal:5,
    }
,
    playIcon:{
       fontSize:25,
        marginStart:"auto"
    }
})

export default SideMenu