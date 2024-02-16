```
docker pull prom/prometheus

docker run \
    -p 9090:9090 \
    -v $(pwd)/docker/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus
```