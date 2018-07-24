lazy val storm = (project in file("."))
  .enablePlugins(JavaAppPackaging)
  .settings(
    name := "storm-http",
    resolvers += Resolver.mavenLocal,
    scalaVersion := "2.12.6",


    libraryDependencies ++= Seq(
      "com.typesafe.akka" %% "akka-http" % "10.1.3",
      "com.typesafe.akka" %% "akka-http-spray-json" % "10.1.3",
      "com.typesafe.akka" %% "akka-stream" % "2.5.13",

      "pastorm.storm" % "StormEngine" % "1.0-SNAPSHOT",
      "pastorm.storm" % "StormModel" % "1.0-SNAPSHOT",
      "pastorm.storm" % "StormResources" % "1.0-SNAPSHOT"
    )
  )
