/************************************************
################# CONSTANTS #####################
************************************************/


/************************************************
################## METHODS ######################
************************************************/

/***************************************
# get entry from array depending on probabilities
***************************************/
function getEntryFromNumberedProbabilityArray(probabilityArray:number[]) : number {
	//console.log(probabilityArray);
	
	var totalSum = 0;
	for (var i = 0; i < probabilityArray.length; i++) {
        totalSum = totalSum + probabilityArray[i];
    }

	//console.log("totalSum = " + totalSum);
	
    var index = getRandomNumber(0, totalSum);
    
    var i = 0;
    var sum = probabilityArray[i];
    while(sum < index ) {
    	 i = i+1;
         sum = sum + probabilityArray[i];
    }
    
    return i;
}

/***************************************
# apply manipulator Array to probability array
***************************************/
function getManipulatedProbabilityArray(probabilityArray:number[], manipulatorArray:number[]) : number[] {
	var manipulatedArray = [];
	
	for (var i = 0; i < probabilityArray.length; i++) {
		manipulatedArray[i] = probabilityArray[i] + manipulatorArray[i];
    }
	
    return manipulatedArray;
}