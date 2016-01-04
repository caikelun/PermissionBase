USE master
GO

/* 删除数据库 */
DROP DATABASE PermissionBase
GO

/* 删除登陆名 */
EXEC sp_droplogin 'PB_DB_USER'
GO