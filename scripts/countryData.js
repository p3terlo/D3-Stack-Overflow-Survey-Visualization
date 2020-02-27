function retrieveDataByName(countryName, dataByCountry) {
	for (let i = 0; i < dataByCountry.length; i++) {
		if (countryName === dataByCountry[i].key) {
			return dataByCountry[i];
		} 
	}
	return undefined;
}