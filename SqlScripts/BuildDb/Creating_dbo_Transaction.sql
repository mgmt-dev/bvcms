CREATE TABLE [dbo].[Transaction]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[TransactionDate] [datetime] NULL,
[TransactionGateway] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[DatumId] [int] NULL,
[testing] [bit] NULL,
[amt] [money] NULL,
[ApprovalCode] [nvarchar] (150) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Approved] [bit] NULL,
[TransactionId] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Message] [nvarchar] (150) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[AuthCode] [nvarchar] (150) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[amtdue] [money] NULL,
[URL] [nvarchar] (300) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Description] [nvarchar] (180) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Name] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Address] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[City] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[State] [nvarchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Zip] [nvarchar] (15) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Phone] [nvarchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Emails] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Participants] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[OrgId] [int] NULL,
[OriginalId] [int] NULL,
[regfees] [money] NULL,
[donate] [money] NULL,
[fund] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[financeonly] [bit] NULL,
[voided] [bit] NULL,
[credited] [bit] NULL,
[coupon] [bit] NULL,
[moneytran] AS (CONVERT([bit],case  when [amt]<>(0) AND [approved]=(1) then (1) else (0) end,(0))),
[settled] [datetime] NULL,
[batch] [datetime] NULL,
[batchref] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[batchtyp] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[fromsage] [bit] NULL,
[LoginPeopleId] [int] NULL,
[First] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[MiddleInitial] [nvarchar] (1) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Last] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Suffix] [nvarchar] (10) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[AdjustFee] [bit] NULL,
[LastFourCC] [nvarchar] (4) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[LastFourACH] [nvarchar] (4) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[PaymentType] [nvarchar] (1) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Address2] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Country] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
