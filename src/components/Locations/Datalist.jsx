import React from "react";

import styles from "./Datalist.module.css";

import Select, { Option } from "rc-select";

const Datalist = ({ options, id, onChange, defaultValue, ...otherProps }) => {
  const defaultTitle = defaultValue && options.find(({ id }) => id === Number(defaultValue));

  return (
    <div className={styles.wrapper}>
      <Select
        showSearch
        defaultValue={defaultTitle ? defaultTitle.title : ""}
        onSelect={(value, option) => onChange(option.key)}
        filterOption="title"
        dropdownClassName={styles.dropdown}
        className={styles.inputWrapper}>
        {options.map(({ id, title }) => (
          <Option key={id} value={title}>
            {title}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Datalist;
