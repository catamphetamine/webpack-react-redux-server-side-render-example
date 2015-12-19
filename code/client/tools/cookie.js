const cookie = 
{
	write(name, value, days)
	{
		// http://stackoverflow.com/questions/3290424/set-a-cookie-to-never-expire
		const time = days ? Date.now() + (days * 24 * 60 * 60 * 1000) : 2147483647000  // January 2038
		const expires = '; expires=' + new Date(time).toGMTString()
		document.cookie = `${name}=${value}${expires}; path=/`
	}
}

export default cookie
