"use client";

import Repositories from "@/components/Repositories";

import styles from "./repos.module.scss"

const Repos = () => {
    return <div className={styles.main}>
        <div className={styles.header}>
            <h2>All Repositories</h2>
            <p>Discover repositories that match your skills and interests</p>
        </div>

        <Repositories isMatched={false} />
    </div>
}

export default Repos;