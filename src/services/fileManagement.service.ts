import { Injectable } from "@nestjs/common";
import { join } from "path";
import *as fs from 'fs'
@Injectable()
export class FileManagementService {
  ensurePublicTempExists() {
    const publicPath =join(process.cwd(), 'public');
    const tempPath = join(publicPath, 'temp');

    if (!fs.existsSync(tempPath)) {
      console.log(`'temp' folder does not exist inside 'public', creating...`);
      fs.mkdirSync(tempPath, { recursive: true });
    }
  }
}