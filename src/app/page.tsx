"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

import styles from "./page.module.scss";
import YClogo from "@/assets/svgs/yc_logo.svg"
import aiStar from "@/assets/svgs/aiStars.svg"
import repoView from "@/assets/svgs/overview.svg"

export default function Home() {
  return (
    <div className={styles.page}>

      <div className={styles.heroContainer}>
        <div className={styles.hero}>
          <div className={styles.pop1}>
            <Image src={aiStar} alt="Ai" />
            <p>AI-Powered Matching</p>
          </div>

          <div className={styles.heroTop}>
            <div></div>
            <p>Built for Open Source</p>
          </div>

          <div className={styles.header}>
            <h1>Find <span>repositories</span> that match your <span>skills</span></h1>
            <p>Connect your GitHub and discover open-source projects that match your skills and interests.</p>
          </div>

          <button className={styles.heroButton} onClick={() => signIn("github")}>Connect w/ GitHub</button>

          <div className={styles.pop2}>
            <p>More than <span>230</span> repos </p>
            <div>
              <p>backed by</p>
              <Image src={YClogo} alt="Y Combinator" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.overview}>
        <p>"Explore repos aligned with your skills and passions with AI-powered filters."</p>
        <Image src={repoView} alt="App view" />
      </div>
    </div>
  );
}
