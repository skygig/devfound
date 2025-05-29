import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import styles from "@/styles/dashboard.module.scss";

import { RootState } from "@/store/store";
import { setStarredRepo } from "@/store/starsSlice";

import TopSkills from "./TopSkills";
import Repositories from "./Repositories";
import SkillsModal from "./SkillsModal";

const Dashboard = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const starredRepoCount = useSelector(
    (state: RootState) => state.starredRepos.count
  );
  const reposCount = useSelector((state: RootState) => state.repoList.count);
  const [isLoading, setIsLoading] = useState(true);

  const [skills, setSkills] = useState<{ [key: string]: string }>({
    JavaScript: "Expert",
    React: "Expert",
    TypeScript: "Advance",
    "Node.js": "Intermediate",
    Python: "Beginner",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!session?.userId) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/user-data?userId=${session.userId}`);
        if (!response.ok) console.log("Couldn't fetch user details!");

        const data = await response.json();
        const { languages, starredRepos, frameworks, tools } = data;

        dispatch(setStarredRepo(starredRepos));

        // remove unnecessary languages
        if (languages["VBScript"]) delete languages["VBScript"];

        const langLength = Object.keys(languages).length;
        let total = 0;
        let firstHalfSum = 0;
        let secondHalfSum = 0;

        const sortedLang = Object.fromEntries(
          Object.entries(languages).sort((a: any, b: any) => b[1] - a[1])
        );
        let values = Object.values(sortedLang);
        values.forEach((val) => (total += val as number));

        Object.keys(sortedLang).forEach(
          (lang) =>
            (sortedLang[lang] = Math.floor(
              ((sortedLang[lang] as number) / total) * 100
            ))
        );
        total = 0;
        values = Object.values(sortedLang);

        for (let i = 0; i < langLength; i++) {
          const currValue = values[i] as number;
          total += currValue;
          if (i <= langLength / 2) firstHalfSum += currValue;
          else secondHalfSum += currValue;
        }

        const totalAvg = total / langLength;
        const firstHalfAvg = firstHalfSum / Math.ceil(langLength / 2);
        const secondHalfAvg = secondHalfSum / (langLength / 2);

        const skillObj: { [key: string]: string } = {};
        Object.keys(sortedLang).forEach((lang) => {
          const value = sortedLang[lang] as number;
          if (value >= firstHalfAvg) {
            skillObj[lang] = "Expert";
          } else if (value >= secondHalfAvg) {
            if (value >= totalAvg) skillObj[lang] = "Advance";
            else skillObj[lang] = "Intermediate";
          } else {
            skillObj[lang] = "Beginner";
          }
        });

        frameworks.forEach((framework: string) => {
          if (skillObj[framework]) skillObj[framework] = "Advance";
          else skillObj[framework] = "Intermediate";
        });

        tools.forEach((tool: string) => {
          if (skillObj[tool]) skillObj[tool] = "Advance";
          else skillObj[tool] = "Intermediate";
        });

        setSkills(skillObj);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session?.userId, dispatch]);

  const handleSaveSkills = (newSkills: string[]) => {
    const currSkills = { ...skills };
    newSkills.forEach((skill) => {
      if (!currSkills[skill]) currSkills[skill] = "Beginner";
    });
    setSkills(currSkills);
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.loadingContainer}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.loadingBar}
          >
            <div className={styles.loadingProgress}></div>
          </motion.div>
          <p>Loading your profile data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {isModalOpen && (
        <SkillsModal
          skills={Object.keys(skills)}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveSkills}
        />
      )}
      <div className={styles.header}>
        <h2>Dashboard</h2>
        <p>
          Welcome back! Here&apos;s an overview of your profile and matching
          repos.
        </p>
      </div>

      <div className={styles.topSection}>
        <TopSkills
          skills={skills}
          setSkills={setSkills}
          openSkillModal={() => setIsModalOpen(true)}
        />

        <div className={styles.otherInfo}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Matching Repositories</h2>
            <p>{reposCount} / 233</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Saved Repositories</h2>
            <p>{starredRepoCount}</p>
          </motion.div>
        </div>
      </div>

      <div className={styles.header}>
        <h2>Recommended Repos</h2>
        <p>Based on your skills and interests</p>
      </div>

      <Repositories currSkills={Object.keys(skills)} isMatched={true} />
    </div>
  );
};

export default Dashboard;
