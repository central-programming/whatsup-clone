export const extractErrorDetails = (errorMessage: string) => {
    const matchResult = errorMessage.match(/^(.*?):\s(.*?)\s\((.*?)\)\.$/);
    if (matchResult) {
        const [, , errorType, errorMessageText] = matchResult;
        const formattedErrorMessageText = errorMessageText.replace('auth/', '');
        return `${errorType} ${formattedErrorMessageText}`;
    }
    return 'error';
};