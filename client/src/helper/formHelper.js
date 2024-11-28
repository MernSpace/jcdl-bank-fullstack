// ValidationHelper.js

export const isEmpty = (value) => {
    return value.trim() === '';
};

export const ErrorToast = (message) => {
    alert(message); // You can replace this with a custom toast notification
};

export const SuccessToast = (message) => {
    alert(message); // You can replace this with a custom toast notification
};
