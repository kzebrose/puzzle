var puzzle = [];   // array of [sx, sy, Lx, Ly, solved]
var numx = 2;  //number of puzzle pieces left to right
var numy = 2;  //number of puzzle pieces top to bottom
var clickxy = [0,1];  // [0] is x, [1] is y in canvas coordinates
var canvaswidth = 0;
var canvasheight = 0;
var canvastop = 0;
var canvasleft = 0;  
var imgwidth = 0;
var imgheight = 0;
var puzzleSolved = 0;
var puzzlesize = 0;
var clickedpiece = -1; //number of most recently clicked piece 
var colwidth=1;
var rowheight=1;
var iscale = 1;
var ifscale = 1;
var fHscale = 1;
var fWscale = 1;
var timg = 0;
var wimg = 0;
var fimg = 0;
var frameIndex = 0;
let fsize = 12;
var imgQuery = 0;
var bcolor = "white";
var fcolor = "black";
var username = "mystery";
var score = 0;
var numscore = 0;  //number of scores on leaderboard

//stats
var numClicks = 0;
var timeStart = -1;
var totalTime = 0;
var numSolved = 0;
var level = [];
  
document.addEventListener("click", function(click){	newClick(click); });

window.onload=function(){ 
  
  // old method worked but replaced by params.get method
  //let URLstring = document.URL;
  //let myarray = [];
  //myarray = URLstring.split("?");
  //let imgQuery = [];
  //imgQuery = myarray[1];
  //anarray = imgQuery.split("&");

// extract query parameters from URL
  let params = (new URL(document.location)).searchParams;
  let puzzleID = params.get("puzzle");
  username = params.get("name");
  //document.getElementById('initials').setAttribute('value', username);
  
  timg = document.getElementById(puzzleID);
  mimg = document.getElementById("blue");

  wimg = document.getElementById("water");

  imgwidth = timg.naturalWidth;
  imgheight = timg.naturalHeight;
  
  mimgwidth = mimg.naturalWidth;
  mimgheight = mimg.naturalHeight;  
  
  let imageptr = document.getElementById(imgID);
  let newimageURL = document.getElementById(puzzleID);
  
  // does not work because of popup blocker   window.open(newimageURL, '_blank');
  
  //document.getElementById(imgID).href = "https://zebrose.com";
  //imagebutton.href = imageURL;
  selectBackground(timg);
  initGame();
  
  //const c = document.getElementById("myCanvas");
  //c.setAttribute("hidden","");
  
}



function initGame(){
 // FrameArray stores id for all frames
 //const FrameArray = [["gf",13],["gf2",98],["rf",62],["pf",13],["grf",13],["red",70],["blu",50]];
 //const FrameArray = [["blu",50],["red",70],["gf",13],["gf2",98],["rf",62],["pf",13],["grf",13]];
   const FrameArray = [["red",70],["blu",50],["pf",13],["grf",13],["gf",13],["rf",62],["gf2",98],["gf3",107],["gf4",117],["gf5",127]];
 //const frameIndex = Math.floor(Math.random()*FrameArray.length);
   const frameId = FrameArray[frameIndex][0];
   fsize = FrameArray[frameIndex][1];
   fimg = document.getElementById(frameId);
//   timeStart = new Date().getTime();
   timeStart = -1;
   numClicks = 0;
   clickedpiece = -1;
   frameIndex++;
   if(frameIndex > FrameArray.length){ frameIndex = 0; }
  
 //change cursor
   document.getElementById("myID").style.cursor = "crosshair";
 
 //const myWindowHeight = window.document.innerHeight;
 //const myWindowWidth  = window.document.innerWidth;
 
  //canvasSize(); 
 
  findscalesNew();
  colwidth = imgwidth*iscale/numx;
  rowheight = imgheight*iscale/numy;
 //document.getElementById("myCanvas").width = myWindowWidth;
 //document.getElementById("myCanvas").height = myWindowHeight;
 

  initpuzzle();

  drawpuzzle();	
  

}

function newClick(click){
  const c = document.getElementById("myCanvas");
  c.removeAttribute("hidden");
  timg.setAttribute("hidden","");
  numClicks += 1;
  if (timeStart == -1){
    timeStart = new Date().getTime();
  }//end if

  //hide instructions
  // document.getElementById("instr").setAttribute("hidden","");
  //document.getElementById("instr").innerHTML = ' ';  

  
  if (puzzleSolved){
    level[numx-1]=numClicks;
	var timeEnd = new Date().getTime();
    totalTime =((timeEnd - timeStart)/1000);
	totalTime = totalTime.toFixed(0);
    numx ++;
	numy ++;

    if(numx == 10)
    {
      numx = 1;
      numy = 1;
    }//endif

    submitScore();
	initGame();
  }//endif
	
  // translate the mouse click into canvas coordinates  
  const x = Math.trunc(click.pageX - canvasleft);
  const y = Math.trunc(click.pageY - canvastop);
  clickxy[0] = x;
  clickxy[1] = y;
   
  if((x < iscale*imgwidth)&&(y < iscale*imgheight)){
  clickedpiecefunc();
  drawpuzzle();
  }
}//end__newClick()

function submitScore(){
  const pname = timg.id + "_" + username;	
  document.getElementById('fname').setAttribute('value', pname);
  document.getElementById('score').setAttribute('value', score);
  document.getElementById("form1").submit(); 		
}

function clickedpiecefunc(){
  //translate canvas coordinate into game grid coordinate
  //then calculate the clicked piece in game grid coordinate
  let canvasx = clickxy[0];
  let canvasy = clickxy[1];
  let gridx = 0;
  let gridy = 0;
  //calculate click column
  gridx = Math.trunc(canvasx/colwidth);
  gridy = Math.trunc(canvasy/rowheight);
  
  if(clickedpiece == -1){//this is a first click   
    clickedpiece = gridy * numx + gridx; //which piece was clicked?
  }
  else {//this was a second click
    let secondpiece = gridy * numx + gridx; //which piece was clicked?
    swappieces(clickedpiece,secondpiece);
    clickedpiece = -1;
  }
}

function selectBackground(timg){	
	if(imgQuery == "Jos"){ bcolor = "blue"; }
	
	switch(imgQuery) {
	  case "Jos":
		bcolor = "rgb(175,101,140)";
		fcolor = "black";
		break;
	  case "Wed":
	  case "Bsq":
	  case "Tst":
		bcolor = "white";
		fcolor = "black";
		break;
	 case "Gae":
	 case "Elf":
		bcolor = "rgb(129,180,38)";
		fcolor = "black";
		break;
	 case "Vej":
	    bcolor = "black";
		fcolor = "white";
	    break
	default:
		bcolor = "white";
		fcolor = "black";
    } 

	if((timg == "Gae")||(timg == "Elf")){ 
	  const box = document.getElementById(timg);
	  // window.addEventListener("load",()=> {
		//  box.style.backgroundColor = 'rgb(43, 60, 12.5)'
	  //document.getElementById("myID").background-color = 'rgb(' + [43, 60, 12.5].join(',') + ')';
	// });
	}
	
	if((imgQuery == "Wed")||(timg == "Bsq")||(timg == "Tst")){ 
	  // window.addEventListener("load",()=> {
		  // box.style.backgroundColor = 'rgb(255, 255, 255)'
	    //document.getElementById("myID").backgroundColor = 'rgb(255,255,255)';
	 //});
	}
	
	if(timg == "Vej"){
      // window.addEventListener("load",()=> {
		//  box.style.backgroundColor = 'rgb(0, 0, 0)'
	//document.getElementById("myID").background-color = 'rgb(' + [0, 0, 0].join(',') + '}';
	// });
    }
	
	document.body.style.background = bcolor;
}//end selectBackground
