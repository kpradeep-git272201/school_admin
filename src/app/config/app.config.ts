import { generate } from 'rxjs';
import { environment } from '../../environments/environment';

export const AppConfig = {
  encryptionKey : 'urwz0BFEnXCSJJGSS3GgAgupk2Wt2eMFe1idLe7xXcg=',
  APP_VERSION: 'v 0.3',
  LAST_UPDATED: '07-Jul-2025',
  BASE_API: environment.apiBaseUrl + environment.contextPath+'/api/v1/',
  endpointPath: {
    login: 'auth/login',
    generateOtp: 'auth/otp',
    verifyOtp: 'auth/verify',
    verifyTpin: 'auth/verifyTpin',
    sendMail: 'email/send-mail',
    signUp: 'auth/signup',
    user: 'user',
    roles: 'master/userRoles',
    issueType: 'master/issueType',
    issueStatus: 'master/issueStatus',
    designation: 'master/designation',
    adminCount: 'master/admin-count',
    issues: 'issues',
    statusCount: 'issues/statusCount',
    downloadDoc: 'issues/download-doc',
    bankList: "master/branch/bankList",
    districtListOfBankBranch: "master/branch/districtListOfBankBranch",
    unMappedBranch: "master/branch/unMappedBranch",
    mappedBranch:"master/branch/mappedBranch",
    saveBranchMappingUnMapping: "master/branch/saveBranchMappingUnMapping",
    agency: "master/agency"

  },
};
