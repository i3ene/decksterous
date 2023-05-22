export namespace FunctionUtil {
  export function randomToken(length: number = 32) {
    return (Math.random() + 1).toString(36).substring(length);
  }
}