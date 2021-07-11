interface Result {
  sucesss: boolean
  errMsg?: string
  data: any
}

export const result = (data: any, errMsg?: string): Result => {
  if (errMsg) {
    return {
      sucesss: false,
      errMsg,
      data
    }
  }
  return {
    sucesss: true,
    data
  }
}
