CREATE TABLE [dbo].[Tweet] (
    [Id]           BIGINT         NOT NULL,
    [Text]         NVARCHAR (140) NOT NULL,
    [RetweetCount] INT            NULL,
    [Image]        NVARCHAR (140) NULL,
    [Time]         NVARCHAR (140) NULL,
    CONSTRAINT [PK_Subscription] PRIMARY KEY CLUSTERED ([Id] ASC)
);

