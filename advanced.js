let numbers = [];

function insertNumbers() {
    const input = document.getElementById('txtNum');
    const value = input.value.trim();
    const number = Number(value);

    if (
        value === '' ||
        Number.isNaN(number) ||
        number <= 0 ||
        !Number.isInteger(number)
    ) {
        alert('Please enter a positive whole number.');
        return;
    }

    numbers.push(number);

    input.value = '';
    input.focus();

    renderList();
    clearSummary();
}

function clearEntity() {
    const input = document.getElementById('txtNum');

    input.value = '';
    input.focus();
}

function clearItems() {
    numbers = [];

    const sortOrder = document.getElementById('sortOrder');
    if (sortOrder) {
        sortOrder.value = '';
    }

    renderList();
    clearSummary();
}

function renderList() {
    const table = document.getElementById('numberList');

    if (numbers.length === 0) {
        table.innerHTML = '';
        return;
    }

    let html = '';

    numbers.forEach((num, index) => {
        const type = num % 2 === 0 ? 'Even' : 'Odd';
        const color = num % 2 === 0 ? 'green' : 'blue';

        html += `
            <tr>
                <td style="padding-right: 16px;">
                    ${num}
                </td>
                <td style="
                    color:${color};
                    font-weight:bold;
                    padding-right:16px;
                ">
                    ${type}
                </td>
                <td>
                    <button onclick="removeItem(${index})">
                        Remove
                    </button>
                    <button onclick="editItem(${index})">
                        Edit
                    </button>
                </td>
            </tr>
        `;
    });

    table.innerHTML = html;
}

function editItem(index) {
    const current = numbers[index];

    const input = prompt(
        'Enter new number:',
        current
    );

    if (input === null) {
        return;
    }

    const value = input.trim();
    const number = Number(value);

    if (
        value === '' ||
        Number.isNaN(number) ||
        number <= 0 ||
        !Number.isInteger(number)
    ) {
        alert('Please enter a positive whole number.');
        return;
    }
    numbers[index] = number;
    renderList();
    clearSummary();
}

function removeItem(index) {
    numbers.splice(index, 1);
    renderList();
    clearSummary();
}

function getTotal() {
    if (numbers.length === 0) {
        alert('No numbers to calculate.');
        return;
    }

    const total = numbers.reduce(
        (sum, n) => sum + n,
        0
    );

    const results = document.getElementById('results');

    let totalResult =
        document.getElementById('totalResult');

    if (!totalResult) {
        totalResult = document.createElement('p');
        totalResult.id = 'totalResult';
        results.appendChild(totalResult);
    }
    totalResult.innerHTML = `Total: ${total}`;
}

function showHighLow() {
    if (numbers.length === 0) {
        alert('No numbers to calculate.');
        return;
    }

    const highest = Math.max(...numbers);
    const lowest = Math.min(...numbers);
    const results = document.getElementById('results');

    let highLowResult =
        document.getElementById('highLowResult');

    if (!highLowResult) {
        highLowResult = document.createElement('div');
        highLowResult.id = 'highLowResult';

        results.appendChild(highLowResult);
    }

    highLowResult.innerHTML = `
        <p>Highest: ${highest}</p>
        <p>Lowest: ${lowest}</p>
    `;
}

function sortNumbers(order) {
    if (order === 'ascending') {
        numbers.sort((a, b) => a - b);
    } else if (order === 'descending') {
        numbers.sort((a, b) => b - a);
    } else {
        return;
    }
    renderList();
    clearSummary();
}


function clearSummary() {
    const results = document.getElementById('results');
    if (results) {
        results.innerHTML = '';
    }
}