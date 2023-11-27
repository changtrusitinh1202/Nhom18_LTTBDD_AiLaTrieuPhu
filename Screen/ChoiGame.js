import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable,Image, StyleSheet, Text, TouchableOpacity, View , Modal, Button} from 'react-native';
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import { useState, useEffect } from 'react';
import { BarChart } from 'react-native-chart-kit';
export default function ChoiGame({navigation}){
    const [showModal, setShowModal] = useState(false); 
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0); // State để tính điểm
    const [selectedBottomButton1, setSelectedBottomButton1] = useState(null);
    const [selectedBottomButton2, setSelectedBottomButton2] = useState(null);
    const [selectedBottomButton3, setSelectedBottomButton3] = useState(null);
    const [selectedBottomButton4, setSelectedBottomButton4] = useState(null);
    const [key, setKey] = useState(0); // State để render lại CountdownCircleTimer
    const [buttonEnabled1, setButtonEnabled1] = useState(true);
    const [buttonEnabled2, setButtonEnabled2] = useState(true);
    const [buttonEnabled3, setButtonEnabled3] = useState(true);
    const [buttonEnabled4, setButtonEnabled4] = useState(true);

    const handleBottomButton1= (buttonName) => {
        // Chặn các hành động khi nút đã được kích hoạt
        if (!buttonEnabled1) {
            return;         
        }
        setButtonEnabled1(false);
    };

    const handleBottomButton2 = (buttonName) => {
        // Chặn các hành động khi nút đã được kích hoạt
        if (!buttonEnabled2) {
            return;         
        }
        setButtonEnabled2(false);
    };

    const handleBottomButton3 = (buttonName) => {
        // Chặn các hành động khi nút đã được kích hoạt
        if (!buttonEnabled3) {
            return;         
        }
        setButtonEnabled3(false);
    };

    const handleBottomButton4 = (buttonName) => {
        // Chặn các hành động khi nút đã được kích hoạt
        if (!buttonEnabled3) {
            return;         
        }
        setButtonEnabled3(false);
    };

    //Xử lý quyền trợ giúp 50/50
    const getRandomElement = (arr) => {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    };
    const handleBottomButtonPress1 = (selectedBottomButton1) => {
        setSelectedBottomButton1(selectedBottomButton1);
        const currentQuestionData = questions[currentQuestion];
    
        // Lấy tất cả các đáp án
        const answerOptions = ['answer1', 'answer2', 'answer3', 'answer4'];
    
        // Lấy đáp án đúng
        const correctAnswer = currentQuestionData.correctAnswer;
    
        // Lọc ra các đáp án sai 
        const incorrectAnswers = [];
        if (currentQuestionData.answer1 !== correctAnswer) {
            incorrectAnswers.push('answer1');
        }
        if (currentQuestionData.answer2 !== correctAnswer) {
            incorrectAnswers.push('answer2');
        }
        if (currentQuestionData.answer3 !== correctAnswer) {
            incorrectAnswers.push('answer3');
        }
        if (currentQuestionData.answer4 !== correctAnswer) {
            incorrectAnswers.push('answer4');
        }
        // Lựa chọn ngẫu nhiên 1 đáp án sai để ẩn đi
        const incorrectAnswerToHide1 = getRandomElement(incorrectAnswers);
        const incorrectAnswerToHide2 = getRandomElement(incorrectAnswers);
    
        // Tạo một object mới đại diện cho trạng thái câu hỏi được cập nhật
        const updatedQuestionData = {
            ...currentQuestionData,
            [incorrectAnswerToHide1]: '',  // Ẩn đáp án sai
            [incorrectAnswerToHide2]: '',  // Ẩn đáp án sai
        };
    
        // Cập nhật state questions
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestion] = updatedQuestionData;
        setQuestions(updatedQuestions);
        handleBottomButton1(selectedBottomButton1);
    };
    //Xử lý quyền trợ giúp hỏi chuyên gia 
    const dapanchuyengia=getRandomElement(["A","B","C","D"]);

    const handleBottomButtonPress2 = (selectedBottomButton2) => {
        setSelectedBottomButton2(selectedBottomButton2);
        setShowModal2(true);
        setTimeout(() => {
            setShowModal2(false);
            }, 3000);
            handleBottomButton2(selectedBottomButton2);
    };
    // Xử lý quyền trợ giúp hỏi ý kiến khán giả
    const A = Math.floor(Math.random() * 99) + 1;
    const B = Math.floor(Math.random() * 99) + 1;
    const C = Math.floor(Math.random() * 99) + 1;
    const D = Math.floor(Math.random() * 99) + 1;
    const data = {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
          {
            data: [A, B, C, D], 
          },
        ],
      };
    const handleBottomButtonPress3 = (selectedBottomButton3) => {
        setSelectedBottomButton3(selectedBottomButton3);
        setShowModal3(true);
        setTimeout(() => {
            setShowModal3(false);
            }, 3000);
            handleBottomButton1(selectedBottomButton3);
    };
    const handleBottomButtonPress4 = (selectedBottomButton4) => {
        setSelectedBottomButton4(selectedBottomButton4);
        handleBottomButton4(selectedBottomButton4);
    };
    const handleTimerComplete = () => {
      setShowModal(true); // Hiển thị modal khi remainingTime = 0
      addPost('huyhuy', score);
    };

    function addPost(userName, score){
        fetch('https://653f25b39e8bd3be29e0007b.mockapi.io/huy',{
            method: 'POST',
            body: JSON.stringify({
                user_name: userName,
                score: score
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
    
        })
            .then(response => response.json())
            .then(json => console.log(json));
    }

   

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
            setSelectedAnswer(selectedAnswer);
            setTimeout(() => {
                setIsCorrect(true);
                setScore(score + 100);
                setTimeout(() => {
                    setIsCorrect(false);
                    setSelectedAnswer(null);
                    setCurrentQuestion(currentQuestion + 1); // Chuyển sang câu hỏi tiếp theo
                    setKey(prevKey => prevKey + 1);
                  }, 1000);
                }, 1000);
            }else{
                setSelectedAnswer(selectedAnswer);
                setTimeout(() => {
                    setIsCorrect(true);
                    handleTimerComplete();
                    }, 1000);
            }
      };
    return(
        <View style={styles.container} animationType={'slide'}>
            <ImageBackground
                style={styles.gradient} 
                source={require('../assets/gradient1.jpg')}
                resizeMode='cover'            
            >
                <View style={styles.top}>
                    <ImageBackground
                        style={styles.logo} 
                        source={require('../assets/ALTP_LOGO_2021.png')}
                        resizeMode='cover'
                    >
                    </ImageBackground>
                    <View style={styles.right}>
                        <Text style={styles.score}>Điểm: {score}</Text>
                        <CountdownCircleTimer
                            isPlaying
                            duration={30}
                            colors={['blue']}
                            size={70}
                            strokeWidth={5}
                            key={key} //reset lại duration của CountdownCircleTimer
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
                                        <TouchableOpacity style={[styles.traloi, selectedAnswer === questions[currentQuestion].answer1 && styles.selectedAnswer, isCorrect && questions[currentQuestion].answer1 === questions[currentQuestion].correctAnswer && styles.correctAnswer,]}  onPress={() => handleAnswer(questions[currentQuestion].answer1)}> 
                                            <Text style={styles.textAns}>A. {questions[currentQuestion].answer1}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={[styles.traloi, selectedAnswer === questions[currentQuestion].answer2 && styles.selectedAnswer, isCorrect && questions[currentQuestion].answer2 === questions[currentQuestion].correctAnswer && styles.correctAnswer,]} onPress={() => handleAnswer(questions[currentQuestion].answer2)} > 
                                            <Text style={styles.textAns}>B. {questions[currentQuestion].answer2}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={[styles.traloi, selectedAnswer === questions[currentQuestion].answer3 && styles.selectedAnswer, isCorrect && questions[currentQuestion].answer3 === questions[currentQuestion].correctAnswer && styles.correctAnswer,]}  onPress={() => handleAnswer(questions[currentQuestion].answer3)}> 
                                            <Text style={styles.textAns}>C. {questions[currentQuestion].answer3}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={[styles.traloi, selectedAnswer === questions[currentQuestion].answer4 && styles.selectedAnswer, isCorrect && questions[currentQuestion].answer4 === questions[currentQuestion].correctAnswer && styles.correctAnswer,]}  onPress={() => handleAnswer(questions[currentQuestion].answer4)}> 
                                            <Text style={styles.textAns}>D. {questions[currentQuestion].answer4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                                               
                            ) : (
                                <Text>Loading</Text>
                            )
                    }
                       
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.bottomButton}
                    onPress={() => handleBottomButtonPress1('button1')} disabled={!buttonEnabled1}> 
                        <Image style={styles.bottomIcon} source={selectedBottomButton1 === 'button1'? require('../assets/5050used.png'): require('../assets/5050.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButton}
                    onPress={() => handleBottomButtonPress2('button2')} disabled={!buttonEnabled2}> 
                        <Image style={styles.bottomIcon} source={selectedBottomButton2 === 'button2'? require('../assets/A3Aused.png'): require('../assets/A3A.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButton}
                    onPress={() => handleBottomButtonPress3('button3')} disabled={!buttonEnabled3}> 
                        <Image style={styles.bottomIcon} source={selectedBottomButton3 === 'button3'? require('../assets/ATAused.png'): require('../assets/ATA.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButton}
                    onPress={() => handleBottomButtonPress4('button4')} disabled={!buttonEnabled4}> 
                        <Image style={styles.bottomIcon} source={selectedBottomButton4 === 'button4'? require('../assets/PAFused.png'): require('../assets/PAF.png')}/>
                    </TouchableOpacity>
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
                <Modal
                    visible={showModal2}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowModal2(false)}
                >
                    <View style={styles.modal}>
                        <ImageBackground
                            style={styles.gradient2} 
                            source={require('../assets/gradient1.jpg')}
                        >
                            <View style={styles.top2}>
                                <Text style={styles.text2}>Chuyên gia khuyên là đáp án :{dapanchuyengia}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                </Modal>
                <Modal
                    visible={showModal3}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowModal3(false)}
                >
                    <View style={styles.modal3}>
                        <ImageBackground
                            style={styles.gradient2} 
                            source={require('../assets/gradient1.jpg')}
                        >
                            <View style={styles.Modaltop2}>
                                <BarChart
                                style={styles.chart}
                                data={data}
                                width={300} 
                                height={220} 
                                yAxisLabel="%" 
                                chartConfig={{
                                    backgroundColor: 'white',
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                         borderRadius: 16,
                                    },
                                }}
                                verticalLabelRotation={0} 
                                >
                                </BarChart>
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
        marginTop: '50px'
    },

    top:{
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    center: {
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    bottom:{
        height: '15%',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft:'15px',
    },

    bottomButton: {
        width: '15%',
        height: '100%',
    },

    bottomIcon: {
        width: '45px',
        height: '30px',
    },

    question:{
        width: '80%',
        height: '80px',
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
        height: '40px',
        borderWidth: 1.5,
        paddingLeft: '5px',
        justifyContent: 'center',
        marginBottom: '20px',
        borderColor: '#0066FF',
        borderRadius: '10px',
    },

    selectedAnswer: {
        backgroundColor: 'green', 
    },

    correctAnswer: {
        backgroundColor: 'yellow', 
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
    modal3:{
        width: '90%',
        height:'60%',
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
    Modaltop2:{
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
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
});