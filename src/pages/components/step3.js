

import React, {Component, useEffect, useState} from "react";
import { Alert, Button, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
  } from 'react-native-document-picker'
  import DateTimePicker from '@react-native-community/datetimepicker';
  import moment from 'moment';
import axios from "axios";
import { withTranslation } from "react-i18next";
var FormData = require('form-data');
const Step3 =(props)=>{
    const [showPass,setPass]=useState(false)
    const [showId,setId]=useState(false)
    const [error,setError]=useState(false)
    const {t, i18n} = props;
    return <View style={{flex:1,padding:20}}>
         <Text style={{textAlign:"center",marginVertical:15,fontSize:25,fontWeight:"600"}}>{t('Files upload')}</Text>
        <View style={{...styles.container, ...styles.main}}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Image source={require('../../assets/mic.png')} style={styles.img}   />
            {<Image source={props.data.voice_clip?  require('../../assets/checkmark.png'):require('../../assets/error.png')} style={styles.img}   />}
            <Text style={styles.txt}>{t('Voice Recodring')}</Text>
            </View>

           
                
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
           <Image source={require('../../assets/upload.jpg')} style={styles.img}   />
           </Pressable>
               
        </View>
        {props.data.country==230? <View style={styles.main}>
        <View style={styles.container}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Image source={require('../../assets/id.png')} style={styles.img}   />
            {<Image source={ props.data.emirates_id? require('../../assets/checkmark.png'):require('../../assets/error.png')} style={styles.img}   />}
            <Text style={styles.txt}>{t('Emirates ID')}</Text>
            </View>
        
           
           
               
           <Pressable onPress={()=>{
            DocumentPicker.pickSingle({ type: [types.images],}).then(data=>{
                console.log(data)
                props.update({emirates_id: {
                    name: data.name,
                    type: data.type,
                    uri: Platform.OS === 'ios' ? 
                         data.uri.replace('file://', '')
                         : data.uri,
                  }})
            })
           }}>
           <Image source={require('../../assets/upload.jpg')} style={styles.img}   />
           </Pressable>
        </View>

        

        <View style={styles.container}>
            <Text style={styles.txt}>{t('Expiration Date')} </Text>

            <Text style={styles.txt}>{props.data.id_expiration} </Text>
            <Pressable onPress={()=>setId(true)}>
            <Image source={require('../../assets/calendar.png')} style={styles.img1}   />
            </Pressable>
             </View>

        </View>:
        <View style={styles.main}>
        <View style={styles.container}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Image source={require('../../assets/pass.png')} style={styles.img}   />
            {<Image source={ props.data.passport? require('../../assets/checkmark.png'):require('../../assets/error.png')} style={styles.img}   />}
            <Text style={styles.txt}>{t('Passport')}</Text>
            </View>
            
           
                
           <Pressable onPress={()=>{
            DocumentPicker.pickSingle({ type: [types.images],}).then(data=>{
                props.update({passport:{
                    name: data.name,
                    type: data.type,
                    uri: Platform.OS === 'ios' ? 
                         data.uri.replace('file://', '')
                         : data.uri,
                  }})
            })
           }}>
           <Image source={require('../../assets/upload.jpg')} style={styles.img}   />
           </Pressable>
        </View>

        <View style={styles.container}>
            <Text style={styles.txt}>{t('Expiration Date')} </Text>

            <Text style={styles.txt}>{props.data.passport_expiry} </Text>
            <Pressable onPress={()=>setPass(true)}>
            <Image source={require('../../assets/calendar.png')} style={styles.img1}   />
            </Pressable>
             </View>


        </View>}

       

        {showPass? <DateTimePicker
                                 
                                 value={props.data.passport_expiry?new Date(props.data.passport_expiry):new Date()}
                                  mode='date'
                                  display="calendar"
                                  onChange={(val,date)=>{
                                    setPass( false)
                                    props.update({passport_expiry:moment( date).format("YYYY-MM-DD")})
                                   
                                      
                                    }}
                              />:<Text></Text>}

{showId? <DateTimePicker
                                 
                                 value={props.data.id_expiration?new Date(props.data.id_expiration):new Date()}
                                  mode='date'
                                  display="calendar"
                                  onChange={(val,date)=>{
                                    setId( false)
                                    props.update({id_expiration:moment( date).format("YYYY-MM-DD")})
                                   
                                      
                                    }}
                              />:<Text></Text>}
{error?<View style={{padding:18,borderRadius:15,backgroundColor:"#eb445a"}}>
    <Text style={{color:"#fff"}}>{props.data.country==230?"Emirates id information required":"passport information is required"}</Text></View>:<View></View>}

<View style={{flex:1,flexDirection:"row",justifyContent:"center",alignContent:"center",marginTop:0,marginBottom:5}}>
                            <Pressable  onPress={async() => {
                                console.log('ok')
                                if(props.data.country==230)
                                {
                                    
                                    if(!props.data.emirates_id||!props.data.id_expiration)
                                    {
                                        setError(true);
                                    }
                                }
                                else {
                                    if(!props.data.passport||!props.data.passport_expiry)
                                    {
                                        setError(true);
                                    }
                                }

                            //  console.log(props.data.first_name,props.data.nationality,props.data.dob,props.data.qualification_id,props.data.contact_number,props.data.country,props.data.email,props.data.job_id,props.data.location_id,props.data.course_id)
                              if(props.data.first_name&&props.data.nationality&&props.data.dob&&props.data.qualification_id&&props.data.contact_number&&props.data.country&&props.data.email&&props.data.job_id&&props.data.location_id&&props.data.course_id)
                              {
                               
                                setError(false)

                                var body=new FormData()
                                for(let x in props.data){
                                    if(!['countries','jobs',"qalifications","locations","courses","qualifications",  ].includes(x))
                                    {
                                            body.append(x,props.data[x])
                                        
                                    }
                                   
                                    
                                }
                               // body.append('email',props.data.email)
                               console.log(body)

                          
                            var res=  axios.post('https://staging.moqc.ae/api/registration',body, {headers: {
                                    "Content-Type": "multipart/form-data",
                                  }})

                                    console.log(res)
                                    
                                        props.update({active_step:3})
                                    
                                   
                                
                               
                                
                              }
                              else {
                                setError(true)
                              }

                              
                            }} style={{width:120,height:50,borderRadius:30,justifyContent:"center",alignContent:"center",backgroundColor:"#31314f"}}>
                                <Text style={{textAlign:"center",color:"#fff",fontSize:20,fontWeight:"500"}}>
                                    {t('Register')} 
                                </Text>
                              
                            </Pressable>

                        </View>

    </View>
}


const styles=StyleSheet.create({
    txt:{marginTop:10,fontSize:15,fontWeight:'600',marginHorizontal:10},
    img:{height:40,width:40,marginHorizontal:5},
    img1:{height:30,width:30,marginHorizontal:5},
    container:{flexDirection:"row",justifyContent:"space-between",padding:5},
    main:{borderWidth:1,borderRadius:10,marginBottom:10}
})

export default withTranslation()(Step3)