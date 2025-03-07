import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket | undefined;
  private messagesSubject: Subject<any> = new Subject<any>();

  constructor() {}

  connect(url: string) {
    this.socket = new WebSocket(url);

    // Al abrir la conexión
    this.socket.onopen = () => {
      console.log('Conectado al WebSocket');
    };

    // Al recibir un mensaje
    this.socket.onmessage = (event) => {
      this.messagesSubject.next(event.data);
    };

    // Si ocurre un error
    this.socket.onerror = (error) => {
      console.error('Error en WebSocket:', error);
    };

    // Cuando la conexión se cierre
    this.socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };
  }

  // Enviar mensaje al servidor WebSocket
  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket no está abierto');
    }
  }

  // Obtener los mensajes recibidos como un observable
  getMessages() {
    return this.messagesSubject.asObservable();
  }

  // Cerrar la conexión WebSocket
  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
