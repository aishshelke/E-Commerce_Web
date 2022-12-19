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
                sh (''' 
                aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/f3e8a4f2
                docker build -t $REPOSITORY_NAME_$BITBUCKET_SOURCE_BRANCH . 
                docker tag angularapp:latest public.ecr.aws/f3e8a4f2/angularapp:latest
                docker push public.ecr.aws/f3e8a4f2/angularapp:latest
                ''')
                
            }
        }
        // push image to ecr
    //     stage('Ecr') {
    // 	agent any
    //   steps {
    //       sh      '''
    //                 docker.withRegistry('', 'ecr:us-east-2:aws-credentials') {
    //                 docker push("${env.BUILD_NUMBER}")
    //               '''
                    
    //     // sh 'docker push $REPOSITORY_NAME:latest'
    //   }
    //   }
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
