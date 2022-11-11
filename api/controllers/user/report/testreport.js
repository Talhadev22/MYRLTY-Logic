
const express = require('express');
const Papa = require('papaparse');
const app = express()
const port = 3001

app.get('/', async (req, res) => {
    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/todos',
        headers: {}
    };

    const response = await axios(config);
    const _csv = Papa.unparse(response.data);

    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(_csv);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})