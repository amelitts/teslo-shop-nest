import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  img?: string;

  @Prop({ default: ['user'], type: [String] })
  roles: string[];

  @Prop({ default: false })
  google: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
