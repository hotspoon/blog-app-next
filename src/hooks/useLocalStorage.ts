"use client"
import { useState, useEffect } from "react"

function getSavedValue(key: string, initialValue: any) {
  if (typeof window === "undefined") {
    return initialValue instanceof Function ? initialValue() : initialValue
  }

  const item = localStorage.getItem(key)
  const savedValue = item === null || item === "" ? "" : JSON.parse(item)
  if (savedValue) return savedValue

  if (initialValue instanceof Function) return initialValue()
  return initialValue
}

export default function useLocalStorage(key: string, initialValue: any) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue)
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}
