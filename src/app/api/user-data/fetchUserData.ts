const fetchUserData = async (user: string) => {
    const languages: { [key: string]: string } = {};
    const starredRepos: string[] = [];

    try {
        const starredRes = await fetch(`https://api.github.com/users/${user}/starred`, {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                'User-Agent': 'Devfound'
            }
        });

        if (!starredRes.ok) {
            console.warn(`Repose Not OK: ${starredRes.status} ${starredRes.statusText}`);
        }

        const starredRepoData = await starredRes.json()
        for (const repo of starredRepoData) {
            starredRepos.push(repo.html_url);
        }

        const response = await fetch(`https://api.github.com/users/${user}/repos`, {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                'User-Agent': 'Devfound'
            }
        });

        // https://api.github.com/repos/skygig/devfound/git/trees/main?recursive=1  -> to get the folder structure of a repo

        if (!response.ok) {
            console.warn(`Repose Not OK: ${response.status} ${response.statusText}`);
        }

        const repos = await response.json();

        for (const repo of repos) {
            const languagesRes = await fetch(`https://api.github.com/repos/${repo.full_name}/languages`, {
                headers: {
                    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                    'User-Agent': 'Devfound'
                }
            });
            if (!languagesRes.ok) {
                console.warn(`Skipping ${repo}: ${languagesRes.status} ${languagesRes.statusText}`);
            }

            const currLangs = await languagesRes.json();
            for (const lang of Object.keys(currLangs)) {
                if (languages[lang]) languages[lang] += currLangs[lang];
                else languages[lang] = currLangs[lang];
            }
        }
    } catch (err) {
        console.error("Error occured while fetching user data", err)
    }

    return { languages, starredRepos };
}

export default fetchUserData;