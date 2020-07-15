/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useCallback, useState, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, RSelect, Error } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  containerStyle?: React.CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
}

const InputSelect: React.FC<Props> = ({
  name,
  icon: Icon,
  containerStyle,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!selectRef.current?.value);
  }, []);

  return (
    <Container
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      style={containerStyle}
    >
      {Icon && <Icon size={20} />}

      <RSelect
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} color="#c53030" />
        </Error>
      )}
    </Container>
  );
};
export default InputSelect;
