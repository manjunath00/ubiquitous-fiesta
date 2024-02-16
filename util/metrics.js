const express = require('express');
const client = require('prom-client');

const app = express();

 const restResponseTimeHistogram = new client.Histogram({
    name: 'rest_response_time_duration_seconds',
    help: 'REST API Response in seconds',
    labelNames: ['method', 'route', 'status_code']
});

 function startMetricServer() {
    const collectDefaultMetrics = client.collectDefaultMetrics;

    collectDefaultMetrics();

    app.get('/metrics', async (req, res) => {
        res.set('Content-Type', client.register.contentType);
        const time = new Date().toLocaleString()
        console.log(`${time} metric server is called`)

        return res.send(await client.register.metrics());

    });

    const PORT = 9100
    app.listen(PORT, () => {
        console.log(`Metric server started at http://localhost:${PORT}`)
    })
}

module.exports = {
    restResponseTimeHistogram, 
    startMetricServer
}