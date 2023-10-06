import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop()
  ownerName?: string;
  @Prop()
  shopName?: string;

  @Prop()
  logo?: string;

  @Prop({ required: false })
  email?: string;

  @Prop({ required: false })
  password?: string;

  @Prop()
  phone?: string;

  @Prop()
  productName: string;

  @Prop()
  productImages: string;

  @Prop()
  productPrice: string;

  @Prop()
  totalProduct: string;

  @Prop()
  productDescription?: string;

  @Prop()
  offerStartDate: string;

  @Prop()
  offerEndDate: string;

  @Prop()
  shopOpenDay?: string;

  @Prop()
  shopCloseDay?: string;

  @Prop()
  country?: string;

  @Prop()
  state?: string;

  @Prop()
  city?: string;

  @Prop()
  location?: string;

  @Prop({ default: now() })
  createdAt: string;

  //   @Prop({ default: now() })
  //   updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
