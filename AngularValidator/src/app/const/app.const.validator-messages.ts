/**
 * @module app/components
 */ /** */
/**
 * Defines the validator messages
 */
export class ValidatorMessages {

    public static REQUIRED = 'Field required';

    public static INTEGER = 'Please insert a valid integer value';

    public static FLOAT = 'Please insert a valid float value';

    public static PASSWORD = 'The password must contain six characters. \
        It must also have at least one letter, one number and one special character.';

    public static IP = 'The value must be a valid ip address.';

    public static PORT = 'The value must be a valid ethernet port.';

    public static RANGE = 'The entered value must be from {0} to {1}.';

    public static getKeys(): Array<string> {
        return [
            'REQUIRED',
            'INTEGER',
            'FLOAT',
            'PASSWORD',
            'IP',
            'PORT'
        ];
    }

    public static localize(key: string, message: string): void {
        (<any>ValidatorMessages)[key] = message;
    }

}
