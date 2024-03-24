import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { deepCopy } from '@firebase/util';

export interface HTreeNode {
  id: string,
  title: string,
  selected: boolean,
  childs?: HTreeNode[]
}

@Component({
  selector: 'hss-tree',
  templateUrl: './hss-tree.component.html',
  styleUrls: ['./hss-tree.component.scss']
})
export class HssTreeComponent implements OnInit {
  @Input() nodes: HTreeNode[] = [];
  @Output() selectionChanged = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  protected treeChanged(node: HTreeNode, parent?: HTreeNode, root?: HTreeNode) {
    this.childSelection(node, parent, root);
    this.selectionChanged.emit({node, parent, root});
  }

  private childSelection(node: HTreeNode, parent?: HTreeNode, root?: HTreeNode) {
    this.parentSelection(node, parent, root);
    if (node.childs) {
      node.childs = node.childs.map(i => {
        i.selected = node.selected;
        this.childSelection(i);
        return i;
      });
    }
  }

  private parentSelection(node, parent, root?) {
    if (parent) {
      if (node.selected) {
        const siblingNotSelected = parent.childs.find(child => !child.selected);
        if (!siblingNotSelected) {
          parent.selected = true;
          if (root) {
            this.parentSelection(parent, root);
          }
        }
      } else {
        parent.selected = false;
        if (root) {
          this.parentSelection(parent, root);
        }
      }
    }
  }

  getJsonSelection() {
    return deepCopy(this.convertTreeToJson(this.nodes));
  }

  private convertTreeToJson(nodes: HTreeNode[]) {
    return nodes.reduce((old, {id, selected, title, childs}: HTreeNode)=> {
      old[id] = {
        selected: selected || false,
        title
      }
      if(childs) {
        const res = this.convertTreeToJson(childs);
        old[id] = {
          ...old[id],
          ...res
        }
      }
      return old;
    },{});
  }

  updateSelectionByJson(selection) {
    this.updateByJson(this.nodes, selection);
  }

  private updateByJson(nodes: HTreeNode[], selection = {}) {
    return nodes.map( node => {
      node.selected = selection[node.id]?.selected || false;
      if(node.childs) {
        this.updateByJson(node.childs, selection[node.id]);
      }
      return node;
    });
  }
  
  reset() {
     this.updateSelectionByJson({});
  }

}
