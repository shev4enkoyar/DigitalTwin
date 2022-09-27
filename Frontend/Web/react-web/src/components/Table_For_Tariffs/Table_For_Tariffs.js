import { ThemeContextConsumer } from '../ThemeContext';
import './Table_For_Tariffs.css';
function Table_For_Tariffs(props) {
    // get table column
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
            <table className={context.theme + " HistoryTableText"}>
                <caption className={context.theme + " forTextTable "}>{props.textForTable}</caption>
            <thead>
                <tr>{ThData()}</tr>
            </thead>
            <tbody>
                {tdData()}
            </tbody>
            </table>
        )
        }
        </ThemeContextConsumer>
    )
}
export default Table_For_Tariffs;
