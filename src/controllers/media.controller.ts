import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileManagementService } from '@services/fileManagement.service';
import { randomBytes } from 'crypto';
import * as fs from 'fs';
import { isEnum, isNotEmpty } from 'class-validator';
import { MediaType } from '@constants/enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import * as path from 'path';

const IMAGE_SIZE_IN_BYTES = 5 * 1024 * 1024; // 5 MB
const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

@Controller('/media')
@ApiTags('media')
@ApiBearerAuth('access-token') // Applies Bearer token security to all endpoints in this controller
export class MediaController {
  constructor(private readonly fileManagementService: FileManagementService) {
    this.fileManagementService.ensurePublicTempExists()
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiOperation({ summary: 'Upload files' })
  @ApiResponse({ status: 200, description: 'Files uploaded successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Files to upload',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        type: { type: 'string', description: 'The media type' },
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'The files to upload',
        },
      },
    },
  })
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Req() req) {
    if (!files || files.length === 0) {
      throw new HttpException('No files uploaded', HttpStatus.BAD_REQUEST);
    }
    if (!isNotEmpty(req.body.type)) {
      throw new HttpException('Media type not found', HttpStatus.BAD_REQUEST);
    }
    if (!isEnum(req.body.type, MediaType)) {
      throw new HttpException('Invalid media type', HttpStatus.BAD_REQUEST);
    }
    try {
      const fileResponses = await Promise.all(
        files.map((file) => this.processFile(file)),
      );
      return {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: 'Files uploaded successfully',
        media: { type: req.body.type, data: fileResponses },
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'File processing failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async processFile(file: Express.Multer.File) {
    if (file.size > IMAGE_SIZE_IN_BYTES) {
      throw new HttpException(
        `File size exceeds 5 MB: ${file.originalname}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
      throw new HttpException(
        `Invalid file type: ${file.originalname}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const dirPath = path.join(process.cwd(), 'public', 'temp'); // Directory path
    console.log(file.originalname)
    const fileName = this.generateFileName(file.originalname); // Replace with the actual file name or dynamically generate it
    const filePath = path.join(dirPath, fileName); // Full file path
    
    try {
      await fs.promises.writeFile(filePath, file.buffer)
      console.log('File written successfully');
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.error(`File or directory not found: ${filePath}`);
      } else {
        console.error(`An error occurred: ${err.message}`);
      }
    }

    return {
      name:fileName,
    };
  }

  private generateFileName(originalName: string): string {
    const date=new Date().toISOString().split('T')[0]; 
    const randomString = randomBytes(3).toString('hex');
    return `${date}__${randomString}__${originalName}`;
  }
}
