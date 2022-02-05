const filterObject = (obj, filter, filterValue) =>
	Object.keys(obj).reduce((acc, val) =>
		(obj[val][filter] === filterValue ? acc : {
				...acc,
				[val]: obj[val]
			}
		), {});

export default filterObject
