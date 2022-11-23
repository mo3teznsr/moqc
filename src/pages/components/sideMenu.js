import React, {Component, useState} from "react";
import { AsyncStorage, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ShowMenu } from "../../store";
import i18n from '../../i18n';
import HomeIcon from "../../assets/home_a.png"
import DashIcon from "../../assets/dash_a.png"
import ProfileIcon from "../../assets/profile_a.png"
import QiblaIcon from "../../assets/qiblah_a.png"
import MediaIcon from "../../assets/sm_a.png"
import RadioIcon from "../../assets/radio_a.png"
import SettingsIcon from "../../assets/setting.png"
import QuranIcon from "../../assets/sm_a.png"
import PlayIcon from "../../assets/play.png"
import LogoutIcon from "../../assets/logout.png"
import { Icon } from "native-base";
import Social from "../../../src1/pages/components/social";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const SideMenu=(props)=>{
    var [show,setShow]=React.useState(false)
    var [user,setUser]=React.useState(null)
    const navigation = useNavigation();
    const getUser=async()=>{
        let token = await AsyncStorage.getItem("@moqc:token")
        let is_student = await AsyncStorage.getItem("is_student")
        console.log("is_student", is_student)
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


    return <View  style={{position:"absolute",zIndex:show?100:-100,top:0,left:0,width:280,backgroundColor:"#fff",flex:1,height:"100%"}}>
        
   {user?<View style={{width:"100%",height:200,backgroundColor:"#31314f",justifyContent:"center",alignItems:"center"}}>
   <Image source={require('../../assets/pp_f.png') } style={{width:100,height:100}} /> 
   <Text style={{fontWeight:"bold",color:"#fff",marginVertical:15,fontSize:18}}>{user.first_name} </Text>
   </View>:null}
 
<View style={{padding:10}}>
<TouchableOpacity onPress={()=>go("Home")}>  
    <View style={styles.menuButton}>
        <Image source={HomeIcon} style={styles.menuButtonIcon} />
        <Text style={styles.menuButtonLabel}> {i18n.t("Home")} </Text>
        <Icon  active size={20} name='chevron-right' type="MaterialIcons" style={styles.playIcon} />
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>go("Compass")}>  
    <View style={styles.menuButton}>
        <Image source={QiblaIcon} style={styles.menuButtonIcon} />
        <Text style={styles.menuButtonLabel}> {i18n.t("Quibla")} </Text>
        <Icon  active size={20} name='chevron-right' type="MaterialIcons" style={styles.playIcon} />
    </View>
</TouchableOpacity>

    <View style={styles.menuButton}>
        <Image source={ProfileIcon} style={styles.menuButtonIcon} />
        <Text style={styles.menuButtonLabel}> {i18n.t("Profile")} </Text>
        <Icon  active size={20} name='chevron-right' type="MaterialIcons" style={styles.playIcon} />
    </View>

    <View style={styles.menuButton}>
        <Image source={DashIcon} style={styles.menuButtonIcon} />
        <Text style={styles.menuButtonLabel}> {i18n.t("Dashboard")} </Text>
        <Icon  active size={20} name='chevron-right' type="MaterialIcons" style={styles.playIcon} />
    </View>
    <View style={styles.menuButton}>
        <Image source={QuranIcon} style={styles.menuButtonIcon} />
        <Text style={styles.menuButtonLabel}> {i18n.t("Quran Education")} </Text>
        <Icon  active size={20} name='chevron-right' type="MaterialIcons" style={styles.playIcon} />
    </View>
    <View style={styles.menuButton}>
        <Image source={SettingsIcon} style={{width:30,marginHorizontal:22,height:30}} />
        <Text style={styles.menuButtonLabel}> {i18n.t("Settings")} </Text>
        <Icon  active size={20} name='chevron-right' type="MaterialIcons" style={styles.playIcon} />
    </View>
    
</View>

<View style={{marginTop:"auto"}}>
    <Social style={{width:"100%"}} />
    <TouchableOpacity onPress={()=>logout()}>
<View 
 style={{...styles.menuButton,justifyContent:"center"}}>
        <Image source={LogoutIcon} style={{width:30,marginHorizontal:22,height:30}} />
        <Text style={styles.menuButtonLabel}> {i18n.t("Logout")} </Text>
       
    </View>
    </TouchableOpacity>
</View>

    </View>
}

const styles = StyleSheet.create({
    menuButtonLabel:{fontSize:18,color:"#31314f",
    fontWeight:"bold",marginVertical:15},
    menuButton:{
        flexDirection:"row",
        alignItems:"center"
    },
    menuButtonIcon:{
        width:45,
        height:45,
        marginHorizontal:15,
    }
,
    playIcon:{
       fontSize:25,
        marginStart:"auto"
    }
})

export default SideMenu