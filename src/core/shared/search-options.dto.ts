import { IsString, IsIn, IsArray, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { escapeRegexSpecialCharacters } from '../utils/string.util';

export class SearchOptions {
  @IsNumber()
  offset: number;

  @IsNumber()
  size: number;

  @IsString()
  @IsOptional()
  sort: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  dir: string;

  @IsString()
  @Transform((val: string) => escapeRegexSpecialCharacters(val))
  @IsOptional()
  searchTerm: string;

  @IsArray()
  @IsOptional()
  filterBy: [];
}
