# GG Changelog
## [0.30.0](releases/tag/v0.30.0)
This version is based on Jujutsu 0.29.

### Changed
- Add a "New empty revision before here" menu item
- Add a ghost element for dragging changes in the left hand revision graph
- Allow {Ctrl,Cmd}-clicking to select multiple revisions
- Allow Shift-click to extend selected revision set
- List selected revisions when dragging
- Add a textbox below revision graph showing selected revset
- Allow moving individual hunks from the right hand diff view
- Enables change or commit ID to be copied by clicking
- Make recent workspace list available on all platforms
- Show recent workspaces if opening a workspace failed.
- Support rendering git emojis in the history tree
- Swap squash and restore icons (squash pushes changes down)

### Fixed
- Fix overscroll on MacOS
- Compress path and action info when window is too narrow
- Use from_utf8_lossy to prevent invalid utf-8 sequence errors (will render at least something instead of failing)
- Enabled LTO for release builds, smaller and faster binary

## [0.29.0](releases/tag/v0.29.0)
This version is based on Jujutsu 0.29.

### Changed
- Update to jj 0.29 (thanks to @nightcore and and @ilyagr).
- Update to rust 2024 (thanks to @natural-selection1).

### Fixed
- Excessively tall horizontal scrollbars in WebKit (thanks to @ninjamuffin99).
- Untracked some Tauri artifacts that were changing every version (thanks to @ilyagr).
- `tauri dev` is now compatible with Hyper-V (thanks to @natural-selection1).
- Ctrl-enter keyboard shortcut on some platforms (thanks to @natural-selection1).
- Describe box resizing on some platforms (thanks to @natural-selection1).
- Flickering when dragging commits onto each other to rebase (thanks to @natural-selection1).

## [0.27.0](releases/tag/v0.27.0)
This version is based on Jujutsu 0.27.

### Added
- Cmd/Ctrl-enter shortcut to save revision descriptions.

### Fixed
- Suppress MacOS auto-capitalisation of branch/remote names.

## [0.23.0](releases/tag/v0.23.0)
This version is based on Jujutsu 0.23 and the recently-released Tauri 2.0.

### Changed
- Branches have been renamed to bookmarks. The setting `gg.ui.mark-unpushed-branches` has changed to `mark-unpushed-bookmarks`, but the old one will still work as well.

## [0.20.0](releases/tag/v0.20.0)
This version is based on Jujutsu 0.20.

### Fixed
- `gg.queries.log-page-size` setting was not being respected.
- Removed &lt;CR&gt; character which rendered as a circle in the author display on some Linux systems.
- Improved button/control font display on Linux.
- Fixed a panic attempting to display delete/delete conflicts in the right pane.

## [0.18.0](releases/tag/v0.18.0)
This version is based on Jujutsu 0.18.

## [0.17.0](releases/tag/v0.17.0)
This version is compatible with Jujutsu 0.17.

## [0.16.0](releases/tag/v0.16.0)
This version is compatible with Jujutsu 0.16.

### Added
- File diffs displayed in the revision pane; also, the file list is now keyboard-selectable.
- Backout command, which creates the changes necessary to undo a revision in the working copy.
- Consistent author/timestamp formatting, with tooltips for more detail.

### Fixed
- Right-pane scrollbar wasn't responding to clicks.
- Various design improvements.

## [0.15.3](releases/tag/v0.15.3)

### Added
- Relatively comprehensive branch management - create, delete, rename, forget, push and fetch.
- Display Git remotes in the status bar, with commands to push or fetch all their branches.
- Display Git tags (readonly; they aren't really a Jujutsu concept).
- Display edges to commits that aren't in the queried revset, by drawing a line to nowhere.
- Detect changes made by other Jujutsu clients and merge the operation log automatically.
- Improved keyboard support and focus behaviour.
- Window title includes the workspace path (when one is open).
- On Windows, the taskbar icon has a jump list with links to recent workspaces.
- New config options:
  * `gg.queries.log-page-size` for tuning performance on large repositories.
  * `gg.ui.mark-unpushed-branches` to control whether local-only branches are called out.

### Fixed
- GG now understands divergent changes, and can act on commits that have a shared change id.
  Note that if you do anything to such commits other than abandoning them, you're likely to
  create even more divergent commits!
- The AppImage build wasn't picking up the working directory correctly. This is fixed, and
  you can also specify a workspace to open on the commandline as an alternative.
- Watchman support (core.fsmonitor) was not enabled.
- Various design improvements.

## [0.15.2](releases/tag/v0.15.2)

### Fixed
- Right click -> Abandon revision... again.

## [0.15.1](releases/tag/v0.15.1)

### Fixed
- Several buttons had stopped working due to IPC changes:
  * The Squash/Restore buttons on the right pane.
  * Right click -> Abandon revision.
  * Right click -> Squash into parent.
  * Right click -> Restore from parent.

## [0.15.0](releases/tag/v0.15.0)
Initial experimental release. This version is compatible with Jujutsu 0.15.

### Added
- Open, reload and snapshot repositories.
- Graph-based log displaying summaries, author and status.
- Log queries in Jujutsu's [revset language](https://martinvonz.github.io/jj/latest/revsets/).
- Revision view with file-level change details and editing commands.
- Drag and drop to move, remove and recombine revisions/files/branches.
- Context menus for common operations.
- Transactional operations with single-level undo.
- Light and dark themes.
- Codesigned binaries for MacOS and Windows.
- Completely untested binaries for Linux.
