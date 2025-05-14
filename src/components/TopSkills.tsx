import Image from 'next/image';
import React, { useState } from 'react';

import styles from '@/styles/topSkills.module.scss';
import binIcon from "@/assets/svgs/bin.svg"

const TopSkills = () => {
    const [skills, setSkills] = useState([
        { name: 'JavaScript', level: 'Expert' },
        { name: 'React', level: 'Expert' },
        { name: 'TypeScript', level: 'Advance' },
        { name: 'Node.js', level: 'Intermediate' },
        { name: 'Python', level: 'Beginner' }
    ]);

    const [isEditing, setIsEditing] = useState(false);

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const removeSkill = (skillIndex: number) => {
        setSkills(skills.filter((_, index) => index !== skillIndex));
    };

    const changeSkillLevel = (skillIndex: number, newLevel: string) => {
        const updatedSkills = [...skills];
        updatedSkills[skillIndex].level = newLevel;
        setSkills(updatedSkills);
    };

    const skillLevels = ['Beginner', 'Intermediate', 'Advance', 'Expert'];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Your Top Skills</h1>
                    <p className={styles.subtitle}>These skills are used to match you with repositories</p>
                </div>
                <button className={styles.editButton} onClick={toggleEditMode}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit Skills
                </button>
            </div>

            <div className={styles.grid}>
                {skills.map((skill, index) => (
                    <div className={styles.card} key={index}>
                        <div className={styles.skillName}
                            style={{
                                fontSize: skill.level === "Expert" ? "20px" :
                                    skill.level === "Advance" ? "18px" :
                                        skill.level === "Intermediate" ? "16px" : "14px"
                            }}>
                            {skill.name}
                        </div>

                        {isEditing ? (
                            <div className={styles.editControls}>
                                <select
                                    value={skill.level}
                                    onChange={(e) => changeSkillLevel(index, e.target.value)}
                                    className={styles.levelSelect}
                                >
                                    {skillLevels.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                                <div className={styles.removeButton} onClick={() => removeSkill(index)}>
                                    <Image src={binIcon} alt="bin" />
                                </div>
                            </div>
                        ) : (
                            <div className={styles.skillLevel}>{skill.level}</div>
                        )}
                    </div>
                ))}

                {isEditing && (
                    <div className={styles.addCard}>
                        <span className={styles.plusIcon}>+</span>
                        <span>Add Skill</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopSkills;