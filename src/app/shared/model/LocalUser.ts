
export class LocalUser {

    private _userId: number;

    private _username: string;

    private _email: string;

    private _phoneNumber: string;

    private _firstName: string;

    private _lastName: string;

    private _profileImageUrl: string;

    private _lastLoginTime: Date;

    private _creationTime: Date;

    private _lastModifiedTime: Date;

    private _isAccountLocked: boolean;

    private _isEnabled: boolean;

    private _isVerified: boolean;

    constructor() {
        this._userId = 0;
        this._username = "";
        this._email = "";
        this._phoneNumber = "";
        this._firstName = "";
        this._lastName = "";
        this._profileImageUrl = "";
        this._lastLoginTime = new Date();
        this._creationTime = new Date();
        this._lastModifiedTime = new Date();
        this._isAccountLocked = false;
        this._isEnabled = false;
        this._isVerified = false;
    }


    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(value: string) {
        this._phoneNumber = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get profileImageUrl(): string {
        return this._profileImageUrl;
    }

    set profileImageUrl(value: string) {
        this._profileImageUrl = value;
    }

    get lastLoginTime(): Date {
        return this._lastLoginTime;
    }

    set lastLoginTime(value: Date) {
        this._lastLoginTime = value;
    }

    get creationTime(): Date {
        return this._creationTime;
    }

    set creationTime(value: Date) {
        this._creationTime = value;
    }

    get lastModifiedTime(): Date {
        return this._lastModifiedTime;
    }

    set lastModifiedTime(value: Date) {
        this._lastModifiedTime = value;
    }

    get isAccountLocked(): boolean {
        return this._isAccountLocked;
    }

    set isAccountLocked(value: boolean) {
        this._isAccountLocked = value;
    }

    get isEnabled(): boolean {
        return this._isEnabled;
    }

    set isEnabled(value: boolean) {
        this._isEnabled = value;
    }

    get isVerified(): boolean {
        return this._isVerified;
    }

    set isVerified(value: boolean) {
        this._isVerified = value;
    }
}
