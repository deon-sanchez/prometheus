import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type BillingDocument = BillingModel & Document;

@ObjectType({ description: 'Stripe Response' })
@Schema()
export class BillingModel extends Document {
  @Field(() => ID)
  _id: string;

  @Field((type) => String, { nullable: true })
  @Prop({ nullable: true })
  stripe_id: string;
}

export const BillingSchema = SchemaFactory.createForClass(BillingModel);
