import { TokensType } from '../tokens';
import { UserType } from '../user';

export type RootState = {
    user: {
        userData: UserType;
    };
    tokens: {
        tokensData: TokensType;
    };
};
