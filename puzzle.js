function initpuzzle(){
  timeStart = new Date().getTime();
  // divide the image into pieces
  puzzlesize = numx*numy;
  let index = 0;
  for (let i = 0; i < numx; i++) {
    for (let j = 0; j < numy; j++) {
      let piece = [];
      piece[0] = i*imgwidth/numx;  //sx
      piece[1] = j*imgheight/numy;  //sy
      piece[2] = 0;//i*canvaswidth/numx;  //Lx
      piece[3] = 0;//j*canvasheight/numy;  //Ly
      piece[4] = Math.random();	//solved: initilized as random, 1 if solved.
      puzzle[index] = piece;
      index ++;
    }//end j index loop
  }//end i index loop
   
  puzzle.sort(compare4thValue);
  
  // next set the canvas locations
  index = 0;
  for (let j = 0; j < numy; j++) {
    for (let i = 0; i < numx; i++) {
      puzzle[index][2] = Math.round(i*imgwidth*iscale/numx);  //Lx
      puzzle[index][3] = Math.round(j*imgheight*iscale/numy);  //Ly
      index ++;
    }//end j index loop
  }//end i index loop
  
  //initmatrix();
  //initlead();
   
}//end init puzzle

function compare4thValue(a, b) {
    if (a[4] === b[4]) {
        return 0;
    }
    else {
        return (a[4] < b[4]) ? -1 : 1;
    }
}


function checkSolved(){
  let solved =1;
  for (let i = 0; i < puzzlesize; i++ ){
    //Is this piece solved?
    //sx = Lx  sy = Ly
      const sxc = Math.round(iscale*puzzle[i][0]);
      const syc = Math.round(iscale*puzzle[i][1]);		
    if(
      (sxc == puzzle[i][2])&&
      (syc == puzzle[i][3])){
      puzzle[i][4]=1;
    }else{
      puzzle[i][4]=0;
    }
    solved = solved && puzzle[i][4];
  }
  puzzleSolved=solved;
  leadershow();
  countSolved();
}//end checkSolved
function leadershow(){
	//show leaderboard page TBW
}//end leadershow
function countSolved() {
	numSolved = 0;
	for (let i = 0; i < puzzlesize; i++) {
      if (puzzle[i][4] == 1) {
		  numSolved++;
	  }//end if puzzle piece solved
	}//end for
    // console.log("numSolved = ",numSolved);
}//end countSolved

function swappieces(A,B){
  //save the A piece, assign B to A, assign saved A to B
  var savedA = [];
  savedA[0] = puzzle[A][0]; //sx
  savedA[1] = puzzle[A][1]; //sy
  savedA[4] = puzzle[A][4]; //solved
  // assign B to A
  puzzle[A][0] = puzzle[B][0]; //sx
  puzzle[A][1] = puzzle[B][1]; //sy
  puzzle[A][4] = puzzle[B][4]; //solved
  // assign savedA to B
  puzzle[B][0] = savedA[0]; //sx
  puzzle[B][1] = savedA[1]; //sy
  puzzle[B][4] = savedA[4]; //solved
}

function notneeded_image(puzzle) {
	//fill in image link
	let imgptr = getElementById(imgID);
	//let rootURL = 
}