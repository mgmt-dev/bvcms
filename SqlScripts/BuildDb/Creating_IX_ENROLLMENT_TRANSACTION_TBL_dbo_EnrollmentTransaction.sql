CREATE NONCLUSTERED INDEX [IX_ENROLLMENT_TRANSACTION_TBL] ON [dbo].[EnrollmentTransaction] ([TransactionDate])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
