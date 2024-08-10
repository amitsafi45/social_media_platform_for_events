import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { MediaType } from '@constants/enum';
@Injectable()
export class FileManagementService {
  ensureFolderInsidePublicFolderExists(path: string) {
    const publicPath = join(process.cwd(), 'public');
    const tempPath = join(publicPath, path);
    this.fileCreator(tempPath);
  }

  fileCreator(path: string) {
    if (!fs.existsSync(path)) {
      console.log(`'temp' folder does not exist inside 'public', creating...`);
      fs.mkdirSync(path, { recursive: true });
    }
  }

  checkFileExistOrNot(filename: string) {
    const tempFilePath = join(process.cwd(), 'public', 'temp', filename);
    // Check if the file exists in the temp directory
    if (!fs.existsSync(tempFilePath)) {
      throw new HttpException(
        `File not found: ${filename}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return true;
  }

  moveFileFromTempToUpload(
    type: MediaType,
    filename: string,
    ownerIdentities: string,
  ) {
    console.log('Enter');
    const fileStation = join(process.cwd(), 'public', 'temp', `${filename}`);
    const destinationFolder = `uploads/${ownerIdentities}/${type.toLowerCase()}`;
    const destinationPath = join(
      process.cwd(),
      'public',
      destinationFolder,
      filename,
    );
    this.ensureFolderInsidePublicFolderExists(destinationFolder);
    try {
      fs.renameSync(fileStation, destinationPath); // Move the file
      console.log(`File moved to ${destinationPath} successfully.`);
    } catch (error) {
      throw new HttpException(
        `Failed to move file: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
