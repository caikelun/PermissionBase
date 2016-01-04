using System;
using Nullables;

namespace PermissionBase.Core.DTO
{
	/// <summary>
	/// 职员。
	/// </summary>
	public class StaffDTO
	{
        public string LoginId;
        public string Password;
        public string Code;
        public string Name;
        public NullableInt32 Sex;
        public NullableInt32 Married;
        public string IdCard;
        public string CountryTag;
        public string NationTag;
        public string PositionTag;
        public string TitleTag;
        public string PoliticalAppearanceTag;
        public string DegreeTag;
        public NullableDateTime Birthday;
        public NullableDateTime EntersDay;
        public NullableDateTime LeavesDay;
        public string OfficePhone;
        public string ExtNumber;
        public string FamilyPhone;
        public string CellPhone;
        public string Email;
        public string Address;
        public string ZipCode;
        public string Remark;
        public int IsInnerUser;
        public int Disabled;
        public int OrderId;
        public string DepartmentId;
    }
}
