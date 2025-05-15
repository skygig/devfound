const fetchUserData = async (user: string) => {
    const languages: { [key: string]: string } = {};

    try {
        const response = await fetch(`https://api.github.com/users/${user}/repos`, {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                'User-Agent': 'Node.js App'
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
                    'User-Agent': 'Node.js App'
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

        return languages;
    } catch (err) {
        console.error("Error occured while fetching user data", err)
    }
}

export default fetchUserData;