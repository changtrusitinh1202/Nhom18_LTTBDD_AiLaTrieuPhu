import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View , Modal} from 'react-native';
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import { useState, useEffect } from 'react';
export default function ChoiGame({navigation}){
    const [showModal, setShowModal] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [key, setKey] = useState(30); // State để reset CountdownCircleTimer
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [time, setTime] = useState(0);
    const handleTimerComplete = () => {
      setShowModal(true); // Hiển thị modal khi remainingTime = 0
    };

  

    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/questions')
          .then((response) => response.json())
          .then((data) => {
            const newArray = data.map((item) => ({
              id: item.question_id,
              topic: item.topic,
              answer1: item.answer1,
              answer2: item.answer2,
              answer3: item.answer3,
              answer4: item.answer4,
              correctAnswer: item.correct_answer,
            }));
            setQuestions(newArray);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
      const handleAnswer = (selectedAnswer) => {
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
          setScore(score + 1);
          
    
          if (currentQuestion === questions.length - 1) {
            // Nếu là câu hỏi cuối cùng, có thể hiển thị điểm số hoặc thực hiện hành động khác
            handleTimerComplete();
          } else {
            setCurrentQuestion(currentQuestion + 1);
       
            setTimeRemaining((prev) => prev + 29);
          }
        } else {
          // Hiển thị thông báo nếu chọn đáp án sai
          handleTimerComplete();
        }
      };
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
                    <View style={styles.right}>
                        <Text style={styles.score}>Điểm: {score}</Text>
                        <CountdownCircleTimer
                            isPlaying
                            duration={timeRemaining}
                            colors={['blue']}
                            size={70}
                            strokeWidth={5}
                            onComplete={handleTimerComplete}
                        
                        >
                            {({remainingTime}) => <Text style={styles.time} >{remainingTime}</Text>}
                        </CountdownCircleTimer>
                    </View>
                  
                </View>

                <View style={styles.center}>
                    {
                        questions.length > 0 ?
                            (
                                <View style={styles.play}>
                                    <View style={styles.question}>
                                        <Text style={styles.textQues}>{questions[currentQuestion].topic}</Text>
                                    </View>

                                    <View style={styles.answer}>
                                        <TouchableOpacity style={styles.traloi}  onPress={() => handleAnswer(questions[currentQuestion].answer1)}> 
                                            <Text style={styles.textAns}>A. {questions[currentQuestion].answer1}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.traloi} onPress={() => handleAnswer(questions[currentQuestion].answer2)} > 
                                            <Text style={styles.textAns}>B. {questions[currentQuestion].answer2}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.traloi}  onPress={() => handleAnswer(questions[currentQuestion].answer3)}> 
                                            <Text style={styles.textAns}>C. {questions[currentQuestion].answer3}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.traloi}  onPress={() => handleAnswer(questions[currentQuestion].answer4)}> 
                                            <Text style={styles.textAns}>D. {questions[currentQuestion].answer4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                                               
                            ) : (
                                <Text>Loading</Text>
                            )
                    }
                       
                </View>
                                
            
                <Modal
                    visible={showModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowModal(false)}
                >
                    <View style={styles.modal}>
                        <ImageBackground
                            style={styles.gradient2} 
                            source={require('../assets/gradient1.jpg')}
                        >
                            <View style={styles.top2}>
                                <Text style={styles.text2}>Trò chơi kết thúc</Text>
                                <Text style={styles.text2}>Điểm của bạn là: {score}</Text>
                                <TouchableOpacity style={styles.opa2} onPress={() => navigation.navigate('MainScreen')}>
                                    <Text>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                </Modal>
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

    logo:{
        width: '150px',
        height: '150px',
        marginTop: '35px'
    },

    top:{
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    center: {
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    question:{
        width: '80%',
        height: '120px',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        borderColor: '#33FFFF'
    },

    textQues:{
        width: '80%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#DDDDDD',
        fontSize: '15px',
        paddingBottom: '20px',
        fontWeight: '500'
    },

    answer:{
        flexDirection: 'column',
        marginTop: '20px',
        width: '80%',
    },

    traloi:{
        width: '100%',
        height: '60px',
        borderWidth: 1.5,
        paddingLeft: '5px',
        justifyContent: 'center',
        marginBottom: '20px',
        borderColor: '#0066FF',
        borderRadius: '10px',
    },

    textAns:{
        color: '#DDDDDD',
        fontWeight: '500'
    },

    score:{
        fontSize: '15px',
        color: 'white',
 
    },

    right: {
        position: 'absolute',
        right: '10px',
        top: '10px'
    },

    time:{
        fontSize: '20px',
        color: 'white',
    },

    modal:{
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
    },

    play:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});