let tasks = [];
    
  let mytasks = document.querySelector('.tasks');
  let modal = document.querySelector('.adding-modal');
  let modal2 = document.querySelector('.removing-modal');
  let modal3 = document.querySelector('.update-modal');
  let tasktext = document.querySelector('.task-text');

  let confirmUpdateBtn = document.querySelector('.confirm-update');


  document.addEventListener('DOMContentLoaded', () => {
    displayAllTasks();
  });
  
  let id = 0;
  
 displayAllTasks();

  //add task ..
  

  // take a task object and  build the UI of the Task.....
  function displaytasks(task)
  {

      let onetask =  document.createElement('div');
        onetask.classList.add('task');
        
         // Apply a green background if task is completed
     if (task.isCompleted) {
      onetask.classList.add('done');

     }
      console.log(task.isCompleted);
        onetask.innerHTML = `
        <div class="task-info">
            <h2 class="task-title">${task.taskTitle}</h2>
            <div class="date">
                <i class="fa-solid fa-calendar-days"></i>
               <span class="date-info">${task.date}</span>
            </div>
        </div>
        <div class="actions">
            <button class="circular" data-id = ${task.id} onclick ="checkcomplete(${task.id})">
            ${task.isCompleted? ' <i class="fa-solid fa-xmark red " style ="width:100%; height:100%; border-radius:50%; font-size:10px"></i>':'<i class="fa-solid fa-check"></i>'}
            </button>
            <button class="circular" data-id = ${task.id} onclick ="update(${task.id})"><i class="fa-solid fa-pen-to-square"></i></button>
             <button class="circular delet" data-id = ${task.id} onclick ="remove(${task.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
`
      mytasks.prepend(onetask);
    
  }


  // display all tasks 
  function displayAllTasks()
  {
    mytasks.innerHTML = '';
    tasks.forEach(task => displaytasks(task));
  }
  // add button ..
  function addTask()
  {
    
    modal.classList.remove('hidden');
    tasktext.value = ''; // Clear the input field
    tasktext.focus(); // Focus the input field

  }
 /// confirm 
   function confirm()
   {
      console.log(tasktext.value)
      let newtask = {id:id, taskTitle:tasktext.value , date: updatedate(), isCompleted: false};
      tasks.push(newtask); // Add an task object to the array
      displayAllTasks(); // refresh the tasks Ui
      id++;
      close();
   }

  // close modal 
  function close()
  {
    modal.classList.add('hidden');
  }
  //Delete 
  function remove(id)
  {
    console.log(id);
    modal2.classList.remove('hidden2');
    let modalactions = document.querySelector('.modal-actions');
    modalactions.addEventListener('click' , (e)=>{
        if(e.target.classList.contains("confirm-delete"))
        {
            modal2.classList.add('hidden2');
            tasks = tasks.filter((task) => task.id !== id);
            displayAllTasks();
        }
        else
        {
            modal2.classList.add('hidden2');
        }
    })
  
   
  }
  let updateInput = document.querySelector(".task-text-toupdate");
  //update
  function update(id)
  {

    let taskToUpdate = tasks.find((task) => task.id === id);
  if (!taskToUpdate) return;

  modal3.classList.remove("hidden3");
  updateInput.value = taskToUpdate.taskTitle;
    // confirm update
  confirmUpdateBtn.onclick = () => {
    taskToUpdate.taskTitle = updateInput.value.trim();
    taskToUpdate.date = updatedate();
    displayAllTasks();
    modal3.classList.add("hidden3");
  }}


  // update the date 
  function updatedate()
  {
    let today = new Date();
    let formattedDate = `${today.getDate()} - ${today.getMonth()+1} - ${today.getFullYear()} | ${today.getHours()}:${today.getMinutes()}`; 
    return formattedDate;
  }
 
  // mark as completed 

  function checkcomplete(id)
  {
    let taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;
     
    taskToUpdate.isCompleted = !taskToUpdate.isCompleted; // Toggle completion status
    displayAllTasks();

  }


  
  document.querySelector('.close').addEventListener('click', close);
  document.querySelector('.add-modal').addEventListener('click', confirm);
  


  