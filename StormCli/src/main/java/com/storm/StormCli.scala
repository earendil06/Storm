package com.storm

object StormCli {
  def main(args: Array[String]): Unit = {
    while (true){
      val commandLine = readLine(">> ")
      try {
        val program = commandLine.split(" ")(0)
        val pArgs = commandLine.split(" ").slice(1, commandLine.split(" ").length)
        val p = Class.forName("com.storm.commands." + program).newInstance.asInstanceOf[{def main(args: Array[String]): Unit}]
        p.main(pArgs)
      }catch {
        case _:Exception => println("program not found")
      }

    }
  }
}