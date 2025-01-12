import Chart from "chart.js/auto";

const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
const defaultData = [
    { temperature: 4.5, humidity: 64 },
    { temperature: 5.2, humidity: 61 },
    { temperature: 8.7, humidity: 59 },
    { temperature: 14.4, humidity: 60 },
    { temperature: 18.9, humidity: 60 },
    { temperature: 22.7, humidity: 71 },
    { temperature: 27.4, humidity: 74 },
    { temperature: 28.8, humidity: 70 },
    { temperature: 24.1, humidity: 70 },
    { temperature: 18.2, humidity: 68 },
    { temperature: 12.1, humidity: 68 },
    { temperature: 7, humidity: 65 }
];

const tableContainer = document.getElementById("inputTable");
const randomButton = document.getElementById("randomButton");
const ctx = document.getElementById("myChart").getContext("2d");

// Render input table
function renderTable(data) {
    tableContainer.innerHTML = `
        <table border="1">
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Temperature (°C)</th>
                    <th>Humidity (%)</th>
                </tr>
            </thead>
            <tbody>
                ${data
                    .map(
                        (item, index) =>
                            `<tr>
                                <td>${months[index]}</td>
                                <td><input type="number" value="${item.temperature}" class="temperature-input"></td>
                                <td><input type="number" value="${item.humidity}" class="humidity-input"></td>
                            </tr>`
                    )
                    .join("")}
            </tbody>
        </table>
    `;
}

function getTableData() {
    const temperatureInputs = document.querySelectorAll(".temperature-input");
    const humidityInputs = document.querySelectorAll(".humidity-input");

    return Array.from(temperatureInputs).map((input, index) => ({
        temperature: parseFloat(input.value),
        humidity: parseFloat(humidityInputs[index].value)
    }));
}

function updateChart(chart, data) {
    chart.data.datasets[0].data = data.map(item => item.temperature);
    chart.data.datasets[1].data = data.map(item => item.humidity);
    chart.update();
}

function generateRandomData() {
    return Array.from({ length: 12 }, () => ({
        temperature: (Math.random() * 30).toFixed(1),
        humidity: Math.floor(Math.random() * 61) + 40
    }));
}

const myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: months,
        datasets: [
            {
                label: "Temperature (°C)",
                data: defaultData.map(item => item.temperature),
                borderColor: "blue",
                borderWidth: 2,
                fill: false
            },
            {
                label: "Humidity (%)",
                data: defaultData.map(item => item.humidity),
                borderColor: "red",
                borderWidth: 2,
                fill: false,
                yAxisID: "y1"
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                position: "left"
            },
            y1: {
                beginAtZero: true,
                position: "right"
            }
        }
    }
});

tableContainer.addEventListener("input", () => {
    const updatedData = getTableData();
    updateChart(myChart, updatedData);
});

randomButton.addEventListener("click", () => {
    const randomData = generateRandomData();
    renderTable(randomData);
    updateChart(myChart, randomData);
});

renderTable(defaultData);

export default myChart;
