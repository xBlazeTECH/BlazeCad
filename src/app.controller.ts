import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res: Response): any {
    return res.render(
      this.appService.root().view,
      this.appService.root()
    )
  }

  @Get('/login')
  login(@Res() res: Response): any {
    return res.render('login', this.appService.login());
  }

  @Get('/register')
  register(@Res() res: Response): any {
    return res.render('login', this.appService.register());
  }

  @Get('/forgot')
  forgot(@Res() res: Response): any {
    return res.render('login', this.appService.forgot());
  }
}
