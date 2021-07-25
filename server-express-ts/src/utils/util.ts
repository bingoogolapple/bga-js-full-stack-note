interface Result<T> {
  sucesss: boolean
  message?: string
  data: T
}

export const result = <T>(data: T, message?: string): Result<T> => {
  if (message) {
    return {
      sucesss: false,
      message,
      data
    }
  }
  return {
    sucesss: true,
    data
  }
}
