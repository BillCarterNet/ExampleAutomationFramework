// const environment = 'stage'
const environment = 'develop';
// const environment = 'production'

const testConfig = {

    getEnvironment: () => environment,
    homePageUrl: `http://automationpractice.com/index.php`,
    
};

module.exports = testConfig;