CREATE TABLE [dbo].[MobileAppVideoTypes]
(
[id] [int] NOT NULL IDENTITY(1, 1),
[name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_MobileAppVideoTypes_name] DEFAULT ('')
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
