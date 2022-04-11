import { getInput, setFailed } from "@actions/core";
import axios from "axios";

async function run() {
  console.log("Retrieving variables");

  const cmApiToken = getInput("CLOUD_MAKER_TOKEN");
  const cmPipelineId = getInput("CLOUD_MAKER_PIPELINE_ID");
  const cmStageId = getInput("CLOUD_MAKER_STAGE_ID");

  const cmBaseAddress = "https://api.cloudmaker.ai/v1";
  const headers = {
    "X-Api-Key": cmApiToken,
  };

  console.log("Creating deployment");
  const createResult = await axios({
    url: `${cmBaseAddress}/pipelines/${cmPipelineId}/stages/${cmStageId}/deployments`,
    method: "POST",
    headers,
  });

  const { id } = createResult.data as { id: string };
  console.log(`Deployment created with ID "${id}"`);

  let lastSeenLog = 0;
  while (true) {
    const statusResult = await axios({
      url: `${cmBaseAddress}/deployments/${id}`,
      method: "GET",
      headers,
    });

    const { status, logs } = statusResult.data as {
      status: string;
      logs: string[];
    };

    for (let i = lastSeenLog; i < logs.length; ++i) {
      console.log(logs[i]);
    }
    lastSeenLog = logs.length;

    if (status === "Succeeded") {
      break;
    } else if (status === "Failed") {
      setFailed("Deployment failed");
      break;
    }

    await new Promise((r) => setTimeout(r, lastSeenLog > 0 ? 5000 : 500)); // sleep
  }
}

try {
  run();
} catch (error: any) {
  console.log(`ERROR: ${error.message}`);
  setFailed(error.message);
}
