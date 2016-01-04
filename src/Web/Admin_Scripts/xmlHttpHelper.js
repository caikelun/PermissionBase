function XmlHttpHelper(){}

XmlHttpHelper.__getXmlHttpObj = function()
{
	try
	{
		return new ActiveXObject("MSXML2.XMLHTTP");
	}
	catch(e)
	{
		return new XMLHttpRequest();
	}
};

//
//  使用XMLHTTP和远程服务器通信。
//
//  参数名称        必须    类型        取值范围            描述
//-------------------------------------------------------------------------------------------
//	async			是      boolean     true/false          是否使用异步方式
//	httpMethod		是      string      "post"/"get"        http方法
//	responseType	否      string      "text"/"xml"        返回数据的类型
//	url				是      string                          接收请求的URL地址
//	callback		否      function                        异步方式操作完成时执行的回调函数
//	postData		否      string                          post方式时发送的数据
//
//  注：非必须的参数，如不被传递时使用null代替。
//
XmlHttpHelper.transmit = function(async, httpMethod, responseType, url, callback, postData)
{
    httpMethod = httpMethod.toLowerCase();
    if(responseType != null) responseType = responseType.toLowerCase();
    
    var xmlhttp = this.__getXmlHttpObj();
	xmlhttp.open(httpMethod, url, async);
	
	if(!async && httpMethod == "post")
	    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	if(async)
	{
		xmlhttp.onreadystatechange = function()
		{
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
			{
			    try
			    {
			        if(typeof(callback) == "function")
			        {
			            switch(responseType)
			            {
			                case "text":
			                    callback(xmlhttp.responseText);
			                    break;
			                case "xml":
					            callback(xmlhttp.responseXML);
					            break;
					        default:
					            callback(null);
			            }
			        }
				}
				finally
				{
				    xmlhttp = null;
				}
			}
		}
		xmlhttp.send(postData);
	}
	else
	{
		xmlhttp.send(postData);
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
    		switch(responseType)
			{
			    case "text":
			        return xmlhttp.responseText;
			    case "xml":
			        return xmlhttp.responseXML;
			    default:
			        return null;
			}
		}
		else
		{
		    return null;
		}
	}
};