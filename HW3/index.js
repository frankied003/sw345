var request = require('request');

const chalk = require('chalk');

require('dotenv').config();

var urlRoot = "https://api.github.com";
// NCSU Enterprise endpoint:
//var urlRoot = "https://api.github.ncsu.edu";

var userId = "frankied003";
var config = {};
// Retrieve our api token from the environment variables.
config.token = process.env.GITHUBTOKEN;

if (!config.token) {
	console.log(chalk`{red.bold GITHUBTOKEN is not defined!}`);
	console.log(`Please set your environment variables with appropriate token.`);
	console.log(chalk`{italic You may need to refresh your shell in order for your changes to take place.}`);
	process.exit(1);
}

console.log(chalk.green(`Your token is: ${config.token.substring(0, 4)}...`));

if (process.env.NODE_ENV != 'test') {
	(async () => {
		//await listAuthenicatedUserRepos();
		await listBranches(userId, "Sw345");
		await createRepo("HW4");
		//await createIssue(userId, "HW4", "Issue from API");
		await enableWikiSupport(userId, "HW4");

	})()
}

function getDefaultOptions(endpoint, method) {
	var options = {
		url: urlRoot + endpoint,
		method: method,
		headers: {
			"User-Agent": "ssw345-REST-lab",
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		}
	};
	return options;
}

async function getUser() {
	let options = getDefaultOptions("/user", "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function (resolve, reject) {
		request(options, function (error, response, body) {
			resolve(JSON.parse(body).login);
		});
	});
}

function listAuthenicatedUserRepos() {
	let options = getDefaultOptions("/user/repos?visibility=all", "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function (resolve, reject) {
		request(options, function (error, response, body) {
			if (error) {
				console.log(chalk.red(error));
				reject(error);
				return; // Terminate execution.
			}

			var obj = JSON.parse(body);
			for (var i = 0; i < obj.length; i++) {
				var name = obj[i].name;
				console.log(name);
			}

			// Return object for people calling our method.
			resolve(obj);
		});
	});

}

// 1. Write code for listBranches in a given repo under an owner. See list branches
async function listBranches(owner, repo) {
	let options = getDefaultOptions(`/repos/${owner}/${repo}/branches`, "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function (resolve, reject) {
		request(options, function (error, response, body) {
			if (error) {
				console.log(chalk.red(error));
				reject(error);
				return; // Terminate execution.
			}

			var obj = JSON.parse(body);
			for (var i = 0; i < obj.length; i++) {
				var name = obj[i].name;
				console.log(name);
			}

			resolve(obj);
		});
	});
}

// 2. Write code to create a new repo
async function createRepo(repoName) {
	var options = {
		url: urlRoot + '/user/repos',
		method: 'POST',
		body: JSON.stringify({
			name: repoName
		}),
		headers: {
			"User-Agent": "ssw345-REST-lab",
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		}
	};

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function (resolve, reject) {
		request(options, function (error, response, body) {

			if (error) {
				console.log(chalk.red(error));
				reject(error);
				return; // Terminate execution.
			}

			var obj = JSON.parse(body);
			console.log(obj)

			resolve(response.statusCode);

		});
	});

}
// 3. Write code for creating an issue for an existing repo.
async function createIssue(owner, repo, issueName, issueBody) {
	var options = {
		url: urlRoot + `/repos/${owner}/${repo}/issues`,
		method: 'POST',
		body: JSON.stringify({
			title: issueName,
			body: issueBody
		}),
		headers: {
			"User-Agent": "ssw345-REST-lab",
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		}
	};

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function (resolve, reject) {
		request(options, function (error, response, body) {

			if (error) {
				console.log(chalk.red(error));
				reject(error);
				return; // Terminate execution.
			}

			var obj = JSON.parse(body);
			console.log(obj)

			resolve(response.statusCode);

		});
	});
}

// 4. Write code for editing a repo to enable wiki support.
async function enableWikiSupport(owner, repo) {
	var options = {
		url: urlRoot + `/repos/${owner}/${repo}`,
		method: 'PATCH',
		body: JSON.stringify({
			has_wiki: true
		}),
		headers: {
			"User-Agent": "ssw345-REST-lab",
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		}
	};

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function (resolve, reject) {
		request(options, function (error, response, body) {

			if (error) {
				console.log(chalk.red(error));
				reject(error);
				return; // Terminate execution.
			}

			var obj = JSON.parse(body);
			console.log(obj)
			resolve(obj);

		});
	});
}

module.exports.getUser = getUser;
module.exports.listAuthenicatedUserRepos = listAuthenicatedUserRepos;
module.exports.listBranches = listBranches;
module.exports.createRepo = createRepo;
module.exports.createIssue = createIssue;
module.exports.enableWikiSupport = enableWikiSupport;

