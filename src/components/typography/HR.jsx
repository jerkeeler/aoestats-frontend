import React from 'react';
import classnames from 'classnames';

const HR = ({ className, borderColor = 'border-gray-800' }) => (
  <hr className={classnames('my-3', borderColor, className)} />
);

export default HR;
