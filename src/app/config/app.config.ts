import { environment } from '../../environments/environment';

export const AppConfig = {
  encryptionKey : 'urwz0BFEnXCSJJGSS3GgAgupk2Wt2eMFe1idLe7xXcg=',
  APP_VERSION: 'v 0.1',
  BASE_API: environment.apiBaseUrl + environment.contextPath+'/api/v1/',
  endpointPath: {
    login: 'auth/login',
    user: 'user',
    roles: 'master/userRoles',
    issueType: 'master/issueType',
    issueStatus: 'master/issueStatus',
    issues: 'issues',
    bankList: "master/branch/bankList",
    districtListOfBankBranch: "master/branch/districtListOfBankBranch",
    unMappedBranch: "master/branch/unMappedBranch",
    mappedBranch:"master/branch/mappedBranch",
    saveBranchMappingUnMapping: "master/branch/saveBranchMappingUnMapping",
    agency: "master/agency"

  },
};
