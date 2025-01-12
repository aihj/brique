const axios = require('axios'); // Axios 라이브러리 사용

const URL = "http://codingtest.brique.kr:8080/random";
const TOTAL_CALLS = 100;

async function fetchRandomResponses() {
  const responseCount = {}; // 응답 데이터를 카운트할 객체

  // 서버를 100번 호출
  for (let i = 0; i < TOTAL_CALLS; i++) {
    try {
      const response = await axios.get(URL);
      const responseData = JSON.stringify(response.data); // 응답 데이터를 JSON 문자열로 변환
      // 카운트 증가
      responseCount[responseData] = (responseCount[responseData] || 0) + 1;
    } catch (error) {
      console.error(`Error fetching data at call ${i + 1}:`, error.message);
    }
  }

  // 카운트 결과 정렬 (많은 횟수부터 정렬)
  const sortedResults = Object.entries(responseCount).sort((a, b) => b[1] - a[1]);

  // 결과 출력
  let totalCount = 0;
  console.log("Results:");
  sortedResults.forEach(([response, count]) => {
    console.log(`count: ${count} ${response}`);
    totalCount += count;
  });

  // 총합 출력
  console.log("\nTotal Count:", totalCount);
}

// 실행
fetchRandomResponses();
