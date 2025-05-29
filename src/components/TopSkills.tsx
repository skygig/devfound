import Image from "next/image";
import React, { useState } from "react";

import styles from "@/styles/topSkills.module.scss";
import binIcon from "@/assets/svgs/bin.svg";
import { motion } from "framer-motion";

type TopSkillsParams = {
  skills: { [key: string]: string };
  setSkills: any;
  openSkillModal: () => void;
};

const TopSkills = ({ skills, setSkills, openSkillModal }: TopSkillsParams) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const removeSkill = (skill: string) => {
    const currSkills = { ...skills };
    delete currSkills[skill];
    setSkills(currSkills);
  };

  const changeSkillLevel = (skill: string, newLevel: string) => {
    const updatedSkills = { ...skills };
    updatedSkills[skill] = newLevel;
    setSkills(updatedSkills);
  };

  const skillLevels = ["Beginner", "Intermediate", "Advance", "Expert"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Your Top Skills</h1>
          <p className={styles.subtitle}>
            These skills are used to match you with repositories
          </p>
        </div>
        <button className={styles.editButton} onClick={toggleEditMode}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit Skills
        </button>
      </div>

      <div className={styles.grid}>
        {Object.keys(skills).map((skill, index) => (
          <motion.div
            initial={{ opacity: 0, x: 20 * index }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.card}
            key={index}
          >
            <div
              className={styles.skillName}
              style={{
                fontSize:
                  skills[skill] === "Expert"
                    ? "20px"
                    : skills[skill] === "Advance"
                    ? "18px"
                    : skills[skill] === "Intermediate"
                    ? "16px"
                    : "14px",
              }}
            >
              {skill}
            </div>

            {isEditing ? (
              <div className={styles.editControls}>
                <select
                  value={skills[skill]}
                  onChange={(e) => changeSkillLevel(skill, e.target.value)}
                  className={styles.levelSelect}
                >
                  {skillLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <div
                  className={styles.removeButton}
                  onClick={() => removeSkill(skill)}
                >
                  <Image src={binIcon} alt="bin" />
                </div>
              </div>
            ) : (
              <div className={styles.skillLevel}>{skills[skill]}</div>
            )}
          </motion.div>
        ))}

        {isEditing && (
          <div className={styles.addCard} onClick={openSkillModal}>
            <span className={styles.plusIcon}>+</span>
            <span>Add Skill</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TopSkills;
