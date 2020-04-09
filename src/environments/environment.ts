// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  current_env: 'US',
  auth: {
    CLIENT_ID: 'wEH0EDSdhD2LKBmw4yQF7qKZwe7ncPi1',
    CLIENT_DOMAIN: 'dev-tuition-relief.auth0.com',
    AUDIENCE: 'https://dev.tuitionrelief.io/api/',
    REDIRECT_URI_DEV: 'https://dev.tuitionrelief.io/dashboard',
    REDIRECT_URI: 'http://localhost:4200/dashboard',
    LOGOUT_URI: 'https://www.tuitionrelief.io',
    LOGOUT_ACCT_CONFIRM_URI: 'https://www.tuitionrelief.io/confirm-account.html'
  },
  chart_enabled_envs: ['US', 'INDIA'],
  INDIA: {
    top_cluster: 'IN-Maharashtra',
    top_cluster_name: 'Maharashtra',
    clusterdetails: ['IN-Maharashtra'],
    prefix: 'INDIA-',
    fullName: 'India',
    website: 'coronastrong.in',
    historyResource: '/INDIAStates-V1',
    corona_count: {
      serviceURI: 'https://192y3uqc73.execute-api.ap-south-1.amazonaws.com/PROD/clusters',
      serviceHistoryURI: 'https://192y3uqc73.execute-api.ap-south-1.amazonaws.com/PROD/clusters'
    },
    column_config: {
      2 : { column_name: 'foreigners_count', title: 'Foreign' }
    },
    chart: {
      cluster: ['India', 'Maharashtra', 'Kerala', 'Karnataka', 'Karnataka', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'Tamil Nadu' ],
      visibleList: [ 'Maharashtra', 'Kerala', 'Karnataka', 'Gujarat', 'Tamil Nadu' ],
      stateAbrev: [{state: 'India', abbrev: 'IN'}, { state: 'Andhra Pradesh', abbrev: 'AP' }, { state: 'Arunachal Pradesh', abbrev: 'AR' }, { state: 'Assam', abbrev: 'AS' }
      , { state: 'Bihar', abbrev: 'BR' }, { state: 'Chhattisgarh', abbrev: 'CG' }, { state: 'Goa', abbrev: 'GA' },
        { state: 'Gujarat', abbrev: 'GJ' }, { state: 'Haryana', abbrev: 'HR' }, { state: 'Himachal Pradesh', abbrev: 'HP' },
        { state: 'Jammu and Kashmir', abbrev: 'JK' }, { state: 'Jharkhand', abbrev: 'JH' }, { state: 'Karnataka', abbrev: 'KA' },
        { state: 'Kerala', abbrev: 'KL' }, { state: 'Madhya Pradesh', abbrev: 'MP' }, { state: 'Maharashtra', abbrev: 'MH' },
        { state: 'Manipur', abbrev: 'MN' }, { state: 'Meghalaya', abbrev: 'ML' }, { state: 'Mizoram', abbrev: 'MZ' },
        { state: 'Nagaland', abbrev: 'NL' }, { state: 'Orissa', abbrev: 'OR' }, { state: 'Punjab', abbrev: 'PB' },
        { state: 'Rajasthan', abbrev: 'RJ' }, { state: 'Sikkim', abbrev: 'SK' }, { state: 'Tamil Nadu', abbrev: 'TN' },
        { state: 'Tripura', abbrev: 'TR' }, { state: 'Uttarakhand', abbrev: 'UK' }, { state: 'Uttar Pradesh', abbrev: 'UP' },
        { state: 'West Bengal', abbrev: 'WB' }, { state: 'Telangana', abbrev: 'TS' }, { state: 'Andaman and Nicobar', abbrev: 'AN' },
        { state: 'Chandigarh', abbrev: 'CH' }, { state: 'Dadra and Nagar Haveli', abbrev: 'DH' }, { state: 'Daman and Diu', abbrev: 'DD' },
        { state: 'Delhi', abbrev: 'DL' }, { state: 'Lakshadweep', abbrev: 'LD' }, { state: 'Pondicherry', abbrev: 'PY' }]
    }
  },
  US: {
    top_cluster: 'US-New York',
    top_cluster_name: 'New York',
    clusterdetails: ['US-New York'],
    prefix: 'US-',
    website: 'coronastrong.us',
    fullName: 'USA',
    historyResource: '/USStates-V2',
    corona_count: {
      serviceURI: 'https://bgctw6g195.execute-api.us-east-1.amazonaws.com/PROD/clusters',
      serviceHistoryURI: 'https://bgctw6g195.execute-api.us-east-1.amazonaws.com/PROD/clusters'
    },
    column_config: {
      2 : { column_name: 'recovered_count', title: 'Recoverd' }
    },
    chart: {
      cluster: ['USA', 'New Jersey', 'New York', 'Washington', 'California', 'Florida', 'Louisiana', 'Illinois', 'Texas', 'Michigan' ],
      visibleList: [ 'New Jersey', 'Washington', 'California', 'Florida', 'Louisiana', 'Illinois', 'Texas', 'Michigan' ],
      stateAbrev: [{state: 'New Jersey', abbrev: 'NJ' }, {state: 'New York', abbrev: 'NY' },
        {state: 'Washington', abbrev: 'WA' }, {state: 'California', abbrev: 'CA' },
        {state: 'Florida', abbrev: 'FL' }, {state: 'Louisiana', abbrev: 'LA' },
        {state: 'Illinois', abbrev: 'IL' }, {state: 'Michigan', abbrev: 'MI' }, {state: 'Texas', abbrev: 'TX' }]
    }
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
