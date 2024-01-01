// randomly choose from the frames in the 'frames' directory
//sx, sy image coordinates
//Lx, Ly canvas coordinates
function drawpuzzle(){ 
  checkSolved();

  calctotalTime();
  
  const myCanvas = document.getElementById("myCanvas");
  const ctx = myCanvas.getContext("2d");
  ctx.lineWidth = 4;	
  ctx.clearRect(0,0,canvaswidth,canvasheight);

  if (puzzleSolved){
    const cH  = canvasheight;
    const iWc = timg.naturalWidth*ifscale;
    const iHc = timg.naturalHeight*ifscale;
    const fWc = fimg.naturalWidth*fWscale;		
    const fHc = fimg.naturalHeight*fHscale;
	
    ctx.drawImage(timg, fsize*fWscale, fsize*fHscale, iWc, iHc);
    ctx.drawImage(fimg, 0, 0, fWc, fHc);
	
    const ztable = document.getElementById("myTable");
    ztable.insertRow();
    let newCell = ztable.rows[ztable.rows.length - 1].insertCell();
    newCell.textContent = numx;
    newCell = ztable.rows[ztable.rows.length - 1].insertCell();
    newCell.textContent = numClicks;
    //newCell.textContent = totalTime;
    newCell = ztable.rows[ztable.rows.length - 1].insertCell();
    newCell.textContent = puzzlesize;
    //newCell.textContent = numClicks;
    newCell = ztable.rows[ztable.rows.length - 1].insertCell();
    newCell.textContent = totalTime;
    //newCell.textContent = puzzlesize;
    newCell = ztable.rows[ztable.rows.length - 1].insertCell();
	score = 120*puzzlesize - 5*numClicks - totalTime;
    newCell.textContent = score;
  }
  else{
    puzzlesize = numx * numy;
    //calculate parameters for draw image command
    //using scale constants
    //iscale fHscale fWscale
    const pieceWo = imgwidth / numx;
    const pieceHo = imgheight / numy;
    const pieceWc = pieceWo*iscale;
    const pieceHc = pieceHo*iscale;
    for (let i = 0; i < puzzlesize; i++) {
      const sx = puzzle[i][0] //sx
      const sy = puzzle[i][1] //sy
      const Lx = puzzle[i][2] //Lx
      const Ly = puzzle[i][3] //Ly
      const solved = puzzle[i][4] // 1 if solved	
      if(i==clickedpiece){
        ctx.drawImage(timg, sx,sy, pieceWo, pieceHo, Lx, Ly, pieceWc, pieceHc);
        // ctx.drawImage(wimg, 0 ,0,  pieceWo, pieceHo, Lx, Ly, pieceWc, pieceHc); 
	    ctx.drawImage(wimg, Lx, Ly, pieceWc, pieceHc);
      }else{
        ctx.drawImage(timg, sx,sy, pieceWo, pieceHo, Lx,Ly, pieceWc, pieceHc);
      }//end ifelse
    }//end for
    /*
    const ztable = document.getElementById("myTable");
    ztable.insertRow();
    for (let y = 0; y < numy; y++) {
      for (let x = 0; x < numx; x++) {
         let newCell = ztable.rows[ztable.rows.length - 1].insertCell();
         newCell.textContent = puzzle[x+y][4];
      }//endforx
    }//endfory
    */
  }//end ifelse
  
//	          number of clicks = <div id="numClicksId">num</div>
//			  number of pieces solved = <div id="numSolvedId">num</div>
//             stats by level<div id="levelId">level</div>

//  const cStatus = ` click is ${clickxy[0]} x ${clickxy[1]} y solved is ${puzzleSolved}`;
  const cStatus = ` ${numSolved} pieces solved in ${puzzlesize} piece puzzle `;
  document.getElementById("status").innerHTML = cStatus;
  document.getElementById("status").style.color = fcolor;
  document.getElementById("myTable").style.color = fcolor;

  const index = numx - 1;
//  const cStatus2 = ` most recently clicked piece number is ${clickedpiece} level is level[$num-1]`;
  const cStatus2 = ` using ${numClicks} clicks in ${totalTime} seconds`;
  document.getElementById("status2").innerHTML = cStatus2;
  document.getElementById("status2").style.color = fcolor;
  document.getElementById("myTable").style.color = fcolor;
 
  //addTable();

  //stats are stored in global variables
  //document.getElementById("numClicksId").innerHTML = numClicks;
  //document.getElementById("numSolvedId").innerHTML = numSolved;
  level = numx - 1;

  drawmatrix();
}//end draw puzzle

function addTable(){
// the following creates a node and appends it to the document body
  document.body.appendChild(document.createTextNode('Hello World!'));
 
var ztableArr = [
  ["first cell is row 1, cell 1", "row 1, cell 2"],
  ["row 2, cell 1", "last cell is row 2, cell 2"]]

let ztable = document.createElement('table');

for (let row of ztableArr) {
  ztable.insertRow();
  for (let cell of row) {
    let newCell = ztable.rows[ztable.rows.length - 1].insertCell();
    newCell.textContent = cell;
  }
}

document.body.appendChild(ztable);
}//end addTable

//  Don version
// calculate scales needed to draw
// c - canvas
// i - image
// h - height
function findscalesNew(){
  const iW = timg.naturalWidth;
  const iH = timg.naturalHeight;  
  const wW  = window.innerWidth - 50;
  const wH  = window.innerHeight - 50;
  const scaleW = wW/iW;
  const scaleH = wH/iH;

// leave 25% of the screen outside of canvas  
  if (scaleW > scaleH) {   // wide screen
    iscale = Math.min(scaleH,0.75*scaleW);	  
  } else {   // tall screen
    iscale = Math.min(scaleW,0.75*scaleH);
  }
	
  const myCanvas = document.getElementById("myCanvas");
  const ctx = myCanvas.getContext("2d");
  canvaswidth  = iW * iscale;
  canvasheight = iH * iscale;
  ctx.canvas.width  = canvaswidth;
  ctx.canvas.height = canvasheight;
  const rect = myCanvas.getBoundingClientRect();		
  canvastop = rect.top;
  canvasleft = rect.left;
  
  const fW = fimg.naturalWidth;	 
  const fH = fimg.naturalHeight;  
  
  fHscale = canvasheight/fH;
  ifscale = (fHscale * (fH - 2*fsize))/iH;
  fWscale = (ifscale * iW)/(fW - 2*fsize);  
   
  const scaledFrameWidth = fimg.naturalWidth * fWscale;
  if (scaledFrameWidth > canvaswidth) {
    const adjF = canvaswidth/scaledFrameWidth;
	fWscale = iW * iscale/fW;
	fHscale *= adjF;
	ifscale *= adjF;
  }	  
}  // end findscalesNew

function canvasSize() {
  const myCanvas = document.getElementById("myCanvas");
  const ctx = myCanvas.getContext("2d");
  ctx.canvas.width  = window.innerWidth -300;
  ctx.canvas.height = window.innerHeight -200;

  const rect = myCanvas.getBoundingClientRect();		
  canvastop = rect.top;
  canvasleft = rect.left;
  canvaswidth = myCanvas.width;
  canvasheight = myCanvas.height;
}

 function findscales(){
  //frame height scale = canvas height / frame height
  let cW  = canvaswidth;
  let cH  = canvasheight;
  let iW = timg.naturalWidth;
  let fH = fimg.naturalHeight;
  const iH = timg.naturalHeight;
  let fW = fimg.naturalWidth;

  fHscale = cH/fH;

//scale to make image fill middle of canvas
//fHscale * fH = scaled frame height
  ifscale = (fHscale * (fH - 2*fsize))/iH;

  fWscale = (ifscale * iW)/(fW - 2*fsize);
  
  iscale = cH / iH;
  //adjust iscale if width limited
  const scaledWidth = timg.naturalWidth * iscale;
  if (scaledWidth > cW) {iscale = cW / iW};
  
  // add new code to fix scaling to fit canvas width
  // add if the scaling doesn't work
  // 2 problems
  // adjust if image is too big
  // adjust when displaying fram
  
  const scaledFrameWidth = fimg.naturalWidth * fWscale;
  if (scaledFrameWidth > cW) {
    const adjF = cW/scaledFrameWidth;
	fWscale = cW/fW;
	fHscale *= adjF;
	ifscale *= adjF;
  }	  

}//end findscales

//return the background color for an image
function getbackground(id){
	const background = [["Gae",56,72,54],["Jos",175, 101, 140],["Elf",56,72,54],["Wed",255,255,255],
	                    ["Tst",255,255,255],["Vej",72,72,72],["Bsq",255,255,255]];
	return background[id];
}

function calctotalTime() {
const timeEnd = new Date().getTime();
    totalTime =((timeEnd - timeStart)/1000);
totalTime = totalTime.toFixed(0);
}
