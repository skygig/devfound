const { JSDOM } = require('jsdom');

const githubLinks = [];
let totalCompanies = 0;

const checkAndGetGithubLink = async (slug) => {
    totalCompanies += 1;

    const response = await fetch(`https://www.ycombinator.com/companies/${slug}`);
    const html = await response.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const githubLink = Array.from(document.querySelectorAll('a')).find(a =>
        a.href.includes('github.com')
    )?.href;

    if (githubLink) {
        githubLinks.push(githubLink);
        console.log(`'${githubLink}',`)
    }
};

const main = async () => {
    const startupList = await fetch("https://45bwzj1sgc-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser%3B%20JS%20Helper%20(3.16.1)&x-algolia-application-id=45BWZJ1SGC&x-algolia-api-key=MjBjYjRiMzY0NzdhZWY0NjExY2NhZjYxMGIxYjc2MTAwNWFkNTkwNTc4NjgxYjU0YzFhYTY2ZGQ5OGY5NDMxZnJlc3RyaWN0SW5kaWNlcz0lNUIlMjJZQ0NvbXBhbnlfcHJvZHVjdGlvbiUyMiUyQyUyMllDQ29tcGFueV9CeV9MYXVuY2hfRGF0ZV9wcm9kdWN0aW9uJTIyJTVEJnRhZ0ZpbHRlcnM9JTVCJTIyeWNkY19wdWJsaWMlMjIlNUQmYW5hbHl0aWNzVGFncz0lNUIlMjJ5Y2RjJTIyJTVE", {
        "headers": {
            "accept": "application/json",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "Referer": "https://www.ycombinator.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"requests\":[{\"indexName\":\"YCCompany_production\",\"params\":\"facetFilters=%5B%5B%22batch%3ASummer%202018%22%2C%22batch%3AWinter%202018%22%5D%5D&facets=%5B%22app_answers%22%2C%22app_video_public%22%2C%22batch%22%2C%22demo_day_video_public%22%2C%22industries%22%2C%22isHiring%22%2C%22nonprofit%22%2C%22question_answers%22%2C%22regions%22%2C%22subindustry%22%2C%22top_company%22%5D&hitsPerPage=1000&maxValuesPerFacet=1000&page=0&query=&tagFilters=\"},{\"indexName\":\"YCCompany_production\",\"params\":\"analytics=false&clickAnalytics=false&facets=batch&hitsPerPage=0&maxValuesPerFacet=1000&page=0&query=\"}]}",
        "method": "POST"
    });

    const data = await startupList.json();
    const list = data.results[0].hits;

    for (const startup of list) {
        const slug = startup.slug;
        await checkAndGetGithubLink(slug);
    }
    console.log(`Found ${githubLinks.length} out of ${totalCompanies} companies`);
    console.log("Github Links :", githubLinks)
}

main()