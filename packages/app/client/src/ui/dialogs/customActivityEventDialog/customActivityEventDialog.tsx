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

import { Dialog, DialogFooter, LinkButton, PrimaryButton, TextField, TextArea } from '@bfemulator/ui-react';
import { ChangeEvent } from 'react';
import * as React from 'react';

import * as dialogStyles from '../dialogStyles.scss';

import * as styles from './customActivityEventDialog.scss';

export interface CustomActivityEventDialogDialogProps {
  close: () => void;
  onAnchorClick: (url: string) => void;
}

export interface CustomActivityEventDialogDialogState {
  name: string;
  value: string;
}

export class CustomActivityEventDialog extends React.Component<
  CustomActivityEventDialogDialogProps,
  CustomActivityEventDialogDialogState
> {
  public constructor(props: CustomActivityEventDialogDialogProps, context: CustomActivityEventDialogDialogState) {
    super(props, context);

    this.state = {
      name: '',
      value: '',
    };
  }

  public render(): JSX.Element {
    return (
      <Dialog cancel={this.onClose} className={dialogStyles.main} title="Event Information">
        <div className="{styles.botCreateForm}">
          <TextField
            value={this.state.name}
            data-prop="name"
            onChange={this.onInputChange}
            label={'Event name'}
            required={true}
            name={'name'}
          />
        </div>
        <div className="{styles.botCreateForm}">
          <TextArea
            value={this.state.value}
            data-prop="value"
            onChange={this.onTextAreaChange}
            label={'Event value'}
            required={true}
            name={'value'}
          />
        </div>
        <DialogFooter>
          <PrimaryButton text="Close" onClick={this.onClose} />
        </DialogFooter>
      </Dialog>
    );
  }

  private createAnchorClickHandler = url => () => this.props.onAnchorClick(url);

  private onBotFileDocsClick = this.createAnchorClickHandler('https://aka.ms/about-bot-file');

  private onClose = () => {
    this.props.close();
  };

  private onEmulatorv4OverviewDocsClick = this.createAnchorClickHandler(
    'https://aka.ms/bot-framework-emulator-v4-overview'
  );

  private onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { prop } = event.target.dataset;
    console.log(value);
    console.log(prop);
  };
  private onTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    const { prop } = event.target.dataset;
    console.log(value);
    console.log(prop);
  };
}
