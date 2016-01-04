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
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public partial class Admin_Modules_ModuleMgr_ModuleTypeInfo : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_ModuleMgr_ModuleTypeInfo));

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);

        try
        {
            if(Request.QueryString["mode"] == "new")
            {
                divTitleMess.InnerText = "新增模块分类";
            }
            else if(Request.QueryString["mode"] == "edit")
            {
                divTitleMess.InnerText = "编辑模块分类";

                string id = Request.QueryString["id"];
                if(id != null)
                {
                    ModuleType mt = CommonSrv.LoadObjectById(typeof(ModuleType), id) as ModuleType;
                    txtModuleTypeName.Value = mt.Name;
                    txtModuleTypeOrderId.Value = mt.OrderId.ToString();
                    txtaModuleTypeRemark.Value = mt.Remark;
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
