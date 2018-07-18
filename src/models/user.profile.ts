import { UserProfileAddress } from './user.profile.address';

export interface UserProfile {

  partyId: string;
  partyName: string;
  email: string;
  address: UserProfileAddress;
  contact: string;
  userLoginId: string;
}

