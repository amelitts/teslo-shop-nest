import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('No hay token');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'SECRET_KEY_HERRERA',
      });
      request['user'] = payload; // Metemos el usuario en la request
    } catch {
      throw new UnauthorizedException('Token no válido');
    }
    return true; // Si devuelve true, deja pasar al controlador
  }
}
