# Lambda Warmer

_The related post: https://moondaddi.dev/post/2019-03-23-how-to-warm-lambda-function/_

This is a lambda function to warm another lambda function in AWS. Especially, this is to solve a cold start issue for **the web app which is deployed on AWS lambda.**

## Usage

### Requirements

- [serverless](https://serverless.com/) is required.

### Deployment

- Clone this repo.

```shell
$ git clone https://github.com/mattdamon108/lambda-warmer
```

- Rename `serverless.template.yml` to `serverless.yml` and configure it with your IAM profile.

```shell
$ mv serverless.template.yml serverless.yml
```

```yml
service: lambda-warmer

provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  region: ap-northeast-2 # Edit the region
  profile: your-profile # Edit here with your AWS IAM profile
  memorySize: 128
  timeout: 15s

functions:
  warmer:
    handler: handler.warmer
    events:
      - schedule: rate(5 minutes)
```

> Your IAM profile needs to be stored in `~/.aws/credentials` with proper permissions to create a lambda function through AWS cloudformation.

- Set the target URL

```js
// handler.js

module.exports.warmer = async (event, context, callback) => {
  try {
    await warming("https://www.rate-link.com/rates"); // change your target URL
    context.succeed();
  } catch (e) {
    context.done();
  }
};
```

- Deploy

```shell
$ sls deploy
```
