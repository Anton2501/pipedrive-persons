const validationRules = {
    name: {
        presence: {
            allowEmpty: false,
            message: '^Required field',
        },
    },
    phone: {
        presence: {
            allowEmpty: false,
            message: '^Required field',
        },
        format: {
            pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, // eslint-disable-line 
            flags: "i",
            message: '^Field is not valid'
        }
    },
    email: {
        presence: {
            allowEmpty: false,
            message: '^Required field',
        },
        format: {
            pattern: /^(([^<>()\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            flags: "i",
            message: '^Field is not valid'
        }
    },
    organization: {
        presence: {
            allowEmpty: false,
            message: '^Required field',
        },
    },
    assistant: {
        presence: {
            allowEmpty: false,
            message: '^Required field',
        },
    },
    groups: {
        presence: {
            allowEmpty: false,
            message: '^Required field',
        },
    },
}

export { validationRules };