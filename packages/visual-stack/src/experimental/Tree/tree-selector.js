import * as R from 'ramda';

// @enum {number}
export const SELECTION_EMPTY = 0;
export const SELECTION_FULL = 1;
export const SELECTION_PARTIAL = -1;

export class TreeSelector {
  /** @param {{
   * rootId: function(Object):string,
   * parent: function(string, Object):string,
   * children: function(string, Object):Array<string>,
   * name: function(string, Object):string
   * isChild: function(string, Object):boolean,
   * all: function(function(string):boolean, Object):Generator<string, void, void>,
   * }} props */
  constructor(props) {
    this.rootId = props.rootId || (() => 'root');
    this.parent = props.parent;
    this.children = (id, context) => props.children(id, context) || [];
    this.name = props.name || (nodeId => nodeId);
    this.isChild =
      props.isChild ||
      ((nodeId, context) => this.children(nodeId, context).length == 0);
    this.all =
      props.all ||
      ((predicate, context) =>
        this._all(predicate, this.rootId(context), context));
  }

  *_all(predicate, nodeId, context) {
    if (predicate(nodeId)) yield nodeId;
    for (const child of this.children(nodeId, context))
      yield* this._all(predicate, child, context);
  }

  createMap(fn) {
    let map = {};
    for (const nodeId of this._all(R.T, this.rootId()))
      map[nodeId] = fn(nodeId);
    return map;
  }

  *_reversedPath(nodeId, context) {
    let p = this.parent(nodeId, context);
    while (p) {
      yield p;
      p = this.parent(p, context);
    }
  }

  _selectionBasedOnChildren(nodeId, selection, context) {
    const [first, ...other] = this.children(nodeId, context);
    const selFirstChild = first === undefined ? undefined : selection[first];
    return selFirstChild !== undefined
      ? R.any(child => selection[child] !== selFirstChild, other)
        ? SELECTION_PARTIAL
        : selFirstChild
      : selection[nodeId];
  }

  _branchSelection(branchRoot, newState, context) {
    return R.reduce(
      (acc, item) =>
        R.merge(acc, this._branchSelection(item, newState, context)),
      R.objOf(branchRoot, newState),
      this.children(branchRoot, context)
    );
  }

  select(nodeId, newState, initialSelection, context) {
    const sel0 = R.merge(
      initialSelection,
      this._branchSelection(nodeId, newState, context)
    );
    const newSel = (accumSelection, item) => {
      const sel = this._selectionBasedOnChildren(item, accumSelection, context);
      return accumSelection[item] === sel
        ? R.reduced(accumSelection)
        : R.assoc(item, sel, accumSelection);
    };
    return R.reduce(newSel, sel0, this._reversedPath(nodeId, context));
  }

  selectAllLeaves(predicate, newState, initialSelection, context) {
    const children = this.all(
      R.allPass([x => this.isChild(x, context), x => predicate(x, context)]),
      context
    )();
    return R.reduce(
      (acc, item) => this.select(item, newState, acc, context),
      initialSelection,
      children
    );
  }

  toggle(nodeId, initialSelection, context) {
    const newSelection =
      initialSelection[nodeId] === SELECTION_FULL
        ? SELECTION_EMPTY
        : SELECTION_FULL;
    return this.select(nodeId, newSelection, initialSelection, context);
  }

  _describe(nodeId, selection, context, _inverse) {
    const selectionStatus = idArray => {
      let empty = 0;
      let partial = 0;
      let full = 0;
      for (let id of idArray) {
        switch (selection[id]) {
          case SELECTION_EMPTY:
            empty += 1;
            break;
          case SELECTION_FULL:
            full += 1;
            break;
          default:
            partial += 1;
        }
      }
      return { empty, partial, full };
    };
    const flatten = array =>
      array.length === 1 && Array.isArray(array[0]) ? array[0] : array;

    const children = this.children(nodeId, context);
    const status = selectionStatus(children);
    const nodeName =
      this.parent(nodeId, context) == null
        ? 'Everything'
        : this.name(nodeId, context);

    if (_inverse) {
      if (selection[nodeId] === SELECTION_FULL) return ['not', nodeName];
      if (selection[nodeId] === SELECTION_EMPTY) return nodeName;
      if (status.full >= status.empty) {
        return flatten(
          children
            .filter(id => selection[id] !== SELECTION_FULL)
            .map(id => this._describe(id, selection, context, true))
        );
      } else {
        return [
          nodeName,
          'except',
          flatten(
            children
              .filter(id => selection[id] !== SELECTION_EMPTY)
              .map(id => this._describe(id, selection, context, false))
          ),
        ];
      }
    } else {
      if (this.parent(nodeId, context) == null) {
        if (children.length === status.full) return nodeName;
        if (children.length === status.empty) return 'Nothing';
      } else {
        if (selection[nodeId] === SELECTION_EMPTY) return ['not', nodeName];
        if (selection[nodeId] === SELECTION_FULL) return nodeName;
      }
      if (status.full >= status.empty) {
        return [
          nodeName,
          'except',
          flatten(
            children
              .filter(id => selection[id] !== SELECTION_FULL)
              .map(id => this._describe(id, selection, context, true))
          ),
        ];
      } else {
        return flatten(
          children
            .filter(id => selection[id] !== SELECTION_EMPTY)
            .map(id => this._describe(id, selection, context, false))
        );
      }
    }
  }

  describe(selection, context) {
    return this._describe(this.rootId(context), selection, context, false);
  }

  selectedIds(selection, context) {
    let ids = [];
    const inner = nodeId => {
      if (this.parent(nodeId, context) == null) {
        switch (selection[nodeId]) {
          case 0:
            ids = null;
            return;
          case 1:
            return;
          default:
            this.children(nodeId, context).forEach(inner);
        }
      } else {
        switch (selection[nodeId]) {
          case 0:
            return;
          case 1:
            ids.push(nodeId);
            return;
          default:
            this.children(nodeId, context).forEach(inner);
        }
      }
    };
    inner(this.rootId(context));
    return ids;
  }
}
