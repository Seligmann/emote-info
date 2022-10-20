import {RefreshingAuthProvider} from '@twurple/auth';
import {ChatClient} from '@twurple/chat';
import {promises as fs} from 'fs';

async function main() {

    const confidential = JSON.parse(await fs.readFile('../vars/confidential.json'));
    const clientSecret = confidential[0];
    const clientId = confidential[1];
    const tokenData = JSON.parse(await fs.readFile('../vars/tokens.json', 'UTF-8'));
    const authProvider = new RefreshingAuthProvider(
        {
            clientId,
            clientSecret,
            onRefresh: async newTokenData => await fs.writeFile('../vars/tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
        },
        tokenData
    );

    const chatClient = new ChatClient({authProvider, channels: ['xqc']});
    await chatClient.connect();

    chatClient.onMessage((channel, user, text) => {
        console.log(user, text);
    });
}

main();