var path = require('path')

module.exports = {
  storage: {},

  activate: function () {
    this.copyCommand = atom.commands.add(
      'atom-workspace',
      'protoboard:copy',
      function () {
        this.copy()
      }.bind(this))

    this.swapCommand = atom.commands.add(
      'atom-workspace',
      'protoboard:swap',
      function () {
        this.swap()
      }.bind(this))

    this.copyAllCommand = atom.commands.add(
      'atom-workspace',
      'protoboard:copy-all',
      function () {
        this.copyAll()
      }.bind(this))

    this.swapAllCommand = atom.commands.add(
      'atom-workspace',
      'protoboard:swap-all',
      function () {
        this.swapAll()
      }.bind(this))
  },

  deactivate: function () {
    this.copyCommand.dispose()
    this.swapCommand.dispose()
  },

  copy: function(options) {
    if (options === undefined) {
      options = {}
    }

    var editor = atom.workspace.getActiveTextEditor()

    if(!editor) return

    var filePath = editor.getPath()
    var fileText = editor.getText()

    this.copyText(fileText, filePath, function (e, stored) {
      if(e) {
        console.log('Error copying text:', e)
      }
    })
  },

  copyAll: function(options) {
    console.log('copyAll');
    if (options === undefined) {
      options = {}
    }

    var editors = atom.workspace.getTextEditors()

    if (!editors) return

    for (var editor of editors) {
      var filePath = editor.getPath()
      var fileText = editor.getText()

      this.copyText(fileText, filePath, function (e, stored) {
        if(e) {
          console.log('Error copying text:', e)
        }
      })
    }
  },

  copyText: function(fileText, filePath, cb) {
    this.storage[filePath] = fileText
    cb(null, fileText)
  },

  swap: function(options) {
    if (options === undefined) {
      options = {}
    }

    var editor = atom.workspace.getActiveTextEditor()

    if(!editor) return

    var filePath = editor.getPath()
    var fileText = editor.getText()

    var cursorPosition = editor.getCursorScreenPosition()

    if(this.storage[filePath]) {
      this.swapText(fileText, filePath, function (e, stored) {
        if(e) {
          console.log('Error swapping text:', e)
        }

        editor.setText(stored)

        editor.setCursorScreenPosition(cursorPosition)
      })
    }
    else {
      this.copyText(fileText, filePath, function (e, stored) {
        if(e) {
          console.log('Error swapping text:', e)
        }
      })
    }
  },

  swapAll: function(options) {
    console.log('swapAll');
    if (options === undefined) {
      options = {}
    }

    var editors = atom.workspace.getTextEditors()
    var active = atom.workspace.getActiveTextEditor()

    if (!editors) return

    for (var editor of editors) {
      var filePath = editor.getPath()
      var fileText = editor.getText()

      if (editor === active) {
        var cursorPosition = editor.getCursorScreenPosition()
      }

      if(this.storage[filePath]) {
        this.swapText(fileText, filePath, function (e, stored) {
          if(e) {
            console.log('Error swapping text:', e)
          }

          editor.setText(stored)

          if (editor === active) {
            editor.setCursorScreenPosition(cursorPosition)
          }
        })
      }
      else {
        this.copyText(fileText, filePath, function (e, stored) {
          if(e) {
            console.log('Error swapping text:', e)
          }
        })
      }
    }
  },

  swapText: function(fileText, filePath, cb) {
    stored = this.storage[filePath]
    this.storage[filePath] = fileText
    cb(null, stored)
  },

  // handleEvents: function(editor) {
  //   editor.getBuffer().onWillSave(function () {
  //     var path = editor.getPath()
  //     if (!path) return
  //
  //     if (!editor.getBuffer().isModified()) return
  //
  //     var formatOnSave = atom.config.get('gorobot-formatter.formatOnSave', {scope: editor.getRootScopeDescriptor()})
  //     if (!formatOnSave) return
  //
  //     var relativePath = path
  //     if (this.fileSupported(relativePath)) {
  //       this.format({selection: false})
  //     }
  //   }.bind(this))
  // },

  config: {}
}
