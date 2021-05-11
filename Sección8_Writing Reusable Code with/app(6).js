// Write a function to find the average value in an array of numbers

//avg([0,50]) //25
//avg([75,76,80,95,100]) //85.2



























function avg(arr) {
    total = 0;
    for (let i in arr){
        total += arr[i];
    }
    return total / arr.length
}




function avg(arr){
    total = 0;
    for(let i = 0; i < arr.length; i++){
        total += arr[i];
    }
    return total / arr.length;
}














