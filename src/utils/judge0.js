const axios= require('axios')

const getLanguageId= (language)=>{
    const lang= {
        'c++': 54,
        'javascript': 102,
        'java': 62,
        'python': 71
    }

    return lang[language.toLowerCase()]
}

const submitBatch= async (submissions)=>{

    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            base64_encoded: 'false'
        },
        headers: {
            'x-rapidapi-key': 'd0cde6457emshb214d516557aa12p1c2baajsn95f1f562f6b9',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            submissions
        }
    };

    async function fetchData()
    {
        try
        {
            const response = await axios.request(options);
            return response.data;
        }
        catch (error)
        {
            console.error(error);
        }
    }

    return await fetchData();
}

const wait= async (time)=>{
    setTimeout(()=>{
        return 1
    },time)
}

const submitToken= async(resultToken)=>{
    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            tokens: resultToken.join(','),
            base64_encoded: 'false',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': 'd0cde6457emshb214d516557aa12p1c2baajsn95f1f562f6b9',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    async function fetchData()
    {
        try
        {
            const response = await axios.request(options);
            return response.data;
        }
        catch (error)
        {
            console.error(error);
        }
    }

    while(true)
    {
        const result= await fetchData();

        const isResultObtained= result.submissions.every((res)=> res.status_id>2)
        if(isResultObtained)
        {
            return result.submissions
        }

        await wait(1000)
    }
}

module.exports= {
                    getLanguageId,
                    submitBatch,
                    submitToken
                }