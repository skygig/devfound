import Image from "next/image"
import styles from "@/styles/navbar.module.scss"
import logo from "@/assets/svgs/logo.svg"

const Navbar = () => {

    return <nav className={styles.nav}>
        <div className={styles.title}>
            <Image src={logo} alt="Devfound Logo" />
            <h1>Devfound</h1>
        </div>

        <div>
            <button>Get Started</button>
        </div>
    </nav>
}

export default Navbar