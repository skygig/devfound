import getTools from "../contribute/getTools";

const fetchUserData = async (user: string) => {
  const languages: { [key: string]: string } = {};
  const starredRepos: string[] = [];
  const frameworks: string[] = [];
  const tools: string[] = [];

  try {
    const starredRes = await fetch(
      `https://api.github.com/users/${user}/starred`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          "User-Agent": "Devfound",
        },
      }
    );

    if (!starredRes.ok) {
      console.warn(
        `Response Not OK: ${starredRes.status} ${starredRes.statusText}`
      );
    }

    const starredRepoData = await starredRes.json();
    for (const repo of starredRepoData) {
      starredRepos.push(repo.html_url);
    }

    const response = await fetch(`https://api.github.com/users/${user}/repos`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        "User-Agent": "Devfound",
      },
    });

    if (!response.ok) {
      console.warn(`Repose Not OK: ${response.status} ${response.statusText}`);
    }

    const repos = await response.json();
    let repoCount = 0;

    const langRequests: Promise<Response>[] = [];
    const toolRequests: Promise<any>[] = [];

    for (const repo of repos) {
      const languagesReq = fetch(
        `https://api.github.com/repos/${repo.full_name}/languages`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
            "User-Agent": "Devfound",
          },
        }
      );
      langRequests.push(languagesReq);

      if (repoCount > 4 || repo.fork) continue;
      repoCount++;

      const toolsReq = getTools(
        repo.full_name.split("/")[0],
        repo.full_name.split("/")[1],
        repo.default_branch
      );
      toolRequests.push(toolsReq);
    }

    const langsRes = await Promise.all(langRequests);
    for (const langRes of langsRes) {
      if (!langRes.ok) {
        console.warn(
          `Language res not OK: ${langRes.status} ${langRes.statusText}`
        );
      }
      const currLangs = await langRes.json();
      for (const lang of Object.keys(currLangs)) {
        if (languages[lang]) languages[lang] += currLangs[lang];
        else languages[lang] = currLangs[lang];
      }
    }

    const toolsRes = await Promise.all(toolRequests);
    for (const toolRes of toolsRes) {
      frameworks.push(...toolRes.frameworks);
      tools.push(...toolRes.tools);
    }
  } catch (err) {
    console.error("Error occured while fetching user data", err);
  }

  return { languages, starredRepos, frameworks, tools };
};

export default fetchUserData;
