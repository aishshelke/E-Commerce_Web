pipeline {
    agent none
    stages {
        stage('Build') {
            agent {
                docker{
                    image 'node:16.13.1-alpine' 
                } 
            }
            steps {
                checkout scm
                sh (' docker build -t $DEPLOYMENTNAME . ')
                
            }
        }
        stage('Ecr') {
    	agent any
      steps {
        sh 'docker push $REPOSITORY_URI:$IMAGE_TAG'
      }
      }
        stage('Deploy') {
            kubernetes{
          }
            steps {
                checkout scm
                sh '''
                kubectl create ns $reponame_$branchname
                kubectl apply -f k8s/.
                '''
                 
            }
        }
        stage('route53') {
            agent any
            steps {
                sh '''
                terraform init
                terraform apply
                '''   
            }
        }
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
    }
}
