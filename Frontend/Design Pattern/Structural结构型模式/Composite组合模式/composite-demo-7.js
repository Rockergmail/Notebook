// DynamicGallery class.
// 角色：Composite
class DynamicGallery {
    constructor(id) {
        this.children = [];
        this.element = document.createElement('div');
        this.element.id = id;
        this.element.className = 'dynamic-gallery';
    }
    // implements Composite, GalleryItem
    // implement the Composite interface
    add(child) {
        this.children.push(child);
        this.element.appendChild(child.getElement());
    }
    remove(child) {
        for (var node, i = 0; node = this.getChild(i); i++) {
            if (node === child) {
                this.children.splice(i, 1);
                break;
            }
        }
        this.element.removeChild(child.getElement());
    }
    getChild(i) {
        return this.children[i];
    }
    // implement the GalleryItem interface
    hide() {
        for (var node, i = 0; node = this.getChild(i); i++) {
            node.hide();
        }
        this.element.style.display = 'none';
    }
    show() {
        this.element.style.display = 'block';
        for (var node, i = 0; node = this.getChild(i); i++) {
            node.show();
        }
    }
    // Helper methods
    getElement() {
        return this.element;
    }
};

/*
 你也许很想用DOM自身作为保存子元素的数据结构。它已经拥有appendChild和removeChild方法，
 还有childNodes属性面对与存储和获取组合对象的子对象来说这原本非常理想。
 问题在于这种做法要求每个相关DOM节点都要具有一个反指其包装对象的引用，以便实现所要求的操作。
 而在某些浏览器中这会导致内存泄漏。一般来说，最好避免让DOM对象反过来引用JS对象。
 */

// GalleryImage class.
// 角色： Leaf
class GalleryImage {
    constructor(src) {
        // implements Composite, GalleryItem
        this.element = document.createElement('img');
        this.element.className = 'gallery-image';
        this.element.src = src;
    }

    // implements the Composite interface
    /*
     this is a leaf node, so we don't
     implements these methods,we just
     define them
     */
    add() {
    }
    remove() {
    }
    getChild() {
    }
    // implements the GalleryItem interface
    hide() {
        this.element.style.display = 'none';
    }
    show() {
        // restore the display attribute to
        // its previus setting.
        this.element.style.display = '';
    }
    // Helper methods
    getElement() {
        return this.element;
    }
};

var topGallery = new DynamicGallery('top-gallery');
topGallery.add(new GalleryImage('img/image-1.jpg'));
topGallery.add(new GalleryImage('img/image-2.jpg'));
topGallery.add(new GalleryImage('img/image-3.jpg'));

var vacationPhotos = new DynamicGallery('vacation=photos');

for (var i = 0; i < 30; i++) {
    vacationPhotos.add(new GalleryImage('img/image-' + i + '.jpg'));
}

topGallery.add(vacationPhotos);
topGallery.show();
vacationPhotos.hide();
document.body.appendChild(topGallery.getElement());