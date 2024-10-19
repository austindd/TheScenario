import { IsOptional, IsString } from "class-validator";

export class DataDto {
	@IsOptional()
	@IsString()
	_id?: string;

	@IsString()
	data: string;
}