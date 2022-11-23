import React from "react";
import { Image, Text, View } from "react-native";



const Success=(props)=>{


    return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

        <Image  source={require("../../assets/checkmark.png")} 
         style={{marginTop:20,width:250,height:250,marginBottom:20}} />

         <Text style={{textAlign:"center",fontSize:20,fontWeight:"500"}}>
            Registeration success
         </Text>

    </View>
}


export default Success;