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

TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)

import placeholderSvg from "/src/ions/img/placeholder/placeholder.svg"
// TODO: Refactor to components; map within this component to avoid prop-drilling
const NewsCard = ({ article }) => {
	return (
		<Card key={article.source.id} sx={{ borderRadius: 4.5 }} elevation={2}>
			<CardActionArea href={article.url} target="_blank">
				<CardContent sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "start",
					gap: .5,
				}}
				>
					<Box sx={{display: "flex",
					}}
					>
						{ article.urlToImage  ?
							<CardMedia
								sx={{
								border: "1px solid #D3D3D366",
								height: 75,
								width: 75,
								borderRadius: 2,
								}}
								component="img"
								image={article.urlToImage}
								alt={`Article-preview from ${article.source.name}`}
							/> :
							<CardMedia
								sx={{
									border: "1px solid #D3D3D366",
									height: 75,
									width: 75,
									borderRadius: 2,
								}}
								component="img"
								image={placeholderSvg.src}
								alt={`Article-preview from ${article.source.name}`}
							/>}
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
							{/*TODO: fix no-wrap ... for long titles*/}
							<Box sx={{
								width: "100%",
								overflow:"hidden",
								whiteSpace: "wrap",
								maxHeight: 50
							}}
							>
								<Typography
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
								m: 0,
								justifyContent: "start",
								alignItems: "center"
							}}
							>
								{/* TODO: Fix wrap: no-wrap for long source-names and time-ago*/}
								<Typography
									variant="caption"
									color="text.secondary"
								>
									{article.source.name.split(".")[0]}
								</Typography>
								<Box sx={{ ml: .75, mr: .75 }}>
									<Typography variant="caption" color="text.secondary">
										•
									</Typography>
								</Box>
								<Typography variant="caption" color="text.secondary">
									<ReactTimeAgo date={Date.parse(article.publishedAt)} locale="en-US" timeStyle="round-minute"/>
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
