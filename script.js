const Total_Time=5*60;
let totalTime = Total_Time; 
let timerDisplay = document.getElementById("timer");
let timer;
let timerStarted=false;

let questions=[
    {
        question:"1. Which language is used for web development?",
        options:["Python","JavaScript","C++","Java"],
        answer:"JavaScript"
    },
    {
        question:"2. What does the term HTML stands for?",
        options:["Hyper Trainer Marking Language", "Hyper Text Markup Language","High Text Machine Language","Hyper Tabular Markup Language"],
        answer:"Hyper Text Markup Language"
    },
    {
        question: "3. What does CSS stand for?",
        options: ["Cascading Style Sheets","Computer Style Sheets","Creative Style System","Control Style Syntax"],
        answer: "Cascading Style Sheets"
    },
    {
       question: "4. Which tag is used to insert a line break in HTML?",
       options: ["<break>","<lb>","<br>","<line>"],
       answer: "<br>"
    },
    {
       question: "5. In Python, which keyword is used to define a function?",
       options: ["function","define","def","fun"],
       answer: "def"
    },
    {
       question: "6. Which symbol is used for comments in JavaScript?",
       options: ["#","//","<!-- -->","/* */"],
       answer: "//"
    },
    {
       question: "7. Which HTML attribute is used to define inline styles?",
       options: ["class","font","style","css"],
       answer: "style"
    },
    {
       question: "8. In JavaScript, which method is used to select an element by ID?",
       options: ["getElementById()","querySelectorAll()","getElementsByClass()","getId()"],
       answer: "getElementById()"
    },
    {
       question: "9. Which HTTP method is used to submit form data?",
       options: ["GET","POST","PUT","DELETE"],
       answer: "POST"
    },
    {
       question: "10. Which CSS property is used to change the text color of an element?",
       options: ["font-color","color","text-style","background-color"],
       answer: "color"
    },
]
let startBtn=document.getElementById("startBtn")
let mainStart=document.getElementById("main-start")
let instruct=document.getElementById("instruct")
let question=document.getElementById("questions")
let questionText=document.getElementById("question")
let option=document.getElementsByClassName("option")
let result=document.getElementById("result")
let marks=document.getElementById("marks")
let review=document.getElementById("review")

let score=0
let currentQuestion=0
let page="intro"

instruct.style.display="none"
question.style.display="none"
result.style.display="none"
timerDisplay.style.display="none"

function resetTimer() {
    clearInterval(timer);
    totalTime = Total_Time;
    timerStarted = false;
    timerDisplay.textContent = "Time Left: 05:00";
    timerDisplay.style.display = "none";
}

startBtn.onclick=function(){
    if(currentQuestion==questions.length){
        clearInterval(timer)
        result.style.display="block"
        question.style.display="none"
        marks.textContent="You have Scored:"+ score+"/"+2*questions.length
        if(score<15){
            startBtn.textContent="Retry"   
            review.textContent="Keep Practicing!👍You can improve."
            review.style.color="red"
        }
        else{
            startBtn.style.display="none"  
            review.textContent="Excellent!🎉 You did really well." 
            review.style.color="green"
        }
        page="intro"
        score=0
        currentQuestion=0
        resetTimer()
        return 
    }
    if(page=="intro"){
    instruct.style.display="block"
    mainStart.style.display="none"
    result.style.display="none"
    startBtn.textContent="Start Quiz"
    page="instructions"
    }
    else if(page=="instructions"){
        instruct.style.display="none"
        question.style.display="block"
        result.style.display="none"
        startBtn.textContent="Next"
        questionText.textContent=questions[currentQuestion].question
        for(let i=0;i<option.length;i++){
        option[i].textContent=questions[currentQuestion].options[i]
        option[i].style.backgroundColor=""
        option[i].disabled=false
    }
    if (!timerStarted) {
    timerDisplay.style.display = "block";
    timerStarted = true;
    timer = setInterval(function(){
        let minutes = Math.floor(totalTime/60);
        let seconds = totalTime % 60;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        timerDisplay.textContent = `Time Left: ${minutes}:${seconds}`;
        
        if (totalTime > 3*60) {
            timerDisplay.style.color = "green";
        } else if (totalTime > 1*60) {
            timerDisplay.style.color = "orange";
        } else {
            timerDisplay.style.color = "red";
        }
        
        if (totalTime <= 0) {
            clearInterval(timer);
            alert("Time's up!");
            result.style.display = "block";
            question.style.display = "none";
            marks.textContent = "You have Scored: " + score + "/" + (2 * questions.length);
            if(score<=15){
                startBtn.textContent = "Retry";
                review.textContent="Keep Practicing!👍You can improve."
                review.style.color="red"
            }
            else{
                startBtn.style.display ="none";
                review.textContent="Excellent!🎉 You did really well."
                review.style.color="green"
            }
            page = "intro";
            currentQuestion = 0;
            score = 0;
            resetTimer();
        }
        totalTime--;
    }, 1000);
}
        currentQuestion++
    }
}

for(let i of option){
    i.onclick=function(){
        for(let btn of option){
            btn.disabled=true
        }
        if(i.textContent==questions[currentQuestion-1].answer){
            i.style.backgroundColor="green"
            score+=2
        }
        else{
            i.style.backgroundColor="red"
            for(let j of option){
                if(j.textContent==questions[currentQuestion-1].answer){
                    j.style.backgroundColor="green"
                }
            }
            score-=1
        }
    }
}