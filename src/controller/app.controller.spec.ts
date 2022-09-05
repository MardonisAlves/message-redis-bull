import { AppController } from "./app.controller";
import EmailService from '../services/email-service';
import { Job, Queue } from "bull";
import EmailDtos from "src/dtos/email.dtos";

describe('AppController', () => {
    let appController: AppController;
    let emailService: EmailService;
    let emailQueue: Queue
    beforeEach(() => {
        emailService = new EmailService(emailQueue);
        appController = new AppController(emailService);
    });

    describe('enviar-email', () => {
        it('Deve enviar-email', async () => {
            let email:EmailDtos | Job | any = {
                assunto:'teste',
                email:'mardonisgp@gmail.com'
            }
            jest.spyOn(emailService, 'enviarEmail').mockImplementation(() => email);
            expect(await appController.enviarEmail(email)).toBe(email);
        });
    });
});