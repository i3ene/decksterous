export class Data {
  messages: Message[];

  constructor() {
    this.messages = [];
  }

  addMessage(message: string, status: number, payload?: any): void {
    const msg = new Message(message, status, payload);
    this.messages.push(msg); 
  }
}

export class Message {
  message: string;
  status: number;
  payload?: any;

  constructor(message: string, status: number, payload?: any) {
    this.message = message;
    this.status = status;
    if (payload) this.payload = payload;
  }
}