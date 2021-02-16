// Nest Imports
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from "@nestjs/platform-express";

// Application Imports
import { AppModule } from './app.module';

// Local Imports
import { join } from 'path';
import * as hbs from 'hbs';
import * as fs from 'fs';
import { DefaultValuePipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set Settings for Express
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Register Partials with Template Engine

  // TODO: Gotta handle this better
  const partialsRoot = join(__dirname, '..', 'views/partials');
  let partialsDirs = [];
  partialsDirs.push(partialsRoot);
  partialsDirs = partialsDirs.concat(getPartials(partialsRoot));
  partialsDirs.forEach(partialDir => { if (partialDir) hbs.registerPartials(partialDir) });
  partialsDirs.forEach(partial => { console.log('Partial: ' + partial)});
  // Start the App
  await app.listen(3000);
}
bootstrap();

const getPartials = (searchDir) => {
  let partialsDirs = [];

  // Verify that the current search directory exists
  if (!fs.existsSync(searchDir)) {
    console.log("!! Cannot Find Partials Directory: " + searchDir);
    return partialsDirs;
  }

  // Enumerate the files and directories in the current directory
  fs.readdirSync(searchDir).forEach(partialsDir => {
    const dirPath = join(searchDir, partialsDir);

    // If the file is a directory, add the directory to the array of directories
    if (fs.statSync(dirPath).isDirectory()) {
      console.log("Registering Partials Directory:" + dirPath);
      partialsDirs.push(dirPath);
      partialsDirs = partialsDirs.concat(getPartials(dirPath));
    }
  })
} 