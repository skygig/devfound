import { useState } from "react";

import styles from "@/styles/dashboard.module.scss";

import TopSkills from "./TopSkills";
import Repositories from "./Repositories";
import SkillsModal from "./SkillsModal";


const Dashboard = () => {
    const [skills, setSkills] = useState<{ [key: string]: string }>({
        'JavaScript': 'Expert',
        'React': 'Expert',
        'TypeScript': 'Advance',
        'Node.js': 'Intermediate',
        'Python': 'Beginner'
    })
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveSkills = (newSkills: string[]) => {
        const currSkills = { ...skills };
        newSkills.forEach((skill) => {
            if (!currSkills[skill]) currSkills[skill] = "Beginner"
        })
        setSkills(currSkills);
    }

    return <div className={styles.dashboard}>
        {
            isModalOpen &&
            <SkillsModal skills={Object.keys(skills)}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveSkills}
            />
        }
        <div className={styles.header}>
            <h2>Dashboard</h2>
            <p>Welcome back! Here's an overview of your profile and matching repos.</p>
        </div>

        <div className={styles.topSection}>
            <TopSkills skills={skills}
                setSkills={setSkills}
                openSkillModal={() => setIsModalOpen(true)} />

            <div className={styles.otherInfo}>
                <div>
                    <h2>Matching Repositories</h2>
                    <p>128 / 233</p>
                </div>
                <div>
                    <h2>Saved Repositories</h2>
                    <p>12</p>
                </div>
            </div>
        </div>

        <div className={styles.header}>
            <h2>Recommended Repos</h2>
            <p>Based on your skills and interests</p>
        </div>

        <Repositories currSkills={Object.keys(skills)} isMatched={true} />

    </div>
}

export default Dashboard;