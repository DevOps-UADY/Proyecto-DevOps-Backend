docker pull elasticsearch:8.7.0

docker network create elastic-network
docker network inspect elastic-network

docker run --name elastic --net elastic-network -p 9200:9200 -e discovery.type=single-node -e ES_JAVA_OPS="-Xmslg -Xmxlg" -e xpack.security.enabled=false -d elasticsearch:8.7.0

#https://localhost:9200/_cat/indices para obtener los indices
#para logstash
# ./bin/logstash -f backend-logstash-config.config

# GET https://localhost:9200/proyecto-devops-backend-fecha