import * as ethers from 'ethers';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

const SECURE_KEY_NAME = 'zkp_private_key';

class CryptoService {
    static async generateAndSaveIdentity() {
        try {
            const randomBytes = Crypto.getRandomBytes(16);

            let mnemonicPhrase;
            let wallet;


            if (ethers.Mnemonic) {

                mnemonicPhrase = ethers.Mnemonic.fromEntropy(randomBytes).phrase;
                wallet = ethers.Wallet.fromPhrase(mnemonicPhrase);
            } else if (ethers.utils && ethers.utils.entropyToMnemonic) {

                mnemonicPhrase = ethers.utils.entropyToMnemonic(randomBytes);
                wallet = ethers.Wallet.fromMnemonic(mnemonicPhrase);
            } else {
                throw new Error('Не удалось определить версию ethers.js');
            }

            const privateKey = wallet.privateKey;
            const publicKey = wallet.address;


            await SecureStore.setItemAsync(SECURE_KEY_NAME, privateKey);

            return { mnemonic: mnemonicPhrase, publicKey };
        } catch (error) {
            console.error('Ошибка при генерации ключей:', error);
            throw error;
        }
    }


    static async restoreFromMnemonic(mnemonicPhrase) {
        try {
            let wallet;

            if (ethers.Wallet.fromPhrase) {
                wallet = ethers.Wallet.fromPhrase(mnemonicPhrase.trim());
            } else {
                wallet = ethers.Wallet.fromMnemonic(mnemonicPhrase.trim());
            }

            await SecureStore.setItemAsync(SECURE_KEY_NAME, wallet.privateKey);
            return wallet.address;
        } catch (error) {
            console.error('Ошибка восстановления:', error);
            throw new Error('Недействительная seed-фраза');
        }
    }

    static async signChallenge(challengeString) {
        try {
            const privateKey = await SecureStore.getItemAsync(SECURE_KEY_NAME);
            if (!privateKey) {
                throw new Error('Приватный ключ не найден.');
            }

            const wallet = new ethers.Wallet(privateKey);
            const signature = await wallet.signMessage(challengeString);

            return signature;
        } catch (error) {
            console.error('Ошибка при подписании:', error);
            throw error;
        }
    }

    static async getPublicKey() {
        const privateKey = await SecureStore.getItemAsync(SECURE_KEY_NAME);
        if (!privateKey) return null;
        const wallet = new ethers.Wallet(privateKey);
        return wallet.address;
    }
}

export default CryptoService;