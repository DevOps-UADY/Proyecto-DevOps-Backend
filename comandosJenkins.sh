npm install
# docker pull mysql:latest
RAMA=$(echo $GIT_BRANCH | cut -b 8-14 | tr '[:upper:]' '[:lower:]' | tr '/' '_')

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

docker run -d --name proyectodevopsbackend-$RAMA --network mi-red-docker -p 3000:3000 proyectodevopsbackend-$RAMA:1.0.0-$BUILD_NUMBER
