
// Function to add input fields and button once table appears
function addCGPAInputs() {
    const table = document.querySelector("table"); // Modify if necessary
    if (!table) {
        return;
    }
    // Temporarily disconnect the observer to prevent infinite loop
    observer.disconnect();

    const rows = table.querySelectorAll("tr");

    rows.forEach((row, index) => {
        if (index === 2) {
            if (!row.querySelector(".cgpa-header")) {
                const th = document.createElement("th");
                th.textContent = "Credits";
                th.className = "cgpa-header";
                row.appendChild(th);
            }
        } else if (index === 0 || index === 1 || row.querySelectorAll("td:nth-child(6)")[0].innerText == "PP" || row.querySelectorAll("td:nth-child(6)")[0].innerText == "-") {
        } else {
            if (row.querySelector(".cgpa-input")) {
                return;
            }

            const td = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.min = "1";
            input.className = "cgpa-input";
            td.appendChild(input);
            row.appendChild(td);
        }
    });


    // Add Calculate CGPA button if not already added
    if (!document.getElementById("calculateCgpa")) {
        const res = document.getElementById("res");
        res.style.cssText = "margin-bottom:50px";
        const button = document.createElement("button");
        button.textContent = "Calculate CGPA";
        button.id = "calculateCgpa";
        button.style.cssText = "margin-top:10px;padding:8px 12px;background:#007bff;color:white;border:none;cursor:pointer;display:block;margin-left:auto;margin-right:auto;";
        // If the button exists, append the CGPA display beside it
        if (res) {
            res.appendChild(button);  // Appending cgpaDisplay to the same parent as the button
        } else {
            console.error("Res not found!");
        }

        // Button click event
        button.addEventListener("click", () => {

            // Show loader while calculating CGPA
            displayLoader("Calculating CGPA...");

            const gradeMapping = {
                "O": 10, "A+": 9, "A": 8, "B+": 7, "B": 6,
                "C": 5, "P": 4, "F": 0
            };

            const gradeElements = [...document.querySelectorAll("table tr:nth-child(n+4) td:nth-child(6)")];
            const creditInputs = [...document.querySelectorAll(".cgpa-input")];

            let newGradeElements = [];
            for (let i = 0; i < gradeElements.length; i++) {
                // Only add the element if it's not "-" and it's not "PP"
                if (gradeElements[i].innerText !== "-" && gradeElements[i].innerText !== "PP") {
                    newGradeElements.push(gradeElements[i]);
                }
            }            
            let data = [];
            for (let i = 0; i < creditInputs.length; i++) {
                const gradeText = newGradeElements[i].innerText.trim();
                const gradeValue = gradeMapping[gradeText];
                const creditValue = parseFloat(creditInputs[i].value);
                if (isNaN(creditValue)) {
                    alert("Please fill in all credits before calculating CGPA.");
                    return;
                }

                data.push({ grade: gradeText, gradeValue, credits: creditValue });
            }

            let totalWeightedSum = 0;
            let totalCredits = 0;

            data.forEach(({ gradeValue, credits }) => {
                totalWeightedSum += gradeValue * credits;
                totalCredits += credits;
            });


            const cgpa = totalCredits ? (totalWeightedSum / totalCredits).toFixed(3) : "N/A";
            // Hide loader and display the calculated CGPA
            displayCGPA(cgpa);
            });
    } else {
    }

    // Disconnect the observer after the table is processed
    observer.disconnect();
}

// Function to display CGPA on the page
// Function to display CGPA beside the Calculate CGPA button
function displayCGPA(cgpa) {
    let cgpaDisplay = document.getElementById("cgpaDisplay");

    // Create the CGPA result element if it doesn't exist
    if (!cgpaDisplay) {
        cgpaDisplay = document.createElement("div");
        cgpaDisplay.id = "cgpaDisplay";
        cgpaDisplay.style.cssText = "margin-left:20px;padding:8px 12px;background:#007bff;color:white;border-radius:5px;";
    }

    // Set the CGPA result text
    cgpaDisplay.textContent = `CGPA: ${cgpa}`;

    // Find the Calculate CGPA button
    const button = document.getElementById("calculateCgpa");

    // If the button exists, append the CGPA display beside it
    if (button) {
        button.parentNode.appendChild(cgpaDisplay);  // Appending cgpaDisplay to the same parent as the button
    } else {
        console.error("Calculate CGPA button not found!");
    }
}


// Function to display loader while calculating CGPA
function displayLoader(message) {
    let cgpaDisplay = document.getElementById("cgpaDisplay");

    // Create the loader element if it doesn't exist
    if (!cgpaDisplay) {
        cgpaDisplay = document.createElement("div");
        cgpaDisplay.id = "cgpaDisplay";
        cgpaDisplay.style.cssText = "margin-bottom:50px;margin-top:10px;padding:10px;background:#f1f1f1;border-radius:5px;text-align:center;font-weight:bold;";
        document.body.appendChild(cgpaDisplay);
    }

    // Set the loader text
    cgpaDisplay.textContent = message;
}

// Use MutationObserver to detect changes in the page
const observer = new MutationObserver(() => {
    addCGPAInputs();
});

// Start observing changes in the entire page
observer.observe(document.body, { childList: true, subtree: true });

// Initial check in case table is already present when script loads
addCGPAInputs();
