export const useHttp = () => {

    const request = async (url: string, method = 'GET', body = null, headers =  {
		'X-RapidAPI-Key': 'cb3637ae29msh9ba573a7f5d36d6p14aa1ejsn9b20e0c28a6a',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}) => {

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            throw e;
        }
    };

    return {request}
}