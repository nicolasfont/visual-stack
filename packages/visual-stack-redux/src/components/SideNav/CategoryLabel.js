import { CategoryLabel as BaseCategoryLabel } from '@cjdev/visual-stack/lib/components/SideNav';
import { connect } from 'react-redux';
import { selectCollaspedStateFromSideNav } from '../../actions';
export const CategoryLabel = connect(
  state => ({
    collapsed: selectCollaspedStateFromSideNav(state),
  }),
  null
)(BaseCategoryLabel);
