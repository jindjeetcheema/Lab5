function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
    // Find the container in the document
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container not found');
        return;
    }

    // Create a title element
    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    container.appendChild(titleElement);

    // Create a table to represent the dataArray
    const table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');
  
    dataArray.forEach(row => {
        const tr = document.createElement('tr'); // Create a new row
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            td.style.padding = '8px'; // Optional: Add some padding for readability
            td.style.textAlign = 'center'; // Center the text
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    // Append the table to the container
    container.appendChild(table);
};

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    // Just a test result
    let result = [1, 2, 3, 4, 5, 6, 7, 8];
    // Call your matrix calculation functions here
    // For example: if (operation === 'add') { addMatrices(matrix1, matrix2); }
	// prints suitable messages for impossible situation
    showResult('The Result', 'matrix3', 2, 4, result); // use suitable function for printing results
}

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.
function addMatrices(matrix1, matrix2){ 
  // Check if both matrices have the same dimensions
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        throw new Error('Matrices must have the same dimensions');
    }

    let resultMatrix = [];
    for (let i = 0; i < matrix1.length; i++) {
        resultMatrix[i] = []; // Initialize a new row in the result matrix
            for (let j = 0; j < matrix1[i].length; j++) {
                // Add corresponding elements from both matrices
                resultMatrix[i][j] = matrix1[i][j] + matrix2[i][j];
            }
    }

    return resultMatrix;
}
const subtractMatrices = function (matrix1, matrix2) { 
	// Check if both matrices have the same dimensions
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        throw new Error('Matrices must have the same dimensions');
    }
    
    let resultMatrix = [];
    for (let i = 0; i < matrix1.length; i++) {
        resultMatrix[i] = []; // Initialize a new row in the result matrix
        for (let j = 0; j < matrix1[i].length; j++) {
            // Subtract elements of matrix2 from matrix1
            resultMatrix[i][j] = matrix1[i][j] - matrix2[i][j];
        }
    }
    
    return resultMatrix;
};
const multiplyMatrices = (matrix1, matrix2) => { 
    // Check if multiplication is possible
    if (matrix1[0].length !== matrix2.length) {
        throw new Error('Number of columns in the first matrix must be equal to the number of rows in the second matrix');
    }

    let resultMatrix = [];
    for (let i = 0; i < matrix1.length; i++) {
        resultMatrix[i] = [];
        for (let j = 0; j < matrix2[0].length; j++) {
            resultMatrix[i][j] = 0; // Initialize the current element
            for (let k = 0; k < matrix1[0].length; k++) {
            // Perform the multiplication and addition
            resultMatrix[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return resultMatrix;
};
