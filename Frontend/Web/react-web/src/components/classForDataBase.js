
import './contentDashboard/ContentDashboard.css';
export class Tariff {
    constructor(name, cost, possibility) {
      this.name = name;
      this.cost = cost;
      this.possibility = possibility;
    }
}

export class IconButton {
    constructor(path, name, icon) {
        this.path = path;
        this.name = name;
        this.icon = icon;
    }
}

export class Culture {
    constructor(name, viewModel, currentEvent, advice, color) {
        this.name = name;
        this.viewModel = viewModel;
        this.currentEvent = currentEvent;
        this.advice = advice;
        this.color = color;
    }
}

export class MyTariff {
    constructor(num, name, date, sum) {
        this.num = num;
        this.name = name;
        this.date = date;
        this.sum = sum;
    }

}


const cultures = () => {
    return(
    [
        Culture("Пшеница", "Вид модели", "Текущее мероприятие", "Совет", "#00A500"),
        Culture("Кукуруза", "Вид модели", "Текущее мероприятие", "Совет", "#FFCC00"),
        Culture("Название модели", "Вид модели", "Текущее мероприятие", "Совет", "#FE0000"),
    ])
}

