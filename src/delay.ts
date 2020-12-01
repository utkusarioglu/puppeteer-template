/**
 * Promisifies setTimeout to be used as a delay function
 * @param time - time in miliseconds for delay
 */
export async function delay(time: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
