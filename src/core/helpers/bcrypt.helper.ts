import bcrypt from 'bcrypt';

export class BcryptHelper {
  public static async hash(
    plainText: string,
    saltRounds = 10,
  ): Promise<string> {
    return bcrypt.hash(plainText, saltRounds);
  }

  public static async verifyHash(
    plainText: string,
    hash: string,
  ): Promise<boolean> {
    if (typeof plainText !== 'string' || typeof hash !== 'string') return false;

    return bcrypt.compare(plainText, hash);
  }
}
