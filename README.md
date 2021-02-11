# react-native-kueres

## Development

1. Clone the repository
2. Enter the `react-native-kueres` directory
3. Install the packages dependencies with `npm i`
4. Install the husky pre-commit hook with `npx husky install`
4. Format code with `npm run format`
5. Lint code with `npm run lint`

The husky pre-commit hook will format and lint code before committing.

## Publishing

### Automatically

Code pushed to the `release` branch is automatically published to the projects NPM registry.

### Manually

Code can also be published manually.

1. Adjust and run the following command to  [authenticate with the Package Registry](https://docs.gitlab.com/ee/user/packages/npm_registry/#authenticate-to-the-package-registry)

    - `npm config set @ilt-pse:registry https://gitlab-ext.iosb.fraunhofer.de/api/v4/projects/2563/packages/npm/`
    - `npm config set '//gitlab-ext.iosb.fraunhofer.de/api/v4/projects/2563/packages/npm/:_authToken' "<your_access_token>"`

2. Build the package with `npm run build`
3. Publish the package with `npm publish`
