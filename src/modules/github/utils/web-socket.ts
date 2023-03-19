import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  GetRealTimeCommitCommand,
  GetRealTimeCommitHandler,
} from '../command/get-realtime-commit/';

@WebSocketGateway()
export class CommitsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly getRealTimeCommits: GetRealTimeCommitHandler) {}

  async handleConnection(socket: Socket) {
    console.log('Client connected');
  }

  async handleDisconnect(socket: Socket) {
    console.log('Client disconnected');
  }

  async sendCommit(body: unknown) {
    console.log(body);
    this.server.emit('emitCommit', body);
  }

  async getCommit(body: unknown) {
    const commits = await this.getRealTimeCommits.execute(
      new GetRealTimeCommitCommand(body),
    );
    this.sendCommit(commits);
  }
}
