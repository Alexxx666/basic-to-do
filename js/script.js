(function ($) {
    'use strict';

    var saved_values = [], /* An array that contains all the items */
        table = $("#task_list"),
        sort_flag = 1,
        i = 0;
    
    $(document).ready(function () {
        
        if (localStorage.length > 0) {

            /* Retrieve values from localStorage */
            for (i = 0; i < localStorage.length; i++) {
                saved_values[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
            }

            /* Sort them according to their adding date */
            saved_values.sort(sortDatesUp);

            /* Add the items to the table */
            for (i = 0; i < localStorage.length; i++) {

                var row = table[0].insertRow(-1),
                    cell1 = row.insertCell(0),
                    cell2 = row.insertCell(1),
                    cell3 = row.insertCell(2);

                cell1.innerHTML = saved_values[i][0];
                cell2.innerHTML = saved_values[i][1];

                /* Adding checkbox */
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = saved_values[i][3];
                checkbox.classList.add("boxes");

                /* If the item has been marked as done */
                if (saved_values[i][2] === true) {
                    checkbox.checked = true;
                }

                cell3.appendChild(checkbox);

            }

        }
        
    });
    
    $("#new_task").click(function () {
        
        var inputList = $(".control_input");
        
        /* If any of the fields is empty then return */
        if (inputList[0].value === "" || inputList[1].value === "") {
            alert("Please fill both fields");
            return;
        }
        
        /* Adding another table row with cells for new item */
        var row = table[0].insertRow(-1),
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
        checkbox.id = values[3];
        checkbox.classList.add("boxes");
        cell3.appendChild(checkbox);
        
        /* Time of adding the item is used as a key in localStorage */
        localStorage.setItem(values[3], JSON.stringify(values));

        /* Clear input fields */
        inputList[0].value = "";
        inputList[1].value = "";

        saved_values.push(values);
        
    });
    
    $('#task_list').on('click', '.boxes', function() {
        
        var boxes_list = $(".boxes"),
            index = 0,
            i = 0;
        
        /* Finding the index of clicked checkbox */
        for (i = 0; i < boxes_list.length; i++) {
            if (boxes_list[i].id === this.id) {
                index = i;
            }
        }

        if (this.checked === true) {
            saved_values[index][2] = true;
        } else {
            saved_values[index][2] = false;
        }

        localStorage.setItem(saved_values[index][3], JSON.stringify(saved_values[index]));
        
    });
    
    $("#remove_task").click(function () {
        
        var boxes_list = $('.boxes'),
            i = 0;

        if (boxes_list.length === 0) {
            alert("Nothing to delete!");
            return;
        }

        /* Iterating in the reverse order */
        for (i = boxes_list.length - 1; i >= 0; i--) {
            if (boxes_list[i].checked === true) {

                localStorage.removeItem(saved_values[i][3]);
                saved_values.splice(i, 1);
                boxes_list[i].parentNode.parentNode.remove();

            }
        }
        
        /* if we remove the last element and sort order is not default */
        if(boxes_list.length === 0) {
            sort_flag = 1;
            document.querySelector("#title_head img").src = "img/arrow-down.svg";
        }
        
    });
    
    /* Function that helps to sort the array according to date of additions in ascending order */
    function sortDatesUp(a, b) {
        if (a[3] === b[3]) {
            return 0;
        } else {
            return (a[3] < b[3]) ? -1 : 1;
        }
    }

    /* Function that helps to sort the array according to date of additions in descending order */
    function sortDatesDown(a, b) {
        if (a[3] === b[3]) {
            return 0;
        } else {
            return (a[3] > b[3]) ? -1 : 1;
        }
    }
    
}(jQuery));