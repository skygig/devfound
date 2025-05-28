import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.KLUSTER_API_KEY,
  baseURL: "https://api.kluster.ai/v1",
});

const getAiHelp = async (paths: string[]) => {
  try {
    const chatCompletion = await client.chat.completions.create({
      model: "klusterai/Meta-Llama-3.3-70B-Instruct-Turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in analyzing software project structures to identify frameworks and tools used. Your response *must* be a single JSON object with two keys: 'frameworks' and 'tools'. Each key should contain a JSON array of strings. Do not include programming languages in frameworks or tools. Do not include any other text, explanation, or markdown formatting around the JSON.",
        },
        {
          role: "user",
          content: `Analyze the following file paths and identify the frameworks and tools used for the given github repository \n${paths}`,
        },
      ],
    });

    const result = chatCompletion.choices[0].message.content;
    const framworksTools = JSON.parse(result!);
    return framworksTools;
  } catch (error) {
    console.error("Error calling Kluster API or parsing the response:", error);
  }
};

const getTools = async (org: string, repo: string, defaultBranch: string) => {
  try {
    const contentRes = await fetch(
      `https://api.github.com/repos/${org}/${repo}/git/trees/${
        defaultBranch ?? "main"
      }?recursive=1`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          "User-Agent": "Devfound",
        },
      }
    );

    if (!contentRes.ok) {
      throw new Error("Failed to fetch repo contents");
    }

    const content = await contentRes.json();
    const tree = content.tree;
    // lets filter out the path that including unnceessary files like .md, .png, .svg etc..
    const excludedExtensions = [
      ".md",
      ".mdx",
      ".png",
      ".svg",
      ".jpg",
      ".jpeg",
      ".gif",
      ".webp",
      ".ico",
      ".txt",
      ".rst",
      ".yml",
      ".yaml",
      ".lock",
      ".ini",
      ".toml",
      ".woff",
      ".woff2",
      ".ttf",
      ".mp3",
      ".mp4",
      ".webm",
      ".exe",
      ".dll",
      ".so",
      ".dylib",
      ".bin",
      ".obj",
      ".class",
      ".css",
      ".scss",
      ".tsx",
    ];

    const paths = tree
      .filter((node: any) => {
        return (
          node.path.includes(".") &&
          !excludedExtensions.some((ext) => node.path.endsWith(ext))
        );
      })
      .map((node: any) => node.path)
      .slice(0, 200);

    const framworksTools = await getAiHelp(paths);
    return framworksTools;
  } catch (err) {
    console.log("Unable to fetch the repo contents", err);
    return { frameworks: [], tools: [] };
  }
};

export default getTools;
