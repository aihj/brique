function findLongestValidParentheses(s) {
    let maxLength = 0;
    const stack = [-1]; // 스택 초기화 (초기값으로 -1 설정)

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            // 여는 괄호는 인덱스를 스택에 추가
            stack.push(i);
        } else {
            // 닫는 괄호인 경우
            stack.pop();
            if (stack.length === 0) {
                // 스택이 비어 있으면 현재 인덱스를 스택에 추가
                stack.push(i);
            } else {
                // 유효한 부분의 길이 계산
                maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
            }
        }
    }

    return maxLength;
}

// 실행 예시
const input1 = ")()())";
console.log(`Input: ${input1}\nResult: ${findLongestValidParentheses(input1)}`); // 결과: 4

const input2 = "(()";
console.log(`Input: ${input2}\nResult: ${findLongestValidParentheses(input2)}`); // 결과: 2
