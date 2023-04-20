const arr = [];
const completedArr=[];
var todo_item="";
// global variable to get index on edit button
var idx="";
function addNewTask() {
  let item = document.getElementById("new-task").value;
  if(validation(item,"err_input")){cleardata(); return};
  arr.push({ checkbox: "false", item: item });
   todo_item=display(arr, "");
  document.getElementById("incomplete-tasks").innerHTML=todo_item;
}
// display todo
function display(arr, html) {
  arr.map((e,index) => {
    html += `<li><input id="todoinput" onclick='checkboxval(${index})' type="checkbox" value='${e.checkbox}'><label>${e.item}</label><input id="inputforEdit${index}" type="text"><button id='${index}' onclick='edit(${index})' class="edit">Edit</button><button id='${index}' onclick='delte(${index})' class="delete">Delete</button></li>`;
  });
  return html;
}
// funtion to edit todo
function edit(index){
  document.getElementById("new-task").value=arr[index].item;
    document.getElementById("new-task-btn").style.display="none";
    document.getElementById("edit-task-btn").style.display="block";
    document.getElementById("edit-task-btn2").style.display="none";
    idx=index; 
}
// function for validation
function validation(inputText,msgId)
{
  if (inputText == "" || inputText < 0) {
    if (inputText == "") {
      document.getElementById(msgId).innerHTML=`** this Field is empty`;
    } else {
      document.getElementById(msgId).innerHTML=`**this Field cannot be negative`;
    }
    return 1;
  } else {
    document.getElementById(msgId).innerHTML=``;
    return 0;
  }
}
// clearing input after each submission
function cleardata(){
  document.getElementById("new-task").value="";
}
// delete todo
function delte(index){
  let tbledata = "";
  var filt = arr.filter((e, i) => {
    if (index == i) {
      arr.splice(i, 1);
      tbledata = display(arr, "");
    }
  });
  document.getElementById("incomplete-tasks").innerHTML=tbledata;
}
// update todo
function updateEdit(){
  // document.getElementById("edit-task")
let todoitem=document.getElementById("new-task").value; 
console.log(todoitem);
if(validation(todoitem,"err_input")){cleardata(); return};
    let lstdata = "";
    let filt = [];
    arr.map((e, i) => {
      if (idx == i) {
        filt.push({ checkbox: "false",item:todoitem});
      }
    });
    filt.map((e) => (arr[idx] = e));
    lstdata = display(arr, "");
    document.getElementById("incomplete-tasks").innerHTML=lstdata;
    document.getElementById("new-task-btn").style.display="block";
    document.getElementById("edit-task-btn").style.display="none";
}
// function to check if todolist checkbox is clicked
function checkboxval(index){
  // bydefault checkbox-val is false  , if checkboxval is getting called it means checkbox is clicked
let val=document.getElementById("todoinput").value;
if(val=='false')
{
arr.map((e,i)=>{
  if(i==index)
  {
    completedArr.push({checkbox:"true",item:e.item});
    delte(index);
  }
})
// gone from todo
let arrAfterRemove=display(arr,"");
document.getElementById("incomplete-tasks").innerHTML=arrAfterRemove;
// come to completed
let html=displayCompleted(completedArr,"");
document.getElementById("completed-tasks").innerHTML=html;
}
}
// function to display completed tasks
function displayCompleted(comparr,html){
  comparr.map((e,index)=>{
    html+=` <li><input id='completedWork' onclick='checkboxval2(${index})' value='${e.checkbox}' type="checkbox" checked><label>${e.item}</label><input type="text"><button onclick='edit2(${index})' class="edit">Edit</button><button onclick='delte2(${index})' class="delete">Delete</button></li>`
  })
  return html;
}
// function to delete  completed tasks
function delte2(index)
{
  let tbledata = "";
  var filt = completedArr.filter((e, i) => {
    if (index == i) {
      completedArr.splice(i, 1);
      tbledata = displayCompleted(completedArr, "");
    }
  });
  document.getElementById("completed-tasks").innerHTML=tbledata;
}
// function to check if completed tasks checkbox is clicked
 function checkboxval2(index){
  let val=document.getElementById("completedWork").value;
   if(val=='true')
{
  completedArr.map((e,i)=>{
    if(i==index)
    {
      arr.push({checkbox:"false",item:e.item});
      delte2(index);
    }
  }) 
  // gone from completed
  let compArr_afterRemove=displayCompleted(completedArr,"");
  document.getElementById("completed-tasks").innerHTML=compArr_afterRemove;
  // come to todo
  let cumtodo=display(arr,"");
  document.getElementById("incomplete-tasks").innerHTML=cumtodo;
}
 }
 // funtion to edit completd-todo
function edit2(index){
  document.getElementById("new-task").value=completedArr[index].item;
  document.getElementById("new-task-btn").style.display="none";
  document.getElementById("edit-task-btn2").style.display="block";
  idx=index;
}
// update completetodo
function updateEdit2(){
let todoitem=document.getElementById("new-task").value; 
if(validation(todoitem,"err_input")){cleardata(); return};
    let lstdata = "";
    let filt = [];
    completedArr.map((e, i) => {
      if (idx == i) {  
        filt.push({ checkbox: "true",item:todoitem});
      }
    });
    filt.map((e) => (completedArr[idx] = e));
    lstdata = displayCompleted(completedArr, "");
    document.getElementById("completed-tasks").innerHTML=lstdata;
    document.getElementById("new-task-btn").style.display="block";
    document.getElementById("edit-task-btn2").style.display="none";
}






