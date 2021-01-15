function clean_code(raw_code){
    check_forbidden_word(raw_code);
    return clear_html_tag( clear_speical_char(raw_code) );
}

function clear_html_tag(code){
    return  code.replace(/<br>/gi, " ")
                .replace(new RegExp("(</div>)", "gi"), "")
                .replace(new RegExp("(<div>)", "gi"), "")
                .replace(new RegExp("(</p>)", "gi"), "")
                .replace(new RegExp("(<p>)", "gi"), "");
                
}

function clear_speical_char(raw_code){
    return  raw_code.replace(/&quot;/gi, '"')
                    .replace(/&amp;/gi, '&')
                    .replace(/&frasl;/gi, '/')
                    .replace(/&lt;/gi, '<')
                    .replace(/&gt;/gi, '>')
                    .replace(/&nbsp;/gi, ' ');
}

function check_forbidden_word(raw_code){
    var words = ['import', 'http'];
    for(word of words){
        if(raw_code.indexOf(word) > -1 ) throw new Error('Forbidden word: '+word);
    }
}

module.exports = function code_checker_output(raw_code, test_case, function_name){
    //override console.log
    var logBackup = console.log;
    var logMessages = [];

    console.log = function(...input) {
        logMessages.push(input.join(" ")); 
        logBackup.apply(console, input);
    };

    try{
        var testResult = "";
        var code = clean_code(raw_code);
        var catchErr = null;

        //Testing case
        for( test of test_case ){
            //Running code
            new Function('try {'+code+';} catch(e) {catchErr=e;}')();
            let SuspectCase = false; //Suspect case is mean output correct but not correct print
            let FailedCase = false;

            if (catchErr) return [err, "-".repeat(test_case.output.length)];

            for(let index=0; index<test.output.length; index++){
                if( logMessages[index]!==test.output[index] ) {
                    if( logMessages[index].trim().toUpperCase()===test.output[index].trim().toUpperCase() ){
                        SuspectCase = true;
                    }else{
                        FailedCase = true;
                        break;
                    }
                }
            }

            if(FailedCase) testResult+="-";
            else if(SuspectCase) testResult+="S";
            else testResult+="P";

            logMessages = [];
        }
        return ["Run success", testResult];
    }catch(err){
        return [err, "-".repeat(test_case.output.length)];
    }
}