import { AppController } from './main';

async function bootStrap() {
    const appController = new AppController();
    (await appController.app).listen(process.env.PORT || 3000).then(() => {
        console.log(`Server runing on port: ${process.env.PORT || 3000}`)
    });
}

bootStrap();