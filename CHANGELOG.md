# 0.4.1 (March 24, 2016)

## Other Changes

- Added a proper margin to the bottom of the `PageHeader` component that matches the original source component.

# 0.4.0 (March 24, 2016)

## New Features

- Added various form components, including `Form`, `FormGroup`, `Input`, `Label`, and `Legend`.

# 0.3.1 (March 23, 2016)

## New Features

- Added `ActionButton` component to be used by `Toolbar` for actions within a List Toolbar.

# 0.3.0 (March 23, 2016)

## Breaking Changes

- The `ExpandedRow` component has been removed in favor of supporting an `expansion` prop on the `Row` component. All code should still work after replacing all instances of `ExpandedRow` with `Row`.

## Bugfixes

- The `react` dependency is now properly listed as a peer dependency. This should not break any existing code, but it may cause version conflicts if using an old version of React.

# 0.2.1 (March 23, 2016)

## Bugfixes

- Click events’ default actions are now properly suppressed when clicking on dropdown menu items, preventing the fragment from being reset.

# 0.2.0 (March 23, 2016)

## New Features

- Enhanced the `MenuBar` component to support right-aligned menu items and (stateless) dropdown menus. The `leftItems` prop can be used *instead of* using passing child elements for consistency with the new `rightItems` prop, but this is optional.
