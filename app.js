//자세한 설명들은 canvas mdn

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // canvas는 context (px을 가질 수 있음) 를 가짐 

canvas.width = 650;
canvas.height = 650; //width, height를 주지 않으면 그려지지 않는다.

ctx.strokeStyle= `#2c2c2c`; // 색상 지정 
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting(){
    painting = false
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX; //client는 윈도우 화면 내에서의 위치
    const y = event.offsetY; //offset은 canvas 내에서의 위치
    console.log(x,y)
    if(!painting){
        ctx.beginPath(); //path는 line 이라고 생각 (시작점)
        ctx.moveTo(x, y)
    }else{
        ctx.lineTo(x, y);
        ctx.stroke(); //그린다. 
    }
    
}

function onMouseDown(event){
    painting = true;
}


    if(canvas){ // 만약 canvas가 존재한다면
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown,", startPainting); //눌렀을때 실행
    canvas.addEventListener("mouseup",stopPainting) // 누르고 나서 떼면 다시 painting X
    canvas.addEventListener("mouseleave",stopPainting); //마우스가 canvas를 벗어날때
    }