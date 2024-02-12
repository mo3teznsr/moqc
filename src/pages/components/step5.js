

import React, {Component, useEffect, useState} from "react";
import { Alert, Button, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
  } from 'react-native-document-picker'
  import DateTimePicker from 'react-native-date-picker';
  import moment from 'moment';

import axios from "axios";
import { withTranslation } from "react-i18next";
import i18n from "../../i18n";
var FormData = require('form-data');
const Step5 =(props)=>{
    const [showPass,setPass]=useState(false)
    const [showId,setId]=useState(false)
    const [error,setError]=useState(false)
    const {t, i18n} = props;
    return <View style={{flex:1,padding:20,alignItems:"center"}}>
         <Text style={{textAlign:"center",marginVertical:15,fontSize:25,fontWeight:"600"}}>{t('Voice Recodring')}</Text>
         <Pressable onPress={()=>{
            DocumentPicker.pickSingle({ type: [types.audio],}).then(data=>{
             
                props.update({voice_clip:{
                    name: data.name,
                    type: data.type,
                    uri: Platform.OS === 'ios' ? 
                         data.uri.replace('file://', '')
                         : data.uri,
                  }})
            })
           }}>
         <Image source={require('../../assets/voice_clip.png')} style={{height:180,aspectRatio:1,marginVertical:15}}  />
         </Pressable>
         
      
         
         {!props.data.voice_clip? <Text style={styles.error}>{t("Voice Recording is required")}</Text>:null}

         {error? <View style={{padding:18,borderRadius:15,backgroundColor:"#eb445a",marginBottom:5}}>
        <Text style={{color:"#fff",fontSize:18,fontWeight:"600"}}>{t('Please fill all records')}</Text>
      </View>:<View></View>}

       
                   

    <Pressable onPress={() => {
                            //  console.log(props.data.first_name,props.data.nationality,props.data.dob,props.data.qualification_id,props.data.contact_number,props.data.country,props.data.email,props.data.job_id,props.data.location_id,props.data.course_id)
                              if(props.data.voice_clip)
                              {
                                
                                setError(false)
                                props.update({active_step:5})

                              }
                              else {
                                setError(true)
                              }

                              
                            }} style={{width:180,height:50,justifyContent:"center",alignItems:"center",backgroundColor:"#31314f",borderRadius:10,flexDirection:"row"}}>
                              
                                <Text style={{color:"#fff",fontWeight:"500"}}>
                                    {t('Next')} 
                                </Text>
                              
                            </Pressable>


    </View>
}


const styles=StyleSheet.create({
    txt:{marginTop:10,fontSize:15,fontWeight:'600',marginHorizontal:10,textAlign:i18n.language==="en"?"left": "right"},
    img:{height:40,width:40,marginHorizontal:5},
    img1:{height:30,width:30,marginHorizontal:5},
    error:{marginHorizontal:10,fontSize:14,color:"#e41e3f",marginBottom:10},
    container:{flexDirection:"row",justifyContent:"space-between",padding:5},
    main:{borderWidth:1,borderRadius:10,marginBottom:10}
})

export default withTranslation()(Step5)