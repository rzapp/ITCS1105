/* 
   LAB4
   scripts.js 
   Raymond Zapp 
   00146825 
   1 April 2015 
*/
// cursor hover changes the border color of the individual cell/square 
// cursor movement away changes border color back to default color  
// press down on mouse button changes display within the cell/square
//
window.onload = function ()                                          // wait till after html loaded; DOM in place
{
	var lab4Color = "green";                                         // assign color value for use at event
	var theBoard = document.getElementsByClassName("piece-empty");   // capture the collection of elements with matching class
		
	for (squaresCount = 0; squaresCount < (theBoard.length); squaresCount++)    // loop till counter reaches total of elements
	{
		var eachSquare = theBoard[squaresCount];
		
		eachSquare.onmouseover = function ()                    // bind the one same Event function to each different element
		{
			this.style.borderColor = lab4Color;				    // assign the property value to the targeted piece
		}
		
		eachSquare.onmouseout = function ()
		{
			this.style.borderColor = "";                        // clear the assigned style; revealing the original style
		}
		
		eachSquare.onmousedown = function ()                    // bind this same Event function to each element
		{
			var currentClass = this.className;                  // capture the currently in-place class of the targeted piece
			
			if (currentClass == "piece-empty")					// compare the class
			{
				this.className = "piece-x";                     // swap the class
			}
			
			else if (currentClass == "piece-x")                 // continue to toggle through the classes
			{
				this.className = "piece-o";
			}
			
			else                                                // because otherwise className is piece-o
			{                                                   // or, at the very least, options exhausted; return to default
				this.className = "piece-empty";
			}
		}
	}
};
/* -end- */
