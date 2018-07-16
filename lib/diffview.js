'use babel';

import DiffviewView from './diffview-view';
import { CompositeDisposable } from 'atom';

export default {

  diffviewView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.diffviewView = new DiffviewView(state.diffviewViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.diffviewView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'diffview:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.diffviewView.destroy();
  },

  serialize() {
    return {
      diffviewViewState: this.diffviewView.serialize()
    };
  },

  toggle() {
    console.log('Diffview was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
