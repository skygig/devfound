
import Image from "next/image";

import styles from "@/styles/repoCard.module.scss";
import ycLogo from "@/assets/svgs/yc_logo.svg"

type RepoType = {
    title: string;
    desc: string | null;
    stars: number;
    forks: number;
    issues: number;
    goodFirstIssues: number;
    avatar: string;
    languages: any;
    ycBatch: number;
    url: string;
}

const RepoCard = ({ data, gfIssues }: { data: RepoType, gfIssues: boolean }) => {
    return <div className={styles.card}>
        <div className={styles.header}>
            <img src={data.avatar} alt="logo" />
            <div>
                <h2>{data.title}</h2>
                <p>{data.desc ?? ""}</p>
            </div>
        </div>

        <div className={styles.languages}>
            <h3>Languages</h3>
            <div>
                {
                    Object.keys(data.languages).slice(0, 7).map((lang: string) => <p key={lang}>{lang}</p>)
                }
            </div>
        </div>

        <div className={styles.info}>
            <h3>More Info</h3>
            <div>
                <div className={styles.infoTitle}>
                    <p>{gfIssues ? "Good first issues" : "Open issues"}</p>
                    <p>Stars</p>
                    <p>Forks</p>
                    <Image src={ycLogo} alt="YC" height={18} />
                </div>
                <div className={styles.infoData}>
                    <p>{gfIssues ? data.goodFirstIssues : data.issues}</p>
                    <p>{data.stars}</p>
                    <p>{data.forks}</p>
                    <p>YC-{data.ycBatch}</p>
                </div>
            </div>
        </div>

        <a href={`${data.url}/issues` + (gfIssues ? "?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22" : "")}
            target="_blank"
            className={styles.issuesBtn}>
            <button>View {gfIssues ? "good first issues" : "issues"}</button>
        </a>
    </div>
}


export default RepoCard;