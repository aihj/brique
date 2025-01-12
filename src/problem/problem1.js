// Node.js 환경에서 실행되는 스크립트입니다
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// CSV 파일 경로
const filePath = path.join(__dirname, './sample.csv');

// 유틸리티 함수들
const calculateStatistics = (numbers) => {
    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / numbers.length;
    const variance = numbers.reduce((a, b) => a + (b - mean) ** 2, 0) / numbers.length;
    const stdDev = Math.sqrt(variance);
    const median = numbers.length % 2 === 0
        ? (sorted[numbers.length / 2 - 1] + sorted[numbers.length / 2]) / 2
        : sorted[Math.floor(numbers.length / 2)];
    return {
        min: Math.min(...numbers),
        max: Math.max(...numbers),
        sum,
        mean,
        stdDev,
        median,
    };
};

const parseRow = (row) => {
    const values = Object.values(row).map((val) => parseFloat(val));
    if (values.some(isNaN)) {
        return { valid: false, invalidValues: Object.values(row).filter(value => isNaN(parseFloat(value))) };
    }
    return { valid: true, numbers: values };
};

// CSV 파일 읽기 및 처리
const invalidRows = [];
let cnt = 0;
fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
        const { valid, numbers, invalidValues } = parseRow(row);
        if (valid) {
            const stats = calculateStatistics(numbers);
            cnt = cnt+1;
            // console.log('The calculated lines:', stats);
        } else {
            invalidRows.push(invalidValues);
        }
    })
    .on('end', () => {
        console.log('The total number of lines:',cnt );
        console.log('The error values:', invalidRows);
       
    })