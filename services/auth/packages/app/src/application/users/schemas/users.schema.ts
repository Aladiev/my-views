import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  autoIndex: true,
  _id: true,
})
export class User extends Document {
  // createdAt: Date;

  // updatedAt: Date;

  @ApiProperty({ example: 'User email', description: 'Email of the user ' })
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @ApiProperty({
    example: 'User password',
    description: 'Password of the user ',
  })
  @Prop({ type: String, required: true, index: 'text' })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
