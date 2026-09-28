let services = JSON.parse(localStorage.getItem("services")) || [];

function addService() {

    let customer = document.getElementById("customer").value;
    let vehicle = document.getElementById("vehicle").value;
    let service = document.getElementById("service").value;
    let date = document.getElementById("date").value;
    let cost = document.getElementById("cost").value;
    let status = document.getElementById("status").value;

    if (
        customer === "" ||
        vehicle === "" ||
        service === "" ||
        date === "" ||
        cost === ""
    ) {
        alert("Please fill all fields!");
        return;
    }

    let newService = {
        id: Date.now(),
        customer: customer,
        vehicle: vehicle,
        service: service,
        date: date,
        cost: Number(cost),
        status: status
    };

    services.push(newService);

    localStorage.setItem("services", JSON.stringify(services));

    alert("Service added successfully!");

    clearForm();
    displayServices();
}


function displayServices() {

    let list = document.getElementById("serviceList");
    let search = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    let filteredServices = services.filter(function(item) {
        return item.vehicle.toLowerCase().includes(search);
    });

    filteredServices.forEach(function(item) {

        let statusClass = "";

        if (item.status === "Pending") {
            statusClass = "pending";
        } 
        else if (item.status === "In Progress") {
            statusClass = "progress";
        } 
        else {
            statusClass = "completed";
        }

        list.innerHTML += `
            <div class="service-card">

                <h2>🚗 ${item.vehicle}</h2>

                <p><strong>Customer:</strong> ${item.customer}</p>

                <p><strong>Service:</strong> ${item.service}</p>

                <p><strong>Date:</strong> ${item.date}</p>

                <p><strong>Cost:</strong> ₹${item.cost}</p>

                <p>
                    <strong>Status:</strong>
                    <span class="${statusClass}">
                        ${item.status}
                    </span>
                </p>

                <button
                    class="delete-btn"
                    onclick="deleteService(${item.id})">
                    Delete
                </button>

            </div>
        `;
    });

    updateStats();
}


function deleteService(id) {

    if (confirm("Are you sure you want to delete this service?")) {

        services = services.filter(function(item) {
            return item.id !== id;
        });

        localStorage.setItem("services", JSON.stringify(services));

        displayServices();
    }
}


function updateStats() {

    document.getElementById("totalServices").innerText =
        services.length;

    let completed = services.filter(function(item) {
        return item.status === "Completed";
    });

    document.getElementById("completedServices").innerText =
        completed.length;

    let total = services.reduce(function(sum, item) {
        return sum + item.cost;
    }, 0);

    document.getElementById("totalAmount").innerText =
        "₹" + total;
}


function clearForm() {

    document.getElementById("customer").value = "";
    document.getElementById("vehicle").value = "";
    document.getElementById("service").value = "";
    document.getElementById("date").value = "";
    document.getElementById("cost").value = "";
    document.getElementById("status").value = "Pending";
}


displayServices();
