const thousandSeparator = (number: number) => {
    return number.toLocaleString('en-US').replace(/,/g, ' ');
}

export { thousandSeparator };
