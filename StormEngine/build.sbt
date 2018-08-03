

lazy val storm = (project in file("."))
  .enablePlugins(ScalaJSPlugin)
  .settings(
    name := "engine-adapter",
    resolvers += Resolver.mavenLocal,
    scalaVersion := "2.12.6",
    scalaJSUseMainModuleInitializer := true,


    libraryDependencies ++= Seq(
    )
  )
