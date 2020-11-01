//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
// Microsoft Bot Framework: http://botframework.com
//
// Bot Framework Emulator Github:
// https://github.com/Microsoft/BotFramwork-Emulator
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

import { executeCommand, navBar, SharedConstants } from '@bfemulator/app-shared';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { mount } from 'enzyme';

import { CustomActivityEventDialogContainer } from './customActivityEventDialogContainer';
import { CustomActivityEventDialog } from './customActivityEventDialog';

jest.mock('../../dialogs', () => ({}));
jest.mock('./customActivityEventDialog.scss', () => ({}));
jest.mock('electron', () => ({
  remote: {
    app: {
      isPackaged: false,
    },
  },
  ipcMain: new Proxy(
    {},
    {
      get(): any {
        return () => ({});
      },
      has() {
        return true;
      },
    }
  ),
  ipcRenderer: new Proxy(
    {},
    {
      get(): any {
        return () => ({});
      },
      has() {
        return true;
      },
    }
  ),
}));

describe('The CustomActivityEventDialogContainer component', () => {
  let wrapper;
  let node;
  let mockStore;
  let mockDispatch;
  let instance;

  beforeEach(() => {
    mockStore = createStore(navBar);
    mockDispatch = jest.spyOn(mockStore, 'dispatch');
    wrapper = mount(
      <Provider store={mockStore}>
        <CustomActivityEventDialogContainer />
      </Provider>
    );
    node = wrapper.find(CustomActivityEventDialog);
    instance = wrapper.find(CustomActivityEventDialog).instance();
  });

  it('should render deeply', () => {
    expect(wrapper.find(CustomActivityEventDialogContainer)).not.toBe(null);
    expect(node.find(CustomActivityEventDialog)).not.toBe(null);
  });

  it('should contain a close function in the props', () => {
    expect(typeof (node.props() as any).close).toBe('function');
  });

  it('should call the appropriate command when onAnchorClick is called', () => {
    instance.props.onAnchorClick('http://blah');
    expect(mockDispatch).toHaveBeenCalledWith(
      executeCommand(true, SharedConstants.Commands.Electron.OpenExternal, null, 'http://blah')
    );
  });
});
