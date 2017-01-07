# 0.0.12 (January 2, 2017)

## New Features

- Added TopNav component.

# 0.0.10 (December 2, 2016)

## New Features

- Added SideNav component.

# 0.0.9 (October 28, 2016)

## New Features

- Added a UMD build to allow for usage of the library in a variety of environments.

# 0.0.8 (September 6, 2016)

## New Features

- Added Sidebar component.

# 0.0.7 (April 27, 2016)

## Other Changes

- Loosened version constraints on peer dependencies, mostly to permit usage with React 15. The tests still run on React 0.14 to make ensure nothing depends on React 15 features.

# 0.0.6 (April 1, 2016)

## New Features

- Added support for managing modals using the `ModalMountPoint` component and the `openModal` and `closeModal` actions.

# 0.0.5 (March 28, 2016)

## Other Changes

- Made the version constraint on visual-stack considerably more relaxed. Until the API stabilizes, it is the responsibility of client packages to provide a reasonable version of visual-stack.

# 0.0.3 (March 24, 2016)

## Bugfixes

- Fix the `MenuBarDropdown` behavior to properly close the dropdown after a second click anywhere on the page, even on the menu bar button itself, which should serve as a toggle.

# 0.0.2 (March 23, 2016)

## Bugfixes

- The `MenuBar` and `MenuBarDropdown` components now have properly-listed `propTypes` and `contextTypes`.
