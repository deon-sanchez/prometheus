import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Prop } from '@nestjs/mongoose';

@ObjectType({ description: 'Stripe Invoice Response' })
export class InvoiceSettings {
  @Field({ nullable: true })
  @Prop({ type: String })
  custom_fields: string;

  @Field({ nullable: true })
  @Prop({ type: String })
  default_payment_method: string;

  @Field({ nullable: true })
  @Prop({ type: String })
  footer: string;

  @Field({ nullable: true })
  @Prop({ type: String })
  rendering_options: string;
}

@ObjectType({ description: 'Stripe Response' })
export class StripeModel {
  @Field()
  @Prop({ type: String, required: true })
  id: string;

  @Field()
  @Prop({ type: String, required: true })
  object: string;

  @Field({ nullable: true })
  @Prop({ type: String })
  address: string;

  @Field()
  @Prop({ type: Number, required: true })
  balance: number;

  @Field()
  @Prop({ type: Date, required: true })
  created: Date;

  @Field({ nullable: true })
  @Prop({ type: String })
  currency: string;

  @Field({ nullable: true })
  @Prop({ type: String })
  default_source: string;

  @Field()
  @Prop({ type: Boolean, required: true })
  delinquent: boolean;

  @Field({ nullable: true })
  @Prop({ type: String })
  description: string;

  @Field({ nullable: true })
  @Prop({ type: String })
  discount: string;

  @Field()
  @Prop({ type: String, required: true })
  email: string;

  @Field()
  @Prop({ type: String, required: true })
  invoice_prefix: string;

  @Field(() => InvoiceSettings)
  @Prop({ type: Object })
  invoice_settings: {
    custom_fields: string | null;
    default_payment_method: string | null;
    footer: string | null;
    rendering_options: string | null;
  };

  @Field()
  @Prop({ type: Boolean, required: true })
  livemode: boolean;

  @Field(() => GraphQLJSONObject)
  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Field()
  @Prop({ type: String, required: true })
  name: string;

  @Field(() => Int)
  @Prop({ type: Number, required: true })
  next_invoice_sequence: number;

  @Field({ nullable: true })
  @Prop({ type: String })
  phone: string;

  @Field(() => [String])
  @Prop({ type: [String] })
  preferred_locales: string[];

  @Field({ nullable: true })
  @Prop({ type: String })
  shipping: string;

  @Field()
  @Prop({ type: String, required: true })
  tax_exempt: string;

  @Field({ nullable: true })
  @Prop({ type: String })
  test_clock: string;
}
