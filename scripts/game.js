var x = 4;
var row, col;
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 10, 11, 12, 13, 14, 15];
var emptyIndex = 0;
var cell = [16];
var timeUsed = 0;
var moveCount = 0;


window.addEventListener("load", startTimer, false);

function startTimer()
{
    window.setInterval(timer, 1000);
} 

function timer()
{
	if (!isWinner()) timeUsed++;
	document.getElementById("time").innerHTML = "Time used: " + timeUsed +" s.";
}

function shuffle()
{
	var i = 0;
	numbers.sort(function(){ return 0.5 - Math.random() });
	cell[0] = document.getElementById("cell_00");
	cell[1] = document.getElementById("cell_01");
	cell[2] = document.getElementById("cell_02");
	cell[3] = document.getElementById("cell_03");
	cell[4] = document.getElementById("cell_10");
	cell[5] = document.getElementById("cell_11");
	cell[6] = document.getElementById("cell_12");
	cell[7] = document.getElementById("cell_13");
	cell[8] = document.getElementById("cell_20");
	cell[9] = document.getElementById("cell_21");
	cell[10] = document.getElementById("cell_22");
	cell[11] = document.getElementById("cell_23");
	cell[12] = document.getElementById("cell_30");
	cell[13] = document.getElementById("cell_31");
	cell[14] = document.getElementById("cell_32");
	cell[15] = document.getElementById("cell_33");
	
	//if isWinner then suffle again;
	//if (isWinner()) shuffle();
	
	for (i = 0; i < 16; i++)
	{
		if (numbers[i] != 0)
			cell[i].innerHTML = numbers[i].toString();
		else
		{
			cell[i].innerHTML = "";
			emptyIndex = i;
		}
	}
}

function easyGame(){
	timeUsed = 0;
	moveCount = 0;
	var i = 0;	
	for (i = 0; i < 14; i++)
	{
		cell[i].innerHTML = i + 1;
	}
	cell[14].innerHTML = "";
	cell[15].innerHTML = 15;
	emptyIndex = 14;
	
	document.getElementById("winningText").innerHTML = "";
	document.getElementById("promptRestart").innerHTML = "";
	document.getElementById("time").innerHTML = "Time used: " + 0 +" s.";
	document.getElementById("moves").innerHTML = "Move(s) : " + 0 + ".";
}


function cellPosition( cell_id )
{
	var i = 0;
	var tmp = document.getElementById(cell_id);
	for (i = 0; i < 16; i++)
	{
		if (cell[i] == tmp) return i;
	}
}

function clickMove( item )
{
	var clickPos = cellPosition( item.id );
	var clickPosI = Math.floor( clickPos / 4 );
	var clickPosJ = clickPos % 4;
	var emptyIndexI = Math.floor( emptyIndex / 4 );
	var emptyIndexJ = emptyIndex % 4;
	var i = 0;
	//var temp = document.getElementByID("winningText");
	//alert(clickPosI + " " + clickPosJ);
	//alert(parseInt(cell[0].innerHTML));
	if((Math.abs(emptyIndexI - clickPosI) == 1 && emptyIndexJ == clickPosJ) ||
	(Math.abs(emptyIndexJ - clickPosJ) == 1 && emptyIndexI == clickPosI))
	{
		if (!isWinner())
		{
			cell[emptyIndex].innerHTML = item.innerHTML;
			item.innerHTML = "";
			emptyIndex = clickPos;
			moveCount++;
			document.getElementById("moves").innerHTML = "Move(s) : " + moveCount + ".";
		}
		if (isWinner())
		{
			document.getElementById("winningText").innerHTML = "Congratulations! You finished in " + timeUsed + " second(s) with " + moveCount + "move(s)!";
			document.getElementById("promptRestart").innerHTML = "Click Restart if you want to replay the game!";			
		}
	}	
}


function isWinner()
{
	return (parseInt(cell[0].innerHTML) == 1) && (parseInt(cell[1].innerHTML) == 2) && (parseInt(cell[2].innerHTML) == 3) && (parseInt(cell[3].innerHTML) == 4) && 
	(parseInt(cell[4].innerHTML) == 5) && (parseInt(cell[5].innerHTML) == 6) && (parseInt(cell[6].innerHTML) == 7) && (parseInt(cell[7].innerHTML) == 8) && 
	(parseInt(cell[8].innerHTML) == 9) && (parseInt(cell[9].innerHTML) == 10) && (parseInt(cell[10].innerHTML) == 11) && (parseInt(cell[11].innerHTML) == 12) && 
	(parseInt(cell[12].innerHTML) == 13) && (parseInt(cell[13].innerHTML) == 14) && (parseInt(cell[14].innerHTML) == 15) && (!cell[15].innerHTML) ;
}


function restart()
{
	shuffle();
	timeUsed = 0;
	moveCount = 0;
	document.getElementById("winningText").innerHTML = "";
	document.getElementById("promptRestart").innerHTML = "";
	document.getElementById("time").innerHTML = "Time used: " + 0 +" s.";
	document.getElementById("moves").innerHTML = "Move(s) : " + 0 + ".";
}