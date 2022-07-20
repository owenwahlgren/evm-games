import styles from '../../styles/Home.module.css';
export default function Footer() {
    return(
        <footer className={styles.footer}>
        <a href="https://twitter.com/owenwahlgren" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-twitter"></i>
        </a>
        <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-discord"></i>
        </a>
        <a href="https://github.com/owenwahlgren/evm-games" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-github"></i>
        </a>
        <a href="/about" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-info-circle"></i>
        </a>
      </footer>
    )
}
