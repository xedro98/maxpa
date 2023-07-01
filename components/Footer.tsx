```tsx
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/terms">
            <a>Terms of Service</a>
          </Link>
          <Link href="/privacy">
            <a>Privacy Policy</a>
          </Link>
        </div>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Task Manager SaaS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```