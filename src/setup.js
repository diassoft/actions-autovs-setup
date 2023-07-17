const core = require('@actions/core');
const github = require('@actions/github');
const { context } = require('@actions/github');
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
const octokit = github.getOctokit(GITHUB_TOKEN);

try {
  // This script will create new labels and variables in the repository
  // If any data already exists, it will not be erased.
  
  // There are two ways to use this script:
  // - Add a call to it before you use the Auto Versioning System (recommended)
  // - Call it manually once

  // ********************************************************************
  // Create Repository Labels
  //
  // - vs-new-major: force the creation of a new major (resets minor, patch, pre-releases to zero)
  // - vs-new-minor: force the creation of a new minor for the given major (resets patch and pre-releases to zero)
  // - vs-new-patch: force the creation of a new patch (reset pre-release to zero)
  // - vs-new-prerelease: force to move between alpha, beta, or rc pre-releases
  // ********************************************************************


  // ********************************************************************
  // Create Repository Variables
  //
  // - VS_CUR_MAJOR: The current major
  // - VS_CUR_MINOR: The current minor
  // - VS_CUR_PATCH: The current patch
  // - VS_PRLS_SEQ: The current pre-release (0 = none, 1 = alpha, 2 = beta, 3 = rc)
  // - VS_PRLS_SEQ_ALPHA: The sequence for the alpha release
  // - VS_PRLS_SEQ_BETA: The sequence for the beta release
  // - VS_PRLS_SEQ_RC: The sequence for the release candidate
  // - VS_GLB_BUILDNUMBER: A unique sequential number that gets incremented every time a new build happens.
  // - VS_GLB_CUR_VERSION: The description of the current version (v1.2.0-alpha.1.000104)
  // ********************************************************************

  octokit.rest.actions.getRepoVariable({
    owner: context.repository_owner,
    repo: context.repo,
    name: 'VS_CUR_MAJOR'
  });

  /*oktokit.rest.actions.createRepoVariable({
    owner,
    repo,
    name,
    value
  });*/

  console.log(`Repository owner is ${context.repo}`);

  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}