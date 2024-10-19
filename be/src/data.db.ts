import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsOptional } from "class-validator";
import { v4 as uuid_v4 } from 'uuid';

@Schema({
  collection: 'Data',
  autoCreate: true,
  timestamps: {
    createdAt: 'created',
  }
})
export class Data {
  @IsOptional()
  @Prop({ type: String, default: uuid_v4, required: false })
  _id?: string;
  
  @IsNotEmpty()
  @Prop({type: String})
  data: string;
}

export type DataDocument = Data & Document;

export const DataSchema = SchemaFactory.createForClass(Data);

export const DataCollection = {
  name: Data.name,
  schema: DataSchema,
};

export const DataConnection = MongooseModule.forFeature(
    [DataCollection],
    "local"
);