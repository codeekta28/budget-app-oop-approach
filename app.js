// need to add local storage in this program
class budget {
    constructor() {
        this.expenseAmount = 0;
        this.budgetAmount = 0;
        this.balanceAmount = 0;
        this.expenseCollection = [];
        this.id = 0;
    }
    showBudget(budget) {
        this.budgetAmount = budget;
        this.balanceAmount = budget;
        document.querySelector("#budget-amount").innerHTML = budget;
        document.querySelector("#balance-amount").innerHTML = budget;
    }
    showAlert(message, status) {
        let alertDiv = document.createElement("div");
        alertDiv.className = `alert alert-${status}`;
        alertDiv.appendChild(document.createTextNode(message))
        let container = document.querySelector(".mainContainer");
        console.log(container);
        let heading = document.querySelector(".heading");
        container.insertBefore(alertDiv, heading);
        setTimeout(() => {
            alertDiv.style.display = "none";
        }, 3000);
    }
    showExpensesInTable(name, amount) {
        let tableBody = document.querySelector("#expenseBody");
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = `<td>${name}</td>
                              <td>${amount}</td>
                               <td><a href="" class="edit"><i class="fas fa-edit edit"></i></a></td>
                               <td><a href = "" class ="trash"> <i class="fas fa-trash trash"></a></td>`
        tableBody.appendChild(tableRow);
        this.addingExpenses(amount);
    }
    addingExpenses(amount) {
        this.expenseCollection.push(parseInt(amount));
        let reducer = (accumulator, currentValue) => accumulator + currentValue
        this.expenseAmount = this.expenseCollection.reduce(reducer);
        document.querySelector("#expense-amount").innerHTML = this.expenseAmount;
        this.balanceAfterAddingExpense(parseInt(amount))
    }
    balanceAfterAddingExpense(amount) {
        this.budgetAmount = this.budgetAmount - amount;
        document.querySelector("#balance-amount").innerHTML = this.budgetAmount;
    }
    updatingExpenseAndBalanceAfterDeletion(expense) {
        expense = parseInt(expense);
        this.expenseAmount = this.expenseAmount - expense;
        this.budgetAmount = this.budgetAmount + expense;
        document.querySelector("#balance-amount").innerHTML = this.budgetAmount;
        document.querySelector("#expense-amount").innerHTML = this.expenseAmount;
    }
    clearFields() {
        document.querySelector("#budget-input").value = "";
        document.querySelector("#expense-input").value = "";
        document.querySelector("#amount-input").value = "";
    }
    editingTable(expenseAmount, expenseName) {
        // document.querySelector(".expense-title").contentEditable = "true";
        expenseAmount.contentEditable = "true";
        expenseAmount.style.color = "red";
        expenseName.contentEditable = "true";
        expenseName.stylecolor = "red";
    }

}
function eventlisteners() {
    let budgetForm = document.querySelector("#budget-form");
    let expenseForm = document.querySelector("#expense-form");
    let icons = document.querySelector(".icon-collector");
    // instantiate class
    let budget1 = new budget();
    budgetForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let budgetInput = document.querySelector("#budget-input").value;
        if (budgetInput == "" || budgetInput < 0) {
            budget1.showAlert("dont keep the budget empty", "danger");
        }
        budget1.showBudget(budgetInput);
        budget1.clearFields();

    })
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let expenseInput = document.querySelector("#expense-input").value;
        let amountInput = document.querySelector("#amount-input").value;
        let budgetAmount = document.querySelector("#budget-amount").textContent;
        console.log(budgetAmount);
        if (expenseInput == "" || amountInput == "" || amountInput < 0) {
            budget1.showAlert("dont keep the expense empty", "danger");
        } else if (budgetAmount == 0) {
            alert("please enter the budget first");
        }
        else {
            budget1.showExpensesInTable(expenseInput, amountInput);
            budget1.clearFields();
        }

    })
    icons.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("trash")) {
            let expense = e.target.parentElement.parentElement.parentElement.children[1].textContent;
            console.log("deleted");
            // expense = parseInt(expense);
            let rowToBeRemoved = e.target.parentElement.parentElement.parentElement
            rowToBeRemoved.remove();
            budget1.updatingExpenseAndBalanceAfterDeletion(expense);
        }
        if (e.target.classList.contains("edit")) {
            console.log("edited");
            let expenseAmount = e.target.parentElement.parentElement.previousElementSibling;
            let expenseName = expenseAmount.previousElementSibling;
            console.log(expenseName);
            budget1.editingTable(expenseAmount, expenseName);
        }
    })
}
document.addEventListener("DOMContentLoaded", () => {
    eventlisteners();
})