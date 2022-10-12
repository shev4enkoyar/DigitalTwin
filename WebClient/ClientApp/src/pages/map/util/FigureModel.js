class FigureModel {
    id;
    mapId;
    categoryId;
    points;
    constructor(id, mapId, categoryId, points) {
        this.id = id;
        this.mapId = mapId;
        this.categoryId = categoryId;
        this.points = points;
    }
}

export default FigureModel;