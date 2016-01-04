<%@ WebHandler Language="C#" Class="ValidImage" %>

using System;
using System.Web;
using System.Drawing.Imaging;
using PermissionBase.Core.Util;

public class ValidImage : IHttpHandler
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(ValidImage));

    public void ProcessRequest(HttpContext context)
    {
        try
        {
            context.Response.ContentType = "image/jpeg";
            string str = StringSecurity.DESDecrypt(context.Request.Cookies["AreYouHuman"].Value);
            using (CaptchaImage ci = new CaptchaImage(str, 156, 40))
            {
                ci.Image.Save(context.Response.OutputStream, ImageFormat.Jpeg);
            }
        }
        catch (Exception ex)
        {
            log.Error(null, ex);
            throw;
        }
    }
 
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}