import React from "react"

import Typography from  "@mui/material/Typography"
import useGet from "../../ions/hooks/fetch/get";

const marqueeContent = () => {
	const { data, loading, error } = useGet("../api/fetchGlobals");
	return (
		<>
			{loading ?? <Typography variant="caption">loading...</Typography>}
			{error && <Typography variant="caption">{error.message}</Typography>}
			{data &&
				<>
					<Typography variant="caption">{`Coins: ${data.Coins.toString()}`}</Typography>
					<Typography variant="caption">⠀•⠀</Typography>
					<Typography variant="caption">{`Exchanges: ${data.Exchanges.toString()}`}</Typography>
					<Typography variant="caption">⠀•⠀</Typography>
					<Typography variant="caption">{`Dominance: BTC ${data.dominance.BTC.toString()}% ETH: ${data.dominance.ETH.toString()}%`}</Typography>
					<Typography variant="caption">⠀•⠀</Typography>
					<Typography variant="caption">{`Total Mcap: ${new Intl.NumberFormat("en-US", {notation: "compact", style: 'currency', currency: 'USD'}).format(data["Market Cap"][0].toString())}`}</Typography>
					<Typography variant="caption"> (<span style={data["Market Cap"][1] > 0 ? {color: "green"} : {color: "red"}}>{data["Market Cap"][1].toString()}%</span>)</Typography>
					<Typography variant="caption">⠀•⠀</Typography>
					<Typography variant="caption">{`24h Vol: ${new Intl.NumberFormat("en-US", {notation: "compact", style: 'currency', currency: 'USD'}).format(data["24h Vol"].toString())}`}</Typography>
					<Typography variant="caption">⠀•⠀</Typography>
				</>
			}
		</>
	)
}

export default marqueeContent
