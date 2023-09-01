const mean = (arr) => {
    console.log("Mean", arr);
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

const standardDeviation = (arr) => {
    console.log("STD", arr);
    const arrMean = mean(arr);
    return Math.sqrt(arr.reduce((a, b) => a.concat((b - arrMean) ** 2), []).reduce((a, b) => a + b) / arr.length);
}

