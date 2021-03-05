import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image, Modal, KeyboardAvoidingView, ScrollView } from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class WelcomeScreen extends React.Component{

constructor (){
     super()
     this.state = {
      emailId : '',
      password: '',
      isModalVisible: false,
      firstName: '',
      lastName: '',
      address:'',
      contact:'',
      confirmPassword:''
     }
}

showModal=()=>{
  return(
   <Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}>
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
            <Text style={styles.modalTitle}>
                Registration Form
            </Text>

             <TextInput 
             style={styles.formTextInput}
             placeholder={"First Name"}
             maxLength={15}
             onChangeText={(text)=>{   
               this.setState({
                 firstName:text
               })
             }}/>

            <TextInput 
             style={styles.formTextInput}
             placeholder={"Last Name"}
             maxLength={15}
             onChangeText={(text)=>{
               this.setState({
                 lastName:text
               })
             }}/>

            <TextInput 
             style={styles.formTextInput}
             placeholder={"Contact"}
             maxLength={10}
             onChangeText={(text)=>{
               this.setState({
                 contact:text
               })
             }}/>
             
             <TextInput 
             style={styles.formTextInput}
             placeholder={"Address"}
             multiline={true}
             onChangeText={(text)=>{
               this.setState({
                 address:text
               })
             }}/>

            <TextInput 
             style={styles.formTextInput}
             placeholder={"Email ID"}
             keyboardType={'email-address'}
             onChangeText={(text)=>{
               this.setState({
                 emailId:text
               })
             }}/>

            <TextInput 
             style={styles.formTextInput}
             placeholder={"Password"}
             secureTextEntry={true}
             onChangeText={(text)=>{
               this.setState({
                 password:text
               })
             }}/>

            <TextInput 
             style={styles.formTextInput}
             placeholder={"Confirm Password"}
             secureTextEntry={true}
             onChangeText={(text)=>{
               this.setState({
                 confirmPassword:text
               })
             }}/>
             
             <View style={styles.modalBackButton}>
               <TouchableOpacity 
                onPress={()=>this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)}>
                  <Text style={styles.registerButtonText}>
                    Register with us
                  </Text>
               </TouchableOpacity>
             </View>

             <View style={styles.modalBackButton}>
               <TouchableOpacity 
                onPress={()=>this.setState({'isModalVisible':false})}>
                  <Text style={styles.registerButtonText}>
                    Cancel
                  </Text>
               </TouchableOpacity>
             </View>
             
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
   </Modal>
  )
}

userSignUp = (emailId, password,confirmPassword)=> {
  if(password !== confirmPassword){
    return Alert.alert("password doesn't match\nCheck your password.")
  }
else{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then((response)=>{
       return Alert.alert("User Added Successfully.") 
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message
        return Alert.alert(errorMessage)
    })
  }
}

userLogin = (emailId, password)=> {

    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
       return Alert.alert("Login Success.") 
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message
        return Alert.alert(errorMessage)
    })
  }


    render(){
       return ( 
           <View style={styles.container}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                {this.showModal()}
             </View>
               <View>
                  <Text style={styles.title}>
                     Barter App
                  </Text>
               </View>

        <Image source={require('../assets/welcomeIcon.png')} style={{resizeMode: "contain",height:260,width:265,marginLeft:60}} alt="Welcome icon"/>
                 
          <TextInput style={styles.loginBox} 
          placeholder="abc@example.com"
          keyboardType='email-address'
          onChangeText={(text)=>{
              this.setState({
                  emailId: text
              })
          }}
          />

          <TextInput style={styles.passwordBox} 
          placeholder="Enter Password"
          secureTextEntry = {true}
          onChangeText={(text)=>{
              this.setState({
                  password: text
              })
          }}
          />
          
        <TouchableOpacity style={styles.button1} onPress={()=>{
                    this.userLogin(this.state.emailId,this.state.password)
                }}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button2, {marginBottom:35, marginTop:35}]} onPress={()=>{
              this.setState({"isModalVisible": true})
          }}>
            <Text style={styles.buttonText}>
                Sign Up
            </Text>
          </TouchableOpacity>

                  <View>
               </View>
           </View>
       )
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      paddingTop:50,
      backgroundColor:'#43c7a1'
    },
    profileContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    title :{
      fontSize:50,
      marginLeft:69,
      marginTop:30,
      paddingTop:5,
      color : '#FEFA9C'
    },
    loginBox:{
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor : '#99e566',
      fontSize: 20,
      marginLeft:45,
      marginBottom:30,
      marginTop:20
    },
    KeyboardAvoidingView:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    passwordBox:{
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor : '#99e566',
        fontSize: 20,
        marginLeft:45,
        marginTop: 3,
      },

 modalTitle :{
  justifyContent:'center',
  alignSelf:'center',
  fontSize:25,
  color:'#ff5722',
  margin:50,
  marginLeft:45,
  marginBottom:22
},
modalContainer:{
  flex:1,
  borderRadius:20,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:"#ffff",
  marginRight:30,
  marginLeft : 30,
  marginTop:80,
  marginBottom:80,
},
formTextInput:{
  width:"75%",
  height:35,
  alignSelf:'center',
  borderColor:'#ffab91',
  borderRadius:10,
  borderWidth:1,
  marginTop:20,
  padding:10,
},
registerButton:{
  width:200,
  height:40,
  alignItems:'center',
  justifyContent:'center',
  borderWidth:1,
  borderRadius:10,
  marginTop:30
},
registerButtonText:{
  color:'#ff5722',
  fontSize:15,
  fontWeight:'bold',
  marginTop:18,
  marginBottom:-1
},
cancelButton:{
  width:200,
  height:30,
  justifyContent:'center',
  alignItems:'center',
},

    button1:{
      width:300,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:25,
      backgroundColor:"#EF5F36",
      marginLeft:45,
      shadowColor: "#000",
      marginBottom:-10, marginTop:40,
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
    },
    button2:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#EF5F36",
        marginLeft:45,
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
      },
    buttonText:{
      color:'#ffff',
      fontWeight:'200',
      fontSize:20,
    },
    buttonContainer:{
      flex:1,
      alignItems:'center'
    }
  })