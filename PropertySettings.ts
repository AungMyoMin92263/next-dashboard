// Property settings list (array)
export const propertySettingsList = [
	{
		id: 'flt',
		property_name: 'Fullerton Singapore',
		auth_url: 'http://localhost:8000/fullerton/amp/api/oauth/token',
		url: 'https://hotel-qa.gtriip.com/fullerton/v6.0',
		username: 'web-amp-client',
		password: 'HotelTemplate1234',
		timeout: 3000000,
	},
	{
		id: 'fltBay',
		property_name: 'Fullerton Bay',
		auth_url: 'https://hotel-qa.gtriip.com/fullerton/v6.0/oauth/token',
		url: 'https://hotel-qa.gtriip.com/fullerton/v6.0',
		username: 'web-amp-client',
		password: 'HotelTemplate1234',
		timeout: 300000,
	},
	// Add more properties as needed
];

// Property settings map (object)
export const propertySettingsMap = propertySettingsList.reduce((acc, property) => {
	acc[property.id] = property;
	return acc;
}, {} as Record<string, typeof propertySettingsList[0]>);

