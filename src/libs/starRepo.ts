

const starRepo = async (repo: string, accessToken: string, toUnstar: boolean) => {
    try {
        const splitRepo = repo.split("/");
        const response = await fetch(`https://api.github.com/user/starred/${splitRepo[3]}/${splitRepo[4]}`, {
            method: toUnstar ? "DELETE" : "PUT",
            headers: {
                Authorization: `token ${accessToken}`,
                Accept: "application/vnd.github+json",
            },
        });

        if (response.status === 204) {
            return true;
        } else {
            const error = await response.json();
            console.error("Unable to star the repo", error);
        }
    } catch (err) {
        console.error("Unable to star the repo", repo, err)
    }

}

export default starRepo;