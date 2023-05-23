export interface Message {
  statusCode: number, // 400 - already exists // 403 - wrong token
  message: string,
}
