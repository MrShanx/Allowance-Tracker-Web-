/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */                   
    //variable for input text of expenses
    var expense_input_text = document.getElementById("expense_in");
    
            //runs add allowance function upon page initialization
            function initPage() {      
                if(getAllowance() <= 0) {
                    add();
                }
            }
            
            //focuses cursor to expense input text
            function focusInput() {
                expense_input_text.focus();
            }
            
            //persists aount to local storage
            function setAllowance(amount) {
                localStorage.setItem("allowance_var", amount);
            }
            
            //returns allowance data from local storage
            function getAllowance() {
                var temp = localStorage.getItem("allowance_var");
                if(temp === null) {
                    return parseFloat(0);
                }
                else {
                    return parseFloat(temp);   
                }
            }
            
            //updates local storage of new amount and
            //displays new amount to allowance_out text 
            function updateAllowance(amount){
                setAllowance(amount);                      
                document.forms[0].allowance_out.value = "$" + putDecimal(amount);
            }                       
            
            //updates transaction log
            function updateLog(amount, transac) {
                if(transac === "income") {
                   var newText = "+$" + putDecimal(amount) + " " + getDate() + "\n";
                }
                else {
                    var newText = "-$" + putDecimal(amount) + " " + getDate() + "\n";
                }                              
                document.bottom_form.expense_log.value += newText;                
                scrollToBottom();
            }
            
            //adds allowance
            function add() {
                var input = prompt("Allowance amount: ", "200.00");
                if(input !== null && input > 0) {
                    var temp_amount = parseFloat(input) + getAllowance();
                    updateAllowance(temp_amount);
                    updateLog(input, "income");
                }
                else {
                    if(getAllowance() <= 0) {
                        errorAmount();
                    }
                }
            }            
            
            //subtracts from current allowance
            function subtract() {
                var allowance = getAllowance();
                var expense = document.getElementById("expense_in").value;
                
                    if(allowance === 0) {
                        budgetConsumed("par");
                    }
                    if(allowance < 0) {
                        budgetConsumed("over");
                    }
                    
                    //if expense input text was used
                    if(expense !== "" && allowance > 0 && expense > 0.009) {                        
                        var allowance_left = allowance - expense;
                            if(expense > 0) {
                                updateAllowance(allowance_left); 
                                updateLog(expense, "expense");
                            }
                            else {
                                errorAmount();
                            }
                    document.getElementById("expense_in").value = "";
                    }
                    
                    //if expense input text is empty and button or enter key is pressesd
                    else { 
                        if(expense === "") {
                            var input = prompt("Expense amount: ", "20.00");
                            if(input !== null && input > 0) {
                                var temp_amount = getAllowance() - parseFloat(input);
                                updateAllowance(temp_amount);
                                updateLog(input, "expense");
                            }
                        }
                    }                
                focusInput();
            }
            
            //resets allowance and all displays
            function res() {
                 setAllowance(0);
                 document.forms[0].allowance_out.value = "Set allowance budget";
                 document.bottom_form.expense_log.value = "";
                 document.getElementById("expense_in").value = "";
                 focusInput();
            }
            
            //determines if over or par with budget
            function budgetConsumed(note) {                
                if(note === "over") {
                    alert("**OVER BUDGET**");
                    add();                    
                }
                else if(note === "par") {
                    alert("**ALL BUDGET USED**");
                    add();
                }
            }
            
            //copied @stackoverflow
            //returns current mm/dd/yyyy only
            function getDate() {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var yyyy = today.getFullYear();

                if(dd<10) {
                    dd = '0'+dd;
                } 

                if(mm<10) {
                    mm = '0'+mm;
                } 

                today = mm + '/' + dd + '/' + yyyy;
                return today;
            }
            
            //returns parsed string to double with 2 decimals only
            function putDecimal(amount) {
                return parseFloat(Math.round(amount * 100) / 100).toFixed(2);
            }
            
            //returns string error
            function errorAmount() {
                alert("**Please add more allowance**");
            }
            
            //auto scroll to bottom of transaction log
            function scrollToBottom() {
                var text_area= document.getElementById("expense_log");
                text_area.scrollTop = text_area.scrollHeight;
            }

