import React, { useState } from 'react';
import { Demo, Snippet } from '../../../components/Demo';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import Text from '@cjdev/visual-stack/lib/experimental/Text';
/* s0:start */
import { Tree } from '@cjdev/visual-stack/lib/experimental/Tree';
/* s0:end */
/* s1:start */
import {
  TreeSelector,
  SELECTION_FULL,
  SELECTION_EMPTY,
} from '@cjdev/visual-stack/lib/experimental/Tree/tree-selector';
/* s1:end */
/* s2:start */
import { createHighlighter } from '@cjdev/visual-stack/lib/experimental/Tree/highlighter';
/* s2:end */
/* s3:start */
import { createFilter } from '@cjdev/visual-stack/lib/experimental/Tree/filter';
/* s3:end */

export default () => {
  return (
    <Demo srcFile="/samples/src/containers/Experimental/Docs/tree.js">
      {snippets => (
        <div>
          <Panel>
            <Body>
              <Text>
                Allows data to be displayed and selected hierarchically.
                Branches can be expanded and collapsed. The display of each item
                in the tree is user-defined. It is possible to highlight and to
                filter out nodes that meet a given condition.
              </Text>
            </Body>
          </Panel>

          <Panel>
            <Header>Importing</Header>
            <Body>
              <Snippet tag="s0" src={snippets} />
            </Body>
          </Panel>

          <Panel>
            <Header>Basic Tree with bare-bones functionality</Header>
            <Body>
              <Text>
                <p>
                  This example shows a basic Tree. All the required essential
                  properties have been provided. No nodes are hidden, and there
                  is no filtering. Since we have not provided any event
                  handlers, the state is not updated when a node is selected or
                  unselected, and the selection state is not propagated up and
                  down the hierarchy. We will fix that in the next example.
                </p>
              </Text>
              <FirstExample />
              <Snippet tag="s11" src={snippets} />
            </Body>
          </Panel>

          <Panel>
            <Header>Handling expansion and selection events</Header>
            <Body>
              <Text>
                <p>
                  The <code>TreeSelector</code> utility class can be used to
                  simplify processing state changes triggered by selection
                  events.
                </p>
                <p>To import it, use:</p>
                <Snippet tag="s1" src={snippets} />
                <p>then instantiate it with your data:</p>
                <Snippet tag="s21" src={snippets} />
                <p>
                  <code>TreeSelector</code>s implement a number of utility
                  methods. <code>createMap</code>, for example, can be used to
                  create the initial state for the stores or hooks that will
                  manage the tree's state. In the example below, which uses
                  hooks, we will initially select all nodes, and collapse all
                  branches, except the root branch:
                </p>
                <Snippet tag="s22" src={snippets} />
                <p>
                  The <code>TreeSelector</code> can be passed directly to the{' '}
                  <code>treeStructure</code> property of a <code>Tree</code>.
                </p>
              </Text>
              <SecondExample />
              <Snippet tag="s23" src={snippets} />
              <Text>
                <p>
                  The <code>TreeSelector.toggle</code> method is used to compute
                  the new selection state, including all the children and
                  ancestors of the selected node
                </p>
              </Text>
            </Body>
          </Panel>

          <Panel>
            <Header>Highlighting nodes</Header>
            <Body>
              <Text>
                <p>
                  The rendering of the labels on the <code>Tree</code> is
                  user-defined. The optional property <code>labelContent</code>{' '}
                  takes two parameters: the node ID of the label to render, and
                  any text that should be highlighted. It is expected to return
                  the HTML content to display for the node's label.
                </p>
                <p>
                  The <code>Tree</code> component also has a{' '}
                  <code>highlight</code> property that is passed directly to{' '}
                  <code>labelContent</code> as the second parameter.
                </p>
                <p>
                  The <code>createHighlighter</code> function can be used to
                  create a function to assign to <code>labelContent</code>
                </p>
                <Snippet tag="s2" src={snippets} />
                <Snippet tag="s33" src={snippets} />
                <p>
                  It expects: a function that given a node-id returns a label
                  (we can use three tree selector's <code>name</code> function
                  for that), a CSS class name to use for the portions of text to
                  highlight, and the minimum number of characters to consider
                  for highlighting.
                </p>
              </Text>
              <ThirdExample />
              <Snippet tag="s34" src={snippets} />
              <Snippet tag="s35" src={snippets} />
            </Body>
          </Panel>

          <Panel>
            <Header>Filtering out nodes</Header>
            <Body>
              <Text>
                <p>
                  The <code>filterOut</code> property can be used to hide a set
                  of nodes from the tree. In the example below, we hide the
                  entire Southeast Division, and the Denver Nuggets from the
                  Northwest Division.
                </p>
              </Text>
              <FourthExample />
              <Snippet tag="s45" src={snippets} />
            </Body>
          </Panel>

          <Panel>
            <Header>Full example</Header>
            <Body>
              <FifthExample />
              <Text>
                <br />
                <p>
                  In this example, we both highlight and filter nodes. In
                  addition to the <code>createHighlighter</code> function, we
                  use the <code>createFilter</code> function, which takes care
                  of expanding the paths of all the highlighted nodes, and of
                  filtering out all nodes that are not highlighted.
                </p>
                <p>
                  The <code>createFilter</code> function is included with:
                </p>
                <Snippet tag="s3" src={snippets} />
                <p>We can then create all three auxiliary objects:</p>
                <Snippet tag="s51" src={snippets} />
              </Text>
              <Text>
                <p>In this example, we manage state with hooks.</p>
                <Snippet tag="s52" src={snippets} />
              </Text>
              <Text>
                <p>And finally, we use them in the UI.</p>
                <Snippet tag="s53" src={snippets} />
              </Text>
            </Body>
          </Panel>
        </div>
      )}
    </Demo>
  );
};

const FirstExample = () => {
  return (
    /* prettier-ignore */
    /* s11:start */
    <Tree
        treeStructure={{
            rootId: () => 'root',
            parent: id =>
            ({
                a: 'root', b: 'root',
                a1: 'a', a2: 'a', a3: 'a'
            }[id]),
            children: id =>
            ({
                root: ['a', 'b'],
                a: ['a1', 'a2', 'a3']
            }[id]),
            name: x => `Node "${x}"`
        }}
        rootVisible={false}
        selection={{ root: 1, a: 1, b: 1, a1: 1, a2: 1, a3: 1 }}
        expansion={{ root: true, a: true, b: true, a1: true, a2: true, a3: true }}
    />
    /* s11:end */
  );
};

const SecondExample = () => {
  /* prettier-ignore */
  /* s21:start */
  const treeSelector = new TreeSelector({
    parent: id =>
      ({
        a: 'root', b: 'root',
        a1: 'a', a2: 'a', a3: 'a',
      }[id]),
    children: id =>
      ({
        root: ['a', 'b'],
        a: ['a1', 'a2', 'a3'],
      }[id]),
    name: id =>
      ({
        root: 'Food',
        a: 'Formal meals',
        a1: 'Breakfast', a2: 'Lunch', a3: 'Dinner',
        b: 'Snacks'
      }[id])
  });
  /* s21:end */
  /* prettier-ignore */
  /* s22:start */
  const [selection, setSelection] = useState(
    treeSelector.createMap(_ => 1)
  );
  const [expansion, setExpansion] = useState(
    treeSelector.createMap(id => id === 'root')
  );
  /* s22:end */
  return (
    /* prettier-ignore */
    /* s23:start */
    <Tree
        treeStructure={treeSelector}
        rootVisible={false}
        selection={selection}
        expansion={expansion}
        onSelectionToggle={nodeId => setSelection(treeSelector.toggle(nodeId, selection))}
        onExpansionToggle={nodeId => setExpansion({...expansion, [nodeId]:!expansion[nodeId]})}
    />
    /* s23:end */
  );
};

const nba = () => {
  /* prettier-ignore */
  /* s4:start */
  const treeSelector = new TreeSelector({
    rootId: () => "nba",
    parent: id =>
      ({
      eastern: "nba",
      atlantic: "eastern",
      celtics:"atlantic", nets:"atlantic", knicks:"atlantic", sevetysixers:"atlantic", raptors:"atlantic",
      central: "eastern",
      bulls:"central", cavaliers:"central", pistons:"central", pacers:"central", bucks:"central",
      southeast: "eastern",
      hawks:"southeast", bobcats:"southeast", heat:"southeast", magic:"southeast", wizards:"southeast",
      western: "nba",
      northwest: "western",
      nuggets:"northwest", timberwolves:"northwest", thunder:"northwest", trailblazers:"northwest", jazz:"northwest",
      pacific: "western",
      warriors:"pacific", clippers:"pacific", lakers:"pacific", suns:"pacific", kings:"pacific",
      southwest: "western",
      mavericks:"southwest", rockets:"southwest", grizzlies:"southwest", hornets:"southwest", spurs:"southwest",
      }[id]),
    children: id =>
      ({
        nba: ['eastern', 'western'],
        eastern: ['atlantic', 'central', 'southeast'],
        western: ['northwest', 'pacific', 'southwest'],
        atlantic: ['celtics', 'nets', 'knicks', 'sevetysixers', 'raptors'],
        central: ['bulls', 'cavaliers', 'pistons', 'pacers', 'bucks'],
        southeast: ['hawks', 'bobcats', 'heat', 'magic', 'wizards'],
        northwest: ['nuggets', 'timberwolves', 'thunder', 'trailblazers', 'jazz'],
        pacific: ['warriors', 'clippers', 'lakers', 'suns', 'kings'],
        southwest: ['mavericks', 'rockets', 'grizzlies', 'hornets', 'spurs'],
      }[id]),
    name: id =>
      ({
        nba: "NBA Teams",
          eastern: "Eastern Conference",
              atlantic: "Atlantic Division",
                  celtics:"Boston Celtics",
                  nets:"New Jersey Nets",
                  knicks:"New York Knicks",
                  sevetysixers:"Philadelphia 76ers",
                  raptors:"Toronto Raptors",
              central: "Central Division",
                  bulls:"Chicago Bulls",
                  cavaliers:"Cleveland Cavaliers",
                  pistons:"Detroit Pistons",
                  pacers:"Indiana Pacers",
                  bucks:"Milwaukee Bucks",
              southeast: "Southeast Division",
                  hawks:"Atlanta Hawks",
                  bobcats:"Charlotte Bobcats",
                  heat:"Miami Heat",
                  magic:"Orlando Magic",
                  wizards:"Washington Wizards",
          western: "Western Conference",
              northwest: "Northwest Division",
                  nuggets:"Denver Nuggets",
                  timberwolves:"Minnesota Timberwolves",
                  thunder:"Oklahoma City Thunder",
                  trailblazers:"Portland Trail Blazers",
                  jazz:"Utah Jazz",
              pacific: "Pacific Division",
                  warriors:"Golden State Warriors",
                  clippers:"Los Angeles Clippers",
                  lakers:"Los Angeles Lakers",
                  suns:"Phoenix Suns",
                  kings:"Sacramento Kings",
              southwest: "Southwest Division",
                  mavericks:"Dallas Mavericks",
                  rockets:"Houston Rockets",
                  grizzlies:"Memphis Grizzlies",
                  hornets:"New Orleans Hornets",
                  spurs:"San Antonio Spurs",
      }[id])
  });
  /* s4:end */
  return treeSelector;
};

const ThirdExample = () => {
  const treeSelector = nba();
  /* prettier-ignore */
  /* s32:start */
  const [selection, setSelection] = useState(
      treeSelector.createMap(_ => 1)
    );
  const [expansion, setExpansion] = useState(
    treeSelector.createMap(id => ['nba', 'eastern', 'western'].includes(id))
  );
  /* s32:end */
  /* prettier-ignore */
  /* s33:start */
  const labelContent = createHighlighter(treeSelector.name, 'vs-tree-bold-highlight', 3);
  /* s33:end */
  /* s34:start */
  const [highlight, setHighlight] = useState('');
  /* s34:end */
  return (
    <div>
      {/* prettier-ignore */
        /* s35:start */}
      <input
            type="text"
            placeholder="Enter text to highlight"
            value={highlight}
            onChange={event => setHighlight(event.target.value)}
      />
      <Tree
        treeStructure={treeSelector}
        rootVisible={false}
        selection={selection}
        expansion={expansion}
        onSelectionToggle={nodeId =>
          setSelection(treeSelector.toggle(nodeId, selection))
        }
        onExpansionToggle={nodeId =>
          setExpansion({ ...expansion, [nodeId]: !expansion[nodeId] })
        }
        labelContent={labelContent}
        highlight={highlight}
      />
      {/* s35:end */}
    </div>
  );
};

const FourthExample = () => {
  const treeSelector = nba();

  const [selection, setSelection] = useState(treeSelector.createMap(_ => 1));
  const [expansion, setExpansion] = useState(
    treeSelector.createMap(id => ['nba', 'eastern', 'western'].includes(id))
  );

  return (
    /* prettier-ignore */
    /* s45:start */
    <Tree
        treeStructure={treeSelector}
        rootVisible={false}
        selection={selection}
        expansion={expansion}
        onSelectionToggle={
            nodeId => setSelection(treeSelector.toggle(nodeId, selection))
        }
        onExpansionToggle={nodeId =>
            setExpansion({ ...expansion, [nodeId]: !expansion[nodeId] })
        }
        filterOut={{southeast:true, nuggets:true}}
    />
    /* s45:end */
  );
};

const FifthExample = () => {
  /* s51:start */
  const treeSelector = nba(); // inspect source code to see details
  const filter = createFilter(treeSelector, 3); // filter needs a minimum of 3 characters
  const labelContent = createHighlighter(
    treeSelector.name, // function to use to fetch labels
    'vs-tree-bold-highlight', // class to use for highlighted spans
    3 // highlighter needs a minimum of 3 characters
  );
  /* s51:end */

  /* s52:start */
  const [selection, setSelection] = useState(treeSelector.createMap(_ => 1));
  const [expansion, setExpansion] = useState(
    treeSelector.createMap(id => id === 'nba')
  );
  const [highlight, setHighlight] = useState('');
  const [filteredOut, setFilteredOut] = useState({});
  /* s52:end */

  return (
    /* prettier-ignore */
    <div>
      {/* s53:start */}
      <input
          type="text"
          placeholder="text to find"
          value={highlight}
          onChange={event => {
            const [filter_Out, _expansion] = filter(event.target.value)
            setFilteredOut(filter_Out);
            setExpansion(_expansion);
            setHighlight(event.target.value)
          }}
      />

      {selection['nba'] === SELECTION_FULL ? (
        <button onClick={_ => setSelection(treeSelector.select('nba', SELECTION_EMPTY, selection))}>
          Unselect All
        </button>) : null}

      {selection['nba'] === SELECTION_EMPTY ? (
        <button onClick={_ => setSelection(treeSelector.select('nba', SELECTION_FULL, selection))}>
          Select All
        </button>) : null}

      {Object.entries(filteredOut).length > 0 ? (
        <button onClick={_ => setSelection(treeSelector.selectAllLeaves(
          (nodeId) => !filteredOut[nodeId],
          SELECTION_FULL,
          selection
        ))}>
          Select All Visible
        </button>) : null}

      {Object.entries(filteredOut).length > 0 ? (
        <button onClick={_ => setSelection(treeSelector.selectAllLeaves(
          (nodeId) => !filteredOut[nodeId],
          SELECTION_EMPTY,
          selection
        ))}>
          Unselect All Visible
        </button>) : null}

      <Tree
        treeStructure={treeSelector}
        labelContent={labelContent}
        highlight={highlight}
        rootVisible={false}
        selection={selection}
        expansion={expansion}
        onSelectionToggle={nodeId =>
          setSelection(treeSelector.toggle(nodeId, selection))
        }
        onExpansionToggle={nodeId =>
          setExpansion({ ...expansion, [nodeId]: !expansion[nodeId] })
        }
        filterOut={filteredOut}
      />
      {/* s53:end */}
    </div>
  );
};
