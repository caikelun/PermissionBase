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
using System.Text;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public partial class Admin_Modules_ModuleMgr_ModuleInfo : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_ModuleMgr_ModuleInfo));

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);

        try
        {
            //模块权限。
            SysCodeType sct = SysCodeTypeSrv.GetSysCodeTypeByTag("rights");

            StringBuilder sb = new StringBuilder();

            if(Request.QueryString["mode"] == "new")
            {
                divTitleMess.InnerText = "新增模块";

                if(sct != null)
                {
                    for(int i = 0; i < sct.SysCodes.Count; i++)
                    {
                        SysCode sc = sct.SysCodes[i] as SysCode;
                        sb.Append("<div><input type=checkbox id='" + sc.Tag + "' />" + sc.Name + "</div>");
                    }
                    divRights.InnerHtml = sb.ToString();
                }
            }
            else if(Request.QueryString["mode"] == "edit")
            {
                divTitleMess.InnerText = "编辑模块";

                string id = Request.QueryString["id"];
                if(id != null)
                {
                    Module m = CommonSrv.LoadObjectById(typeof(Module), id) as Module;
                    txtModuleTag.Value = m.Tag;
                    txtModuleName.Value = m.Name;
                    txtModuleOrderId.Value = m.OrderId.ToString();
                    txtaModuleRemark.Value = m.Remark;
                    txtModuleModuleUrl.Value = m.ModuleUrl;
                    cbModuleDisabled.Checked = (m.Disabled == 1);

                    if(sct != null)
                    {
                        for(int i = 0; i < sct.SysCodes.Count; i++)
                        {
                            SysCode sc = sct.SysCodes[i] as SysCode;
                            if (m.ModuleRights.Contains(sc.Tag))
                            {
                                sb.Append("<div><input type=checkbox checked id='" + sc.Tag + "' />" + sc.Name + "</div>");
                            }
                            else
                            {
                                sb.Append("<div><input type=checkbox id='" + sc.Tag + "' />" + sc.Name + "</div>");
                            }
                        }
                        divRights.InnerHtml = sb.ToString();
                    }
                }
            }
        }
        catch (Exception ex)
        {
            ClientScript.RegisterClientScriptBlock(this.GetType(), "error", "<script type=\"text/javascript\">error=true;</script>");
            log.Error(null, ex);
        }
    }
}
