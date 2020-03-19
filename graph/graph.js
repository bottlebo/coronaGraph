let cytoscape = require('cytoscape');
let coseBilkent = require('cytoscape-cose-bilkent');
const _defaults = require('./defaults')
const EventEmitter = require('./eventemitter')
cytoscape.use(coseBilkent);
//const me = "a0";
class Graph extends EventEmitter {
  constructor(selector, myNode, settings) {
    super();
    this.settings = {};
    this.settings.statuses = {};
    this.settings.myNode = Object.assign({}, _defaults.myNode, settings.myNode);
    this.settings.edges = Object.assign({}, _defaults.edges, settings.edges)
    this.settings.keyNode = Object.assign({}, _defaults.keyNode, settings.keyNode)
    this.settings.node = Object.assign({}, _defaults.node, settings.node)


    for (const st of Object.keys(_defaults.statuses)) {
      this.settings.statuses[st] = settings.statuses ? (settings.statuses[st] || _defaults.statuses[st]) : _defaults.statuses[st];
    }
    if (settings.statuses) {
      for (const st of Object.keys(settings.statuses)) {
        this.settings.statuses[st] = settings.statuses[st];
      }
    }
    this._clickHandled = false;
    this.data = [];
    this.keyNodes = [];
    this.keys = [];
    this.myNode = myNode;
    this.zoom = 0;
    this._zoomStarted = false;
    this._animated = false;
    this._pan = {};
    this.boundingKeys = [];
    this.cy = cytoscape({
      container: document.getElementById(selector),
      zoomingEnabled: true,
      minZoom: 0.15,
      style: [
        {
          selector: 'node',
          style: {
            //content: "data(id)",
            'background-color': this.settings.node.backgroundColor,
            'border-width': this.settings.node.borderWidth,
            'border-style': this.settings.node.borderStyle,
            'border-color': this.settings.node.borderColor,
            width: this.settings.node.width,
            height: this.settings.node.height,
            'background-fit': 'cover',

          }
        },
        {
          selector: '.active',
          style: {
            'shape': 'round-heptagon'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': this.settings.edges.width,
            'line-color': this.settings.edges.lineColor
          }
        },
        {
          selector: '.me',
          style: {
            'background-color': this.settings.myNode.backgroundColor,
            'border-width': this.settings.myNode.borderWidth,
            'border-style': this.settings.myNode.borderStyle,
            'border-color': this.settings.myNode.borderColor,
            width: this.settings.myNode.width,
            height: this.settings.myNode.height,
          }
        },
        {
          selector: '.key',
          style: {
            'background-color': this.settings.keyNode.backgroundColor,
            'border-width': this.settings.keyNode.borderWidth,
            'border-style': this.settings.keyNode.borderStyle,
            'border-color': this.settings.keyNode.borderColor,
            width: this.settings.keyNode.width,
            height: this.settings.keyNode.height
          }
        },
      ],
      elements: {
        nodes: [],
        edges: []
      }
    });
    for (const st of Object.keys(this.settings.statuses)) {
      this.cy.style().selector('.' + st).style(this.settings.statuses[st].style).update();
    }
  }

  init(data) {
    this.emit('busy');
    this.data.length = 0;
    for (const d of data)
      this.data.push(d)
    this._animated = true;
    this._build(data)
    const layout = this.cy.layout({name: 'cose-bilkent', animationDuration: 1000, animate: true, randomize: false, idealEdgeLength: 20, fit: true})
    layout.pon('layoutstop').then((event) => {
      this.zoom = this.cy.zoom()
      this._animated = false;
      this.emit('ready');

    });

    layout.run();
    this.cy.on('click tap', 'node', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.type == 'click') {
        this._clickHandled = true;
        this._handleNodeClick(event);
      }
      else if (event.type == 'tap' && !this._clickHandled) {
        this._handleNodeClick(event);
      }
      else {
        this._clickHandled = false;
      }
    })
    this.cy.on('zoom', (evt) => {
      if (this._animated || this._zoomStarted) return
      this._zoomStarted = true
      setTimeout(() => {
        this._zoom()
      }, 500);
      setTimeout(() => {
        this._zoomStarted = false
      }, 1000)
    });
    this.cy.on('tapstart', evt => {
      this._pan = {x: this.cy.pan().x, y: this.cy.pan().y};
    })
    this.cy.on('tapend', evt => {
      if (this._animated || (evt.target.length && evt.target[0].data().id)) return
      const _pan = this.cy.pan();
      if (
        Math.abs(_pan.x - this._pan.x) > 10 || Math.abs(_pan.y - this._pan.y > 10) &&
        (this.cy.width() - this.cy.nodes().renderedBoundingBox().x2 > 100 ||
          this.cy.nodes().renderedBoundingBox().x1 > 100 ||
          this.cy.nodes().renderedBoundingBox().y1 > 100 ||
          this.cy.height() - this.cy.nodes().renderedBoundingBox().y2 > 100)
      ) {
        this.emit('update', {ids: this.boundingKeys})
      }
    })
  }
  _zoom() {
    if (this.cy.zoom() < this.zoom) {
      this.zoom = this.cy.zoom()
      this.emit('update', {ids: this.boundingKeys})
    }
    if (this.cy.zoom() <= this.cy.minZoom()) {
      this.cy.fit()
    }
    else {
      this.cy.center()
    }

  }
  add(data) {
    this.emit('busy');

    this._animated = true;
    for (let n of data) {
      this.data.push(n);
    }
    this.cy.nodes().remove();
    this.cy.edges().remove();
    this._build(this.data)

    const layout = this.cy.layout({name: 'cose-bilkent', animate: true, randomize: false, fit: true})

    layout.pon('layoutstop').then((event) => {
      this._animated = false;
      this.emit('ready');

    });

    layout.run();
  }
  addAvatar(node) {
    const n = this.cy.getElementById(node.id)
    if (n.length)
      this._addAvatar(node)
  }
  _addAvatar(node) {
    if (node.image) {
      this.cy.getElementById(node.id).style('background-image', node.image)
    }
  }
  _build(data) {
    this.boundingKeys = [];
    const children = data.filter(val => val.descendents.find(c => c.id == this.myNode.id));
    this.keys = [];// data.map(v => v.id)
    for (const d of data) {
      if (!this.keys.includes(d.id)) this.keys.push(d.id)
    }
    let box = this.cy.extent();
    let center = {x: this.cy.pan().x + this.cy.width() / 2, y: this.cy.pan().y + this.cy.height() / 2}
    const meNode = {
      group: "nodes",
      data: {
        id: this.myNode.id
      },
      position:
        {x: center.x, y: center.y},
      classes: "me " + (this.myNode.state ? this.myNode.state : ''),
      grabbable: true
    }
    this.cy.add(meNode);
    this._addAvatar(this.myNode)
    //
    let degree = 15;
    let degreStep = 360 / children.length;
    const h = box.h / 5;

    // add keys node
    for (var child of children) {
      const x = center.x + h * Math.sin(degree * Math.PI / 180);
      const y = center.y + h * Math.cos(degree * Math.PI / 180);
      const exnode = this.cy.getElementById(child.id);
      if (exnode.length == 0) {
        const node = {group: "nodes", data: {id: child.id}, position: {x, y}, classes: "key " + (child.state ? child.state : ''), grabbable: true}

        const edge = {"data": {"id": `${this.myNode.id}_${child.id}`, "source": this.myNode.id, "target": child.id, "group": "edges", "classes": ""}}
        this.cy.add(node)
        this.cy.add(edge)
        this._addAvatar(child)
        this.keyNodes.push({id: child.id, degree: degree})
        degree += degreStep;
        this.boundingKeys.push(child.id)
      }
    }
    this.keyNodes.push({id: this.myNode.id, degree: degree})

    //
    for (var child of children) {
      this._addChildrenToKey(child)

    }
    degree = 30;
    for (var key of this.keys) {

      const node = this.cy.getElementById(key)
      if (!node.length) {
        const n = data.find(k => k.id == key)

        const parentId = n.descendents.filter(value => -1 !== this.keys.indexOf(value.id))[0]
        const parent = this.cy.getElementById(parentId.id)
        this.boundingKeys.push(n.id)
        const index = this.boundingKeys.indexOf(parentId.id);
        if (index > -1) {
          this.boundingKeys.splice(index, 1);
        }

        if (parent.length) {
          const _node = data.find(n => n.id == key)
          const pos = parent.position();
          const x = pos.x + h * Math.sin(degree * Math.PI / 180);
          const y = pos.y + h * Math.cos(degree * Math.PI / 180);
          let node = {group: "nodes", data: {id: key}, position: {x, y}, classes: "key " + (_node.state ? _node.state : ''), grabbable: true}

          const edge = {"data": {"id": `${parentId.id}_${key}`, "source": parentId.id, "target": key, "group": "edges", "classes": ""}}

          this.cy.add(node)
          this.cy.add(edge)
          this._addAvatar(_node);
          this._addChildrenToKey(n)
          degree += 35
        }
      }
    }
  }
  _addChildrenToKey(keyNode) {
    const h = 5;
    let descendents = [];

    for (var d of keyNode.descendents) {
      const node = this.cy.getElementById(keyNode.id)
      const exnode = this.cy.getElementById(d.id)
      if (exnode.length == 0 && node.length && !this.keys.find(k => k == d.id) && d.id != this.myNode.id) {
        const pos = node.position();
        const _node = {id: d.id, image: d.image, state: d.state, parentId: keyNode.id, position: {x: pos.x, y: pos.y}}
        descendents.push(_node)
      }
    }
    let degree = -25;
    let degreStep = 360 / descendents.length;

    for (var d of descendents) {
      const exnode = this.cy.getElementById(d.id)
      if (exnode.length == 0) {
        const x = d.position.x + h * Math.sin(degree * Math.PI / 180) / 3;
        const y = d.position.y + h * Math.cos(degree * Math.PI / 180) / 3;
        let node = {group: "nodes", data: {id: d.id}, position: {x, y}, classes: (d.state ? d.state : ''), grabbable: true}
        const edge = {"data": {"id": `${keyNode.id}_${d.id}`, "source": keyNode.id, "target": d.id, "group": "edges", "classes": ''}}

        this.cy.add(node)
        this.cy.add(edge)
        this._addAvatar(d)
        degree += degreStep;
      }
    }
  }
  clearActive() {
    const active = this.cy.$('.active');
    if (active.length) {
      active.removeClass('active')
    }
  }
  _handleNodeClick(event) {
    const elem = event.target;
    const id = elem.data().id;
    this.clearActive();
    elem.addClass('active')

    this.emit('click', {id})
  }
}
module.exports = Graph