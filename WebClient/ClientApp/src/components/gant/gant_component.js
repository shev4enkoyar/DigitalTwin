import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { Gantt, Task, EventOption } from 'gantt-task-react';
import "./style-tasks.css";


function GantGraph(props) {

    const [tasks, setNewTasks] = useState([])

    let windowInnerHeight = window.innerHeight
    let addingTasks = (windowInnerHeight-250)/50 

    useEffect(() => {
        console.log("hi")
        getTasks()
    }, [props]);

    function getTasks() {
        let new_tasks: Task[] = [
            {
                start: new Date(2020, 1, 20),
                end: new Date(2020, 1, 20),
                name: '',
                id: '',
                type: '',
                progress: 45,
                isDisabled: true,
                styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
            },
            {
                start: new Date(2020, 1, 1),
                end: new Date(2020, 1, 15),
                name: 'Idea',
                id: 'Task 0',
                type: 'task',
                progress: 45,
                isDisabled: false,
                styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
            }
        ];

        if (new_tasks.length < addingTasks) {
            for (let i = 0; i < (addingTasks); i++) {
                new_tasks.push({
                        start: new Date(2020, 1, 1),
                        end: new Date(2020, 1, 1),
                        name: '',
                        id: '',
                        type: '',
                        progress: 45,
                        isDisabled: true,
                        styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
                    })

            }
        }
        setNewTasks(new_tasks)
        
    }

    const ClickedQuest = (task) => {
        console.log(props)
        props.giveParent(task)
    }


    return (
        <Container fluid style={{margin:"0", padding:"0"}}>
            {console.log('render')}
        {tasks.length>0 &&
        <Gantt
                tasks={tasks}
                listCellWidth={""}
                onDoubleClick={ClickedQuest}
            />
         }
        </Container>
    );


}

export default GantGraph;