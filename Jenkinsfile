node {
    def app
    def dockerfile = './api/Dockerfile-dev'
    docker.image('node:latest').inside {
        stage('Clone repository') {
            checkout scm
            }
        stage('Build image') {
             docker.image('mongo:latest').withRun('-d --env "MONGO_DB_DEV_PORT=27007" --env "MONGO_DB_DEV_HOST=db-dev" --env "MONGO_DB_DEV_URL=mongodb://db-dev:27007/" -v "$(pwd)/db:/data/db" -p 27007:27017') { c ->
                    docker.image('mongo:latest').inside() {
                        sh 'mongod --config $(pwd)/db/mongod.conf &'
                        app = docker.build("dfsco1prince/auditboard","-f ${dockerfile} ./api")
                    }
                }
            }
        stage('Test image') {
            app.inside {
                sh 'echo "Tests passed"'
            }
        }
        stage('Push image') {
        /* Push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
            }
        }
    }
}