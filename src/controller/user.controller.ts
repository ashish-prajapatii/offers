import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  Res,
  Put,
  Query,
} from '@nestjs/common';
import { query } from 'express';
import { RegisterDto } from 'src/dto/register.dto';
import { RegisterDetailsDto } from 'src/dto/registerDetails.dto';
import { UserService } from 'src/services/register.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  public async register(@Body() userDto: RegisterDto) {
    return await this.userService.register(userDto);
  }

  @Post('/registerDetails')
  public async registerDetails(@Body() registerDetailsDto: RegisterDetailsDto) {
    return await this.userService.registerDetails(registerDetailsDto);
  }

  @Put('/userUpdate')
  async updateUser(
    @Res() res,
    @Query('_id') _id,
    @Body() userDto: RegisterDto,
    @Body() registerDetailsDto: RegisterDetailsDto,
  ) {
    await this.userService.updateRegiser(res, _id, userDto, registerDetailsDto);
  }

  @Get('uploads/shopLogo/:filename')
  getProfileImage(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: 'uploads/shopLogo' });
  }
}
