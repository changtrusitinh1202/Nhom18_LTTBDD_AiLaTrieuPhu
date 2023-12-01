import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, SafeAreaView, ImageBackground} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Login({navigation}) {
    const [showPassword, setShowPassword] = useState(false);
    const [passWord, setPassWord] = useState('');
    const [useName, setUseName] = useState('');
    const [txt, setTxt] = useState('');

    const handleLogin = async () => {
        try {
            if (!useName || !passWord) {
                // Hiển thị thông báo yêu cầu nhập đầy đủ thông tin
                setTxt('Vui lòng nhập tên đăng nhập và mật khẩu');
                return;
            }


            const response = await axios.get('https://653f25b39e8bd3be29e0007b.mockapi.io/user');
            const users = response.data;
      
            // Chuyển user và password về dạng chuỗi không in hoa
            const lowerCaseUsername = useName.toLowerCase();
            const lowerCasePassword = passWord.toLowerCase();
      
            // Tìm kiếm người chơi có tồn tại hay không
            const foundUser = users.find(user =>
                user.user_name.toLowerCase() === lowerCaseUsername &&
                user.password.toLowerCase() === lowerCasePassword
            );
        
            if (foundUser) {
                console.log('Đăng nhập thành công');
                navigation.navigate('MainScreen',{ user_name: foundUser.user_name });
            } else {
                // Hiển thị thông báo lỗi
                setTxt('Tên đăng nhập hoặc mật khẩu không đúng');
            }
            } catch (error) {
            console.error('Error fetching data from API:', error);
          
            }
        };
    return (
        <ImageBackground style={{width: '100%',height: '100%',}} source={require('../assets/gradient1.jpg')} zIndex={0}>
            <SafeAreaView style={styles.container}>
            <View style={{width:'100%',height:'50%', alignItems:'center',justifyContent:'center'}}>
                <Image style={{width:'300px',height:'300px'}}source={require('../assets/ALTP_LOGO_2021.png')}/>
            </View>
            <View style={{width:'80%',height:'25%', alignItems:'center',justifyContent:'center'}}>
                <TextInput 
                    value={useName} 
                    onChangeText={(text) => setUseName(text)}
                    style={styles.TextInput_1}
                    placeholder='Nhập tên tài khoản' placeholderTextColor={'gray'}/>
                <View style={styles.TextInput_2}>
                    <TextInput 
                        value={passWord}
                        onChangeText={(text) => setPassWord(text)}
                        style={{ width: '70%', height: '100%', fontSize: 17, color: 'white' }}
                        autoCapitalize='none'
                        secureTextEntry={showPassword ? false : true}
                        placeholder='Nhập mât khẩu' placeholderTextColor={'gray'}/>
                    <TouchableOpacity
                    onPress={() =>{
                        setShowPassword(!showPassword)
                    }}
                    >
                    <Image style={{width:'25px',height:'25px'}}source={require('../assets/anps.png')}/>
                </TouchableOpacity>
                </View>
            </View>
            <View style={{width:'85%',height:'25%', alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={{fontSize: 20,color:'white',textAlign: "center",}}>Đăng Nhập</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 12,color:'red',margin:2,textAlign: "center",}}>{txt}</Text>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('SignUp')}}>
                    <Text style={{fontSize: 20,color:'white',textAlign: "center",}}>Đăng Ký</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextInput_1:{
        fontSize:17,
        borderWidth: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7,
        marginLeft:5,
        width: '100%',
        height: '30%',
        color: 'white'
    },
    TextInput_2:{
        fontSize:17,
        borderWidth: 2,
        borderColor:'ưhite',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7,
        marginTop:5,
        width: '100%',
        height: '30%',
        flexDirection:'row',
        justifyContent:'space-between',
        color: 'white'
    },
    button:{
        color: 'white',
        fontSize: '22px',
        height: '50px',
        backgroundColor: '#333399',
        justifyContent: 'center',
        alignItems: 'center',
        width: '300px',
        marginBottom: '15px',
        borderWidth: 1,
        borderRadius: '10px'
    },
});