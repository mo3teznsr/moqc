

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
import Select from "./select";
import i18n from "../../i18n";
var FormData = require('form-data');
const Step6 =(props)=>{
    const [showPass,setPass]=useState(false)
    const [showId,setId]=useState(false)
    const [errorMsg,setErrorMsg]=useState("")
    const [error,setError]=useState(false)
    const {t, i18n} = props;
    const [days,setDays]=useState([])
    const [months,setMonths]=useState([])
    const [years,setYears]=useState([])
    const [dob,setDOB]=useState({day:"",month:"",year:""})
    const [showDays,setShowDays]=useState(false)
    const [showMonth,setShowMonth]=useState(false)
    const [showYear,setShowYears]=useState(false)
    const [id,setIdVal]=useState(null)
    useEffect(()=>{
        var list=[]
        for(let i=1;i<=31;i++)
        {
        list.push({name:i.toString(),value:i})
        }
        setDays(list)
        var list1=[]
        for(let i=1;i<=12;i++)
        {
        list1.push({name:i.toString(),value:i})
        }
        setMonths(list1)
         var list2=[]
         for(let i=Number(moment().format("YYYY"));i<=Number(moment().add(50,"years").format("YYYY"));i++)
        {
        list2.push({name:i.toString(),value:i})
        }
        setYears(list2)
    },[])
    return <View style={{flex:1,padding:20}}>
         <Text style={{textAlign:"center",marginVertical:15,fontSize:25,fontWeight:"600"}}>{t('Files upload')}</Text>
        {/* <View style={{...styles.container, ...styles.main}}>
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
               
        </View> */}
         <View style={styles.main}>
        <View style={styles.container}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Image source={require('../../assets/id.png')} style={styles.img}   />
            {<Image source={ props.data.emirates_id? require('../../assets/checkmark.png'):require('../../assets/error.png')} style={styles.img}   />}
            <Text style={styles.txt}>{t('Emirates ID')}</Text>
            </View>
        
           
           
               
           <Pressable onPress={()=>{
            DocumentPicker.pickSingle({ type: [types.allFiles],}).then(data=>{
                console.log(data)
                props.update({emirates_id: {
                    name: data.name,
                    type: data.type,
                    uri: Platform.OS === 'ios' ? 
                         data.uri.replace('file://', '')
                         : data.uri,
                  }})
                  setIdVal(true)
            })
           }}>
           <Image source={require('../../assets/upload.jpg')} style={styles.img}   />
           </Pressable>
        </View>

        


        </View>
        <View style={styles.main}>
        <View style={styles.container}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Image source={require('../../assets/pass.png')} style={styles.img}   />
            {<Image source={ props.data.passport? require('../../assets/checkmark.png'):require('../../assets/error.png')} style={styles.img}   />}
            <Text style={styles.txt}>{t('Passport')}</Text>
            </View>
            
           
                
           <Pressable onPress={()=>{
            DocumentPicker.pickSingle({ type: [types.allFiles],}).then(data=>{
                props.update({passport:{
                    name: data.name,
                    type: data.type,
                    uri: Platform.OS === 'ios' ? 
                         data.uri.replace('file://', '')
                         : data.uri,
                  }})
                  setIdVal(true)
            })
           }}>
           <Image source={require('../../assets/upload.jpg')} style={styles.img}   />
           </Pressable>
        </View>

        
             
         


        </View>
        
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <Text style={styles.txt}>{t('Passport Expiration Date')} </Text>

            {/* <Text style={styles.txt}>{props.data.passport_expiry} </Text> */}
            
            <Image source={require('../../assets/calendar.png')} style={styles.img1}   />
            
             </View>

        <View style={{ marginVertical:5, justifyContent:"space-between",flexDirection:"row"}}>
        <View style={{flex:1}}>
          <Text style={styles.label}>{i18n.t('Day')} </Text>
          <Select
      list={days}
      title={t('Day')}
      show={showDays}
      field="value"
      selected={dob.day}
      open={()=>setShowDays(true)}
      onSelect={(item)=>{
        setShowDays(false)
        setDOB({...dob,day:item})
        props.update({passport_expiry:dob.year+'-'+dob.month+'-'+item})
        props.update({id_expiration:dob.year+'-'+dob.month+'-'+item})
    }}
      render={ 'name'}
      close={()=>setShowDays(false)} />
      
        </View>
        <View style={{flex:1}}>
          <Text style={styles.label}>{i18n.t('Month')} </Text>
          <Select
      list={months}
      title={t('Month')}
      show={showMonth}
      field="value"
      selected={dob.month}
      open={()=>setShowMonth(true)}
      onSelect={(item)=>{
        setShowMonth(false)
        setDOB({...dob,month:item})
        props.update({passport_expiry:dob.year+'-'+item+'-'+dob.day})
        props.update({id_expiration:dob.year+'-'+item+'-'+dob.day})
    }}
      render={ 'name'}
      close={()=>setShowMonth(false)} />
        </View>
        <View style={{flex:1}}>
          <Text style={styles.label}>{i18n.t('Year')} </Text>
          <Select
      list={years}
      title={t('Year')}
      show={showYear}
      field="value"
      selected={dob.year}
      open={()=>setShowYears(true)}
      onSelect={(item)=>{
        setShowYears(false)
        setDOB({...dob,year:item})
        props.update({passport_expiry:item+'-'+dob.month+'-'+dob.day})
        props.update({id_expiration:item+'-'+dob.month+'-'+dob.day})
        
    }}
      render={ 'name'}
      close={()=>setShowYears(false)} />
        </View>
        
      </View>
      {!dob.day||!dob.month||!dob.year? <Text style={styles.error}>{t("Expiration Date is required")}</Text>:null}
 

                             
{error?<View style={{padding:18,borderRadius:15,backgroundColor:"#eb445a",marginBottom:10}}>
    <Text style={{color:"#fff"}}>{props.data.country==230?"Emirates id information required":"Passport information is required"}</Text></View>:<View></View>}
    
    {errorMsg?<View style={{padding:18,borderRadius:15,backgroundColor:"#eb445a",marginBottom:10}}>
    <Text style={{color:"#fff"}}>{errorMsg}</Text></View>:<View></View>}
    

<View style={{flex:1,flexDirection:"row",justifyContent:"center",alignContent:"center",marginTop:0,marginBottom:5}}>
                            <Pressable  onPress={async() => {
  

                            //  console.log(props.data.first_name,props.data.nationality,props.data.dob,props.data.qualification_id,props.data.contact_number,props.data.country,props.data.email,props.data.job_id,props.data.location_id,props.data.course_id)
                              if(id&&dob.day&&dob.month&&dob.year)
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
                              //  console.log(body)

                          
                             axios.post('https://staging.moqc.ae/api/registration',body, {headers: {
                                    "Content-Type": "multipart/form-data",
                                  }}).then(res=>{
                                    console.log(res.data)
                                    if(res.data.result)
                                    {
                                      props.update({active_step:6})
                                    }
                                    else{
                                      setError(true)
                                        setErrorMsg(res.data.message)
                                    }
                                  }).catch(e=>{
                                    console.log('error',e.response.data)
                                  })

                                   
                                    
                                    //    props.update({active_step:6})
                                    
                                   
                                
                               
                                
                              }
                              else {
                                setError(true)
                              }

                              
                            }} style={{width:180,height:50,borderRadius:10,justifyContent:"center",alignContent:"center",backgroundColor:"#31314f"}}>
                                <Text style={{textAlign:"center",color:"#fff",fontSize:20,fontWeight:"500"}}>
                                    {t('Register')} 
                                </Text>
                              
                            </Pressable>

                        </View>

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

export default withTranslation()(Step6)