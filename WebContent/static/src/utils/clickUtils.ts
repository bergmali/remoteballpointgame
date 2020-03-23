/************************************************
################# CONSTANTS #####################
************************************************/


/************************************************
################## METHODS ######################
************************************************/


/***************************************
# check if a rect object is clicked
# object needs x, y, width, height
***************************************/
function checkClickOnRectObject(mouseX:number, mouseY:number, object:ICollidable) : boolean{
		
	if(mouseX > object.x && mouseX < object.x + object.width && 
	   mouseY > object.y && mouseY < object.y + object.height){
				
		return true;
		
	}else {
		return false;
	}
	
}


