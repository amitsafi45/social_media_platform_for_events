import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join, resolve } from 'path';
import * as fs from 'fs';
import { Environment } from 'src/constants/enum';

@Injectable()
export class FileManagementService {
  constructor(private readonly configService: ConfigService) {}

  private getFolderPath(folder: string): string {
    const isProduction =
      this.configService.get('ENVIRONMENT') === Environment.Production;
    if (isProduction) {
      return resolve(process.cwd(), 'public', folder);
    }
    return join(__dirname, '..', '..', 'public', folder);
  }

  getUploadFolderPath(): string {
    return this.getFolderPath('uploads');
  }

  getTempFolderPath(): string {
    return this.getFolderPath('temp');
  }

  createFolderIfNotExistInUploadsFolder(subFolderName: string): void {
    const path = join(this.getUploadFolderPath(), subFolderName);
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }

  moveFileFromTempToUpload(mediaType: string, mediaName: string): void {
    this.createFolderIfNotExistInUploadsFolder(mediaType);
    fs.renameSync(
      join(this.getTempFolderPath(), mediaName),
      join(this.getUploadFolderPath(), mediaType, mediaName),
    );
  }
}
