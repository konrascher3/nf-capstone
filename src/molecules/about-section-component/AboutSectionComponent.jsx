import React, { useState } from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

import HTMLparse from "html-react-parser";


const AboutSectionComponent = () => {
	const detailData = useStore((state) => state.detailData);

	const [showMore, setShowMore] = useState(false);

	// if the about-text exceeds 250 chars, the about section is rendered within a
	// MUI-collapse-component.
	const maxDetailLength = 250;

	return (
		<>
			{detailData.description.en && (
				<Box>
					<Card sx={{
						ml: .75,
						mr: .75,
						p: 1.25,
						overflow: "hidden",
						position: "relative",
						zIndex: 0
					}}
					>
						<img
							src={`${detailData.image.large}`}
							alt={`Project-avatar of ${detailData.name}`}
							style={{
								top: -60,
								right: -60,
								width: 200,
								position: "absolute",
								zIndex: -1,
								opacity: 0.20,
								filter: "grayscale(50%)" }}
						/>
						<Box sx={{ zIndex: 1 }}>
							<Stack spacing={.75}>
								{detailData?.description.en.length > maxDetailLength
									?
										<Collapse in={showMore} collapsedSize={200}>
											<Box sx={{ pb: showMore ? 3.5 : 0 }}>
												<Typography
													variant="h6"
													sx={{ fontWeight: 600 }}
												>
													About {`${detailData.name} (${detailData.symbol.toUpperCase()})`}
												</Typography>
												<Typography
													variant="body1"
													display="inline"
												>
													{HTMLparse(`${detailData.description.en}`)}
												</Typography>
											</Box>
										</Collapse>
									:
										<Box
											sx={{
												// border: "1px solid red",
												pb: showMore
													? 3.5
													: 0
											}}
										>
											<Typography
												variant="h6"
												sx={{ fontWeight: 600 }}
											>
												About {`${detailData.name} (${detailData.symbol.toUpperCase()})`}
											</Typography>
											<Typography
												variant="body1"
												display="inline"
											>
												{HTMLparse(`${detailData.description.en}`)}
											</Typography>
										</Box>}
								{ detailData?.description.en.length > maxDetailLength
									?
										<Box style={{
											position: "absolute",
											bottom: 0,
											right: 0,
											display: "block",
											width: "100%",
											height: 80,
											paddingBottom: 40,
											paddingTop: 150,
											textAlign: "center",
											backgroundImage: showMore ? "" : "linear-gradient(to bottom, transparent, white 90%)"}}
										>
											{ detailData?.description.en.length > maxDetailLength ?
												<Button
													sx={{ pb: 1 }}
													onClick={() => {
														setShowMore(!showMore);
													}}
												>
													{showMore ? "show less" : "show more"}
												</Button> : ""}
										</Box> : ""}
							</Stack>
						</Box>
					</Card>
				</Box>)}
		</>
	)
}

export default AboutSectionComponent
