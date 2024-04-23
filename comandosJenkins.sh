# Detenmos el contenedor de postgres
docker container stop postgres
# Damos de baja el contenedor de postgresql
docker rm postgres
# Eliminamos la red
docker network rm devops

# La volvemos a crear 
docker network create --subnet=172.22.0.0/16 devops



# Volvemos a iniciar el contenedor de postgresql dentro de la red establecida
docker run -d \
  --name postgres \
  --network devops \
  --ip 172.22.0.4 \
  -e POSTGRES_HOST=172.22.0.4 \
  -e POSTGRES_DB=test \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=root \
  -p 5432:5432 \
  -v d_data:/var/lib/postgresql/data \
  postgres:14

# docker pull mysql:latest
RAMA=$(echo $GIT_BRANCH | cut -b 8-14 | tr '[:upper:]' '[:lower:]' | tr '/' '_')
echo "La etiqueta de versión generada es: $RAMA"

# Construir la imagen con la etiqueta formateada
docker build -t proyectodevopsbackend-$RAMA:1.0.0-$BUILD_NUMBER .

# Obtener el ID del contenedor
CONTAINER_ID=$(docker ps -a -q --filter="name=proyectodevopsbackend-$RAMA")

# Verificar si el contenedor existe
if [ -n "$CONTAINER_ID" ]; then
    # Detener el contenedor
    docker stop "$CONTAINER_ID"
    
    # Eliminar el contenedor
    docker rm "$CONTAINER_ID"
else
    echo "El contenedor no existe."
fi

# Ejecutar el contenedor con la etiqueta de imagen formateada y el número de construcción
docker run -d --name proyectodevopsbackend-$RAMA --network devops -p 3000:3000 proyectodevopsbackend-$RAMA:1.0.0-$BUILD_NUMBER
