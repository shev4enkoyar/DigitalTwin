import React, { Component, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Col, Container, Row } from "reactstrap/lib";
import authService from "../../components/api-authorization/AuthorizeService";
import CardForBody from "../../components/cardForBody/CardForBody";
import { ThemeContextConsumer } from "../../components/ThemeContext";
import { functionalConverter } from "../../util/functionalConverter";
import Combobox from '../../components/combobox/ComboBox.js';
import './../../pages/pages.css';
import './AdminPage.css';
import { LoadingFragment } from "../../util/LoadingFragment";
import MaterialTable from 'material-table'


const tasks = {cols: 
    [
    { title: 'Нименование работы', field: 'name' },
    { title: 'Работники', field: 'people', type: 'numeric' },
    { title: 'на га', field: 'square', type: 'numeric' },
    { title: 'Длительность (периоды), дн', field: 'days', type: 'numeric' },
    {
        title: 'Тип культуры',
        field: 'products',
        lookup: { 1: 'зерновые', 2: 'овощи', 3: 'зерновые, овощи' },
    },
    {
        title: 'Тип работы',
        field: 'task',
        lookup: { 1: 'работы по высеву', 2: 'работы по обработке', 3: 'работы по сбору урожая' },
    },
    ], data: [
        { name: "Загрузка семян", people: 1, square: 300, days: 12, products: 3, task: 1 },
        { name: "Транспортировка семян", people: 1, square: 300, days: 12, products: 3, task: 1 },
        { name: "Посев", people: 1, square: 300, days: 12, products: 3, task: 1 },
        { name: "Прикатывание продукции", people: 1, square: 300, days: 12, products: 3, task: 1 },
        { name: "Боронование", people: 1, square: 300, days: 12, products: 3, task: 2 },
    ]
}




function AdminPage() {
    const { useState } = React;

    const [columns, setColumns] = useState();

    const [data, setData] = useState();

    const [curTable, setTable] = useState("products");

    const [curTab, setCur] = useState();

    const [curTitle, setTitle] = useState("Культуры")

    useEffect(() => {
        if (curTab) {
            setColumns(curTab.cols);
            setData(curTab.data);
        }
    }, [curTable])

    return (
        <Row style={{width: "100%"}} >
            <Col md={2}>
                <div className="admin_menu">
                    <p className={"admin_link" + (curTable == "products" ? " pressed" : "")} onClick={() => { setTable("products"); setTitle("Культуры"); setCur(tasks) }}>Культуры</p>
                    <p className={"admin_link" + (curTable == "tasks" ? " pressed" : "")} onClick={() => { setTable("tasks"); setTitle("Работы"); setCur(tasks) }}>Работы</p>
                    <p className={"admin_link" + (curTable == "transport" ? " pressed" : "")} onClick={() => { setTable("transport"); setTitle("Техника"); setCur(tasks) }}>Техника</p>
                </div>
            </Col>
            <Col md={10}>
                <MaterialTable
                    title={curTitle}
                    columns={columns}
                    data={data}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    setData([...data, newData]);

                                    resolve();
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...data];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    setData([...dataUpdate]);

                                    resolve();
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...data];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    setData([...dataDelete]);

                                    resolve()
                                }, 1000)
                            }),
                    }}
                    localization={{
                        pagination: {
                            labelDisplayedRows: '{from}-{to} из {count}',
                            labelRowsSelect: "строк"
                        },
                        toolbar: {
                            nRowsSelected: '{0} строк выбрано',
                            searchPlaceholder: "Поиск",
                            searchTooltip: "Поиск"
                        },
                        header: {
                            actions: 'Действия'
                        },
                        body: {
                            emptyDataSourceMessage: 'Нет данных',
                            addTooltip: "Добавить",
                            deleteTooltip: "Удалить",
                            editTooltip: "Редактировать",
                            filterRow: {
                                filterTooltip: 'Сортировать'
                            },
                            editRow: {
                                deleteText: "Вы уверены, что хотите удалить выбранную строку?"
                            }
                        }
                    }}
                    style={{marginTop: '40px'}}
                />
            </Col>
        </Row>
    )
}
export default AdminPage