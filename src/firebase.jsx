import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,getAuth, signInWithEmailAndPassword, } from "firebase/auth";
import { signOut } from "firebase/auth/cordova";
import { doc, getFirestore, setDoc } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBSX-yEhjw4MPSohUOSEkEusHGhv-31fjQ",
    authDomain: "student-5a3ae.firebaseapp.com",
    projectId: "student-5a3ae",
    storageBucket: "student-5a3ae.firebasestorage.app",
    messagingSenderId: "359596911000",
    appId: "1:359596911000:web:838edea2acb9f5db17a3ed",
    measurementId: "G-DB1GRT2DHJ"
  };
console.log("env",firebaseConfig)
const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const db=getFirestore(app)

const signUp=async(formData)=>{
    console.log("enter",formData.email)
    try {
        console.log(formData)
        const result=await createUserWithEmailAndPassword(auth,formData.email,formData.password )
        const user=auth.currentUser
        if(user){
            console.log("user",user)
            await setDoc(doc(db,"Users",user.uid),{
                email:user.email,
                name:formData.name,
                no:formData.phoneNumber,

            })
        }
        return result
    } catch (error) {
        console.log(error)
    }
}
const login=async(formData)=>{
    try {
     const result=  await signInWithEmailAndPassword(auth,formData.email,formData.password)
     return result
    } catch (error) {
        console.log(error)
        alert(error)
    }
}
const logout=async()=>{
    try {
        signOut(auth)
    } catch (error) {
        console.log(error)
    }
}
export {auth,db,signUp,login,logout}