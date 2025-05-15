"use client";

import Image from "next/image"
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";


import styles from "@/styles/navbar.module.scss"
import logo from "@/assets/svgs/logo.svg"

const Navbar = () => {
    const { data: session } = useSession();
    const [userPop, setUserPop] = useState(false);

    return <nav className={styles.nav}>
        <div className={styles.title}>
            <Image src={logo} alt="Devfound Logo" />
            <h1>Devfound</h1>
        </div>

        <div>
            {
                session ? <div className={styles.user}>
                    <img src={session.user?.image ?? ""} alt="avatar" onClick={() => setUserPop(!userPop)} />
                    {userPop && <div>
                        <p>Hi, {session.user?.name?.split(" ")[0]}</p>
                        <button onClick={() => signOut()}>Logout</button>
                    </div>}
                </div> :
                    <button onClick={() => signIn("github")}>Get Started</button>
            }
        </div>
    </nav>
}

export default Navbar