--Reference Data for Tweet 
MERGE INTO Tweet AS Target 
USING (VALUES 
  (N'I''m a tweet'),
  (N'Also a tweet')
) 
AS Source ([Text]) 
ON Target.[Text] = Source.[Text] 
--update matched rows 
WHEN MATCHED THEN 
UPDATE SET [Text] = Source.[Text] 
--insert new rows 
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([Text]) 
VALUES ([Text]);