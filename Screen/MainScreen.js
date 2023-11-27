import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View , Modal} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts'
import LuatChoi from './LuatChoi';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

export default function MainScreen({navigation}){
    const [showAlert, setShowAlert] = useState(false);
    const [color, setChangeColor] = useState(false);
    const message = `Bạn sẽ phải trả lời 15 câu hỏi của chương trình.` + 
    ` Bạn sẽ có 30s đầu tiên để trả lời câu hỏi, mỗi câu hỏi trả lời đúng sẽ được cộng thêm 10 giây`+
    ` và gọi điện thoại cho chuyên gia. Chúc bạn thành công!`
    const [isModalVisible, setModalVisible] = useState(false);
    const [chooseData, setChooseData] = useState();
    const changeModalVisible = (bool) => {
        setModalVisible(bool);
    }

    const setData = (data) => {
        setChooseData(data);
    }
    return(
        <View style={styles.container}>
            <ImageBackground
                style={styles.gradient} 
                source={require('../assets/gradient1.jpg')}
                resizeMode='cover'          
            >
                <View style={styles.icon}>
                    <ImageBackground
                        style={styles.iconHead} 
                        source={require('../assets/userMan.png')}
                    >
                    <Text style={styles.user}>Tên user</Text>
                    </ImageBackground>
                  
                    <TouchableOpacity style={styles.bottomButton} onPress={() => alert('hi')}>
                        <ImageBackground
                            style={styles.iconHead} 
                            source={require('../assets/setting.png')}
                        >
                        </ImageBackground>
                    </TouchableOpacity>
                   
                
                </View>
                <View style={styles.top}>
                   
                    <ImageBackground
                        style={styles.logo} 
                        source={require('../assets/altp2023.png')}
                    >
                    </ImageBackground>
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChoiGame')}>Bắt Đầu</TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DiemCao')}>Bảng Xếp Hạng</TouchableOpacity> 
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LuatChoi')}>Luật Chơi</TouchableOpacity>
                </View>

                {/* <AwesomeAlert 
                    show={showAlert} 
                    title='Luật chơi' message={message}
                    titleStyle={{fontSize: '25px'}}
                    messageStyle={{fontSize: '18px'}}
                    showCancelButton = {true}
                    cancelText='Xác nhận'
                    cancelButtonStyle={{backgroundColor: 'blue', width: '100px', alignItems: 'center'}}
                    onCancelPressed={() => {
                        setShowAlert(false);
                    }}
                >
                </AwesomeAlert> */}
    
            </ImageBackground>
           
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },

    logo:{
        width: '150px',
        height: '150px',
        marginTop: '35px'
    },

    gradient:{
        width: '100%',
        height: '100%',
    },


    top:{
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '70%'
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

    icon:{
        flexDirection: 'row',
        marginTop: '10px',
        justifyContent: 'space-between'
    },

    iconHead:{
        width: '40px',
        height: '40px'
    },


    user:{
        width: '100px',
        color:'white',
        fontSize: '16px',
        marginLeft: '50px',
        marginTop: '5px',
        color: '#FFFF00'
    },

    bottomButton: {
        width: '15%',
        height: '100%',
    },
});

