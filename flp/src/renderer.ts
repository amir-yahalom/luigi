import { postToShell } from './base';

// *******  DO NOT USE *******
// TODO: validate and finalize renderer API interface

export interface IRenderer {
  setHeaderTitle(title: string): Promise<any>;
  setHeaderVisibility(show: boolean): Promise<any>;
  addHeaderItem(headerId: string, desc: string, sapIcon: string, visible: boolean): Promise<any>;
  addHeaderEndItem(headerId: string, desc: string, sapIcon: string, visible: boolean): Promise<any>;
}

/**
 * @WIP
 */
export function setHeaderTitle(title: string): Promise<any> {
  const service = 'sap.ushell.services.renderer.setHeaderTitle';
  const body = {
    sTitle: title,
  };

  return postToShell({ service, body });
}

/**
 * @WIP
 */
export function setHeaderVisibility(show: boolean): Promise<any> {
  const service = 'sap.ushell.services.renderer.setHeaderVisibility';
  const body = {
    bShow: show,
  };

  return postToShell({ service, body });
}

/**
 * @WIP
 */
export function addHeaderItem(headerId: string, desc: string, sapIcon: string, visible: boolean): Promise<any> {
  const service = 'sap.ushell.services.renderer.addHeaderItem';
  const body = {
    sId: headerId,
    sTooltip: desc,
    sIcon: `sap-icon://${sapIcon}`,
    bVisible: visible,
  };
  return postToShell({ service, body });
}

/**
 * @WIP
 */
export function addHeaderEndItem(headerId: string, desc: string, sapIcon: string, visible: boolean): Promise<any> {
  const service = 'sap.ushell.services.renderer.addHeaderEndItem';
  const body = {
    sId: headerId,
    sTooltip: desc,
    sIcon: `sap-icon://${sapIcon}`,
    bVisible: visible,
  };
  return postToShell({ service, body });
}
