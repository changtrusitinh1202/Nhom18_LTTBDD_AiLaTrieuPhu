import { ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View , Modal} from 'react-native';
import React, { useEffect, useState } from "react";

const DiemCao = (props) => {
    const closeModal = (bool, data) => {
        props.changeModalVisible(bool);
        props.setData(data);
    };

    var [dulieu, setDuLieu] = useState([]);
    useEffect(() => {
        fetch('https://653f25b39e8bd3be29e0007b.mockapi.io/huy')
            .then(response => response.json())
            .then(json => {
                setDuLieu(json);           
            });
    }, [dulieu]);
    return(
        <View style={styles.container}>
            <ImageBackground
                style={styles.gradient} 
                source={require('../assets/gradient1.jpg')}
              
            >
                <View style={styles.top}>
                    <Text style={{fontSize: '22px', color: '#FFFF00', fontWeight: '600'}}>Điểm cao</Text>          
                </View>

                <View style={styles.center}>
                    <View style={styles.head}>
                        <Text style={styles.text}>STT</Text> 
                        <Text style={styles.text}>Tên người chơi</Text>   
                        <Text style={styles.text}>Tiền thưởng</Text>   
                    </View>
                    {
                        dulieu.map((item) => {
                            return(
                                <View style={styles.head}>
                                    <Text style={styles.text}>{item.id}</Text> 
                                    <Text style={styles.text}>{item.name}</Text>   
                                    <Text style={styles.text}>{item.score}</Text>   
                                </View>
                            )
                        })
                    }
                  

                </View>

             
                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.opa} onPress={() => closeModal(false, 'Xác nhận')}>
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

    top: {
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
    },

    gradient:{
        width: '90%',
        height: '70%',
      
    },

    center:{
        flexDirection: 'column',
        width: '90%',
        height: '50%'
    },

    text:{
        fontSize: '14px',
        color: '#FFFF00',
        fontWeight: '600'
    },

    bottom: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginRight: '20px'
    },

    opa:{
        color: 'white',
        width: '100px',
        height: '40px',
        backgroundColor: '#0099FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px'
    },

    head:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

});

export {DiemCao}