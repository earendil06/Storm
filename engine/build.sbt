lazy val storm = (project in file("."))
  .enablePlugins(ScalaJSPlugin)
  .settings(
    name := "engine",
    resolvers += Resolver.mavenLocal,
    scalaVersion := "2.12.6",
    scalaJSUseMainModuleInitializer := true,


        libraryDependencies += "com.lihaoyi" %%% "upickle" % "0.6.6"

  )
