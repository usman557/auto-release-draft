export async function wait(milliseconds: number): Promise<string> {
  return new Promise(resolve => {
    if (isNaN(milliseconds)) {
      console.log('milliseconds not a number')
    }

    setTimeout(() => resolve('done!'), milliseconds)
  })
}
