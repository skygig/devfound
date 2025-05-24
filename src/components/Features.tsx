import Image from "next/image";

import styles from "@/styles/features.module.scss";

import starsIcon from "@/assets/svgs/stars.svg";
import aiStars from "@/assets/svgs/aiStars.svg";
import filterIcon from "@/assets/svgs/filter.svg";
import activeIcon from "@/assets/svgs/active.svg";
import saveIcon from "@/assets/svgs/save.svg";

const Features = () => {
  return (
    <section id="features" className={styles.main}>
      <div className={styles.title}>
        <div>
          <h2>Powerful features</h2>
          <h2>for modern developers</h2>
        </div>

        <div>
          <p>Discover projects that match your skills and passions — all</p>
          <p>in one place, with a developer-first approach.</p>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.divider}>
          <div className={styles.image}>
            <Image src={starsIcon} alt="stars" width={28} />
          </div>
          <div className={styles.line}></div>
        </div>

        <div className={styles.feature}>
          <Image src={aiStars} alt="Domain" width={40} />
          <h2>AI-Powered Matching</h2>
          <p>
            Devfound analyzes your GitHub profile to understand your strengths
            and suggests repos where you can make meaningful contributions.
          </p>
        </div>

        <div className={styles.feature}>
          <Image src={filterIcon} alt="Shield" width={40} />
          <h2>Advanced Filters & Sorting</h2>
          <p>
            Narrow your search with filters like language, tech stack, and good
            first issue to find the perfect fit faster.
          </p>
        </div>

        <div className={styles.feature}>
          <Image src={activeIcon} alt="Code" width={48} />
          <h2>Active & Maintained Repos Only</h2>
          <p>
            No more stale repos — Devfound prioritizes active, well-maintained
            projects with recent commits.
          </p>
          <div></div>
        </div>

        <div className={styles.feature}>
          <Image src={saveIcon} alt="Analytics" width={34} />
          <h2>Save & Organize Repos</h2>
          <p>Bookmark projects you like and organize them into collections.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
