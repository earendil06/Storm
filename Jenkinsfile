pipeline {
  agent any
  stages {
    stage('pull repository') {
      steps {
        sh '/home/pi/hdd/projects/StormLanguage/pull.sh'
      }
    }
    stage('build') {
      parallel {
        stage('stop servers') {
          steps {
            echo 'stop servers'
          }
        }
        stage('build client api') {
          steps {
            echo 'build mvn'
          }
        }
      }
    }
    stage('run servers') {
      parallel {
        stage('run servers') {
          steps {
            echo 'run python + client api'
          }
        }
        stage('web deploy') {
          steps {
            sh '/home/pi/hdd/projects/StormLanguage/export-web.sh'
          }
        }
        stage('copy storm files') {
          steps {
            sh '/home/pi/hdd/projects/StormLanguage/copy-storm.sh'
          }
        }
      }
    }
  }
}