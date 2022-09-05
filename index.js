function reverseStr(str){
    var listofchar = str.split('');
    var reverselistofchar = listofchar.reverse();
    var reversedStr = reverselistofchar.join('');

    return reversedStr;
    // return str.split('').reverse().join('');
}

function isPalindrome(str){
    var reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToStr(date){
    var datestr = {day:'',month:'',year:''};

    if(date.day < 10 ){
        datestr.day = '0' + date.day;
    }
    else{
        datestr.day = date.day.toString();
    }
    if(date.month < 10 ){
        datestr.month = '0' + date.month;
    }
    else{
        datestr.month = date.month.toString();
    }
    
    datestr.year = date.year .toString();
    
    return datestr;
}

function getAllDateFormats(date){
    var datestr = convertDateToStr(date);

    var ddmmyyyy = datestr.day + datestr.month + datestr.year;
    var mmddyyyy = datestr.month + datestr.day + datestr.year;
    var yyyymmdd = datestr.year + datestr.month + datestr.day;
    var ddmmyy =  datestr.day + datestr.month + datestr.year.slice(-2);
    var mmddyy = datestr.month + datestr.day + datestr.year.slice(-2);
    var yymmdd = datestr.year.slice(-2) + datestr.month + datestr.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function CheckPalindromeforAllDateFormats(date){
    var listofPalindromes = getAllDateFormats(date); 

    var  flag = false;

    for(var i=0;i<listofPalindromes.length;i++){
        if(isPalindrome(listofPalindromes[i])){
            flag = true;
            break ;
        } 
    }
    return flag;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]

    if(month == 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month-1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }

    return{
        day: day,
        month: month,
        year: year
    }
}
function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }

    if(year % 4 === 0){
        return true;
    }
    return false;
}
function getNextPalindromeDate(date){
     var ctr = 0;
     var nextDate = getNextDate(date);

     while(1){
        ctr++;
        var isPalindrome = CheckPalindromeforAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr,nextDate];
} 

var datainput = document.querySelector("#birthday-input");
var showBtn = document.querySelector("#Checkbtn");
var outputvalue = document.querySelector("#output");

function clickHandler(){
    var birthdayStr = datainput.value;
    if(birthdayStr !== ""){
        var listOfDate = birthdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0]) 
        }
       var isPalindrome = CheckPalindromeforAllDateFormats(date);

       if(isPalindrome){
        outputvalue.innerText =  "Yay ! Your Birthday is a Palindrome 😊";
       }
       else{
         var [ctr,nextDate] = getNextPalindromeDate(date);
         outputvalue.innerText = `The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, You missed it by ${ctr} days 😔`;
       }
    }
    else{
        outputvalue.innerText =  "Please enter a valid date 😐";
    }
}


showBtn.addEventListener('click', clickHandler)


