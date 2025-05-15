import { useEffect, useState } from 'react';

import styles from '@/styles/skillsModal.module.scss';

const SkillsModal = ({ skills, onClose, onSave }: SkillsModalProps) => {
    const categories = ['Languages', 'Frontend', 'Backend', 'DevOps'];
    const [activeCategory, setActiveCategory] = useState('Languages');
    const [selectedSkills, setSelectedSkills] = useState<{ [key: string]: boolean }>({});

    const skillsByCategory: { [key: string]: string[] } = {
        "Languages": ["JavaScript", "TypeScript", "Python", "Java", "C#", "Go", "Kotlin", "C++", "Ruby", "PHP", "Swift", "Rust"],
        "Frontend": ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt.js", "HTML", "CSS", "Tailwind CSS", "SASS/SCSS", "Redux", "Webpack",],
        "Backend": ["Node.js", "Express", "Django", "Flask", "Spring Boot", "Laravel", "Ruby on Rails", "ASP.NET", "GraphQL", "REST API", "SQL", "MongoDB"],
        "DevOps": ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Jenkins", "GitHub Actions", "Terraform", "Ansible", "Linux", "Bash",],
    };


    const handleSkillToggle = (skill: string) => {
        setSelectedSkills({
            ...selectedSkills,
            [skill]: !selectedSkills[skill],
        });
    };

    const handleSave = () => {
        const skills = Object.keys(selectedSkills).filter(skill => selectedSkills[skill]);
        onSave(skills);
        onClose();
    };

    const selectedCount = Object.values(selectedSkills).filter(Boolean).length;

    useEffect(() => {
        const currSelectedSkills: { [key: string]: boolean } = {};
        skills.forEach(skill => currSelectedSkills[skill] = true);
        setSelectedSkills(currSelectedSkills);
    }, [skills])

    useEffect(() => {
        const closeModal = (event: any) => {
            if (event.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', closeModal);

        return () => document.removeEventListener("keydown", closeModal);
    }, [])

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h2>Edit Your Skills</h2>
                    <p>Select the technologies you&apos;re proficient in. These will be used to match you with repositories.</p>
                    <div className={styles.closeButton} onClick={onClose}>x</div>
                </div>

                <div className={styles.tabContainer}>
                    {categories.map(category => (
                        <div
                            key={category}
                            className={`${styles.tabButton} ${activeCategory === category ? styles.active : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </div>
                    ))}
                </div>

                <div className={styles.skillsGrid}>
                    {skillsByCategory[activeCategory].map((skill: string) => (
                        <div className={styles.skillItem} key={skill}>
                            <label className={styles.checkboxContainer}>
                                <input
                                    type="checkbox"
                                    checked={selectedSkills[skill] || false}
                                    onChange={() => handleSkillToggle(skill)}
                                />
                                <span className={styles.checkmark}></span>
                                {skill}
                            </label>
                        </div>
                    ))}
                </div>

                <div className={styles.modalFooter}>
                    <div className={styles.skillCount}>{selectedCount} skills selected</div>
                    <button
                        className={styles.saveButton}
                        onClick={handleSave}
                    >
                        <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                        </svg>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

type SkillsModalProps = {
    skills: string[],
    onClose: () => void,
    onSave: (skills: string[]) => void
}

export default SkillsModal;