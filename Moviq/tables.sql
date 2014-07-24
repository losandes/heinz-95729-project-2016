USE [Moviq]
GO

/****** Object:  Table [dbo].[Products]    Script Date: 7/23/2014 11:10:01 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Products](
	[Id] [int] identity NOT NULL,
	[Title] [nvarchar](256) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[Metadata] [nvarchar](max) NOT NULL,
	[ThumbnailLink] [nvarchar](3000) NOT NULL,
	[Price] [money] NOT NULL,
	[TimeCreated] [datetime] NOT NULL default(GETUTCDATE()),
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO