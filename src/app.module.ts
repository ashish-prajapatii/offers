import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/register.schema';
import { UserController } from './controller/user.controller';
import { UserService } from './services/register.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://demo:ashish12345@cluster0.yy33d.mongodb.net/offers',
    ),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
  ],

  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
