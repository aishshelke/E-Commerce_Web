pipeline {
    agent none
    // Build image
    stages {
        stage('Build') {
            agent {
                docker{
                    image 'node:16.13.1-alpine' 
                } }
        
            steps {
                checkout scm
                sh (' docker build -t $REPOSITORY_NAME_$BITBUCKET_SOURCE_BRANCH . ')
                
            }
        }
        // push image to ecr
        stage('Ecr') {
    	agent any
      steps {
        sh 'docker push $REPOSITORY_NAME:latest'
      }
      }
// deploy IMAGE TO K8S 
        stage('Deploy') {
             agent any
            steps {
                checkout scm
                sh '''
                kubectl create ns $REPOSITORY_NAME_$BITBUCKET_SOURCE_BRANCH
                kubectl apply -f k8s/.
                '''
                 
            }
        }
        // CREATE ROUTE 53 
        stage('route53') {
            agent any
            steps {
                sh '''
                terraform init
                terraform apply
                '''   
            }
        }

        // test the 
        stage('Test on Linux') {
            agent { 
                label 'linux'
            }
            steps {
                sh 'make check'
            }
            
        }
        stage('Test on Windows') {
            agent {
                label 'windows'
            }
            steps {
                bat 'make check' 
            }
        }


        // destroy the deployement


    }
}
