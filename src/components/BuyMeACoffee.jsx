import React from 'react';

import styles from './BuyMeACoffe.module.css';
import CoffeeIcon from './Icons/CoffeeIcon';

const BuyMeACoffee = () => (
  <div>
    <a
      className={styles.bmcButton}
      target="_blank"
      href="https://www.buymeacoffee.com/jerbot"
      rel="noopener noreferrer"
    >
      <CoffeeIcon />
      <span style={{ marginLeft: '3px', fontSize: '15px' }}>
        Buy me a coffee
      </span>
    </a>
  </div>
);

export default BuyMeACoffee;
