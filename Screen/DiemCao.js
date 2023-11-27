import { ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View , Modal} from 'react-native';
import React, { useEffect, useState } from "react";

// const DiemCao = (props) => {
//     const closeModal = (bool, data) => {
//         props.changeModalVisible(bool);
//         props.setData(data);
//     };
export default function DiemCao(){
    var stt = 0;
    var [dulieu, setDuLieu] = useState([]);
    useEffect(() => {
        fetch('https://653f25b39e8bd3be29e0007b.mockapi.io/huy')
            .then(response => response.json())
            .then(json => {
                setDuLieu(json);           
            });
    }, []);

    function compareScores(a, b) {
        return b.score - a.score;
        }
    const dulieusort = dulieu.sort(compareScores);
    return(
        <View style={styles.container}>
            <ImageBackground
                style={styles.gradient} 
                source={require('../assets/gradient1.jpg')}
              
            >
                <View style={styles.top}>
                    <Text style={{fontSize: '30px', color: '#FFFF00', fontWeight: '600'}}>Bảng xếp hạng</Text>          
                </View>

                <View style={styles.center}>
                    <View style={styles.head}>
                        <Text style={styles.text}>STT</Text> 
                        <Text style={styles.text}>Tên người chơi</Text>   
                        <Text style={styles.text}>Điểm</Text>   
                    </View>
                    {
                        dulieusort.map((item) => {
                            stt = stt + 1
                            return(
                                <View style={styles.head}>
                                    <Text style={styles.text}>{stt}</Text> 
                                    <Text style={styles.text}>{item.name}</Text>   
                                    <Text style={styles.text}>{item.score}</Text>   
                                </View>
                            )
                        })
                    }
                  

                </View>
           
            </ImageBackground>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    top: {
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: '20px'
    },

    gradient:{
        width: '100%',
        height: '100%',
      
    },

    center:{
        flexDirection: 'column',
        width: '100%',
        height: '50%'
    },

    text:{
        fontSize: '16px',
        color: '#FFFF00',
        fontWeight: '600'
    },

    bottom: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginRight: '20px'
    },


    head:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    }

});

