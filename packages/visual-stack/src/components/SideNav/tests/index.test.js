import React from 'react';
import { shallow, mount } from 'enzyme';
import { SideNav, ToggleIcon, Header, LinkGroup, Link, UserIcon } from '../';

describe('SideNav', () => {
  test('should render', () => {
    const wrapper = mount(
      <SideNav
        onClick={() => {}}
        userMenu={<div/>}
      />
    );
    expect(wrapper.find('.vs-sidenav').length).toEqual(1);
  });

  test('should render active', () => {
    const wrapper = mount(
      <SideNav
        onClick={() => {}}
        collapsed={false}
        />
    );
    expect(wrapper.find('.vs-sidenav .active').length).toEqual(1);
  });

  test('should render collapsed', () => {
    const wrapper = mount(
      <SideNav
        onClick={() => {}}
        collapsed={true}
        />
    );
    expect(wrapper.find('.vs-sidenav .collapsed').length).toEqual(1);
  });

  test('should give default home page if no homeLink is given', () => {
    const wrapper = mount(
      <SideNav
        onClick={() => {}}
        collapsed={true}
        />
    );
    expect(wrapper.find('a.vs-sidenav-container-row').props().href).toEqual('/');
  });

  test('should correctly set the homeLink if one is given', () => {
    const homeLink = 'somewhere/else';
    const wrapper = mount(
      <SideNav
        onClick={() => {}}
        collapsed={true}
        homeLink={homeLink}
        />
    );
    expect(wrapper.find('a.vs-sidenav-container-row').props().href).toEqual(homeLink);
  });

  describe('Header', () => {
    test('should render with children', () => {
      const wrapper = mount(
        <Header>
          <div className="dummy">something</div>
        </Header>
      );
      expect(wrapper.find('.vs-sidenav-entry').length).toEqual(1);
      expect(wrapper.find('.vs-sidenav-entry').children().length).toEqual(1);
    });
  });

  describe('LinkGroup', () => {
    test('should render with default icon if none is given', () => {
      const wrapper = mount(
        <LinkGroup label="nothing" />
      );
      expect(wrapper.find('.vs-sidenav-entry').length).toEqual(1);
      expect(wrapper.find('.fa-stack .vs-stacked-icon').length).toEqual(1);
    });

    test('should render with passed in icon', () => {
      const wrapper = mount(
        <LinkGroup label="nothing" icon={<div className="fake-icon"/>}/>
      );
      expect(wrapper.find('.fake-icon').length).toEqual(1);
    });
  });

  describe('Link', () => {
    test('should render with children and default Icon', () => {
      const wrapper = mount(
        <Link inLinkGroup={false}>
          <a href="mock link for React Router">
            <span>Label without Text</span>
          </a>
        </Link>
      );
      expect(wrapper.find('.vs-sidenav-entry').length).toEqual(1);
    });
  });

  describe('ToggleIcon', () => {
    test('should render', () => {
      const wrapper = shallow(
        <ToggleIcon />
      );
      expect(wrapper.find('.vs-sidenav-toggle-icon').length).toEqual(1);
    });
  });

  describe('UserIcon', () => {
    test('should render first and last', () => {
      const wrapper = shallow(<UserIcon firstInitial="A" lastInitial="B" />);
      expect(wrapper.text()).toEqual('AB');
    });
  });
});
