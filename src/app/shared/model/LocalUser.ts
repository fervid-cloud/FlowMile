export class LocalUser {

    userId: number;

    username: string;

    email: string;

    phoneNumber: string;

    firstName: string;

    lastName: string;

    profileImageUrl: string;

    lastLoginTime: Date;

    creationTime: Date;

    lastModifiedTime: Date;

    isAccountLocked: boolean;

    isEnabled: boolean;

    isVerified: boolean;

    constructor() {
        this.userId = 0;
        this.username = '';
        this.email = '';
        this.phoneNumber = '';
        this.firstName = '';
        this.lastName = '';
        this.profileImageUrl = '';
        this.lastLoginTime = new Date();
        this.creationTime = new Date();
        this.lastModifiedTime = new Date();
        this.isAccountLocked = false;
        this.isEnabled = false;
        this.isVerified = false;
    }

}
