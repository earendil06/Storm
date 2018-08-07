pipeline {
  agent any
  stages {
    stage('pull repository') {
      when {
        branch 'master'
      }
      steps {
        sh '/home/pi/hdd/projects/StormLanguage/pull.sh'
      }
    }
    stage('build client api') {
      when {
        branch 'master'
      }
      steps {
        sh '/home/pi/hdd/projects/StormLanguage/build-all.sh'
      }
    }
    stage('web deploy') {
      when {
        branch 'master'
      }
      steps {
        sh 'ls'
      }
    }
  }
}