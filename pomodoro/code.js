const tasks = [];
let time = 0; 
let timer = null; 
let timer_break = null; 
let current = null; 

const bAdd = document.querySelector('#bAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');
const task_name = document.querySelector('#time #taskName');



form.addEventListener('submit', e => {
    e.preventDefault();
    if(itTask != '')
    {
        create_task(itTask.value);
    }
    render_task();
    itTask.value = '';
});


const create_task = (value) => 
{
    const new_task = 
    {
        id: (Math.random()*100).toString(36).slice(3),
        title: value,
        completed: false,
    }
    tasks.unshift(new_task);
}

const render_task = () =>
{
    const html = tasks.map(task =>{
        return `
        <div class='task'>
            <div class='completed'>${task.completed ? `<span class = 'done'>Done</span>` : `<button class = 'start_button' data-id='${task.id}'>Start</button>`}</div>
            <div class='title'>${task.title}</div>
        </div>
        `;
    });

    const task_container = document.querySelector('#tasks');
    task_container.innerHTML = html.join('');
    
    const start_buttons = document.querySelectorAll('.task .start_button');
    start_buttons.forEach(button => {
        button.addEventListener('click', e => {
            if(!timer){const id = button.getAttribute('data-id'); startButtomHandler(id);}
            button.textContent = 'in progress...';
        });
    });
}



const startButtomHandler = (id) =>
{
    time = 25*60;
    current = id;
    const task_index = tasks.findIndex(task => task.id == id);
    task_name.textContent = tasks[task_index].title;
    render_task();
    timer = setInterval(() =>{
        time_handler(id);
    }, 1000);
}

const time_handler = (id) =>
{
    time--;
    render_time();

    if(time == 0)
    {
        clearInterval(timer );
        mark_completed(id);
        timer = null;
        render_task ();
        start_break();
    }
}

const render_time = () => 
{
    const time_div = document.querySelector('#time #value');
    const minutes= parseInt(time/60);
    const seconds = parseInt(time%60);

    time_div.textContent = ` ${minutes < 10 ? '0' :  ''} ${minutes} : ${seconds< 10 ? '0' :  ''}  ${seconds }  `;
}


const mark_completed = (id) => 
{
    const task_index = tasks.findIndex((task) => task.id == id);
    tasks[task_index].completed = true;
}
console.log(tasks);

const start_break = () => 
{
    time = 5*60;
    task_name.textContent = 'Break';
    render_task();
    timer_break = setInterval(() => {
        timer_break_handler();
    }, 1000);
}

const timer_break_handler = () => 
{
    time --;
    render_time();
    if(time == 0)
    {
        clearInterval(timer_break);
        current = null;
        timer_break = null;
        task_name.textContent = '';
        render_task ();
    }

}

render_time();
render_task();