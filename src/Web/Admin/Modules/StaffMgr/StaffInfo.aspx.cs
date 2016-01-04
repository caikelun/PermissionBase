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

public partial class Admin_Modules_StaffMgr_StaffInfo : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_StaffMgr_StaffInfo));

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);

        try
        {
            //填充下拉框。
            FillSelects();

            if (Request.QueryString["mode"] == "new")
            {
                divTitleMess.InnerText = "新增职员";
            }
            else if (Request.QueryString["mode"] == "edit")
            {
                divTitleMess.InnerText = "编辑职员";

                string id = Request.QueryString["id"];
                if (id != null)
                {
                    Staff s = CommonSrv.LoadObjectById(typeof(Staff), id) as Staff;

                    txtStaffLoginId.Value = s.LoginId;
                    txtStaffName.Value = s.Name;
                    cbStaffDisabled.Checked = (s.Disabled == 1);
                    txtStaffOrderId.Value = s.OrderId.ToString();
                    txtStaffIdCard.Value = s.IdCard;
                    txtStaffCode.Value = s.Code;
                    if (s.DegreeTag != null && s.DegreeTag.Length > 0)
                    {
                        ListItem liDegree = selectStaffDegree.Items.FindByValue(s.DegreeTag);
                        if (liDegree != null) liDegree.Selected = true;
                    }
                    if (s.Sex.HasValue)
                    {
                        ListItem liSex = selectStaffSex.Items.FindByValue(s.Sex.Value.ToString());
                        if (liSex != null) liSex.Selected = true;
                    }
                    if (s.PoliticalAppearanceTag != null && s.PoliticalAppearanceTag.Length > 0)
                    {
                        ListItem liPolitical = selectStaffPolitical.Items.FindByValue(s.PoliticalAppearanceTag);
                        if (liPolitical != null) liPolitical.Selected = true;
                    }
                    if (s.Married.HasValue)
                    {
                        ListItem liMarried = selectStaffMarried.Items.FindByValue(s.Married.Value.ToString());
                        if (liMarried != null) liMarried.Selected = true;
                    }
                    if (s.Birthday.HasValue)
                    {
                        txtStaffBirthday.Value = s.Birthday.Value.ToString("yyyy-MM-dd");
                    }
                    if (s.CountryTag != null && s.CountryTag.Length > 0)
                    {
                        ListItem liCountry = selectStaffCountry.Items.FindByValue(s.CountryTag);
                        if (liCountry != null) liCountry.Selected = true;
                    }
                    if (s.EntersDay.HasValue)
                    {
                        txtStaffEntersDay.Value = s.EntersDay.Value.ToString("yyyy-MM-dd");
                    }
                    if (s.NationTag != null && s.NationTag.Length > 0)
                    {
                        ListItem liNation = selectStaffNation.Items.FindByValue(s.NationTag);
                        if (liNation != null) liNation.Selected = true;
                    }
                    if (s.LeavesDay.HasValue)
                    {
                        txtStaffLeavesDay.Value = s.LeavesDay.Value.ToString("yyyy-MM-dd");
                    }
                    if (s.PositionTag != null && s.PositionTag.Length > 0)
                    {
                        ListItem liPosition = selectStaffPosition.Items.FindByValue(s.PositionTag);
                        if (liPosition != null) liPosition.Selected = true;
                    }
                    txtStaffOfficePhone.Value = s.OfficePhone;
                    if (s.TitleTag != null && s.TitleTag.Length > 0)
                    {
                        ListItem liTitle = selectStaffTitle.Items.FindByValue(s.TitleTag);
                        if (liTitle != null) liTitle.Selected = true;
                    }
                    txtStaffExtNumber.Value = s.ExtNumber;
                    txtStaffCellPhone.Value = s.CellPhone;
                    txtStaffFamilyPhone.Value = s.FamilyPhone;
                    txtStaffEmail.Value = s.Email;
                    txtStaffZipCode.Value = s.ZipCode;
                    txtaStaffRemark.Value = s.Remark;
                    txtaStaffAddress.Value = s.Address;
                }
            }
        }
        catch (Exception ex)
        {
            ClientScript.RegisterClientScriptBlock(this.GetType(), "error", "<script type=\"text/javascript\">error=true;</script>");
            log.Error(null, ex);
        }
    }

    #region private void FillSelects()
    private void FillSelects()
    {
        //国家。
        SysCodeType sctCountry = SysCodeTypeSrv.GetSysCodeTypeByTag("countrys");
        selectStaffCountry.Items.Add(new ListItem("", "-1"));
        foreach (SysCode sc in sctCountry.SysCodes)
        {
            selectStaffCountry.Items.Add(new ListItem(sc.Name, sc.Tag));
        }

        //民族。
        SysCodeType sctNation = SysCodeTypeSrv.GetSysCodeTypeByTag("nations");
        selectStaffNation.Items.Add(new ListItem("", "-1"));
        foreach (SysCode sc in sctNation.SysCodes)
        {
            selectStaffNation.Items.Add(new ListItem(sc.Name, sc.Tag));
        }

        //职位。
        SysCodeType sctPosition = SysCodeTypeSrv.GetSysCodeTypeByTag("positions");
        selectStaffPosition.Items.Add(new ListItem("", "-1"));
        foreach (SysCode sc in sctPosition.SysCodes)
        {
            selectStaffPosition.Items.Add(new ListItem(sc.Name, sc.Tag));
        }

        //职称。
        SysCodeType sctTitle = SysCodeTypeSrv.GetSysCodeTypeByTag("titles");
        selectStaffTitle.Items.Add(new ListItem("", "-1"));
        foreach (SysCode sc in sctTitle.SysCodes)
        {
            selectStaffTitle.Items.Add(new ListItem(sc.Name, sc.Tag));
        }

        //政治面貌。
        SysCodeType sctPolitical = SysCodeTypeSrv.GetSysCodeTypeByTag("politicals");
        selectStaffPolitical.Items.Add(new ListItem("", "-1"));
        foreach (SysCode sc in sctPolitical.SysCodes)
        {
            selectStaffPolitical.Items.Add(new ListItem(sc.Name, sc.Tag));
        }

        //最高学历。
        SysCodeType sctDegree = SysCodeTypeSrv.GetSysCodeTypeByTag("degrees");
        selectStaffDegree.Items.Add(new ListItem("", "-1"));
        foreach (SysCode sc in sctDegree.SysCodes)
        {
            selectStaffDegree.Items.Add(new ListItem(sc.Name, sc.Tag));
        }

        //性别。
        selectStaffSex.Items.Add(new ListItem("", "-1"));
        selectStaffSex.Items.Add(new ListItem("男", "0"));
        selectStaffSex.Items.Add(new ListItem("女", "1"));

        //婚否。
        selectStaffMarried.Items.Add(new ListItem("", "-1"));
        selectStaffMarried.Items.Add(new ListItem("未婚", "0"));
        selectStaffMarried.Items.Add(new ListItem("已婚", "1"));
    }
    #endregion

}
