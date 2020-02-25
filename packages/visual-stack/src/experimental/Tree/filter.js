export const createFilter = (treeSelector, sizeThreshold = 3) => searchText => {
  const label = treeSelector.name;
  const children = treeSelector.children;
  const rootId = treeSelector.rootId();
  const snippets = searchText
    .toLowerCase()
    .split(' ')
    .filter(x => x.length >= sizeThreshold);
  const filteredOut = {};
  const expanded = {};
  expanded[rootId] = true;
  if (snippets.length === 0) return [filteredOut, expanded];
  const predicate = nodeId => {
    const txt = label(nodeId).toLowerCase();
    const isFound =
      snippets.find(snippet => txt.indexOf(snippet) >= 0) !== undefined;
    return isFound;
  };
  function filterNode(nodeId) {
    const ch = children(nodeId);
    const foundInChildren = ch.reduce((p, c) => filterNode(c) || p, false);
    expanded[nodeId] = nodeId === rootId || foundInChildren;
    if (nodeId === rootId || predicate(nodeId)) {
      return true;
    } else {
      if (!foundInChildren) filteredOut[nodeId] = true;
      return foundInChildren;
    }
  }
  filterNode(rootId);
  return [filteredOut, expanded];
};
