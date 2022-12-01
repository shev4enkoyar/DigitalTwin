import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { Gantt, Task, EventOption } from 'gantt-task-react';
import authService from "../../components/api-authorization/AuthorizeService";
import { ThemeContextConsumer } from "../ThemeContext";
import "./style-tasks.css";
import {useParams} from "react-router-dom";


function GantGraph(props) {

    let {modelId} = useParams()
    const [tasks, setNewTasks] = useState([])
        //const[curDate, setDate] = useState(new Date(new Date().setDate(new Date().getDate() - 12)))
    const [curDate, setDate] = useState(new Date(11/14/22))

    let windowInnerHeight = window.innerHeight
    let addingTasks = (windowInnerHeight-250)/50 

    useEffect(() => {
            getTasks()
    }, [props]);

    useEffect(() => {
        console.log(tasks)
    },[tasks])

    async function getTasks() {
        //tasks request//

        const token = await authService.getAccessToken();
        const response = await fetch(`api/task/get_all/${modelId}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        let new_tasks = [];
        
        for (let d of data) {
            let task = {}
            task.start = new Date(d.startDate)
            task.end = new Date(d.endDate)
            task.name = d.name
            task.id = d.id
            task.progress = 50
            task.type = 'task'
            task.isDisabled = true
            task.styles = { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }
            new_tasks.push(task)
        }
        
        /*new_tasks.push(
            {
                start: new Date(2022, 9, 20),
                end: new Date(2022, 10, 1),
                name: 'Загрузка семян',
                id: '1',
                type: 'task',
                progress: 100,
                isDisabled: true,
                styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
            },
            {
                start: new Date(2022, 9, 29),
                end: new Date(2022, 10, 9),
                name: 'Транспортировка семян',
                id: '2',
                type: 'task',
                progress: 100,
                isDisabled: true,
                styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
            },
            {
                start: new Date(2022, 10, 5),
                end: new Date(2022, 10, 16),
                name: 'Посев',
                id: '3',
                type: 'task',
                progress: 76,
                isDisabled: true,
                styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
            },
            {
                start: new Date(2022, 10, 11),
                end: new Date(2022, 10, 23),
                name: 'Прикатывание продукции',
                id: '4',
                type: 'task',
                progress: 13,
                isDisabled: true,
                styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
            },
            {
                start: new Date(2022, 10, 17),
                end: new Date(2022, 10, 29),
                name: 'Боронование',
                id: '5',
                type: 'task',
                progress: 0,
                isDisabled: true,
                styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
            },
        );*/
        

        if (!props.height) {
            if (new_tasks.length < addingTasks) {
                for (let i = 0; i < (addingTasks); i++) {
                    new_tasks.push({
                        start: new_tasks[0].start,
                        end: new_tasks[0].start,
                        name: '',
                        id: 100 + i,
                        type: 'task',
                        progress: 0,
                        isDisabled: true,
                        styles: { progressColor: 'none', progressSelectedColor: 'none', backgroundColor: 'none', backgroundSelectedColor: 'none' },
                    })

                }
            }
        }

        //console.log(new_tasks)
        setNewTasks(new_tasks);
    }


    const ClickedQuest = (task) => {
        props.getTask(task)
    }


    return (
        <ThemeContextConsumer>
            {context => (
                <Container fluid style={{ margin: "0", padding: "0" }} className={context.theme}>
                    {tasks.length > 0 &&
                        <Gantt
                            tasks={tasks}
                            listCellWidth={""}
                            locale={"RU"}
                            onDoubleClick={(e) => {
                                ClickedQuest(e);
                            }}
                            viewDate={curDate}
                        />
                    }
                </Container>)}
        </ThemeContextConsumer>
    );


}

export default GantGraph;