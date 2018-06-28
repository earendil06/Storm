/*
Prelude => Scala demo by me.
First Part => The winner is the first one with all the tests validated.
Second Part => Code review of all projects after a certain hour, everyone vote for the best.
*/

//Base

println("hello")

//Everything is an object
1 + 1
1.+(1)

val l = List(1, 2, 3)
10 :: l
l

"head " + l.head
"tail " + l.tail
"last " + l.last

for(i <- l) {
  println(i)
}

l.foreach(i => println(i))
l.filter(_ == 2).map(_ + 1).product
val aa = l.reduce((acc, i) => acc + 10 * i)

//First class function support

val f: Int => Int = { x => x * x }
//val f: Int => String = x => x.toString
f(32)

val g: Int => String = s => s.toString + "foo"
g(1)

val gf: Int => String = x => g(f(x))
gf(1)

//Higher order function

val highOrder: (Int => Int) => String => String = fx => x => "(d = " + fx(x.length) + ")"
highOrder(f)("aaa")

highOrder(_ + 10)("aaa")

//implicit conversion

//sizeConstraint("aa" > 10)

val stringToLength: String => Int = s => s.length
stringToLength("aa") > 1

//implicit val StLImplicit: String => Int = s => s.length
//"aa" > 1
//def add(x: Int, y: Int): Int = x + y
//add("aaa", 4)

//Class

trait Animal extends Meat {
  def speak(): Unit
}

class Cat extends Animal with Carnivore {
  this: Foo =>
  override def speak(): Unit = println("miaou" + foo)
}

class Vegan extends Animal with Herbivore with Foo {
  override def speak(): Unit = println("MEAT IS MURDER")
}

val cat = new Cat() with Foo
val vegan = new Vegan()
//val animals = List(cat, vegan)
//animals.foreach(animal => animal.speak())

trait Food
class Plant extends Food
abstract class Meat extends Food
class RedMeat extends Meat
class WhiteMeat extends Meat

trait Diet[T <: Food] {
  def eat(food: T): Unit
}

trait Carnivore extends Diet[Meat] {
  override def eat(food: Meat): Unit = {
    println(s"sluuurp, a ${food.getClass.getSimpleName}")
  }
}

trait Herbivore extends Diet[Plant] {
  override def eat(food: Plant): Unit = {
    println(s"huuuum, I like ${food.getClass.getSimpleName}")
  }
}

trait Foo {
  def foo: String = {
    "foo"
  }
}

//cat.eat(new Cat())
vegan.eat(new Plant())
//cat.eat(new Plant())
cat.eat(new RedMeat())
//vegan.eat(new WhiteMeat())
println(vegan.foo)

//Pattern matching

trait Skill {
  def isUseful: Boolean
}

object Database extends Skill {
  override def isUseful = false
}

object Architecture extends Skill {
  override def isUseful = true
}

object FunctionalProgramming extends Skill {
  override def isUseful = false
}

case class User(name: String, skill: Skill)

val adrien = User("adrien", Database)
val steven = adrien.copy(name = "steven")

val users = User("adrien", Database) :: User("florent", Architecture) ::
    User("anthony", FunctionalProgramming) :: Nil

users.filter(_.skill.isUseful)

users.foreach {user =>
  user.skill match {
    case Database => println(user.name + " should reconsider his life choices")
    case Architecture => println(user.name + " is a pretty cool dude")
    case FunctionalProgramming => println(user.name + " should really just shut his mouth")
  }
}

users.foreach {
  case User("anthony", _) => println("never mind this guy")
  case User(name, skill) => println(name + " is doing " + skill.getClass.getSimpleName)
  case _ => println("should never happen")
}
