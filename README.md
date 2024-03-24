<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Unit Testing

To run the unit tests for the Project, execute the following command:

```bash
npm run test
```

# Ways of working

This section serves as a guide to ensure good code quality and collaboration practices within our development environment.

Before You Start Working
Before diving into any coding tasks, it's essential to ensure that you follow these guidelines:

- **Code Quality Assurance:** We prioritize maintaining high code quality standards throughout the project. Please adhere to best practices and coding conventions outlined in our style guide, Make sure you have enabled the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) in your editor.

- **Testing:** Write comprehensive tests for features and ensure that existing tests remain passing. 

## Commit Guidelines
When making commits, please follow these guidelines:

- **Format**: Commits follow [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) conventions followed by a Ticket number.
   For example if your ticket is 123 then your commit would look like:
   ```
   feat: describe your changes (DevOps-123)
   ```
   Allowed prefixes are:
   - `feat`: for a new feature for the user.
   - `fix`: for a bug fix for the user, not a fix to a build script.
   - `chore`: Changes to t auxiliary tools and libraries such as documentation generation
   - `ci`: Changes to CI/CD tools such as jenkins or github actions.
   - `docs`: for changes to the documentation.
   - `style`: for formatting changes, missing semicolons, etc (NOT CSS).
   - `refactor`: for refactoring production code, e.g. renaming a variable.
   - `perf`: for performance improvements.
   - `test`: for adding missing tests, refactoring tests; no production code change.
   - `build`: [RESERVED FOR RELEASES] for deploying new builds.

## Pull Request Guidelines
When creating a pull request, adhere to the following guidelines:

- **Single Commit:** Is desired that each pull request contains __**only one commit**__. This ensures that the changes are well-segmented and easier to review. Only in extreme cases where the change is big then is allowed multiple commits

- **Rebase Merge Strategy**: Use the rebase merge strategy when merging your changes into the main branch. This helps maintain a clean and linear commit history. If PR has more than 1 commit use Merge Commit strategy

- **Review and Approval:** Every pull request should have at least one approvals from team members before it can be merged. Peer review is crucial for maintaining code quality and knowledge sharing.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).