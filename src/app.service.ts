import { Injectable } from '@nestjs/common';

class AppView {
  title: string;
  message: string;
  view: string;
}

@Injectable()
export class AppService {
  root(): AppView {
    const thisPage = new AppView();
    thisPage.title = "Page Title";
    thisPage.message = "Page Message";
    thisPage.view = "index";
    return thisPage;
  }

  login(): any {
    return new AppView();
  }

  register(): any {
    return new AppView();
  }

  forgot(): any {
    return new AppView();
  }
}
