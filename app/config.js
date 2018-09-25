//Create and export configuration variable

//Container for all the environments

const environments = {};

//Staging default environment

environments.staging = {
  port: 3000,
  envName: 'staging',
};

//Staging default environment

environments.production = {
  port: 5000,
  envName: 'production',
};

//Determine which env was passed as a command-line

let currentEnvironment =
  typeof process.env.NODE_ENV == 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : '';

//Check that the current environment is one of the environment above else default to staging

let environmentToExport =
  typeof(environments[currentEnvironment]) == 'object'
    ? environments[currentEnvironment]
    : environments.staging;


module.exports = environmentToExport