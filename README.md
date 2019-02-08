# Protoboard :rocket:

A code prototyping tool for human productivity.

## What is this?

An extended prototyping clipboard for [Atom](https://atom.io).

## How does it work?

There are only two commands: __Copy__ and __Swap__.

__Copy__ text in the current editor to storage using `shift-ctrl-C`. Continue
working, making changes. Realize you want to go back to the way things were.
__Swap__ the current text in the editor with the text in storage using
`shift-ctrl-X`. Make some more changes. Realize that you were right all along,
and __swap__ the new changes with your old changes.

## Why?

Have you ever wanted to just try some code out, and not have to worry about
getting back to the point where you know everything was working?

Use Protoboard to avoid:

* Repeatedly pressing `ctrl-Z` and `shift-ctrl-Z` to test new code.
* Making an unnecessary Git commit and using `git-revert`.
* Copying a section of code, commenting it out, and working on the copy.
* Copying an entire file's contents to a new file and working on the original (yikes!).

## How do I install it?

Use the Atom Package Manager, or install it through the CLI using:

```shell
apm install protoboard
```

## Extended Features

* __Copy all__ text in open editors to storage using `shift-ctrl-A` followed by `shift-ctrl-C`.
* __Swap all__ text in open editors with the text in storage using `shift-ctrl-A` followed by `shift-ctrl-X`.

## Coming Soon :construction:

* Numbered snapshots.
* Snapshots of specific lines.
* Revert to last git commit state (while keeping current state in storage).
