import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join, resolve } from 'path';
import * as fs from 'fs';

@Injectable()
export class FileManagementService {
  constructor(private readonly configService: ConfigService) {
    this.ensureFolderExists('public');
    this.ensureFolderExists('public/temp');
  }

  private ensureFolderExists(relativePath: string): void {
    const fullPath = this.getFolderPath(relativePath);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  }

  private getFolderPath(folder: string): string {
    return resolve(process.cwd(), folder);
  }

  getUploadFolderPath(): string {
    const uploadPath = join(this.getFolderPath('public'), 'upload');
    this.ensureFolderExists('public/upload');
    return uploadPath;
  }

  getTempFolderPath(): string {
    return join(this.getFolderPath('public'), 'temp');
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
