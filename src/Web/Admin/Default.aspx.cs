using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Collections.Specialized;
using System.Text.RegularExpressions;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;
using PermissionBase.Core.Util;

public partial class Admin_Default : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Default));

    private bool loginSuccessfully = false;

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                //检查客户端浏览器及版本。
                if (!new Regex("MSIE [6789]").IsMatch(Request.UserAgent.ToUpper()))
                {
                    Response.Redirect("../Admin_Others/improperBrowser.htm", true);
                }

                //设置登录ID及输入焦点。
                if (Request.Cookies["LoginId"] != null)
                {
                    tbLoginId.Text = Request.Cookies["LoginId"].Value;
                    tbPassword.Focus();
                }
                else
                {
                    tbLoginId.Focus();
                }

                //填充界面样式下拉选择框。
                NameValueCollection nvc = (NameValueCollection)ConfigurationManager.GetSection("interfaceStyle");
                for (int i = 0; i < nvc.Count; i++)
                {
                    ddlInterfaceStyle.Items.Add(new ListItem(nvc[nvc.GetKey(i)], nvc.GetKey(i)));
                }
                HttpCookie hc = Request.Cookies["InterfaceStyle"];
                if (hc != null)
                {
                    ListItem li = ddlInterfaceStyle.Items.FindByValue(hc.Value);
                    if (li != null)
                    {
                        li.Selected = true;
                    }
                }
            }

            panelErrorPassword.Visible = false;
            panelStaffDisabled.Visible = false;
            panelErrorValidCode.Visible = false;
        }
        catch (Exception ex)
        {
            log.Error(null, ex);
            throw;
        }
    }

    protected void Page_PreRender(object sender, EventArgs e)
    {
        try
        {
            if (!loginSuccessfully)
            {
                tbValidCode.Text = "";

                //在Cookie中放置一个随机数用作验证码。
                Response.Cookies["AreYouHuman"].Value = StringSecurity.DESEncrypt(CaptchaImage.GenerateRandomCode());
            }
        }
        catch (Exception ex)
        {
            log.Error(null, ex);
            throw;
        }
    }

    protected void btnLogin_Click(object sender, EventArgs e)
    {
        try
        {
            if(Page.IsValid)
            {
                //验证验证码。
                if (tbValidCode.Text != StringSecurity.DESDecrypt(Request.Cookies["AreYouHuman"].Value))
                {
                    panelErrorValidCode.Visible = true;
                    tbPassword.Focus();
                    return;
                }

                //验证登录ID和密码。
                Staff s = StaffSrv.GetStaffByLoginIdAndPassword(tbLoginId.Text.Trim(), tbPassword.Text.Trim());
                if(s == null)
                {
                    panelErrorPassword.Visible = true;
                    tbPassword.Focus();
                    return;
                }
                else
                {
                    if(s.Disabled == 1)//被禁用。
                    {
                        panelStaffDisabled.Visible = true;
                        tbLoginId.Focus();
                        return;
                    }
                }

                //在Cookie中保存登录ID。
                HttpCookie hcLoginId = new HttpCookie("LoginId", s.LoginId);
                hcLoginId.Expires = DateTime.Now.AddMonths(1);
                Response.Cookies.Add(hcLoginId);

                //在Cookie中保存界面样式选择。
                HttpCookie hcInterfaceStyle = new HttpCookie("InterfaceStyle", ddlInterfaceStyle.SelectedValue);
                hcInterfaceStyle.Expires = DateTime.Now.AddMonths(1);
                Response.Cookies.Add(hcInterfaceStyle);

                //保存登录信息。
                SessionUtil.SavaStaffSession(new StaffSession(s.LoginId, s.IsInnerUser));
                FormsAuthentication.RedirectFromLoginPage(s.LoginId, false);

                //登陆成功。
                loginSuccessfully = true;
            }
        }
        catch (Exception ex)
        {
            log.Error(null, ex);
            throw;
        }
    }

}
