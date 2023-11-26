import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View , Modal} from 'react-native';

export default function hi(){
    return(
        <View style={styles.container}>
            <ImageBackground
                style={styles.gradient2} 
                source={require('../assets/gradient1.jpg')}
      
            >
                <View style={styles.top2}>
                    <Text style={styles.text2}>Trò chơi kết thúc</Text>
                    <Text style={styles.text2}>Điểm của bạn là: </Text>
                    <TouchableOpacity style={styles.opa2}>
                        <Text>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft : '40px',
        flex: 1
    },

    gradient2:{
        width: '90%',
        height: '50%',
      
    },

    top2:{
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'center',
        width: '90%',
        marginTop: '20px'
   
    },

    text2:{
        color: 'white',
        fontSize: '20px'
    },

    opa2:{
        color: 'white',
        width: '100px',
        height: '40px',
        backgroundColor: '#0099FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        marginTop: '20px'
    }
});