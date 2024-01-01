// display a matrix of puzzle pieces
// display blue when solved white when not solved
// a web page can have multiple canvases

function initmatrix(){
  const matrixscale = 10;
  const matrixwidth = canvaswidth/matrixscale;
  const matrixheight = canvasheight/matrixscale;
  const mymatrix = document.getElementById("myMatrix");
  const mtx = mymatrix.getContext("2d");
  mtx.canvas.width  = matrixwidth;
  mtx.canvas.height = matrixheight; 
}//end init matrix

function drawmatrix(){
  const matrixscale = 10;
  const matrixwidth = canvaswidth/matrixscale;
  const matrixheight = canvasheight/matrixscale;
  const mymatrix = document.getElementById("myMatrix");
  const mtx = mymatrix.getContext("2d");

  mtx.lineWidth = 4;
  mtx.strokeRect(0,0,matrixwidth,matrixheight);
  mtx.clearRect(0,0,matrixwidth,matrixheight);
  mtx.fillStyle = "green";
  mtx.fillRect(0,0,matrixwidth,matrixheight);
  //calculate parameters for draw image command
  //using scale constants
  //
  const pieceW = matrixwidth / numx;
  const pieceH = matrixheight / numy;
  for (let y = 0; y < numy; y++) {
	for (let x = 0; x < numx; x++) { 
		
	if (puzzle[x+y*numx][4]==0){
		mtx.fillStyle = "blue";
	} else {
		mtx.fillStyle = "white";
	}
	
    mtx.fillRect(x*pieceW,y*pieceH,pieceW,pieceH);
	}}//end for
}//end drawmatrix


