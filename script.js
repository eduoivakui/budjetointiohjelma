let utilities=[];

function addUtility(){

const name=document.getElementById("utilityName").value.trim();
const cost=parseFloat(document.getElementById("utilityCost").value);

if(name==="" || isNaN(cost)) return;

utilities.push({
    name,
    cost
});

document.getElementById("utilityName").value="";
document.getElementById("utilityCost").value="";

renderTable();

}

function removeUtility(index){
utilities.splice(index,1);
renderTable();
}

function renderTable(){

const tbody=document.getElementById("tableBody");
tbody.innerHTML="";

const income=parseFloat(document.getElementById("income").value)||0;

utilities.forEach((u,index)=>{

const percent=
income>0
?((u.cost/income)*100).toFixed(1)
:"0.0";

tbody.innerHTML+=`
<tr>
<td>${u.name}</td>
<td>€${u.cost.toFixed(2)}€</td>
<td>${percent}%</td>
<td>
<button class="delete"
onclick="removeUtility(${index})">
Delete
</button>
</td>
</tr>
`;

});

updateSummary();

}

function updateSummary(){

const income=parseFloat(document.getElementById("income").value)||0;

const totalBills=utilities.reduce((sum,u)=>sum+u.cost,0);

const left=income-totalBills;

document.getElementById("incomeDisplay").textContent=
income.toFixed(2);

document.getElementById("billDisplay").textContent=
totalBills.toFixed(2);

document.getElementById("leftDisplay").textContent=
left.toFixed(2);

renderPercentages();

}

function renderPercentages(){

const rows=document.querySelectorAll("#tableBody tr");
const income=parseFloat(document.getElementById("income").value)||0;

rows.forEach((row,index)=>{

const percentCell=row.children[2];

if(income===0){
percentCell.innerText="0.0%";
}else{
percentCell.innerText=
((utilities[index].cost/income)*100).toFixed(1)+"%";
}

});

}
