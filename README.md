# Developing with Docker and K8s

## This demo app shows a simple user profile app set up using Docker and K8s

## With Docker

### Step 1: Create docker network

    docker network create mongo-network 

### Step 2: Start mongodb

    docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name mongodb --net mongo-network mongo    

### Step 3: Start mongo-express

    docker run -d -p 8081:8081 -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=password --net mongo-network --name mongo-express -e ME_CONFIG_MONGODB_SERVER=mongodb mongo-express   

_NOTE: Creating docker-network in optional. You can start both containers in a default network. In this case, just emit `--net` flag in `docker run` command_

### Step 4: Open mongo-express from browser

    http://localhost:8081

### Step 5: Create `user-account` _db_ and `users` _collection_ in mongo-express

### Step 6: Start your nodejs application locally

    cd app
    npm install 
    node server.js

### Step 7: Access you nodejs application UI from browser

    http://localhost:3000

## With Docker Compose

### Step 1: Start mongodb and mongo-express

    docker-compose -f docker-compose.yaml up

### Step 2: Open mongo-express from browser

    http://localhost:8080

### Step 3: Start your nodejs application locally

    cd app
    npm install
    node server.js

### Step 4: Access you nodejs application UI from browser

    http://localhost:3000

## Build a docker image from the application and push to DockerHub

    docker build -t hoangviet2001/demo-app:latest .     
    docker push hoangviet2001/demo-app:latest  

The dot "." at the end of the command denotes location of the Dockerfile.

## With K8s

### Step 1: Start and check status your Minikube cluster

    minikube start
    minikube status

### Step 2: Create the ConfigMap and the Secrets

    kubectl apply -f mongo-config.yaml
    kubectl apply -f mongo-secret.yaml

### Step 3: Create the Deployment and defining the Service

    kubectl apply -f mongo.yaml
    kubectl apply -f webapp.yaml

### Step 4: Check the information of each component in K8s

- Check basic information of each component in K8s

        kubectl get node
        kubectl get pod
        kubectl get svc
        kubectl get all

- Check extended information of each component in K8s

        kubectl get pod -o wide
        kubectl get node -o wide

- Check details of a specific component in K8s

        kubectl describe svc {svc-name}
        kubectl describe pod {pod-name}

- Check the logs for a container in a pod.

        kubectl logs {pod-name}

### Step 5: Stop your Minikube cluster

    minikube stop

### Step 6: Delete all of the Minikube clusters

    minikube delete --all

&nbsp;

> :warning: **Known issue - Minikube IP not accessible**

If you can't access the NodePort service webapp with `MinikubeIP:NodePort`, execute the following command:

    minikube service webapp-service

&nbsp;

## Links

- webapp image on Docker Hub: <https://hub.docker.com/layers/hoangviet2001/demo-app/latest/images/sha256-3b00b5fa786dc9f9846488c58c9100ad25e1f8eaa13b401e95a23cd4df3960c7?tab=layers>
- mongo image on Docker Hub: <https://hub.docker.com/_/mongo>
