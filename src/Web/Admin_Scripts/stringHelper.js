function StringHelper(){}

StringHelper.trim = function(s)
{
	s += "";
	return s.replace(/^\s+|\s+$/g,'');
};

StringHelper.isInt = function(s)
{
    return new RegExp(/^(0|[1-9][0-9]*)$/).test(this.trim(s));
};

StringHelper.isCleanString = function(s)
{
    return new RegExp(/^[A-Za-z0-9_]+$/).test(this.trim(s));
};

StringHelper.isEmail = function(s)
{
    return new RegExp(/^(\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/).test(this.trim(s));
};

StringHelper.isEmpty = function(s)
{
	return this.trim(s).length == 0;
};

StringHelper.buildFlatXmlString = function(rootName, arrNames, arrValues)
{
	var returnVal = ("<" + rootName + ">");
	for(var i = 0; i < arrNames.length; i++)
	{
		returnVal += ("<" + arrNames[i] + ">");
		if(arrValues[i] != null) returnVal += this.encodeXml(arrValues[i]);
		returnVal += ("</" + arrNames[i] + ">");
	}
	returnVal += ("</" + rootName + ">");
	return returnVal;
};

StringHelper.encodeXml = function(s)
{
	s = s.replace(/\x26/g,"&#38;");     //&
    s = s.replace(/\x3c/g,"&#60;");     //<
    s = s.replace(/\x3e/g,"&#62;");     //>
    s = s.replace(/\x22/g,"&#34;");     //"
    s = s.replace(/\x27/g,"&#39;");     //'
    return s;
};