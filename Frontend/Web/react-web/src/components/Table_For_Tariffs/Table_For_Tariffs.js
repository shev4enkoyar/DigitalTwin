import { ThemeContextConsumer } from '../ThemeContext';
import './Table_For_Tariffs.css';
function Table_For_Tariffs(props) {
    return (
        <ThemeContextConsumer>{context => (
            <table className={context.theme + " HistoryTableText"}>
                <tr>
                    <th className="ForBox">#</th>
                    <th className="ForBox">Дата</th>
                    <th className="ForBox">Наименование</th>
                    <th className="ForBox">Сумма</th>
                </tr>
                {props.historyTariffs.map((tariff) =>
                    <tr>
                        <td className="ForBox PaddingForNum">{tariff.num}</td>
                        <td className="ForBox">{tariff.date}</td>
                        <td className="ForBox">{tariff.name}</td>
                        <td className="ForBox PaddingForSum">{tariff.sum}p</td>
                    </tr>)}
            </table>)}
        </ThemeContextConsumer>
    )
            }
export default Table_For_Tariffs;