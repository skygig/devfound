import styles from "@/styles/footer.module.scss";

const Footer = () => {
    return <footer className={styles.footer}>
        <div className={styles.links}>
            <a href="https://www.linkedin.com/in/akash-singh8" target="_blank">contact</a>
            <a href="https://github.com/skygig/devfound" target="_blank">github</a>
        </div>
        <p>
            © 2025 Devfound. All rights reserved.
        </p>
    </footer>
}

export default Footer;