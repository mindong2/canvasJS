//자세한 설명들은 canvas mdn

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // canvas는 context (px을 가질 수 있음) 를 가짐 
const colors = document.getElementsByClassName(`jsColor`);
const range = document.getElementById(`jsRange`);
const mode = document.getElementById(`jsMode`);
const saveBtn = document.getElementById(`jsSave`);


const INITIAL_COLOR = "#2c2c2c";

canvas.width = 650;
canvas.height = 650; //width, height를 주지 않으면 그려지지 않는다.

ctx.fillStyle = `#fff`; // default
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.strokeStyle= INITIAL_COLOR; // 색상 지정 
ctx.lineWidth = 2.5;
ctx.fillStyle =INITIAL_COLOR;



let painting = false;
let fill = false;

function stopPainting(){
    painting = false
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX; //client는 윈도우 화면 내에서의 위치
    const y = event.offsetY; //offset은 canvas 내에서의 위치
    
    
    if(!painting){
        ctx.beginPath(); //path는 line 이라고 생각 (시작점)
        ctx.moveTo(x, y)
    }else{
        ctx.lineTo(x, y);
        ctx.stroke(); //그린다. 
    }
    
}

function changeColor(event){
    const color= event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

function changeRange(event){
    const rangeWidth = event.target.value;
    ctx.lineWidth = rangeWidth;
}

function fillColor(){
    if(fill === false){
        fill = true;
        mode.innerText = `PAINT`
    }else{
        fill = false;
        mode.innerText = `FILL`
    }
}

function handleCanvasClick(){
    if(fill){
        ctx.fillRect(0,0,canvas.width,canvas.height);

    }    
}

function saveFile(){
    const link = document.createElement(`a`);
    link.download = `New Image File_Paint`
    const imageSave = canvas.toDataURL(`image/png`);
    link.href = imageSave;
    link.click()

}

function handleCM(event){
    event.preventDefault(); // 기억
}

    if(canvas){ // 만약 canvas가 존재한다면
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //눌렀을때 실행
    canvas.addEventListener("mouseup",stopPainting) // 누르고 나서 떼면 다시 painting X
    canvas.addEventListener("mouseleave",stopPainting); //마우스가 canvas를 벗어날때
    canvas.addEventListener(`click`, handleCanvasClick);
    canvas.addEventListener(`contextmenu`, handleCM) // 오른쪽클릭
}

    Array.from(colors).forEach(color => color.addEventListener(`click`,changeColor))
     /*color를 console.log()를 찍어보면 HTMLCollection이 나옴
    array로 만들어 줘야함. Array.from()는 오브젝트로부터 array를 만들어줌.*/

    if(range){range.addEventListener(`input`, changeRange);
}
    if(mode) {
        mode.addEventListener(`click`, fillColor);
    }

    if(saveBtn){
        saveBtn.addEventListener(`click`,saveFile);
    }