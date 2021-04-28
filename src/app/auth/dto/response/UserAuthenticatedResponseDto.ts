import { LocalUser } from "src/app/shared/model/LocalUser";


export interface UserAuthenticatedResponseDto {

    userDetailDto: LocalUser;

    token: string;

    message: string;

}
