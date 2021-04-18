
export class LocalUser {

    private userId: number;

    private username: string;

    private email: string;

    private phoneNumber: string;

    private firstName: string;

    private lastName: string;

    private profileImageUrl: string;

    private lastLoginTime: Date;

    private creationTime: Date;

    private lastModifiedTime: Date;

    private isAccountLocked: boolean;

    private isEnabled: boolean;

    private isVerified: boolean;

    constructor() {
        this.userId = 0;
        this.username = "";
        this.email = "";
        this.phoneNumber = "";
        this.firstName = "";
        this.lastName = "";
        this.profileImageUrl = "";
        this.lastLoginTime = new Date();
        this.creationTime = new Date();
        this.lastModifiedTime = new Date();
        this.isAccountLocked = false;
        this.isEnabled = false;
        this.isVerified = false;
    }


    public getUserId(): number {
        return this.userId;
    }

    public setUserId(userId: number): void {
        this.userId = userId;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getProfileImageUrl(): string {
        return this.profileImageUrl;
    }

    public setProfileImageUrl(profileImageUrl: string): void {
        this.profileImageUrl = profileImageUrl;
    }

    public getLastLoginTime(): Date {
        return this.lastLoginTime;
    }

    public setLastLoginTime(lastLoginTime: Date): void {
        this.lastLoginTime = lastLoginTime;
    }

    public getCreationTime(): Date {
        return this.creationTime;
    }

    public setCreationTime(creationTime: Date): void {
        this.creationTime = creationTime;
    }

    public getLastModifiedTime(): Date {
        return this.lastModifiedTime;
    }

    public setLastModifiedTime(lastModifiedTime: Date): void {
        this.lastModifiedTime = lastModifiedTime;
    }

    public isIsAccountLocked(): boolean {
        return this.isAccountLocked;
    }

    public setIsAccountLocked(isAccountLocked: boolean): void {
        this.isAccountLocked = isAccountLocked;
    }

    public isIsEnabled(): boolean {
        return this.isEnabled;
    }

    public setIsEnabled(isEnabled: boolean): void {
        this.isEnabled = isEnabled;
    }

    public isIsVerified(): boolean {
        return this.isVerified;
    }

    public setIsVerified(isVerified: boolean): void {
        this.isVerified = isVerified;
    }




}