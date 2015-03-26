/* 
   LAB4
   scripts.js 
   Raymond Zapp 
   00146825 
   1 April 2015 
*/

window.onload = function ()                                          
{      
	var theBoard = document.getElementsByClassName("piece-empty");   
		
	for (squaresCount = 0; squaresCount < (theBoard.length); squaresCount++)    
	{
		var eachSquare = theBoard[squaresCount];
		
		eachSquare.onmouseover = function ()                    
		{
			this.style.borderColor = "green";				    
		}
		
		eachSquare.onmouseout = function ()
		{
			this.style.borderColor = "";                        
		}
		
		eachSquare.onmousedown = function ()                    
		{               
			if (this.className == "piece-empty")					
			{
				this.className = "piece-x";                     
			}
			
			else if (this.className == "piece-x")                 
			{
				this.className = "piece-o";
			}
			
			else                                                
			{                                                   
				this.className = "piece-empty";
			}
		}
	}
};
