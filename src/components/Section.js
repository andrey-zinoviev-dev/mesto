export class Section {
    constructor ({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    elementRenderer() {
        this._items.forEach((item) => {
            this._renderer(item);
        })
    }
    oneElementRenderer() {
       this._renderer(this._items);
    }
    addItem(element) {
        this._container.append(element);
    }
}