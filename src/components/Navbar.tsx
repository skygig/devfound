"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

import Contribute from "./Contribute";

import styles from "@/styles/navbar.module.scss";
import logo from "@/assets/svgs/logo.svg";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userPop, setUserPop] = useState(false);
  const [contOpen, setContOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      {contOpen && <Contribute onClose={() => setContOpen(false)} />}

      <div className={styles.title} onClick={() => router.push("/")}>
        <Image src={logo} alt="Devfound Logo" />
        <h1>Devfound</h1>
      </div>

      <div className={styles.options}>
        {!session && (
          <p
            onClick={() => {
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Features
          </p>
        )}
        <Link href="/repos">Repos</Link>
        <p onClick={() => setContOpen(true)}>Contribute</p>
      </div>

      {session ? (
        <div className={styles.user}>
          <img
            src={session.user?.image ?? ""}
            alt="avatar"
            onClick={() => setUserPop(!userPop)}
          />
          {userPop && (
            <div>
              <p>Hi, {session.user?.name?.split(" ")[0]}</p>
              <button onClick={() => signOut()}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.right}>
          <button onClick={() => signIn("github")}>Get Started</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
