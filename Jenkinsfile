node {
    try {
        stage('Check out') {
            git branch: 'main', credentialsId: 'gitlab', url: 'http://172.16.20.10/devops6/bibliotheque.git'
        }
        stage('SCM') {
            checkout scm
        }
        /*stage ('SERVICE - SonarQube Analysis'){
            withSonarQubeEnv(){  
            sh '/opt/sonar-scanner/bin/sonar-scanner'
            }
        }
        stage ('SERVICE - Quality Gate'){
            timeout(time: 1, unit: 'HOURS') {
                waitForQualityGate abortPipeline: true, credentialsId: 'sonar_token'
            }
        }*/
        stage ('SERVICE - Lancement du build docker compose'){
            step([$class: 'DockerComposeBuilder', dockerComposeFile: 'docker-compose.yml', option: [$class: 'StartAllServices'], useCustomDockerComposeFile: true])
        }
        /*stage ('SERVICE - Lancement du run docker compose'){
            sh "docker compose up -d"
        }*/
        stage ('SERVICE - docker tag and push'){
            withCredentials([usernamePassword(credentialsId: 'dockerhub_secret', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')])         
            {
                sh 'echo $PASSWORD | docker login --username $USERNAME --password-stdin'
                sh 'docker tag francescoxx/node_live_app:latest d3il2024/bibliotheque-app:1.0.1-6'
                sh 'docker tag francescoxx/node_live_app2:latest d3il2024/bibliotheque-app:1.0.1-6'
                sh 'docker tag francescoxx/node_live_app3:latest d3il2024/bibliotheque-app:1.0.1-6'
                sh 'docker tag francescoxx/node_live_app4:latest d3il2024/bibliotheque-app:1.0.1-6'
                sh 'docker push d3il2024/bibliotheque-app:1.0.1-6'
            }
            
        }
        /*stage ('SERVICE - grype'){
            sh 'docker run --rm --volume /var/run/docker.sock:/var/run/docker.sock --name Grype anchore/grype:latest d3il2024/bibliotheque-app:1.0.1-6 -f critical'           
        }*/
        stage('JMETER - test'){
            sh '/usr/bin/apache-jmeter-5.6.3/bin/jmeter -n -t "Test Plan.jmx" -l results.jtl'
            sh 'cat results.jtl'
            perfReport 'results.jtl'
            /*perfReport errorFailedThreshold: 0, errorUnstableThreshold: 0, filterRegex: '', showTrendGraphs: true, sourceDataFiles: 'results.jtl‘*/
        }
         stage('deploiement ansible'){
            withCredentials([string(credentialsId: 'become', variable: 'BECOME')]) {
                ansiblePlaybook become: true, credentialsId: 'ansible', extras: '--extra-vars ansible_sudo_pass=$BECOME', inventory: 'ansible/hosts.yml', playbook: 'ansible/installappli.yml'
            }
}

    }
    finally {        
    }
}
