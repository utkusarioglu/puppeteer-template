const { USERNAME, PASSWORD } = process.env;

export default {
  screenshotsPath: './screenshots',
  homeDir: 'http://example.com',

  // The next few come from environment variables
  username: USERNAME,
  password: PASSWORD,
};
