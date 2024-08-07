import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join, resolve } from 'path';
import * as fs from 'fs';

@Injectable()
export class FileManagementService {
  constructor(private readonly configService: ConfigService) {
    this.createPublicFolderIfNotExist();
  }

  private createPublicFolderIfNotExist(): void {
    const publicPath = this.getFolderPath('public');
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }
  }

  private getFolderPath(folder: string): string {
    return resolve(process.cwd(), folder);
  }

  getUploadFolderPath(): string {
    return resolve(process.cwd(), 'public', 'upload');
  }

  getTempFolderPath(): string {
    const path = join(this.getFolderPath('public'), 'temp');
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    return path;
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
