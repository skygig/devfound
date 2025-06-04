import Image from "next/image";
import { motion } from "framer-motion";

import styles from "@/styles/features.module.scss";

import starsIcon from "@/assets/svgs/stars.svg";
import aiStars from "@/assets/svgs/aiStars.svg";
import filterIcon from "@/assets/svgs/filter.svg";
import activeIcon from "@/assets/svgs/active.svg";
import saveIcon from "@/assets/svgs/save.svg";

const Features = () => {
  return (
    <section id="features" className={styles.main}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        className={styles.title}
      >
        <div>
          <h2>Powerful features</h2>
          <h2>for modern developers</h2>
        </div>

        <p>
          Discover projects that match your skills and passions — all in one
          place, with a developer-first approach.
        </p>
      </motion.div>

      <div className={styles.features}>
        <div className={styles.divider}>
          <div className={styles.image}>
            <Image src={starsIcon} alt="stars" width={28} />
          </div>
          <div className={styles.line}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          transition={{ duration: 0.75 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          className={styles.feature}
        >
          <Image src={aiStars} alt="Domain" width={40} />
          <h2>AI-Powered Matching</h2>
          <p>
            Devfound analyzes your GitHub profile to understand your strengths
            and suggests repos where you can make meaningful contributions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          transition={{ duration: 0.75 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          className={styles.feature}
        >
          <Image src={filterIcon} alt="Shield" width={40} />
          <h2>Advanced Filters & Sorting</h2>
          <p>
            Narrow your search with filters like language, tech stack, and good
            first issue to find the perfect fit faster.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          transition={{ duration: 0.75 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          className={styles.feature}
        >
          <Image src={activeIcon} alt="Code" width={48} />
          <h2>Active & Maintained Repos Only</h2>
          <p>
            No more stale repos — Devfound prioritizes active, well-maintained
            projects with recent commits.
          </p>
          <div></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          transition={{ duration: 0.75 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          className={styles.feature}
        >
          <Image src={saveIcon} alt="Analytics" width={34} />
          <h2>Save & Organize Repos</h2>
          <p>Bookmark projects you like and organize them into collections.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
