# Cloud Maker GitHub Action - Deploy

![status](https://github.com/cloud-maker-ai/github-action-deploy/actions/workflows/test.yml/badge.svg)

## Inputs

- `CLOUD_MAKER_TOKEN`: The Cloud Maker API token as configured in the Organisation Management screen.
- `CLOUD_MAKER_PIPELINE_ID`: The Cloud Maker Pipeline ID as found in the Pipeline Dashboard.
- `CLOUD_MAKER_STAGE_ID`: The Cloud Maker Stage ID as found in the Pipeline Dashboard.

## Example

Here is an example GitHub job using the Cloud Maker `cloud-maker-ai/github-action-deploy` action.

```yml
name: CM Deploy Pull Request Example
on: pull_request
jobs:
  cloud-maker-deployment:
    runs-on: ubuntu-latest
    steps:
      - uses: cloud-maker-ai/github-action-deploy@v1
        with:
          CLOUD_MAKER_TOKEN: ${{secrets.CLOUD_MAKER_TOKEN}}
          CLOUD_MAKER_PIPELINE_ID: ${{secrets.CLOUD_MAKER_PIPELINE_ID}}
          CLOUD_MAKER_STAGE_ID: ${{secrets.CLOUD_MAKER_STAGE_ID}}
```
