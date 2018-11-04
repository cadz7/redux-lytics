pipeline {
    agent { 
        docker { 
            image 'node:7-alpine'
            args '-u root:root'
        } 
    }
    stages {
        stage('build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                script {
                    sh './node_modules/.bin/jest'
                }
            }
        }
    }
}