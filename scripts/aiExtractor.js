const fs = require('fs/promises');
const OpenAI = require("openai");
const { config } = require("dotenv");
config();

const { all_Repos } = require("./fetchYC_repos.js");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const client = new OpenAI({
    apiKey: process.env.KLUSTER_API_KEY,
    baseURL: "https://api.kluster.ai/v1"
});


async function getAiHelp(paths) {
    try {
        const chatCompletion = await client.chat.completions.create({
            model: "Qwen/Qwen3-235B-A22B-FP8",
            messages: [
                {
                    role: "system",
                    content: "You are an expert in analyzing software project structures to identify frameworks and tools used. Your response *must* be a single JSON object with two keys: 'frameworks' and 'tools'. Each key should contain a JSON array of strings. Do not include programming languages in frameworks or tools. Do not include any other text, explanation, or markdown formatting around the JSON.",
                },
                {
                    role: "user",
                    content: `Analyze the following file paths and identify the frameworks and tools used for the given github repository \n${paths}`,
                },
            ],
        });

        const result = chatCompletion.choices[0].message.content;
        console.log(result);

        if (result) {
            const obj = result.split("</think>")
            await fs.appendFile('frameToolsData.txt', `${obj[obj.length - 1]},\n\n`, 'utf8');
        } else {
            await fs.appendFile('frameToolsData.txt', `Skipping...........,\n`, 'utf8');
        }

    } catch (error) {
        console.error("Error calling Groq API:", error);
        await fs.appendFile('frameToolsData.txt', `Skipping...........,\n`, 'utf8');
    }
}


const main = async () => {
    let currBatch = 2025;
    let count = 0;
    let seconds = 0;
    const intervalId = setInterval(() => { seconds += 1 }, 1000)

    try {
        for (const reposList of Object.values(all_Repos)) {
            await fs.appendFile('frameToolsData.txt', `================= YC ${currBatch},\n\n`, 'utf8');
            currBatch -= 1;
            for (const currRepo of reposList) {
                const repo = currRepo.split("/");
                const repoRes = await fetch(`https://api.github.com/repos/${repo[3]}/${repo[4]}`, {
                    headers: {
                        'Authorization': `token ${GITHUB_TOKEN}`,
                        'User-Agent': 'Devfound'
                    }
                });
                const repoData = await repoRes.json();
                const defaultBranch = repoData?.default_branch;

                console.log("Default branch", defaultBranch)

                let contentRes = await fetch(`https://api.github.com/repos/${repo[3]}/${repo[4]}/git/trees/${defaultBranch ?? "main"}?recursive=1`, {
                    headers: {
                        'Authorization': `token ${GITHUB_TOKEN}`,
                        'User-Agent': 'Devfound'
                    }
                });

                if (!contentRes.ok) {
                    console.log("Skipping ", currRepo);
                    continue;
                }

                const content = await contentRes.json();
                const tree = content.tree;
                // lets filter out the path that including unnceessary files like .md, .png, .svg etc..
                const excludedExtensions = [
                    '.md', '.mdx', '.png', '.svg', '.jpg', '.jpeg', '.gif', '.webp', '.ico',
                    '.txt', '.rst', '.yml', '.yaml', '.lock', '.ini', '.toml',
                    '.woff', '.woff2', '.ttf', '.mp3', '.mp4', '.webm',
                    '.exe', '.dll', '.so', '.dylib', '.bin', '.obj', '.class',
                    '.css', '.scss', '.tsx'
                ];

                const paths = tree
                    .filter(node => {
                        return node.path.includes(".") && !excludedExtensions.some(ext => node.path.endsWith(ext));
                    })
                    .map(node => node.path);

                await fs.appendFile('frameToolsData.txt', `${currRepo} :`, 'utf8');
                await getAiHelp(paths)
                count += 1;

                if (seconds % 60 == 0 && count >= 20) {
                    console.log("Pause ==================")
                    await (new Promise((resolve) => setTimeout(resolve, 60000)));
                    count = 0;
                    seconds = 0;
                }
            }
            await fs.appendFile('frameToolsData.txt', `=================================================\n\n\n\n`, 'utf8');
        }

    } catch (err) {
        console.log("Unable to fetch the repo contents", err)
    }

    clearInterval(intervalId)
}

main()
