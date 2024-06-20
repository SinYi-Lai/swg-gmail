import React, {useState, useEffect, useRef} from 'react'
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import Lottie from "lottie-react";
import './styles/App.scss'
// lottie 引入
import lottie_hand from "./json/Hand.json";
import lottie_KV from "./json/Gmail_KV.json";
// svg 引入
import { imagesSVG } from './lib/imagesSVG'

function App() {
  const [page, setPage] = useState("home");  // 用來跳轉畫面
  const [question, setQuestion] = useState(0);  // 題目
  const [answer, setAnswer] = useState("none");  // 答案
  const lottieRef = useRef();  // 綁定 transition lottie 來控制開始播放
  const [questionList, setQuestionList] = useState([]); // 隨機題目陣列

  // 禁止右鍵
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  
  // 獲取裝置高度
  useEffect(() => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  const handleStartAnimation = () => {
    lottieRef.current.setSpeed(1.5);
    lottieRef.current.play();
    generateRandomNumbers();
    setPage("start");
  };

  const handleBackToHome = () => {
    postResult();
    setPage("home");
    setQuestion(0);
    setAnswer("none");
    setQuestionList([]);
    lottieRef.current.goToAndStop(0, true);
  }

  const classNameOpacity = question !== 0 ? 'opacity5' : '';
  
  const postResult = () => {
    fetch('https://proj.uppcdn.net/api/swg-game-gmails', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({data:{Question:question,Answer:answer}}),
    })
    .then(response => {
      if (!response.ok) { throw new Error('Error sending data to server'); }
      return response.json();
    })
    .then(data => {
      console.log('Data sent successfully', data);
    })
    .catch(error => {
      console.error('Error sending data to server', error);
    });
  };
  
  // 生成隨機數
  const generateRandomNumbers = () => {
    const newRandomNumbers = [];
    while (newRandomNumbers.length < 4) {
      const randomNumber = Math.floor(Math.random() * 8) + 1;
      if (!newRandomNumbers.includes(randomNumber)) {
        newRandomNumbers.push(randomNumber);
      }
    }
    setQuestionList(newRandomNumbers);
  };

  console.log('questionList ' + questionList)
  console.log('question ' + question)
  console.log('answer ' + answer)

  const QuestionListComponent = questionList.map((num) =>
    <div key={num} className="mail" onClick={() => setQuestion(num)}>
      {imagesSVG[`mail${num}`]()}
    </div>
  );

  const right =
  <div className="result_answer">
    <div className="svg_box">
      <img className="img" src="images/v.png" alt="" />
    </div>
    <div className="text right">
      答對了！
    </div>
  </div>

const wrong =
  <>
    <div className="result_answer">
      <div className="svg_box">
        <img className="img" src="images/x.png" alt="" />
      </div>
      <div className="text wrong">
        答錯了！
      </div>
    </div>
  </> 

  return (
    <div className="App">
      <div className="bg">
        {/* 圖片預載 */}
        <div className="img_preloading">
          <img className="img" src="images/swg.png" alt="" />
          <img className="img" src="images/phone.png" alt="" />
          <img className="img" src="images/phone_white.png" alt="" />
          <img className="img" src="images/answer/01.png" alt="answer-1" />
          <img className="img" src="images/answer/02.png" alt="answer-1" />
          <img className="img" src="images/answer/03.png" alt="answer-1" />
          <img className="img" src="images/answer/04.png" alt="answer-1" />
          <img className="img" src="images/answer/05.png" alt="answer-1" />
          <img className="img" src="images/answer/06.png" alt="answer-1" />
          <img className="img" src="images/answer/07.png" alt="answer-1" />
          <img className="img" src="images/answer/08.png" alt="answer-1" />
          <img className="img" src="images/question/01.png" alt="question-1" />
          <img className="img" src="images/question/02.png" alt="question-1" />
          <img className="img" src="images/question/03.png" alt="question-1" />
          <img className="img" src="images/question/04.png" alt="question-1" />
          <img className="img" src="images/question/05.png" alt="question-1" />
          <img className="img" src="images/question/06.png" alt="question-1" />
          <img className="img" src="images/question/07.png" alt="question-1" />
          <img className="img" src="images/question/08.png" alt="question-1" />
          <img className="img" src="images/v.png" alt="" />
          <img className="img" src="images/x.png" alt="" />
        </div>
        <div className="bg_kv">
          <Lottie
            className="lottie_kv"
              animationData={lottie_KV}
              loop={false}
              autoplay={false}
              lottieRef={lottieRef}
          />
        </div>
        <div className="container">
          {page === 'start' && (
            <Fade in={page === 'start'} timeout={1000}>
              <div className="swg_logo">
                <img className="img" src="images/swg.png" alt="" />
              </div>
            </Fade>
          )}
          <div className="wrap">
            {/* 手機＆信件內容 */}
            {page === 'start' && (
              <Fade in={page === 'start'} timeout={1500}>
                <div className="phone_box">
                  <div className="phone_bg white">
                    <img className="img" src="images/phone_p7_white.png" alt="" />
                  </div>
                  <div className={`phone_bg ${classNameOpacity}`}>
                    <img className="img" src="images/phone_p7.png" alt="" />
                  </div>
                  {/* <div className="phone_bg white">
                    {imagesSVG.phone_white()}
                  </div>
                  <div className={`phone_bg ${classNameOpacity}`}>
                    {imagesSVG.phone()}
                  </div> */}
                  <div className={`phone_mail ${classNameOpacity}`}>
                    {QuestionListComponent}
                  </div>
                </div>
              </Fade>
            )}
            {/* 前言 */}
            {page === 'home' && (
              <Fade in={page === 'home'} timeout={600}>
                <div className="intro">
                <div className="intro_box">
                  <div className="title_1">
                    你能夠察覺<br/>自己正受到網路詐騙攻擊嗎？
                  </div>
                  <div className="content_1">
                    辨別網路詐騙內容其實並不簡單。<br/>「網路詐騙」是假冒成你認識的人<br/>來試圖向你騙取個人資訊的行為。<br/>你能分辨哪些內容是假的嗎？
                  </div>
                  <div className="btn" onClick={handleStartAnimation}>
                    <div className="btn_box"> 
                      <div className="btn_text">開始遊戲</div>
                      <Lottie
                        className="icon_hand"
                        animationData={lottie_hand}
                        loop={true}
                      />
                    </div>
                  </div>
                </div>
                </div>
              </Fade>
            )}
            {/* 選擇一封信的文字 */}
            {page === 'start' && question === 0 && (
              <Fade in={page === 'start'} timeout={1000}>
                <div className="chooseMail_box">
                  <div className="q0">
                    <div className="title_1">
                      選擇一封信<br/>並判斷內容是否安全
                    </div>
                  </div>
                </div>
              </Fade>
            )}
            {/* 問題 ＆ 解答區 */}
            {question !== 0 && (
              <div className="select">
                <div className="select_box">
                  <div className="select_content">
                    {/* 問題 - 1 */}
                    {question === 1 && answer === "none" && (
                      <Fade in={question === 1} timeout={600}>
                        <div className="question_intro_1">
                          <div className="title_2">
                              讓我們從這封<br/>Google 文件電子郵件開始吧。
                            </div>
                            <div className="content_2">
                              請留意附件連結網址是否為安全網域，<br/>並探索寄件人電子郵件地址。
                            </div>
                            <div className="answer_box">
                              <div className="btn" onClick={()=> setAnswer("詐騙")}>
                                <div className="btn_box">
                                  <div className="btn_text">網路詐騙內容</div>
                                </div>
                              </div>
                              <div className="btn" onClick={()=> setAnswer("正常")}>
                              <div className="btn_box">
                                <div className="btn_text">正常內容</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 1 && answer === "詐騙" && (
                      <Fade in={question === 1} timeout={600}>
                        <div className="answer_1_right">
                          {right}
                          <div className="title_2 right">
                            這是網路詐騙電子郵件。
                          </div>
                          {imagesSVG.atext1()}
                          <div className="content_2">
                            你一定發現了外觀相似的網址。<br/>請留意你從電子郵件中開啟的超連結和附件，<br/>這些內容可能會將你導向詐欺性網站，<br/>且這類網站會要求你提供機密資訊。
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 1 && answer === "正常" && (
                      <Fade in={question === 1} timeout={600}>
                        <div className="answer_1_right">
                          {wrong}
                          <div className="title_2 wrong">
                            這其實是網路詐騙電子郵件。
                          </div>
                          {imagesSVG.atext1()}
                          <div className="content_2">
                            網址看起來沒問題，<br/>但其實只是外觀相似。<br/>請留意你從電子郵件中開啟的超連結和附件，<br/>這些內容可能會將你導向詐欺性網站，<br/>且這類網站會要求你提供機密資訊。
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}

                    {/* 問題 - 2 */}
                    {question === 2 && answer === "none" && (
                      <Fade in={question === 2} timeout={600}>
                        <div className="question_intro_1">
                            <div className="title_2">
                              你收到了一則傳真！
                            </div>
                            <div className="content_2">
                              我們知道你現在很興奮，但請慢慢來。
                            </div>
                            <div className="answer_box">
                              <div className="btn" onClick={()=> setAnswer("詐騙")}>
                                <div className="btn_box">
                                  <div className="btn_text">網路詐騙內容</div>
                                </div>
                              </div>
                              <div className="btn" onClick={()=> setAnswer("正常")}>
                              <div className="btn_box">
                                <div className="btn_text">正常內容</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 2 && answer === "詐騙" && (
                      <Fade in={question === 2} timeout={600}>
                        <div className="answer_1_right">
                          {right}
                          <div className="title_2 right">
                            這是網路詐騙電子郵件。
                          </div>
                          <div className="content_2">
                            好眼力！如你所見，
                            <br/>寄件者的電子郵件網域「efacks」拼錯了，
                            <br/>且連結實際上是指向「mailru382.co」。
                            <br/>網路詐騙攻擊往往會企圖使用外觀相似的網址欺騙你。
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 2 && answer === "正常" && (
                      <Fade in={question === 2} timeout={600}>
                        <div className="answer_1_right">
                          {wrong}
                          <div className="title_2 wrong">
                            這其實是網路詐騙電子郵件。
                          </div>
                          <div className="content_2">
                            寄件者的電子郵件網域「efacks」拼錯了，
                            <br/>且連結實際上是指向「mailru382.co」。
                            <br/>網路詐騙攻擊往往會企圖使用外觀相似的網址欺騙你。
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}

                    {/* 問題 - 3 */}
                    {question === 3 && answer === "none" && (
                      <Fade in={question === 3} timeout={600}>
                        <div className="question_intro_1">
                          <div className="title_2">
                              讓我們來回到過去！
                            </div>
                            <div className="content_2">
                              還記得你同學 TK 嗎？
                            </div>
                            <div className="answer_box">
                              <div className="btn" onClick={()=> setAnswer("詐騙")}>
                                <div className="btn_box">
                                  <div className="btn_text">網路詐騙內容</div>
                                </div>
                              </div>
                              <div className="btn" onClick={()=> setAnswer("正常")}>
                              <div className="btn_box">
                                <div className="btn_text">正常內容</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 3 && answer === "詐騙" && (
                      <Fade in={question === 3} timeout={600}>
                        <div className="answer_1_right">
                          {right}
                          <div className="title_2 right">
                            這是網路詐騙電子郵件。
                          </div>
                          {imagesSVG.atext1()}
                          <div className="content_2">
                            看來你發現了外觀相似的網址。
                            <br/>真正的網域是「sytez.net」，
                            <br/>但其刻意偽裝成 Google 雲端硬碟的網址。
                            <br/>如果你不確定寄件者的身分，
                            <br/>請務必格外小心。
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 3 && answer === "正常" && (
                      <Fade in={question === 3} timeout={600}>
                        <div className="answer_1_right">
                          {wrong}
                          <div className="title_2 wrong">
                            這其實是網路詐騙電子郵件。
                          </div>
                          {imagesSVG.atext1()}
                          <div className="content_2">
                            你似乎沒發現外觀相似的詐騙網址。
                            <br/>真正的網域是「sytez.net」，
                            <br/>但其刻意偽裝成 Google 雲端硬碟的網址。
                            <br/>如果你不確定寄件者的身分，請務必格外小心。
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}

                    {/* 問題 - 4 */}
                    {question === 4 && answer === "none" && (
                      <Fade in={question === 4} timeout={600}>
                        <div className="question_intro_1">
                          <div className="title_2">
                              糟糕，你的儲存空間用完了！
                            </div>
                            <div className="content_2">
                              我想知道升級費用是多少？
                            </div>
                            <div className="answer_box">
                              <div className="btn" onClick={()=> setAnswer("詐騙")}>
                                <div className="btn_box">
                                  <div className="btn_text">網路詐騙內容</div>
                                </div>
                              </div>
                              <div className="btn" onClick={()=> setAnswer("正常")}>
                              <div className="btn_box">
                                <div className="btn_text">正常內容</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 4 && answer === "詐騙" && (
                      <Fade in={question === 4} timeout={600}>
                        <div className="answer_1_right">
                          {wrong}
                          <div className="title_2 wrong">
                            不是什麼都是騙人的！
                          </div>
                          <div className="content_2">
                            這是正常的 Dropbox 通訊內容。
                            <br/>寄件者「dropboxmail.com」
                            <br/>雖然不尋常，但並沒有問題，
                            <br/>網址則是「dropbox.com」的安全連結（https）。
                            <br/>如果不確定網域是否正常，
                            <br/>可以使用搜尋引擎尋找更多資訊。
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 4 && answer === "正常" && (
                      <Fade in={question === 4} timeout={600}>
                        <div className="answer_1_right">
                          {right}
                          <div className="title_2 right">
                            這是正常的 Dropbox 通訊內容。
                          </div>
                          <div className="content_2">
                            <br/>寄件者「dropboxmail.com」
                            <br/>雖然不尋常但並沒有問題，
                            <br/>網址則是「dropbox.com」的安全連結（https）。
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}

                    {/* 問題 - 5 */}
                    {question === 5 && answer === "none" && (
                      <Fade in={question === 5} timeout={600}>
                        <div className="question_intro_1">
                          <div className="title_2">
                              你收到學校寄來的報告，
                              <br/>但這份報告是先前沒看過的種類。
                            </div>
                            <div className="content_2">
                              通常學校電子郵件的寄件者是
                              <br/>「sharon.mosley@westmountschool.org」。
                            </div>
                            <div className="answer_box">
                              <div className="btn" onClick={()=> setAnswer("詐騙")}>
                                <div className="btn_box">
                                  <div className="btn_text">網路詐騙內容</div>
                                </div>
                              </div>
                              <div className="btn" onClick={()=> setAnswer("正常")}>
                              <div className="btn_box">
                                <div className="btn_text">正常內容</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 5 && answer === "詐騙" && (
                      <Fade in={question === 5} timeout={600}>
                        <div className="answer_1_right">
                          {right}
                          <div className="title_2 right">
                            這是網路詐騙電子郵件。
                          </div>
                          <div className="content_2">
                            這是很棘手的網路詐騙攻擊！
                            <br/>PDF 檔案可能包含惡意軟體或病毒，
                            <br/>因此請一律確認你信任寄件者，
                            <br/>並使用你的瀏覽器或 Google 雲端硬碟等線上服務，
                            <br/>在安全無虞的情況下開啟這類檔案。
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 5 && answer === "正常" && (
                      <Fade in={question === 5} timeout={600}>
                        <div className="answer_1_right">
                          {wrong}
                          <div className="title_2 wrong">
                            這其實是網路詐騙電子郵件。
                          </div>
                          <div className="content_2">
                            這是很棘手的網路詐騙攻擊！
                            <br/>PDF 檔案可能包含惡意軟體或病毒，
                            <br/>因此請一律確認你信任寄件者，
                            <br/>並使用你的瀏覽器或 Google 雲端硬碟等線上服務，
                            <br/>在安全無虞的情況下開啟這類檔案。
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}

                    {/* 問題 - 6 */}
                    {question === 6 && answer === "none" && (
                      <Fade in={question === 6} timeout={600}>
                        <div className="question_intro_1">
                          <div className="title_2">
                              有人試圖存取你的帳戶。
                            </div>
                            <div className="content_2">
                              變更密碼前，請留意相關資訊。
                            </div>
                            <div className="answer_box">
                              <div className="btn" onClick={()=> setAnswer("詐騙")}>
                                <div className="btn_box">
                                  <div className="btn_text">網路詐騙內容</div>
                                </div>
                              </div>
                              <div className="btn" onClick={()=> setAnswer("正常")}>
                              <div className="btn_box">
                                <div className="btn_text">正常內容</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 6 && answer === "詐騙" && (
                      <Fade in={question === 6} timeout={600}>
                        <div className="answer_1_right">
                          {right}
                          <div className="title_2 right">
                            這封電子郵件使用了外觀相似的網址。
                          </div>
                          <div className="content_2">
                            這與曾用來成功侵入政治人物
                            <br/>電子郵件帳戶的攻擊幾乎一樣。
                            <br/>請一律仔細檢查網址！
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 6 && answer === "正常" && (
                      <Fade in={question === 6} timeout={600}>
                        <div className="answer_1_right">
                          {wrong}
                          <div className="title_2 wrong">
                            這其實是網路詐騙電子郵件。
                          </div>
                          <div className="content_2">
                            這個網路詐騙攻擊使用了外觀相似的
                            <br/>網址來假冒成 Gmail。事實上，
                            <br/>這與曾用來成功侵入政治人物
                            <br/>電子郵件帳戶的攻擊幾乎一樣。
                            <br/>請一律仔細檢查網址！
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}

                    {/* 問題 - 7 */}
                    {question === 7 && answer === "none" && (
                      <Fade in={question === 7} timeout={600}>
                        <div className="question_intro_1">
                          <div className="title_2">
                              你的帳戶似乎又受到了攻擊。
                            </div>
                            <div className="content_2">
                              但真的是這樣嗎？
                            </div>
                            <div className="answer_box">
                              <div className="btn" onClick={()=> setAnswer("詐騙")}>
                                <div className="btn_box">
                                  <div className="btn_text">網路詐騙內容</div>
                                </div>
                              </div>
                              <div className="btn" onClick={()=> setAnswer("正常")}>
                              <div className="btn_box">
                                <div className="btn_text">正常內容</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 7 && answer === "詐騙" && (
                      <Fade in={question === 7} timeout={600}>
                        <div className="answer_1_right">
                          {right}
                          <div className="title_2 right">
                            這封郵件是根據真實警告寫成，
                            <br/>但連結的是假的登入頁面。
                          </div>
                          <div className="content_2">
                            駭客企圖使用 Google 隱藏真正的 tinyurl 連結。
                            <br/>這類電子郵件過去曾用來鎖定智庫和政治人物。
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 7 && answer === "正常" && (
                      <Fade in={question === 7} timeout={600}>
                        <div className="answer_1_right">
                          {wrong}
                          <div className="title_2 wrong">
                            這封郵件是根據真實警告寫成，
                            <br/>但連結的是假的登入頁面。
                          </div>
                          <div className="content_2">
                            駭客企圖使用 Google 隱藏真正的 tinyurl 連結。
                            <br/>這類電子郵件過去曾用來鎖定智庫和政治人物。
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}

                    {/* 問題 - 8 */}
                    {question === 8 && answer === "none" && (
                      <Fade in={question === 8} timeout={600}>
                        <div className="question_intro_1">
                          <div className="title_2">
                              你註冊了旅遊規劃服務。
                            </div>
                            <div className="content_2">
                              你想讓電子郵件接受掃描，但請留意相關資訊。
                            </div>
                            <div className="answer_box">
                              <div className="btn" onClick={()=> setAnswer("詐騙")}>
                                <div className="btn_box">
                                  <div className="btn_text">網路詐騙內容</div>
                                </div>
                              </div>
                              <div className="btn" onClick={()=> setAnswer("正常")}>
                              <div className="btn_box">
                                <div className="btn_text">正常內容</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 8 && answer === "詐騙" && (
                      <Fade in={question === 8} timeout={600}>
                        <div className="answer_1_right">
                          {wrong}
                          <div className="title_2 wrong">
                            這其實是正常的內容。
                          </div>
                          <div className="content_2">
                            不過，請務必謹慎處理這類帳戶存取要求，
                            <br/>並確保你信任開發人員。
                            <br/>請查看顯示的網域，
                            <br/>並務必點選網域來瞭解詳情。
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                    {question === 8 && answer === "正常" && (
                      <Fade in={question === 8} timeout={600}>
                        <div className="answer_1_right">
                          {right}
                          <div className="title_2 right">
                            這是正常的內容。
                          </div>
                          <div className="content_2">
                            不過，請務必謹慎處理這類帳戶存取要求，
                            <br/>並確保你信任開發人員。
                            <br/>請查看顯示的網域，
                            <br/>並務必點選網域來瞭解詳情。
                          </div>
                          <div className="back_box">
                            <div className="btn" onClick={handleBackToHome}>
                              <div className="btn_box"> 
                                <div className="btn_text">回到首頁</div>
                                <Lottie
                                  className="icon_hand"
                                  animationData={lottie_hand}
                                  loop={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    )}
                  </div>

                  {/* 問題 & 答案 信件圖片 */}
                  <div className="qa_img">
                    {question !== 0 && (
                      <div className="mail_content">
                        <div className="question_img">
                          {/* 問題 - 1 */}
                          {question === 1 && answer === "none" && (
                            <Zoom timeout={600} in={question === 1}>
                              <img className="img" src="images/question/01.png" alt="question-1" />
                            </Zoom>
                          )}
                          {question === 1 && answer !== "none" && (
                            <Fade timeout={600} in={answer !== "none"}>
                              <img className="img" src="images/answer/01.png" alt="answer-1" />
                            </Fade>
                          )}
                          {/* 問題 - 2 */}
                          {question === 2 && answer === "none" && (
                            <Zoom timeout={600} in={question === 2}>
                              <img className="img" src="images/question/02.png" alt="question-2" />
                            </Zoom>
                          )}
                          {question === 2 && answer !== "none" && (
                            <Fade timeout={600} in={answer !== "none"}>
                              <img className="img" src="images/answer/02.png" alt="answer-2" />
                            </Fade>
                          )}
                          {/* 問題 - 3 */}
                          {question === 3 && answer === "none" && (
                            <Zoom timeout={600} in={question === 3}>
                              <img className="img" src="images/question/03.png" alt="question-3" />
                            </Zoom>
                          )}
                          {question === 3 && answer !== "none" && (
                            <Fade timeout={600} in={answer !== "none"}>
                              <img className="img" src="images/answer/03.png" alt="answer-3" />
                            </Fade>
                          )}
                          {/* 問題 - 4 */}
                          {question === 4 && answer === "none" && (
                            <Zoom timeout={600} in={question === 4}>
                              <img className="img" src="images/question/04.png" alt="question-4" />
                            </Zoom>
                          )}
                          {question === 4 && answer !== "none" && (
                            <Fade timeout={600} in={answer !== "none"}>
                              <img className="img" src="images/answer/04.png" alt="answer-4" />
                            </Fade>
                          )}
                          {/* 問題 - 5 */}
                          {question === 5 && answer === "none" && (
                            <Zoom timeout={600} in={question === 5}>
                              <img className="img" src="images/question/05.png" alt="question-5" />
                            </Zoom>
                          )}
                          {question === 5 && answer !== "none" && (
                            <Fade timeout={600} in={answer !== "none"}>
                              <img className="img" src="images/answer/05.png" alt="answer-5" />
                            </Fade>
                          )}
                          {/* 問題 - 6 */}
                          {question === 6 && answer === "none" && (
                            <Zoom timeout={600} in={question === 6}>
                              <img className="img" src="images/question/06.png" alt="question-6" />
                            </Zoom>
                          )}
                          {question === 6 && answer !== "none" && (
                            <Fade timeout={600} in={answer !== "none"}>
                              <img className="img" src="images/answer/06.png" alt="answer-6" />
                            </Fade>
                          )}
                          {/* 問題 - 7 */}
                          {question === 7 && answer === "none" && (
                            <Zoom timeout={600} in={question === 7}>
                              <img className="img" src="images/question/07.png" alt="question-7" />
                            </Zoom>
                          )}
                          {question === 7 && answer !== "none" && (
                            <Fade timeout={600} in={answer !== "none"}>
                              <img className="img" src="images/answer/07.png" alt="answer-7" />
                            </Fade>
                          )}
                          {/* 問題 - 8 */}
                          {question === 8 && answer === "none" && (
                            <Zoom timeout={600} in={question === 8}>
                              <img className="img" src="images/question/08.png" alt="question-8" />
                            </Zoom>
                          )}
                          {question === 8 && answer !== "none" && (
                            <Fade timeout={600} in={answer !== "none"}>
                              <img className="img" src="images/answer/08.png" alt="answer-8" />
                            </Fade>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
