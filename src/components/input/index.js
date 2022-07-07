import React from 'react';
import PropTypes from 'prop-types';
import Mask from 'react-input-mask';
import './style.scss';

const Input = React.forwardRef((props, ref) => {
    const {
        value,
        onFocus,
        onChange,
        onBlur,
        mask,
        type = 'text',
        placeholder,
        name,
        id,
        message,
        label,
        autoFocus,
        readOnly,
        fixedLabel,
        beforeMaskedValueChange,
        disabled,
    } = props;

    const [isFocused, setFocus] = React.useState(Boolean(value));

    const onFocusInput = React.useCallback(
        (e) => {
            if (disabled) return;
            setFocus(true);
            if (onFocus) {
                e.preventDefault();
                onFocus(e);
            }
        },
        [setFocus, onFocus, disabled]
    );

    const onChangeInput = React.useCallback(
        (e) => {
            if (disabled) return;
            onChange(e);
        },
        [onChange, disabled]
    );

    const onBlurInput = React.useCallback(
        (e) => {
            if (disabled) return;
            if (e.currentTarget.value) {
                setFocus(true);
            } else {
                setFocus(false);
            }
            if (onBlur) {
                onBlur(e);
            }
        },
        [setFocus, onBlur, disabled]
    );

    const classname = `input${message ? ' input--error' : ''}`;
    const placeholderText = label ? null : placeholder;

    const sharableProps = {
        type,
        placeholder: placeholderText,
        className: `input__input${isFocused || fixedLabel || value ? ' input__input--focused' : ''}`,
        name,
        id,
        onChange: onChangeInput,
        onBlur: onBlurInput,
        onFocus: onFocusInput,
        value,
        autoFocus,
        readOnly,
        disabled
    };

    return (
        <div className={classname}>
            {mask ? (
                <Mask {...sharableProps} beforeMaskedValueChange={beforeMaskedValueChange} mask={mask} inputRef={ref} />
            ) : (
                <input {...sharableProps} ref={ref} />
            )}
            {(label || fixedLabel) && (
                <label htmlFor={id} className={value || fixedLabel ? 'focused' : null}>
                    {fixedLabel || label}
                </label>
            )}
            <span className="input__error">{message}</span>
        </div>
    );
});

Input.propTypes = {
    value: PropTypes.string.isRequired,
    onFocus: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    mask: PropTypes.string,
    isError: PropTypes.bool,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    label: PropTypes.string,
    autoFocus: PropTypes.bool,
    readOnly: PropTypes.bool,
    fixedLabel: PropTypes.string,
    beforeMaskedValueChange: PropTypes.func,
};

export default Input;
export { Input };
