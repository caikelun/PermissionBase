//WebCalendar ver 3.0
//作者：meizz(梅花雪疏影横斜)
//网站：http://www.meizz.com
//ver 2.0：walkingpoison(水晶龙)
//ver 1.0：meizz(梅花雪疏影横斜)
document.write("<div id=meizzCalendarLayer style='position: absolute; z-index: 9999; width: 144px; height: 193px; display: none'>");
document.write("<iframe name='meizzCalendarIframe' scrolling='no' frameborder='0px' width='100%' height='100%'></iframe></div>");
function meizz_writeIframe()
{
    var strIframe = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=gb2312'><style>"+
    "*{font-size: 12px; font-family: 宋体}"+
    ".bg{  color: "+ WebCalendar.lightColor +"; cursor: default; background-color: "+ WebCalendar.darkColor +";}"+
    "table#tableMain{ width: 142; height: 180;}"+
    "table#tableWeek td{ color: "+ WebCalendar.lightColor +";}"+
    "table#tableDay  td{ font-weight: bold;}"+
    "td#meizzYearHead, td#meizzYearMonth{color: "+ WebCalendar.wordColor +"}"+
    ".out { text-align: center; border-top: 1px solid "+ WebCalendar.DarkBorder +"; border-left: 1px solid "+ WebCalendar.DarkBorder +";"+
    "border-right: 1px solid "+ WebCalendar.lightColor +"; border-bottom: 1px solid "+ WebCalendar.lightColor +";}"+
    ".over{ text-align: center; border-top: 1px solid " + WebCalendar.lightColor + "; border-left: 1px solid " + WebCalendar.lightColor + ";"+
    "border-bottom: 1px solid "+ WebCalendar.DarkBorder +"; border-right: 1px solid "+ WebCalendar.DarkBorder +"}"+
    "input{ border: 1px solid "+ WebCalendar.darkColor +"; padding-top: 1px; height: 18; cursor: hand; "+
    "color:"+ WebCalendar.wordColor +"; background-color: "+ WebCalendar.btnBgColor +"}"+
    "</style></head><body onselectstart='return false' style='margin: 0px' oncontextmenu='return false'><form name=meizz>";

    if (WebCalendar.drag){ strIframe += "<scr"+"ipt language=javascript>"+
    "var drag=false, cx=0, cy=0, o = parent.WebCalendar.calendar; function document.onmousemove(){"+
    "if(parent.WebCalendar.drag && drag){if(o.style.left=='')o.style.left=0; if(o.style.top=='')o.style.top=0;"+
    "o.style.left = parseInt(o.style.left) + window.event.clientX-cx;"+
    "o.style.top  = parseInt(o.style.top)  + window.event.clientY-cy;}}"+
    "function document.onkeydown(){ switch(window.event.keyCode){  case 27 : parent.meizz_hiddenCalendar(); break;"+
    "case 37 : parent.meizz_prevM(); break; case 38 : parent.meizz_prevY(); break; case 39 : parent.meizz_nextM(); break; case 40 : parent.meizz_nextY(); break;"+
    "case 84 : document.forms[0].today.click(); break;} window.event.keyCode = 0; window.event.returnValue= false;}"+
    "function dragStart(){cx=window.event.clientX; cy=window.event.clientY; drag=true;}</scr"+"ipt>"}

    strIframe += "<select name=tmpYearSelect  onblur='parent.meizz_hiddenSelect(this)' style='z-index:1;position:absolute;top:3;left:18;display:none'"+
    " onchange='parent.WebCalendar.thisYear =this.value; parent.meizz_hiddenSelect(this); parent.meizz_writeCalendar();'></select>"+
    "<select name=tmpMonthSelect onblur='parent.meizz_hiddenSelect(this)' style='z-index:1; position:absolute;top:3;left:74;display:none'"+
    " onchange='parent.WebCalendar.thisMonth=this.value; parent.meizz_hiddenSelect(this); parent.meizz_writeCalendar();'></select>"+

    "<table id=tableMain class=bg border=0 cellspacing=2 cellpadding=0>"+
    "<tr><td width=140 height=19 bgcolor='"+ WebCalendar.lightColor +"'>"+
    "    <table width=140 id=tableHead border=0 cellspacing=1 cellpadding=0><tr align=center>"+
    "    <td width=15 height=19 class=bg title='向前翻 1 月' style='cursor: hand' onclick='parent.meizz_prevM()'><b>&lt;</b></td>"+
    "    <td width=60 id=meizzYearHead  title='点击此处选择年份' onclick='parent.meizz_funYearSelect(parseInt(this.innerText, 10))'"+
    "        onmouseover='this.bgColor=parent.WebCalendar.darkColor; this.style.color=parent.WebCalendar.lightColor'"+
    "        onmouseout='this.bgColor=parent.WebCalendar.lightColor; this.style.color=parent.WebCalendar.wordColor'></td>"+
    "    <td width=50 id=meizzYearMonth title='点击此处选择月份' onclick='parent.meizz_funMonthSelect(parseInt(this.innerText, 10))'"+
    "        onmouseover='this.bgColor=parent.WebCalendar.darkColor; this.style.color=parent.WebCalendar.lightColor'"+
    "        onmouseout='this.bgColor=parent.WebCalendar.lightColor; this.style.color=parent.WebCalendar.wordColor'></td>"+
    "    <td width=15 class=bg title='向后翻 1 月' onclick='parent.meizz_nextM()' style='cursor: hand'><b>&gt;</b></td></tr></table>"+
    "</td></tr><tr><td height=20><table id=tableWeek border=1 width=140 cellpadding=0 cellspacing=0 ";
    if(WebCalendar.drag){strIframe += "onmousedown='dragStart()' onmouseup='drag=false' onmouseout='drag=false'";}
    strIframe += " borderColorLight='"+ WebCalendar.darkColor +"' borderColorDark='"+ WebCalendar.darkColor +"'>"+
    "    <tr align=center><td height=20>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr></table>"+
    "</td></tr><tr><td valign=top width=140 bgcolor='"+ WebCalendar.lightColor +"'>"+
    "    <table id=tableDay height=120 width=140 border=0 cellspacing=1 cellpadding=0>";
         for(var x=0; x<5; x++){ strIframe += "<tr>";
         for(var y=0; y<7; y++)  strIframe += "<td class=out id='meizzDay"+ (x*7+y) +"'></td>"; strIframe += "</tr>";}
         strIframe += "<tr>";
         for(var x=35; x<39; x++) strIframe += "<td class=out id='meizzDay"+ x +"'></td>";
         strIframe +="<td colspan=3 class=out title='"+ WebCalendar.regInfo +"'><input style=' background-color: "+
         WebCalendar.dayBgColor +";cursor: hand; padding-top: 3px; width: 50%; height: 100%; border: 0px' onfocus='this.blur()'"+
         " type=button value='清除' title='清除已选择的日期' onclick='parent.meizz_clearDate()'><input style=' background-color: "+
         WebCalendar.dayBgColor +";cursor: hand; padding-top: 3px; width: 49%; height: 100%; border: 0px' onfocus='this.blur()'"+
         " type=button value='关闭' title='关闭日期选择框' onclick='parent.meizz_hiddenCalendar()'></td></tr></table>"+
    "</td></tr><tr><td height=20 width=140 bgcolor='"+ WebCalendar.lightColor +"'>"+
    "    <table border=0 cellpadding=1 cellspacing=0 width=140>"+
    "    <tr><td><input name=prevYear title='向前翻 1 年' onclick='parent.meizz_prevY()' type=button value='&lt;&lt;'"+
    "    onfocus='this.blur()' style='meizz:expression(this.disabled=parent.WebCalendar.thisYear==1000)'><input"+
    "    onfocus='this.blur()' name=prevMonth title='向前翻 1 月' onclick='parent.meizz_prevM()' type=button value='&lt;&nbsp;'>"+
    "    </td><td align=center><input name=today type=button value='今天' onfocus='this.blur()' style='width: 50' title='当前日期'"+
    "    onclick=\"parent.meizz_returnDate(new Date().getDate() +'/'+ (new Date().getMonth() +1) +'/'+ new Date().getFullYear())\">"+
    "    </td><td align=right><input title='向后翻 1 月' name=nextMonth onclick='parent.meizz_nextM()' type=button value='&nbsp;&gt;'"+
    "    onfocus='this.blur()'><input name=nextYear title='向后翻 1 年' onclick='parent.meizz_nextY()' type=button value='&gt;&gt;'"+
    "    onfocus='this.blur()' style='meizz:expression(this.disabled=parent.WebCalendar.thisYear==9999)'></td></tr></table>"+
    "</td></tr><table></form></body></html>";
    with(WebCalendar.iframe)
    {
        document.writeln(strIframe); document.close();
        for(var i=0; i<39; i++)
        {
            WebCalendar.dayObj[i] = eval("meizzDay"+ i);
            WebCalendar.dayObj[i].onmouseover = meizz_dayMouseOver;
            WebCalendar.dayObj[i].onmouseout  = meizz_dayMouseOut;
            WebCalendar.dayObj[i].onclick     = meizz_returnDate;
        }
    }
}
function meizz_TWebCalendar()
{
    this.regInfo    = "";
    this.daysMonth  = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    this.day        = new Array(39);
    this.dayObj     = new Array(39);
    this.dateStyle  = null;
    this.objExport  = null;
    this.eventSrc   = null;
    this.inputDate  = null;
    this.thisYear   = new Date().getFullYear();
    this.thisMonth  = new Date().getMonth()+ 1;
    this.thisDay    = new Date().getDate();
    this.today      = this.thisDay +"/"+ this.thisMonth +"/"+ this.thisYear;
    this.iframe     = window.frames("meizzCalendarIframe");
    this.calendar   = meizz_getObjectById("meizzCalendarLayer");
    this.dateReg    = "";

    this.yearFall   = 100;          //定义年下拉框的年差值
    this.format     = "yyyy-mm-dd"; //回传日期的格式
    this.timeShow   = false;        //是否返回时间
    this.drag       = false;        //是否允许拖动
    this.darkColor  = "#777777";    //控件的暗色
    this.lightColor = "#f8f8f8";    //控件的亮色
    this.btnBgColor = "#e3e3e3";    //控件的按钮背景色
    this.wordColor  = "#000000";    //控件的文字颜色
    this.wordDark   = "#f8f8f8";    //控件的暗文字颜色
    this.dayBgColor = "#f8f8f8";    //日期数字背景色
    this.todayColor = "#cc0000";    //今天在日历上的标示背景色
    this.DarkBorder = "#f8f8f8";    //日期显示的立体表达色
}
var WebCalendar = new meizz_TWebCalendar();

function meizz_calendar() //主调函数
{
    var e = window.event.srcElement;
    meizz_writeIframe();
    var o = WebCalendar.calendar.style;
    WebCalendar.eventSrc = e;
	if(arguments.length == 0) WebCalendar.objExport = e;
    else WebCalendar.objExport = eval(arguments[0]);
    
    var wo = WebCalendar.objExport;
    WebCalendar.iframe.tableWeek.style.cursor = WebCalendar.drag ? "move" : "default";
	var t = wo.offsetTop,  h = wo.clientHeight, l = wo.offsetLeft, p = wo.type;
	while (wo = wo.offsetParent){t += wo.offsetTop; l += wo.offsetLeft;}
    o.display = ""; WebCalendar.iframe.document.body.focus();
    var cw = WebCalendar.calendar.clientWidth, ch = WebCalendar.calendar.clientHeight;
    var dw = document.body.clientWidth, dl = document.body.scrollLeft, dt = document.body.scrollTop;
    
    if (document.body.clientHeight + dt - t - h >= ch) o.top = (p=="image")? t + h : t + h + 2;
    else o.top  = (t - dt < ch) ? ((p=="image")? t + h : t + h + 2) : t - ch;
    if (dw + dl - l >= cw) o.left = l;
    else o.left = (dw >= cw) ? dw - cw + dl : dl;

    if  (!WebCalendar.timeShow) WebCalendar.dateReg = /^(\d{1,4})(-|\/|.)(\d{1,2})\2(\d{1,2})$/;
    else WebCalendar.dateReg = /^(\d{1,4})(-|\/|.)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;

    try{
        if (WebCalendar.objExport.value.trim() != ""){
            WebCalendar.dateStyle = WebCalendar.objExport.value.trim().match(WebCalendar.dateReg);
            if (WebCalendar.dateStyle == null)
            {
                WebCalendar.thisYear   = new Date().getFullYear();
                WebCalendar.thisMonth  = new Date().getMonth()+ 1;
                WebCalendar.thisDay    = new Date().getDate();
                alert("提示：原文本框中的日期格式有错误。");
                meizz_writeCalendar(); return false;
            }
            else
            {
                WebCalendar.thisYear   = parseInt(WebCalendar.dateStyle[1], 10);
                WebCalendar.thisMonth  = parseInt(WebCalendar.dateStyle[3], 10);
                WebCalendar.thisDay    = parseInt(WebCalendar.dateStyle[4], 10);
                WebCalendar.inputDate  = parseInt(WebCalendar.thisDay, 10) +"/"+ parseInt(WebCalendar.thisMonth, 10) +"/"+ 
                parseInt(WebCalendar.thisYear, 10); meizz_writeCalendar();
            }
        }  else meizz_writeCalendar();
    }  catch(e){meizz_writeCalendar();}
}
function meizz_funMonthSelect()
{
    var m = isNaN(parseInt(WebCalendar.thisMonth, 10)) ? new Date().getMonth() + 1 : parseInt(WebCalendar.thisMonth);
    var e = WebCalendar.iframe.document.forms[0].tmpMonthSelect;
    for (var i=1; i<13; i++) e.options.add(new Option(i +"月", i));
    e.style.display = ""; e.value = m; e.focus(); window.status = e.style.top;
}
function meizz_funYearSelect()
{
    var n = WebCalendar.yearFall;
    var e = WebCalendar.iframe.document.forms[0].tmpYearSelect;
    var y = isNaN(parseInt(WebCalendar.thisYear, 10)) ? new Date().getFullYear() : parseInt(WebCalendar.thisYear);
        y = (y <= 1000)? 1000 : ((y >= 9999)? 9999 : y);
    var min = (y - n >= 1000) ? y - n : 1000;
    var max = (y + n <= 9999) ? y + n : 9999;
        min = (max == 9999) ? max-n*2 : min;
        max = (min == 1000) ? min+n*2 : max;
    for (var i=min; i<=max; i++)
    {
        e.options[e.options.length] = new Option(i +"年", i+"", true, true);
    }
    e.style.display = "";
    e.value = y; e.focus();
}
function meizz_prevM()
{
    WebCalendar.thisDay = 1;
    if (WebCalendar.thisMonth==1)
    {
        WebCalendar.thisYear--;
        WebCalendar.thisMonth=13;
    }
    WebCalendar.thisMonth--; meizz_writeCalendar();
}
function meizz_nextM()
{
    WebCalendar.thisDay = 1;
    if (WebCalendar.thisMonth==12)
    {
        WebCalendar.thisYear++;
        WebCalendar.thisMonth=0;
    }
    WebCalendar.thisMonth++; meizz_writeCalendar();
}
function meizz_prevY(){WebCalendar.thisDay = 1; WebCalendar.thisYear--; meizz_writeCalendar();}
function meizz_nextY(){WebCalendar.thisDay = 1; WebCalendar.thisYear++; meizz_writeCalendar();}
function meizz_hiddenSelect(e){for(var i=e.options.length; i>-1; i--)e.options.remove(i); e.style.display="none";}
function meizz_getObjectById(id){ if(document.all) return(eval("document.all."+ id)); return(eval(id)); }
function meizz_hiddenCalendar(){meizz_getObjectById("meizzCalendarLayer").style.display = "none";};
function meizz_appendZero(n){return(("00"+ n).substr(("00"+ n).length-2));}
function String.prototype.trim(){return this.replace(/(^\s*)|(\s*$)/g,"");}
function meizz_dayMouseOver()
{
    this.className = "over";
    this.style.backgroundColor = WebCalendar.darkColor;
    if(WebCalendar.day[this.id.substr(8)].split("/")[1] == WebCalendar.thisMonth)
    this.style.color = WebCalendar.lightColor;
}
function meizz_dayMouseOut()
{
    this.className = "out"; var d = WebCalendar.day[this.id.substr(8)], a = d.split("/");
    this.style.removeAttribute('backgroundColor');
    if(a[1] == WebCalendar.thisMonth && d != WebCalendar.today)
    {
        if(WebCalendar.dateStyle && a[0] == parseInt(WebCalendar.dateStyle[4], 10))
        this.style.color = WebCalendar.lightColor;
        this.style.color = WebCalendar.wordColor;
    }
}
function meizz_writeCalendar()
{
    var y = WebCalendar.thisYear;
    var m = WebCalendar.thisMonth; 
    var d = WebCalendar.thisDay;
    WebCalendar.daysMonth[1] = (0==y%4 && (y%100!=0 || y%400==0)) ? 29 : 28;
    if (!(y<=9999 && y >= 1000 && parseInt(m, 10)>0 && parseInt(m, 10)<13 && parseInt(d, 10)>0)){
        alert("提示：你输入了错误的日期。");
        WebCalendar.thisYear   = new Date().getFullYear();
        WebCalendar.thisMonth  = new Date().getMonth()+ 1;
        WebCalendar.thisDay    = new Date().getDate(); }
    y = WebCalendar.thisYear;
    m = WebCalendar.thisMonth;
    d = WebCalendar.thisDay;
    WebCalendar.iframe.meizzYearHead.innerText  = y +" 年";
    WebCalendar.iframe.meizzYearMonth.innerText = parseInt(m, 10) +" 月";
    WebCalendar.daysMonth[1] = (0==y%4 && (y%100!=0 || y%400==0)) ? 29 : 28;
    var w = new Date(y, m-1, 1).getDay();
    var prevDays = m==1  ? WebCalendar.daysMonth[11] : WebCalendar.daysMonth[m-2];
    for(var i=(w-1); i>=0; i--)
    {
        WebCalendar.day[i] = prevDays +"/"+ (parseInt(m, 10)-1) +"/"+ y;
        if(m==1) WebCalendar.day[i] = prevDays +"/"+ 12 +"/"+ (parseInt(y, 10)-1);
        prevDays--;
    }
    for(var i=1; i<=WebCalendar.daysMonth[m-1]; i++) WebCalendar.day[i+w-1] = i +"/"+ m +"/"+ y;
    for(var i=1; i<39-w-WebCalendar.daysMonth[m-1]+1; i++)
    {
        WebCalendar.day[WebCalendar.daysMonth[m-1]+w-1+i] = i +"/"+ (parseInt(m, 10)+1) +"/"+ y;
        if(m==12) WebCalendar.day[WebCalendar.daysMonth[m-1]+w-1+i] = i +"/"+ 1 +"/"+ (parseInt(y, 10)+1);
    }
    for(var i=0; i<39; i++)
    {
        var a = WebCalendar.day[i].split("/");
        WebCalendar.dayObj[i].innerText    = a[0];
        WebCalendar.dayObj[i].title        = a[2] +"-"+ meizz_appendZero(a[1]) +"-"+ meizz_appendZero(a[0]);
        WebCalendar.dayObj[i].bgColor      = WebCalendar.dayBgColor;
        WebCalendar.dayObj[i].style.color  = WebCalendar.wordColor;
        if ((i<10 && parseInt(WebCalendar.day[i], 10)>20) || (i>27 && parseInt(WebCalendar.day[i], 10)<12))
            WebCalendar.dayObj[i].style.color = WebCalendar.wordDark;
        if (WebCalendar.inputDate==WebCalendar.day[i])
        {WebCalendar.dayObj[i].bgColor = WebCalendar.darkColor; WebCalendar.dayObj[i].style.color = WebCalendar.lightColor;}
        if (WebCalendar.day[i] == WebCalendar.today)
        {WebCalendar.dayObj[i].bgColor = WebCalendar.todayColor; WebCalendar.dayObj[i].style.color = WebCalendar.lightColor;}
    }
}
function meizz_returnDate()
{
    if(WebCalendar.objExport)
    {
        var returnValue;
        var a = (arguments.length==0) ? WebCalendar.day[this.id.substr(8)].split("/") : arguments[0].split("/");
        var d = WebCalendar.format.match(/^(\w{4})(-|\/|.|)(\w{1,2})\2(\w{1,2})$/);
        if(d==null){alert("提示：你设定的日期输出格式不正确！\r\n\r\n请重新定义 WebCalendar.format ！"); return false;}
        var flag = d[3].length==2 || d[4].length==2;
        returnValue = flag ? a[2] +d[2]+ meizz_appendZero(a[1]) +d[2]+ meizz_appendZero(a[0]) : a[2] +d[2]+ a[1] +d[2]+ a[0];
        if(WebCalendar.timeShow)
        {
            var h = new Date().getHours(), m = new Date().getMinutes(), s = new Date().getSeconds();
            returnValue += flag ? " "+ meizz_appendZero(h) +":"+ meizz_appendZero(m) +":"+ meizz_appendZero(s) : " "+  h  +":"+ m +":"+ s;
        }
        WebCalendar.objExport.value = returnValue;
        meizz_hiddenCalendar();
    }
}
function meizz_clearDate()
{
	WebCalendar.thisYear = new Date().getFullYear();
	WebCalendar.thisMonth = new Date().getMonth() + 1;
	WebCalendar.thisDay = new Date().getDate();
	WebCalendar.inputDate = WebCalendar.today = WebCalendar.thisDay + "/" + WebCalendar.thisMonth + "/" + WebCalendar.thisYear;
	WebCalendar.objExport.value = "";
	meizz_hiddenCalendar();
}
function document.onclick()
{
    if(WebCalendar.eventSrc != window.event.srcElement) meizz_hiddenCalendar();
}