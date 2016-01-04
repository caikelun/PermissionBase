var __ie6 = /msie 6/i.test(window.navigator.userAgent);

function OpenDialogHelper(){};

OpenDialogHelper.openModalDlg = function(sPath, oArgs, iX, iY)
{
    //在实际部署使用时，应打开下面一行代码的注释。
    //
    //因为站点一般不会被用户设置为Local intranet，所以IE6模态窗口中会出现状态栏，
    //并且IE6的模态窗口高度指整个窗口的高度，而不是窗口中可用显示区域的高度。
    //因此状态栏会挡住窗口下部的界面，影响使用。
    //
    if(__ie6) iY += 20;
    
    //IE7中的dialogWidth和dialogHeight参数的值所指的宽和高，不包括窗口的标题栏和外边框。IE6包括。
    //可惜客户端界面风格无法通过脚本获得。在WinXP和WinClassic风格中，标题栏的高度是不同的。
    if(__ie6)
    {
        iX += 6;
        iY += 32;   //WinXP界面风格
        //iY += 25; //WinClassic界面风格
    }
    
	return window.showModalDialog(sPath, oArgs, "dialogWidth:" + iX + "px;dialogHeight:" + iY + "px;help:0;status:0;scroll:0;center:1");
};