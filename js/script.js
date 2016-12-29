(function ($) {
    
    var saved_values = [], /* An array that will contain all the items */
        sort_flag = 1,
        i = 0;
    var table = document.getElementById("task_list");
    
    $("#new_task").click(function () {
        
        var inputList = $(".control_input");
        
        /* If any of the fields is empty then return */
        if (inputList[0].value === "" || inputList[1].value === "") {
            alert("Please fill both fields");
            return;
        }
        
        /* Adding another table row with cells for new item */
        var row = table.insertRow(-1),
            cell1 = row.insertCell(0),
            cell2 = row.insertCell(1),
            cell3 = row.insertCell(2),
            values = []; /* An array for storing a single task-to-do item */

        values[0] = inputList[0].value; /* Task title */
        values[1] = inputList[1].value; /* Task description */
        values[2] = false; /* Whether the task has been done */
        values[3] = Date.now(); /* Time of adding the item which will also be used as key */
        
        cell1.innerHTML = values[0];
        cell2.innerHTML = values[1];

        /* Adding a checkbox */
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = values[3].toString;
        checkbox.classList.add("boxes");
        cell3.appendChild(checkbox);
        
        /* Time of adding the item is used as a key in localStorage */
        localStorage.setItem(values[3], JSON.stringify(values));

        /* Clear input fields */
        inputList[0].value = "";
        inputList[1].value = "";

        saved_values.push(values);
        
    });
    
    
    
}(jQuery));