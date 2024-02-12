import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BillingModel } from './billing.model';

export type UserDocument = UserModel & Document;

@ObjectType({ description: 'User Response' })
@Schema()
export class UserModel extends Document {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @HideField()
  @Prop({ type: String, required: true })
  password: string;

  @Field((type) => BillingModel, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: BillingModel.name })
  billing: BillingModel;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
