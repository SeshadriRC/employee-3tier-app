const API_URL = "/api/employees";

function loadEmployees() {
    fetch(API_URL)
        .then(response => response.json())
        .then(employees => {
            const table = document.getElementById("employeeTable");
            table.innerHTML = "";

            employees.forEach(employee => {
                const row = `
                    <tr>
                        <td>${employee.id}</td>
                        <td>${employee.name}</td>
                        <td>${employee.role}</td>
                    </tr>
                `;
                table.innerHTML += row;
            });
        })
        .catch(error => {
            console.error("Error loading employees:", error);
        });
}

function addEmployee() {
    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;

    const employee = {
        name: name,
        role: role
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById("name").value = "";
        document.getElementById("role").value = "";
        loadEmployees();
    })
    .catch(error => {
        console.error("Error adding employee:", error);
    });
}

loadEmployees();