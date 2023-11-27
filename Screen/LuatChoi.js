import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';


export default function LuatChoi({navigation, route}){
    return(
        <View style={styles.container}>
             <ImageBackground
                style={styles.gradient} 
                source={require('../assets/gradient1.jpg')}           
            >
                <View style={styles.top}>
                    <Text style={styles.text}>Luật chơi</Text>
                </View>
               
                <View style={styles.center}>
                    <Text style={styles.textCenter}>Bạn sẽ phải trả lời 15 câu hỏi của chương trình. {"\n"} {"\n"}
                    Mỗi câu hỏi bạn sẽ có 30s để trả lời, nếu hết thời gian mà 
                    bạn vẫn chưa chọn được đáp án thì trò chơi sẽ kết thúc.  {"\n"} {"\n"}Bạn có 4 sự trợ giúp là: 50/50
                    ,hỏi ý kiến của chuyên gia, hỏi ý kiến của khán giả và gọi điện thoại trợ giúp {"\n"} {"\n"}
                    Chúc bạn thành công!
                    </Text>
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChoiGame',{
                        nameMain: route.params.nameMain
                    })}>Bắt đầu</TouchableOpacity>
                </View>
                
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{    
        flex: 1
    },

    gradient:{
        width: '100%',
        height: '100%',
      
    },

    top:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px'
    },

    text:{
        fontSize: '30px',
        color: '#FFFF00',
        fontWeight: '600',
       
    },

    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '70%'
    },

    center: {
        paddingLeft: '10px',
        paddingRight: '10px',
        marginTop: '20px'
    },

    textCenter:{
        color: '#FFFF00',
        fontSize: '20px',
        fontWeight: '400',
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