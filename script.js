function showNotification(message) {
    let notification = document.getElementById("notification");

    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000); // Hide after 3 seconds
}

// Example usage:
document.getElementById("addButton").addEventListener("click", function () {
    showNotification("Winter is Coming... You applied to a company!");
});

document.querySelector("#companyTable").addEventListener("click", function (event) {
    if (event.target.classList.contains("company-checkbox")) {
        if (event.target.checked) {
            showNotification("Your conquest is complete..");
        }
    }

    if (event.target.classList.contains("delete-btn")) {
        event.target.closest("tr").remove();
        showNotification("Your watch has ended..");
    }
});

function displayMessage(message) {
    let messagesDiv = document.getElementById("messages");
    let msg = document.createElement("p");
    msg.textContent = message;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}


document.addEventListener("DOMContentLoaded", function () {
    const companyInput = document.getElementById("companyInput");
    const addButton = document.getElementById("addButton");
    const companyList = document.getElementById("companyList");

    // Load saved data
    loadCompanies();

    // Add company when button is clicked
    addButton.addEventListener("click", addCompany);

    function addCompany() {
        let companyName = companyInput.value.trim();
        let deadline = document.getElementById("deadlineInput").value;
        let notes = document.getElementById("notesInput").value.trim();

        if (companyName === "") return;

        // Create a new row for the table
        let tableBody = document.querySelector("#companyTable tbody");
        let row = document.createElement("tr");

        let checkboxCell = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
            row.classList.toggle("checked");
            saveCompanies();
        });
        checkboxCell.appendChild(checkbox);

        let companyCell = document.createElement("td");
        companyCell.textContent = companyName;

        let deadlineCell = document.createElement("td");
        deadlineCell.textContent = deadline || "N/A";

        let notesCell = document.createElement("td");
        notesCell.textContent = notes || "None";

        let deleteCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => {
            row.remove();
            saveCompanies();
        });
        deleteCell.appendChild(deleteButton);

        row.appendChild(checkboxCell);
        row.appendChild(companyCell);
        row.appendChild(deadlineCell);
        row.appendChild(notesCell);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);

        saveCompanies();

        companyInput.value = "";
        document.getElementById("deadlineInput").value = "";
        document.getElementById("notesInput").value = "";
    }

    function saveCompanies() {
        let items = [];
        document.querySelectorAll("#companyTable tbody tr").forEach(row => {
            let company = row.children[1].textContent;
            let deadline = row.children[2].textContent;
            let notes = row.children[3].textContent;
            let checked = row.classList.contains("checked");

            items.push({ company, deadline, notes, checked });
        });

        localStorage.setItem("companies", JSON.stringify(items));
    }

    function loadCompanies() {
        let storedCompanies = JSON.parse(localStorage.getItem("companies")) || [];
        let tableBody = document.querySelector("#companyTable tbody");

        storedCompanies.forEach(({ company, deadline, notes, checked }) => {
            let row = document.createElement("tr");

            let checkboxCell = document.createElement("td");
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = checked;
            if (checked) row.classList.add("checked");
            checkbox.addEventListener("change", () => {
                row.classList.toggle("checked");
                saveCompanies();
            });
            checkboxCell.appendChild(checkbox);

            let companyCell = document.createElement("td");
            companyCell.textContent = company;

            let deadlineCell = document.createElement("td");
            deadlineCell.textContent = deadline || "N/A";

            let notesCell = document.createElement("td");
            notesCell.textContent = notes || "None";

            let deleteCell = document.createElement("td");
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "❌";
            deleteButton.classList.add("delete-btn");
            deleteButton.addEventListener("click", () => {
                row.remove();
                saveCompanies();
            });
            deleteCell.appendChild(deleteButton);

            row.appendChild(checkboxCell);
            row.appendChild(companyCell);
            row.appendChild(deadlineCell);
            row.appendChild(notesCell);
            row.appendChild(deleteCell);

            tableBody.appendChild(row);
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let varysQuoteBox = document.getElementById("varysQuoteBox");
    let varysQuote = document.getElementById("varysQuote");

    if (varysQuoteBox && varysQuote) {
        varysQuoteBox.style.display = "block"; // Ensure visibility
        updateVarysQuote(); // Set an initial quote
        setInterval(updateVarysQuote, 10000); // Change every 10 seconds
    }
});

const varysQuotes = [
    "A wise job seeker understands that knowledge is power.",
    "Opportunities are like whispers in the wind, only the attentive hear them.",
    "One must network as the spiders weave their webs.",
    "A man who prepares for the worst never finds himself unprepared.",
    "Adaptation is the key to survival, my dear friend.",
    "A clever tongue and a good CV can open many doors.",
    "Loyalty is earned, not given. Choose your employers wisely."
];

function updateVarysQuote() {
    let quoteBox = document.getElementById("varysQuote");

    if (!quoteBox) return; // Ensure element exists

    let randomQuote = varysQuotes[Math.floor(Math.random() * varysQuotes.length)];

    // Apply smooth fade-out, change quote, then fade-in
    quoteBox.style.transition = "opacity 0.5s ease-out";
    quoteBox.style.opacity = "0";

    setTimeout(() => {
        quoteBox.textContent = `"${randomQuote}"`;
        quoteBox.style.opacity = "1";
    }, 500); // Delay before showing new text
}
