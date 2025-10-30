/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import React from 'react';
import DocItem from '@theme-original/DocItem';
import AddFeedback from '@site/src/theme/Feedback/AddFeedback';


export default function DocItemWrapper(props) {
  return (
    <>
      <DocItem {...props} />
      <AddFeedback {...props}/>
    </>
  );
}