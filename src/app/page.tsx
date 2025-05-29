"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { motion, useTransform } from "framer-motion";
import { useScroll } from "framer-motion";

import Dashboard from "@/components/Dashboard";
import Features from "@/components/Features";

import styles from "./page.module.scss";
import YClogo from "@/assets/svgs/yc_logo.svg";
import aiStar from "@/assets/svgs/aiStars.svg";
import repoView from "@/assets/svgs/overview.svg";

export default function Home() {
  const { data: session } = useSession();
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8],
    [1, 1, 0.5]
  );

  if (session) return <Dashboard />;

  return (
    <div className={styles.page}>
      <div className={styles.heroContainer}>
        <div className={styles.hero}>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1 }}
            className={styles.pop1}
          >
            <Image src={aiStar} alt="Ai" />
            <p>AI-Powered Matching</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={styles.heroTop}
          >
            <div></div>
            <p>Built for Open Source</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.5 }}
            className={styles.header}
          >
            <h1>
              Find <span>repositories</span> that match your <span>skills</span>
            </h1>
            <p>
              Connect your GitHub and discover open-source projects that match
              your skills and interests.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={styles.heroButton}
            onClick={() => signIn("github")}
          >
            Connect w/ GitHub
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1 }}
            className={styles.pop2}
          >
            <p>
              More than <span>230</span> repos{" "}
            </p>
            <div>
              <p>backed by</p>
              <Image src={YClogo} alt="Y Combinator" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 200 }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        style={{ scale: scaleProgress }}
        className={styles.overview}
      >
        <p>
          &ldquo;Explore repos aligned with your skills and passions with
          AI-powered filters.&rdquo;
        </p>
        <Image src={repoView} alt="App view" />
      </motion.div>

      <Features />
    </div>
  );
}
