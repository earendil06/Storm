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
            sh '/home/pi/hdd/projects/StormLanguage/kill-servers.sh'
          }
        }
        stage('build client api') {
          steps {
            sh '/home/pi/hdd/projects/StormLanguage/build-client.sh'
          }
        }
      }
    }
    stage('run servers') {
      parallel {
        stage('run servers') {
          steps {
            script {
              withEnv(['BUILD_ID=dontkill']) {
                    sh '/home/pi/hdd/projects/StormLanguage/restart-all.sh'
                }
            }    
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
