import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View , Modal} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts'
import LuatChoi from './LuatChoi';
import { useState } from 'react';
import { DiemCao } from './DiemCao';
export default function MainScreen({navigation}){
    const [showAlert, setShowAlert] = useState(false);
    const [color, setChangeColor] = useState(false);
    const message = `Bạn sẽ phải trả lời 15 câu hỏi của chương trình.` + 
    ` Có 3 mốc rất quan trọng mà bạn cần vượt qua là 5,10,15. Bạn có 4 sự trợ giúp: 50/50, đổi câu hỏi, hỏi ý kiến của khán giả`+
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
                <View style={styles.top}>
                    <ImageBackground
                        style={styles.logo} 
                        source={require('../assets/altp2023.png')}
                        resizeMode='cover'
                    >
                    </ImageBackground>
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChoiGame')}>Bắt đầu</TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => changeModalVisible(true)}>Điểm cao</TouchableOpacity> 
                    <TouchableOpacity style={styles.button} onPress={() => setShowAlert(!showAlert)}>Luật chơi</TouchableOpacity>
                </View>

                <AwesomeAlert 
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
                </AwesomeAlert>
    
            </ImageBackground>
           
           <Modal
                transparent={true}
                animationType='fade'
                visible={isModalVisible} 
                onRequestClose={() => changeModalVisible(false)}
           >
                <DiemCao
                    changeModalVisible={changeModalVisible}
                    setData={setData}
                
                ></DiemCao>
           </Modal>
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
    }
});

