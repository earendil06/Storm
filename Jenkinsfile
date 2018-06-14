pipeline {
  agent any
  stages {
    stage('pull repository') {
      steps {
        sh '/home/pi/hdd/projects/StormLanguage/pull.sh'
      }
    }
    stage('html deploy') {
      steps {
        sh '/home/pi/hdd/projects/StormLanguage/export-web.sh'
      }
    }
  }
}