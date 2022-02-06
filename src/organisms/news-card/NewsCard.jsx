import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import ReactTimeAgo from "react-time-ago";

// Time ago
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)


const NewsCard = ({ article }) => {

	return (
		<Card sx={{ borderRadius: 4.5 }} elevation={2}>
			<CardActionArea href={article.link} target="_blank">
				<CardContent sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "start",
					gap: .5,
					height: 120 }}
				>
					<Box sx={{display: "flex",
					}}
					>
						<CardMedia
							sx={{
								border: "1px solid #D3D3D366",
								height: 75,
								width: 75,
								borderRadius: 2 }}
							component="img"
							image={article.media}
							alt={article.title}
						/>
						<Box sx={{
							pl: 1,
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							width: "100%",
							overflow:"hidden",
							whiteSpace: "wrap",
						}}
						>
							<Box sx={{
								width: "100%",
								overflow:"hidden",
								whiteSpace: "wrap",
								maxHeight: 40
							}}
							>
								<Typography
									variant="subtitle2"
									color="text.primary"
									sx={{
										textOverflow: "ellipsis",
										overflow: "hidden",
										textTransform: "capitalize"}}
								>
									{article.title.toLowerCase()}
								</Typography>
							</Box>
							<Box sx={{
								display: "flex",
								m: 0
							}}
							>
								<Typography
									variant="caption"
									color="text.secondary"
									sx={{ textTransform: "capitalize" }}
								>
									{article.clean_url.split(".")[0]}
								</Typography>
								<Box sx={{ ml: .75, mr: .75 }}>
									<Typography variant="caption" color="text.secondary">
										•
									</Typography>
								</Box>
								<Typography variant="caption" color="text.secondary">
									about <ReactTimeAgo date={article.published_date} locale="en-US" timeStyle="round-minute"/>
								</Typography>
							</Box>
						</Box>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default NewsCard
