"use client";
import { useState } from "react";
import Image from "next/image";

import SkillsModal from "@/components/SkillsModal";

import styles from "./repos.module.scss"
import ycLogo from "@/assets/svgs/yc_logo.svg"

const Repos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userSkills, setUserSkills] = useState(['JavaScript', 'Python', 'TypeScript']);
    const [optionEnabled, setOptionEnabled] = useState([false, false, false]);

    const handleSaveSkills = (skills: string[]) => {
        setUserSkills(skills);
        console.log('Saved skills:', skills);
    };

    const enableOption = (index: number) => {
        const newOptions = [...optionEnabled];
        newOptions[index] = !newOptions[index];
        setOptionEnabled(newOptions);
    }

    return <div className={styles.main}>
        {
            isModalOpen && <SkillsModal onClose={() => setIsModalOpen(false)} onSave={handleSaveSkills} />
        }
        <div className={styles.header}>
            <h2>All Repositories</h2>
            <p>Discover repositories that match your skills and interests</p>
        </div>

        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.search}>
                    <h3>Search</h3>
                    <input type="text" placeholder="Search repositories..." />
                </div>

                <div>
                    <h3>Skills - {userSkills.length}</h3>
                    <div className={styles.skills}>
                        {
                            userSkills.map(skill => <p key={skill}>{skill}</p>)
                        }
                    </div>
                    <button className={styles.selectSkills} onClick={() => setIsModalOpen(true)}>Select Skills</button>
                </div>

                <div className={styles.options}>
                    <h3>Options</h3>

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
                    </div>

                    <div className={styles.toggleOption}>
                        <span className={styles.label}>Good first issues</span>
                        <label className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                checked={optionEnabled[1]}
                                onChange={() => enableOption(1)}
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
                                checked={optionEnabled[2]}
                                onChange={() => enableOption(2)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>

                <button className={styles.clear}>Clear Filters</button>
            </div>

            <div className={styles.repos}>
                <p>Showing 6 of 10 repositories</p>
            </div>
        </div>
    </div>
}

export default Repos;