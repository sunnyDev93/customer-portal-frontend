import React, { FC } from 'react';
import Button from 'shared/components/Button';
import classnames from 'classnames';
import styles from './SpotItem.module.scss';
type Props = {
  label: string;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
};
const SpotItem: FC<Props> = ({ label, disabled, selected, onClick }) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      label={disabled ? 'Not available' : label}
      className={classnames(styles.spotItem, selected && styles.selected)}
    />
  );
};

export default SpotItem;
