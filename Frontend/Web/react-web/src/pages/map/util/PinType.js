class PinType {
    category = null;
    type = null;
    color = null;
    isUnique = null;
    mapId = null;
    constructor(category, type, color, isUnique, mapId) {
        this.category = category;
        this.type = type;
        this.color = color;
        this.isUnique = isUnique;
        this.mapId = mapId;
    };

    equals(object){
        if (object === null)
            return false;
        if (!(object instanceof PinType))
            return false;
        return this.category === object.category
            && this.type === object.type
            && this.color === object.color
            && this.isUnique === object.isUnique
            && this.mapId === object.mapId;
    }
}

export default PinType;