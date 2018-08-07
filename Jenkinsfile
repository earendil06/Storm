pipeline {
  agent any
  stages {
    stage('pull repository') {
      steps {
        sh '/home/pi/hdd/projects/StormLanguage/pull.sh'
      }
    }
    stage('build client api') {
      steps {
        sh '/home/pi/hdd/projects/StormLanguage/build-all.sh'
      }
    }
    stage('web deploy') {
      steps {
        sh 'ls'
      }
    }
  }
}