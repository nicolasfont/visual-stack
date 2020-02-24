export const createFilter = (treeSelector, sizeThreshold = 3) => searchText => {
  const label = treeSelector.name;
  const children = treeSelector.children;
  const rootId = treeSelector.rootId();
  const snippets = searchText
    .toLowerCase()
    .split(' ')
    .filter(x => x.length >= sizeThreshold);
  let filter_out = {};
  let expanded = {};
  expanded[rootId] = true;
  if (snippets.length === 0) return [filter_out, expanded];
  const predicate = nodeId => {
    const txt = label(nodeId).toLowerCase();
    const isFound =
      snippets.find(snippet => txt.indexOf(snippet) >= 0) !== undefined;
    return isFound;
  };
  function filterNode(nodeId) {
    const ch = children(nodeId);
    if (nodeId === rootId || predicate(nodeId)) {
      for (const child of ch) filterNode(child);
      expanded[nodeId] = true;
      return true;
    } else {
      const foundInChildren = ch.reduce((p, c) => p | filterNode(c), false);
      if (!foundInChildren) filter_out[nodeId] = true;
      expanded[nodeId] = foundInChildren;
      return foundInChildren;
    }
  }
  filterNode(rootId);
  return [filter_out, expanded];
};
