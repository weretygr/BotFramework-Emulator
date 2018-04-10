import { ComponentClass, StatelessComponent } from 'react';

export interface IDialogService {
  showDialog(dialog: ComponentClass<any> | StatelessComponent<any>): any;

  hideDialog(): any;

  setHost(hostElement: HTMLElement): void;
}