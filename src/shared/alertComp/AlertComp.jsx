import React, { ReactElement } from 'react';
/* {MAS}: suppression for import 'react-alert-template-basic'
 for eslint and ts-ignore approved as no types for AlertTemplate found */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import styles from './AlertCompStyles';

const AlertComp = ({ children }) => (
  <AlertProvider
    template={AlertTemplate}
    position={positions.TOP_CENTER}
    transition={transitions.SCALE}
    offset={styles.offset}
    timeout={1500}
    containerStyle={{ zIndex: styles.zIndex }}
  >
    { children}
  </AlertProvider>
);

export default AlertComp;
