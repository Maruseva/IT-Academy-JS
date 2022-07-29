function buildWrapper(tag) {

    return function(str, atr) {

        str = str.replaceAll ("&","&amp;");
        str = str.replaceAll ("<","&lt;");
        str = str.replaceAll (">","&gt;");
        str = str.replaceAll ('"',"&quot;");
        str = str.replaceAll ("'","&apos;");
        
        let atrRet = "";
    
        for ( var key in atr) {

            atr[key] = atr[key].replaceAll ("&","&amp;");
            atr[key] = atr[key].replaceAll ("<","&lt;");
            atr[key] = atr[key].replaceAll (">","&gt;");
            atr[key] = atr[key].replaceAll ('"',"&quot;");
            atr[key] = atr[key].replaceAll ("'","&apos;");
           
            atrRet += " " + key + "=" + "'" + atr[key] + "'"; 
        }
    
        return "<"+ tag + atrRet +  ">" + str + "</" + tag + ">"; 
    }
}

var wrapP = buildWrapper("P");
var wrapH1 = buildWrapper("H1");

console.log(wrapP("Однажды в студёную зимнюю пору"));
console.log(wrapP("Однажды в студёную зимнюю пору",{lang:"ru"}));
console.log(wrapP("Однажды в <студёную> зимнюю пору"));
console.log(wrapH1("СТИХИ",{align:"center",title:"M&M's"}))