import {
  Body,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/models/register.schema';
import { RegisterDto } from 'src/dto/register.dto';
import { RegisterDetailsDto } from 'src/dto/registerDetails.dto';
import { CommonMethods } from 'src/utillites/common.method';
const base64ToImage = require('base64-to-image');
@Injectable()

//user registration
export class UserService {
  constructor(
    @InjectModel('Users')
    private userModel: Model<User>,
  ) {}
  //   async hashPassword(password: string): Promise<string> {
  //     return await bcrypt.hash(password, 10);
  //   }
  public async register(@Body() userDto: RegisterDto): Promise<User> {
    try {
      const base64Str = userDto.logo;
      const path = './uploads/shopLogo/';
      const optionalObj = {
        fileName: '',
        type: base64Str.split(';')[0].split('/')[1],
      };
      const imageInfo = base64ToImage(base64Str, path, optionalObj);

      const filePath = `http://localhost:5001/uploads/shopLogo/${imageInfo.fileName}`;
      const newUser = new this.userModel(userDto).$set({
        logo: filePath,
      });

      const user = await this.userModel.findOne({ email: userDto.email });
      if (user) {
        throw new HttpException(
          'User already exists, please login.',
          HttpStatus.CONFLICT,
        );
      } else {
        return await newUser.save();
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async registerDetails(
    @Body() registerDetailsDto: RegisterDetailsDto,
  ): Promise<User> {
    try {
      const newUser = new this.userModel(registerDetailsDto);
      return await newUser.save();
    } catch (error) {
      console.log(error);
    }
  }

  async updateRegiser(
    res: Response,
    _id,
    userDto: RegisterDto,
    registerDetailsDto: RegisterDetailsDto,
  ) {
    try {
      const base64Str = userDto.logo;
      const path = './uploads/shopLogo/';
      const optionalObj = {
        fileName: '',
        type: base64Str.split(';')[0].split('/')[1],
      };
      const imageInfo = base64ToImage(base64Str, path, optionalObj);

      const filePath = `http://localhost:5001/uploads/shopLogo/${imageInfo.fileName}`;

      const edit = await this.userModel.findByIdAndUpdate(
        _id,
        {
          $set: {
            logo: filePath,
            ownerName: userDto.ownerName,
            shopName: userDto.shopName,
            email: userDto.email,
            password: userDto.password,
            phone: userDto.phone,
            productName: registerDetailsDto.productName,
            productImages: registerDetailsDto.productImages,
            productPrice: registerDetailsDto.productPrice,
            totalProduct: registerDetailsDto.totalProduct,
            productDescription: registerDetailsDto.productDescription,
            offerStartDate: registerDetailsDto.offerStartDate,
            offerEndDate: registerDetailsDto.offerEndDate,
            shopOpenDay: registerDetailsDto.shopOpenDay,
            shopCloseDay: registerDetailsDto.shopCloseDay,
            country: registerDetailsDto.country,

            state: registerDetailsDto.state,
            city: registerDetailsDto.city,
            location: registerDetailsDto.location,
          },
          userDto,
        },
        {
          new: true,
        },
      );
      console.log(edit);

      if (edit) {
        return CommonMethods.success(res, 'Edited successfully', edit);
      } else {
        return CommonMethods.error(res, 'No document found with the given ID');
      }
    } catch (error) {
      console.error('Error updating document:', error);
      return CommonMethods.error(
        res,
        'An error occurred while updating the document',
      );
    }
  }
}
