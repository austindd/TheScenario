import { IsOptional, IsString } from "class-validator";

export class CreateDataDto {
	@IsOptional()
	@IsString()
	_id?: string;

	@IsString()
	data: string;
}

export class UpdateDataDto {
	@IsString()
	_id?: string;

	@IsString()
	data: string;
}
