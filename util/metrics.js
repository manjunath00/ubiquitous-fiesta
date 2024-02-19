const express = require('express');
const client = require('prom-client');

const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const registry = new Registry();

registry.setDefaultLabels({
    app: "technology demostrator"
})

 const restResponseTimeHistogram = new client.Histogram({
    name: 'rest_response_time_duration_seconds',
    help: 'REST API Response in seconds',
    labelNames: ['method', 'route', 'status_code']
});

registry.registerMetric(restResponseTimeHistogram);

function startMetricServer() {
    collectDefaultMetrics({ registry });

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