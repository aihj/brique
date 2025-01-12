const mariadb = require('mariadb');

// 데이터베이스 접속 정보
const dbConfig = {
    host: 'codingtest.brique.kr',
    user: 'codingtest',
    password: '12brique!@',
    database: 'employees',
    port: 3306, // 기본 포트
};

(async () => {
    let connection;

    try {
        // 데이터베이스 연결
        connection = await mariadb.createConnection(dbConfig);
        console.log('Connected to the MariaDB database.');

        // SQL 쿼리 작성
        const query = `
            SELECT 
                e.emp_no AS 'Employee Number',
                e.first_name AS 'First Name',
                e.last_name AS 'Last Name',
                e.gender AS 'Gender',
                e.hire_date AS 'Hire Date',
                d.dept_name AS 'Department Name',
                t.title AS 'Title',
                MAX(s.salary) AS 'Max Salary'
            FROM employees e
            JOIN dept_emp de ON e.emp_no = de.emp_no
            JOIN departments d ON de.dept_no = d.dept_no
            JOIN titles t ON e.emp_no = t.emp_no
            JOIN salaries s ON e.emp_no = s.emp_no
            WHERE e.hire_date >= '2000-01-01'
            GROUP BY e.emp_no, e.first_name, e.last_name, e.gender, e.hire_date, d.dept_name, t.title
            ORDER BY e.emp_no;
        `;

        // 쿼리 실행
        const rows = await connection.query(query);

        // 열 이름 추출
        const columns = rows.meta.map(col => col.name);

        // 결과 출력
        console.log('Columns:', columns);
        console.log('Results:');
        console.table(rows);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        if (connection) {
            // 연결 종료
            await connection.end();
            console.log('Connection closed.');
        }
    }
})();
