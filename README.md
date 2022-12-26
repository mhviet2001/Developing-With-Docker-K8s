# Developing with K8s

## K8s manifest files

- ### mongo-config.yml

- ### mongo-secret.yml

- ### mongo.yml

- ### webapp.yml

Step 1: Start and check status your Minikube cluster

    minikube start
    minikube status

Step 2: Create the ConfigMap and the Secrets

    kubectl apply -f mongo-config.yml
    kubectl apply -f mongo-secret.yml

Step 3: Create the Deployment and defining the Service

    kubectl apply -f mongo.yml
    kubectl apply -f webapp.yml

Step 4: Check the information of each component in K8s

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

Step 5: Stop your Minikube cluster

    minikube stop

Step 6: Delete all of the Minikube clusters

    minikube delete --all

> :warning: **Known issue - Minikube IP not accessible**

If you can't access the NodePort service webapp with `MinikubeIP:NodePort`, execute the following command:

    minikube service webapp-service
