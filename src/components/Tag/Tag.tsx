import React from "react";
import styles from "./Tag.module.scss";
import CloseIcon from "../../assets/icons/CloseIcon";

type Props = {
    selectedOption: React.ComponentState;
    onTagRemove: Function;
}

export const Tag = ({selectedOption, onTagRemove}: Props) => {
  return (
    <div className={styles.dropdownTags}>
      {selectedOption.map((option: { id: string; value: string }) => (
        <div key={option.id} className={styles.dropdownTagItem}>
          {option.value}
          <span
            onClick={(e) => onTagRemove(e, option)}
            className={styles.dropdownTagClose}
          >
            <CloseIcon />
          </span>
        </div>
      ))}
    </div>
  );
};
