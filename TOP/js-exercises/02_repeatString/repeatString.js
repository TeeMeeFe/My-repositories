const repeatString = function(string, repeatTimes = 1) {
    let str = '';

    if( repeatTimes < 0 ) { return "ERROR";}

    for( let i = 0; i < repeatTimes; i++) {
        str += string;
    }

    return str;
};

repeatString('hey', 3);
repeatString('hello', 10);
repeatString('hi', 1);
repeatString('bye',0);
repeatString('goodbye',-1);
repeatString('odin', 14);
repeatString('', 4);

// Do not edit below this line
module.exports = repeatString;
