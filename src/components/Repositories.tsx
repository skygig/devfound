import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import repoListData from "@/libs/data.json"
import { setReposCount } from "@/store/reposSlice";
import RepoCard from "@/components/RepoCard";
import SkillsModal from "./SkillsModal";

import styles from "@/styles/repositories.module.scss"
import ycLogo from "@/assets/svgs/yc_logo.svg"

const Repositories = ({ isMatched, currSkills }: { isMatched: boolean, currSkills?: string[] }) => {
    const [repoList, setRepoList] = useState(repoListData)
    const [userSkills, setUserSkills] = useState(['JavaScript', 'TypeScript', 'Go', 'Python']);
    const [optionEnabled, setOptionEnabled] = useState([false, false]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");

    const [currRepos, setCurrRepos] = useState(repoList.slice(0, 12));
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setReposCount(repoList.length));
    }, [repoList])

    useEffect(() => {
        if (isMatched) setUserSkills(currSkills || [])
    }, [isMatched, currSkills])

    useEffect(() => {
        const newRepoList = repoList.filter(repo => {
            for (const skill of userSkills) {
                if (Object.keys(repo.languages).includes(skill)) return true
            }
            return false;
        });
        setRepoList(newRepoList);
        setPage(0);
    }, [userSkills])

    useEffect(() => {
        setCurrRepos(repoList.slice(12 * page, 12 * page + 12))
    }, [page, repoList])

    useEffect(() => {
        setPage(0)
        if (optionEnabled[0] == true) {
            const newRepoList = repoList.filter(repo => repo.goodFirstIssues > 0);
            setRepoList(newRepoList);
        } else {
            setRepoList(repoListData)
        }
    }, [optionEnabled])

    const handleSearch = (e: any) => {
        const toSearch = e.target.value;
        setSearch(toSearch);
        if (!toSearch) {
            setRepoList(repoListData);
        } else {
            const filterRepo = repoList.filter(repo => repo.title.includes(toSearch));
            setRepoList(filterRepo);
        }

        setPage(0);
    }

    const handlePage = (action: number) => {
        const maxPage = repoList.length / 12 - 1;
        if (action === -1 && page === 0 || action == 1 && page >= maxPage) return;
        setPage(page + action);
    }

    const handleSaveSkills = (skills: string[]) => {
        setUserSkills(skills);
    };

    const enableOption = (index: number) => {
        const newOptions = [...optionEnabled];
        newOptions[index] = !newOptions[index];
        setOptionEnabled(newOptions);
    }

    const clearFilters = () => {
        if (search) {
            setSearch("");
            setRepoList(repoListData);
        }
        if (optionEnabled[0]) enableOption(0);
        if (optionEnabled[1]) enableOption(1)
    }

    return <div className={styles.container}>
        {
            !isMatched && isModalOpen &&
            <SkillsModal skills={userSkills} onClose={() => setIsModalOpen(false)} onSave={handleSaveSkills} />
        }
        <div className={styles.sidebar}>
            <div className={styles.search}>
                <h3>Search</h3>
                <input type="text" placeholder="Search repositories..." value={search} onChange={handleSearch} />
            </div>

            <div>
                <h3>{isMatched ? "Your Skills" : `Skills - ${userSkills.length}`}</h3>
                <div className={styles.skills}>
                    {
                        userSkills.map(skill => <p key={skill}>{skill}</p>)
                    }
                </div>
                {
                    !isMatched &&
                    <button className={styles.selectSkills} onClick={() => setIsModalOpen(true)}>
                        Select Skills
                    </button>
                }
            </div>


            <div className={styles.options}>
                <h3>Options</h3>

                {/* 
                    #TODO
                    <div className={styles.toggleOption}>
                        <span className={styles.label}>Active repos only</span>
                        <label className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                checked={optionEnabled[0]}
                                onChange={() => enableOption(0)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div> */}

                <div className={styles.toggleOption}>
                    <span className={styles.label}>Good first issues</span>
                    <label className={styles.toggleSwitch}>
                        <input
                            type="checkbox"
                            checked={optionEnabled[0]}
                            onChange={() => enableOption(0)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>

                <div className={styles.toggleOption}>
                    <span className={`${styles.label} ${styles.ycLabel}`}>
                        <Image src={ycLogo} alt="Y Combinator" />
                        <p>only</p>
                    </span>
                    <label className={styles.toggleSwitch}>
                        <input
                            type="checkbox"
                            checked={optionEnabled[1]}
                            onChange={() => enableOption(1)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>

            <button className={styles.clear} onClick={clearFilters}>Clear Filters</button>
        </div>

        <div className={styles.reposContainer}>
            <div className={styles.reposHead}>
                <p>Showing {page * 12} - {Math.min(page * 12 + 12, repoList.length)} of {repoList.length} repositories</p>
                <div>
                    <p className={styles.pageControl} onClick={() => handlePage(-1)}>{"<"}</p>
                    <p className={styles.pageCount}>{page + 1}</p>
                    <p className={styles.pageControl} onClick={() => handlePage(1)}>{">"}</p>
                </div>

            </div>

            <div className={styles.repos}>
                {
                    currRepos.map((repo, i) =>
                        <RepoCard key={i} data={repo} gfIssues={optionEnabled[0]} />
                    )
                }
            </div>
        </div>
    </div>
}

export default Repositories;