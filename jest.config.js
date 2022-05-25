module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
	setupFilesAfterEnv: ['./setupTests.ts'],
	transformIgnorePatterns: [
		'<rootdir>/node_modules/uuid'
	]
};
