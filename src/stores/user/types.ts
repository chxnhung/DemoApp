declare namespace user {
    type State = Readonly<Info>;
    interface userInfor {
        photoURL?: string;
        uid: string | number;
        isAnonymous?: false;
        metadata?: {
            creationTime?: number;
            lastSignInTime?: number;
        };
        tenantId?: string | number;
        refreshToken: string;
        multiFactor?: {
            enrolledFactors?: [];
        };
        emailVerified?: boolean;
        providerData?: [
            {
                providerId?: string;
                uid?: string;
                email?: string;
            }
        ];
        providerId?: string;
        email: string;
        displayName?: string;
        phoneNumber?: string | number;
    }

    interface Info {
        isLogin: boolean;
        userInfor: userInfor;
    }
}
