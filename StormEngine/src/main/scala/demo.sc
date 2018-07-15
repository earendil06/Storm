val l : List[Option[Int]] = List(Some(1), None, Some(1))

l.flatMap(o => o.map(_  + 1))
