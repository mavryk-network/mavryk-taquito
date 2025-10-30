/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import React from 'react';
import styles from './StartNowButton.module.scss';

export default ({ darkBg }) => {
    return (
        <div className={styles.startNowButtonContainer}>
            <h6 className={`${styles.startNowButtonText} ${darkBg ? styles.darkBg : styles.lightBg}`}>Ready to start?</h6>
            <a className={styles.startNowButton} href='/docs/quick_start'>
                Start Now
            </a>
        </div>
    );
};
