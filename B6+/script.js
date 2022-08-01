function buildWrapper(tag) {

    return function(str, atr) {

        function getReplace(a) {

            a = a.replaceAll ("&","&amp;");
            a = a.replaceAll ("<","&lt;");
            a = a.replaceAll (">","&gt;");
            a = a.replaceAll ('"',"&quot;");
            a = a.replaceAll ("'","&apos;");

            return a;
        }

        let strReplace = getReplace(str);
      
        let atrRet = "";
    
        for ( var key in atr) {

            let artKey = atr[key];

            let artKeyReplace = getReplace(artKey);
           
            atrRet += " " + key + "=" + "'" + artKeyReplace + "'"; 
        }
    
        return "<"+ tag + atrRet +  ">" + strReplace + "</" + tag + ">"; 
    }
}

var wrapP = buildWrapper("P");
var wrapH1 = buildWrapper("H1");

console.log(wrapP("Однажды в студёную зимнюю пору"));
console.log(wrapP("Однажды в студёную зимнюю пору",{lang:"ru"}));
console.log(wrapP("Однажды в <студёную> зимнюю пору"));
console.log(wrapH1("СТИХИ",{align:"center",title:"M&M's"}))