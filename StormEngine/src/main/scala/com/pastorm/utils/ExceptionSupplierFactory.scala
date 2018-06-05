package com.pastorm.utils

import java.util.function.Supplier

object ExceptionSupplierFactory {
  def IllegalArgumentSupplier(body: String): Supplier[Throwable] = {
    new Supplier[Throwable] {
      override def get(): Throwable =
        new IllegalArgumentException(body)
    }
  }
}
