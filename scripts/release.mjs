import inquirer from 'inquirer';
import { resolve } from 'node:path';
import util from 'node:util';
import { exec } from 'node:child_process';
import semver from 'semver';
import fse from 'fs-extra';
import pkg from '../package.json' assert { type: 'json' };

const legacyStartVersion = '0.0.6';

const promisedExec = util.promisify(exec);

const queryReleasedVersions = async () => {
  const { stdout } = await promisedExec(`npm view --json ${pkg.name} versions`);
  return JSON.parse(stdout);
};

const queryReleaseTags = async () => {
  const { stdout } = await promisedExec('git tag --list');
  const versions = stdout.split('\n').map((version) => version.replace('v', ''));
  return versions.slice(0, versions.length - 1);
};

const build = async () => {
  const lib = resolve('../lib');

  if (fse.existsSync(lib)) {
    await fse.rmdir(lib);
  }

  console.log('Start to build');
  await promisedExec('npm run build');
  console.log('Done\n');
};

const publish = async (otp) => {
  const script = otp ? `npm publish --otp=${otp}` : 'npm publish';
  console.log(`Run ${script}`);
  await promisedExec(script);
  console.log('Done\n');
};

const ask = async (versions) => {
  const descendingVersions = versions.sort((pre, next) => {
    if (semver.gt(pre, next)) {
      return -1;
    }

    if (semver.lt(pre, next)) {
      return 1;
    }

    return 0;
  });

  const [latest, ...rest] = descendingVersions;

  if (latest === pkg.version) {
    const answer = await inquirer.prompt([
      { name: 'publish', type: 'confirm', message: `Do you want to release ${latest}` },
      { name: 'otp', type: 'text', message: 'Type the one-time password if exists' },
    ]);

    if (answer.publish === true) {
      await build();
      await publish(answer.otp);
    }
  } else {
    console.log('The latest version has been released already');
  }

  if (rest && rest.length) {
    console.log(`The unrelease versions are ${rest}`);
  }
};

const release = async () => {
  const releasedVersions = await queryReleasedVersions();
  const tags = await queryReleaseTags();
  const unreleasedVersions = [];

  tags.forEach((version) => {
    if (releasedVersions.indexOf(version) <= -1 && semver.gt(version, legacyStartVersion)) {
      unreleasedVersions.push(version);
    }
  });

  await ask(unreleasedVersions);
};

release();
