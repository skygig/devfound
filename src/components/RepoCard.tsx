
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

import starRepo from "@/libs/starRepo";
import { RootState } from "@/store/store";
import { addStarredRepo, removeStarredRepo } from "@/store/starsSlice";

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
    frameworks: any;
    tools: any;
    ycBatch: number;
    url: string;
}

const RepoCard = ({ data, gfIssues }: { data: RepoType, gfIssues: boolean }) => {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const starredRepos = useSelector((state: RootState) => state.starredRepos.repos)

    const handleStar = () => {
        if (!session) {
            alert("Please Connect with Github to continue!")
            return;
        }

        const isStarred = starredRepos.includes(data.url);

        if (isStarred) dispatch(removeStarredRepo(data.url));
        else dispatch(addStarredRepo(data.url))

        starRepo(data.url, session?.access_token as string, isStarred);
    }

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
                    Object.keys(data.languages).slice(0, 3).map((lang: string) => <p key={lang}>{lang}</p>)
                }
            </div>
        </div>

        {
            data.frameworks?.length !== 0 && <div className={styles.languages}>
                <h3>Frameworks</h3>
                <div>
                    {
                        data.frameworks.slice(0, 3).map((fw: string) => <p key={fw}>{fw}</p>)
                    }
                </div>
            </div>
        }

        {
            data.tools?.length !== 0 && <div className={styles.languages}>
                <h3>Tools</h3>
                <div>
                    {
                        data.tools.slice(0, 3).map((tool: string) => <p key={tool}>{tool}</p>)
                    }
                </div>
            </div>
        }

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

        <div className={styles.action}>
            <a href={`${data.url}/issues` + (gfIssues ? "?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22" : "")}
                target="_blank"
                className={styles.issuesBtn}>
                <button>View {gfIssues ? "good first issues" : "issues"}</button>
            </a>
            <div className={`${styles.star} ${starredRepos?.includes(data.url) ? styles.activeStar : ""}`} onClick={handleStar}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0,0,256,256"><g fill="#868a97"><g transform="scale(10.66667,10.66667)"><path d="M12,16.026l-4.325,2.611l1.148,-4.92l-3.823,-3.312l5.029,-0.427l1.971,-4.651l1.971,4.651l5.029,0.427l-3.823,3.312l1.148,4.92z" opacity="0"></path><path d="M23.053,9.002l-7.947,-0.674l-3.106,-7.328l-3.106,7.328l-7.947,0.674l6.035,5.228l-1.813,7.77l6.831,-4.123l6.831,4.123l-1.813,-7.77zM12,15.541l-3.806,2.297l1.01,-4.33l-3.364,-2.914l4.425,-0.375l1.735,-4.094l1.735,4.094l4.425,0.375l-3.364,2.915l1.01,4.33z"></path></g></g></svg>
            </div>
        </div>
    </div>
}


export default RepoCard;