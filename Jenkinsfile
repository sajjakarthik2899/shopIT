pipeline {
  // Jenkins can run this pipeline on any available machine (agent).
  agent any

  stages {
    stage('Clone Repo') {
      steps {
        git 'https://github.com/sajjakarthik2899/shopIT.git'
      }
    }

    stage('Frontend Build') {
      steps {
        dir('frontend') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Backend Install & Test') {
      steps {
        dir('Backend') { 
          sh 'npm install'
          sh 'npm test'
        }
      }
    }
  }

  post {
    always {
      junit 'Backend/test-reports/jest-junit.xml'
    }
    success {
      echo '✅ Build and unit tests succeeded!'
    }
    failure {
      echo '❌ Build or tests failed. Please check the logs.'
    }
  }
}
