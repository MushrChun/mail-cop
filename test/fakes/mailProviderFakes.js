export class SendGridFailFake {
    sendMessage() {
        return Promise.reject();
    }
}

export class SendGridSuccessFake {
    sendMessage() {
        return Promise.resolve();
    }
}

export class MailgunFailFake {
    sendMessage() {
        return Promise.reject();
    }
}

export class MailgunSuccessFake {
    sendMessage() {
        return Promise.resolve();
    }
}
