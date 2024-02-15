import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BillingDocument = BillingModel & Document;

@ObjectType({ description: 'Billing Response' })
@Schema()
export class BillingModel extends Document {
  @HideField()
  _id: string;

  @Field()
  @Prop({ type: String })
  stripe_id: string;
}

export const BillingSchema = SchemaFactory.createForClass(BillingModel);
