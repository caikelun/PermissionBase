using System;
using Nullables;

namespace PermissionBase.Core.DTO
{
	/// <summary>
	/// 前台用户。
	/// </summary>
	public class UserDTO
	{
        public string LoginId;
        public string Password;
        public string Name;
        public NullableInt32 Sex;
        public NullableDateTime Birthday;
        public string IdCard;
        public string OfficePhone;
        public string FamilyPhone;
        public string CellPhone;
        public string Email;
        public string Address;
        public string ZipCode;
        public string Remark;
        public int Disabled;
        public DateTime RegisterDate;
    }
}
