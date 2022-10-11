import { ThemeContextConsumer } from '../ThemeContext';
import './TableForTariffs.css';
import { Container } from 'react-bootstrap';
function TableForTariffs(props) {
    // get table column
    console.log(props.contentsForTable[0])
    const column = Object.keys(props.contentsForTable[0]);
    // get table heading data
    const ThData = () => {

        //return column.map((data) => {
        //    return <th className="ForBox" key={data}>{data}</th>
        /* })*/
        return props.headersForTable.map((data, index) => {
            return <th className={props.classNamesTD} key={data}>{data}</th>
        })
    }
    // get table row data
    const tdData = () => {

        return props.contentsForTable.map((data) => {
            return (
                <tr>
                    {
                        column.map((v) => {
                            return <td className={props.classNamesTD}>{data[v]}</td>
                        })
                    }
                </tr>
            )
        })
    }
    return (
        <ThemeContextConsumer>{context => (
            <Container>
                <table className={props.classNameTab +" "+ context.theme + " HistoryTableText"}>
                <caption className={context.theme + " forTextTable "}>{props.textForTable}</caption>
                    <thead>
                        <tr className={props.classNameTR}>{ThData()}</tr>
            </thead>
            <tbody>
                {tdData()}
            </tbody>
                </table>
            </Container>
        )
        }
        </ThemeContextConsumer>
    )
}
export default TableForTariffs;
