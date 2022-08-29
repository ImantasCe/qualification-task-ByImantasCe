import { MouseEvent, SetStateAction, useEffect, useState } from "react";
import styles from "./Dropdown.module.scss";
import cx from "classnames";
import ArrowDown from "./../../assets/icons/ArrowDown";
import CloseIcon from "./../../assets/icons/CloseIcon";

type Props = {
  placeHolder: string;
  options: { id: string; value: string }[];
  isMultiSelect?: boolean;
};

export const Dropdown = ({ placeHolder, options, isMultiSelect }: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any | null>(isMultiSelect ? [] : null);

  useEffect(() => {
    const handler = () => setShowOptions(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleDropdownClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setShowOptions((prevState) => !prevState);
  };

  const getValue = () => {
    if (!selectedOption || selectedOption.length === 0) {
      return placeHolder;
    }
    if (isMultiSelect) {
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
    }
    return selectedOption.value;
  };

  const removeOption = (option: { id: string; value: string }) => {
    return selectedOption.filter(
      (o: { value: string }) => o.value !== option.value
    );
  };

  const onTagRemove = (
    e: MouseEvent<HTMLSpanElement>,
    option: { id: string; value: string }
  ) => {
    e.stopPropagation();
    setSelectedOption(removeOption(option));
  };

  const onItemClick = (option: { id: string; value: string }) => {
    let newValue;
    if (isMultiSelect) {
      if (
        selectedOption.findIndex(
          (o: { value: string }) => o.value === option.value
        ) >= 0
      ) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedOption, option];
      }
    } else {
      newValue = option;
    }
    setSelectedOption(newValue);
  };

  const isSelected = (option: { id: string; value: string }) => {
    if (isMultiSelect) {
      return (
        selectedOption.filter(
          (o: { value: string }) => o.value === option.value).length > 0);
    }
    if (!selectedOption) {
      return false;
    }
    return selectedOption.value === option.value;
  };

  return (
    <div className={styles.dropdownContainer}>
      <div onClick={handleDropdownClick} className={styles.dropdownInput}>
        {selectedOption.length < 3 && showOptions && (
          <div className={styles.dropdownOptions}>
            {options.map((option) => (
              <div
                onClick={() => onItemClick(option)}
                key={option.id}
                className={cx(
                  [styles.dropdownItem],
                  isSelected(option) && styles.dropdownItemSelected
                )}
              >
                {option.value}
              </div>
            ))}
          </div>
        )}
        <div className={styles.dropdownSelectedValue}>{getValue()}</div>
        <ArrowDown className={styles.iconArrowDown} />
      </div>
    </div>
  );
};

export default Dropdown;
